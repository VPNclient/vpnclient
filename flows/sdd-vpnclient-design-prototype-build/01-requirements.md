# Requirements: vpnclient-design-prototype-build — сборочная инфраструктура (GitHub Actions + Docker) для `design/vpnclient-design-prototype-v1.0.12.2025.05.02`

> Version: 1.1
> Status: APPROVED
> Last Updated: 2026-07-26

## Problem Statement

`design/vpnclient-design-prototype-v1.0.12.2025.05.02` — мокнутый design-прототип VPNclient-приложения на Flutter (реальный `vpnclient_engine_flutter`-плагин вырезан, заменён на `lib/mock/vpnclient_engine_mock.dart`). Сейчас это **web-only** пакет: папок `android/ios/macos/windows/linux` нет намеренно (см. `README.md`), единственный способ запустить — `flutter run -d chrome` после `flutter pub get`. У проекта есть собственный git-репозиторий (`git@github.com:VPNclient/vpnclient-design-prototype.git`, отдельный от остального содержимого `design/`), но `.github/workflows` отсутствует — сборка не автоматизирована вообще.

Референс — `flows/sdd-comics-editor-build`: там для `apps/comics-editor-v2.9` (Flutter + C#/.NET, 6 платформ) была построена выделенная сборочная инфраструктура — Native Build (`build.yml`, без Docker, быстрая обратная связь на каждый push/PR) + Docker Build (`docker-build.yml`, контейнеризация там, где это решает реальную проблему — Linux и Android, где локальная машина и CI-раннер иначе используют разные версии тулчейна).

**Цель этого flow**: построить аналогичную двухконтурную сборочную инфраструктуру для `vpnclient-design-prototype`. В отличие от comics-editor, здесь:
- нет C#/.NET части (нативный движок замокан в чистом Dart) — Dockerfile'ы будут проще (без `dotnet`-слоя);
- сейчас поддерживается только одна платформа (Web) — по явному решению пользователя (2026-07-26) **проект нужно вернуть к полной мультиплатформенности**: сгенерировать `android/ios/macos/windows/linux` через `flutter create .` в дополнение к существующему `web/`, чтобы сборочный контур покрывал все платформы аналогично comics-editor-build.

Это меняет порядок работы: прежде чем писать workflow-файлы, сама Flutter-структура проекта должна быть расширена и проверена локально (хотя бы на доступных здесь платформах — macOS/iOS/web), иначе CI будет собирать несуществующие таргеты.

### Дополнение: pre-existing баг l10n-кодогенерации обнаружен при проверке (2026-07-26, в ходе Specifications)

При пробном прогоне `flutter create .` в scratch-копии (не в самом репозитории) и последующем `flutter analyze`/`flutter test` обнаружено: `l10n.yaml` содержит `synthetic-package: true`, а текущий Flutter (3.44.6) **полностью убрал поддержку** synthetic-package (`Cannot enable "synthetic-package", this feature has been removed`). Это ломает генерацию `AppLocalizations` → 7 файлов в `lib/` (`main.dart`, `pages/apps/apps_page.dart`, `pages/main/location_widget.dart`, `pages/main/main_page.dart`, `pages/servers/servers_list.dart`, `pages/servers/servers_page.dart`, `search_dialog.dart`), которые импортируют `package:flutter_gen/gen_l10n/app_localizations.dart`.

Подтверждено: баг воспроизводится и на нетронутом оригинальном репозитории (не регрессия от `flutter create .`) — т.е. `flutter analyze`/`flutter test` в этом проекте уже красные сейчас, до любых изменений этого flow.

Решение пользователя (2026-07-26): **фиксить как пререквизит этого flow**. Правка: `l10n.yaml` → `synthetic-package: false` + `output-dir`, обновить 7 import-строк в `lib/` с `package:flutter_gen/gen_l10n/app_localizations.dart` на новый путь. Это механический фикс тулчейн-совместимости (Flutter убрал устаревший механизм), не изменение UI/бизнес-логики — не противоречит ограничению «не переписывать бизнес-логику/UI» из Constraints ниже. Добавлено как Acceptance Criterion #0 (см. Must Have) и как первая задача Plan/Implementation, до `flutter create .`.

## Известные факты о платформах (входные данные для проектирования)

| Платформа | Статус сейчас | Тулчейн | Контейнеризация (Docker) |
|---|---|---|---|
| **Web** | Есть (`web/`), единственная рабочая платформа | Flutter web (Dart2JS/Wasm compiler), Chrome для тестов | **Не нужна** — в отличие от Linux/Android в comics-editor, здесь нет нативного SDK, который может разъехаться между машинами; один и тот же Flutter SDK даёт идентичный результат где угодно. Аналогично macOS-логике из comics-editor-build («уже одинаково без контейнера»), но по другой причине (нет нативного тулчейна вообще, а не «раннер и машина разработчика — одна ОС»). |
| **Linux** (desktop) | Нет папки, будет сгенерирована `flutter create .` | Flutter Linux desktop (GTK3/CMake/ninja/clang), без .NET | **Да** — та же проблема, что в comics-editor: локальная машина разработчика (macOS) физически не может собрать Linux desktop нативно, нужен либо CI, либо Docker/VM. |
| **Android** (APK) | Нет папки, будет сгенерирована | Flutter + Gradle + JDK 17 + Android SDK/cmdline-tools | **Да** — идентичная логика comics-editor-build (без NDK — здесь нет NativeAOT/native-плагина, чистый Dart). |
| **Windows** (desktop) | Нет папки, будет сгенерирована | Visual Studio (MSVC/CMake), Flutter Windows desktop | **Нет** — тот же аргумент, что в comics-editor: нативная сборка требует реальной Windows; Windows-контейнеры работают только на Windows-хосте. |
| **macOS** (desktop) | Нет папки, будет сгенерирована | Xcode CLT, Flutter macOS desktop | **Нет** — Docker не поддерживает macOS-гостей; раннер и локальная машина разработчика — уже нативный macOS. |
| **iOS** | Нет папки, будет сгенерирована | Xcode, Flutter iOS, **без подписи** (design-прототип, не публикуется в App Store) | **Нет** — та же причина, что macOS. |

Итог (как и в comics-editor-build): контейнеризация закрывает **Linux и Android**; Windows/macOS/iOS/Web остаются нативными — по разным, но объективным причинам (см. таблицу).

## User Stories

### Primary

**As a** разработчик/дизайнер, работающий над `vpnclient-design-prototype`
**I want** воспроизводимую сборку прототипа на всех платформах (web + 5 нативных) через GitHub Actions, с Docker-паритетом для Linux/Android
**So that** прототип можно собрать и проверить одинаково локально и в CI, не полагаясь на то, что установлено на конкретной машине

### Secondary

**As a** стейкхолдер, оценивающий дизайн-прототип
**I want** чтобы каждый push/релиз давал скачиваемые артефакты сборки под нужную платформу (APK, `.app`/`.exe`/`.deb`, web-бандл)
**So that** можно посмотреть прототип в работе, не разворачивая Flutter-окружение самостоятельно

## Acceptance Criteria

### Must Have

0. **Given** `l10n.yaml` с `synthetic-package: true`, что больше не поддерживается текущим Flutter (3.44.6) и уже сейчас ломает `flutter analyze`/`flutter test`/сборку (см. дополнение выше)
   **When** `l10n.yaml` переключается на `synthetic-package: false` + `output-dir`, и 7 файлов в `lib/` обновляют import `AppLocalizations` на новый путь
   **Then** `flutter analyze` и `flutter test` проходят без l10n-related ошибок (остальные существующие warning/info — вне scope) — это пререквизит для всех следующих AC.

1. **Given** проект сейчас без нативных платформенных папок
   **When** выполняется `flutter create .` (регенерация scaffolding)
   **Then** появляются `android/`, `ios/`, `macos/`, `windows/`, `linux/` рядом с существующим `web/`; существующий `lib/`, `assets/`, `web/`, `l10n`-конфигурация и мок-подмена движка (см. `README.md`) не ломаются — `flutter analyze`/`flutter test`/`flutter run -d chrome` продолжают работать как раньше.

2. **Given** два Dockerfile — `docker/linux-build.Dockerfile` и `docker/android-build.Dockerfile` (без `dotnet`-слоя, в отличие от comics-editor)
   **When** `docker build`/`docker run` выполняется локально и делает `flutter build linux`/`flutter build apk`
   **Then** результат идентичен тому, что производит соответствующий job в Native Build.

3. **Given** `.github/workflows/build.yml` (Native Build)
   **When** событие — push/PR
   **Then** запускаются job'ы: `analyze` (flutter analyze + flutter test), `build-web`, `build-windows`, `build-macos`, `build-linux`, `build-android`, `build-ios` (iOS и Android — debug/unsigned сборки, без подписи и публикации в сторы — это design-прототип, не production-релиз).

4. **Given** `.github/workflows/docker-build.yml` (Docker Build)
   **When** событие — push в `main`, nightly-расписание, или публикация релиза
   **Then** запускаются `docker-build-linux`/`docker-build-android` на образах из `docker/*.Dockerfile`; артефакты публикуются через `actions/upload-artifact` (увеличенный retention) и прикрепляются к GitHub Release при триггере `release`.

5. **Given** разработчик без предустановленных Flutter/Android SDK, но с Docker
   **When** выполняется `tool/docker-build.sh linux` / `tool/docker-build.sh android`
   **Then** он получает собранный `.deb`/APK без установки чего-либо на хост, кроме Docker.

6. **Given** платформы, которые не контейнеризируются (Windows/macOS/iOS/Web)
   **When** документация сборки описывает эти платформы
   **Then** явно сказано, почему Docker не применяется к каждой (разные причины для каждой — см. таблицу платформ).

### Should Have

- Docker layer cache в CI (стандартный GitHub Actions Docker cache).
- `tool/docker-build.sh` с простыми командами (`linux`, `android`) — не заставлять помнить `docker run`-флаги.
- Nightly-расписание документировано и легко меняется.
- `docker/README.md`, аналогичный comics-editor-build, описывающий весь контур (какие job, зачем нужны оба процесса).

### Won't Have (This Iteration)

- Подпись кода / публикация в App Store, Google Play, Microsoft Store — прототип не распространяется через сторы; iOS/Android-сборки в CI — unsigned/debug.
- Контейнеризация Windows/macOS/iOS/Web (см. таблицу — технически нецелесообразно/невозможно или не даёт выигрыша).
- Изменение UI/бизнес-логики прототипа — только сборочная инфраструктура и (при необходимости) минимальная конфигурация платформенных scaffold-файлов (bundle id, app name), без изменения экранов/мок-логики.
- Публикация Docker-образов в registry (ghcr.io) — образ собирается заново на каждый CI-прогон.
- Deploy web-сборки на GitHub Pages или другой хостинг (рассматривалось, отклонено пользователем в пользу паритета с comics-editor-build: verify + artifact, без деплоя).

## Constraints

- **Рабочая зона**: `design/vpnclient-design-prototype-v1.0.12.2025.05.02` (отдельный git-репозиторий, `origin` = `git@github.com:VPNclient/vpnclient-design-prototype.git`). Остальное содержимое `design/` (файлы `.fig`/`.pdf`, `vpnclient-design-prototype-v1.1`, `VPNcliend-design-figma-v1.2`) не трогается.
- **Не переписывать бизнес-логику/UI**: только сборочная инфраструктура + платформенный scaffolding.
- **Пин версий**: Flutter 3.44.6 (та же версия, что зафиксирована в comics-editor-build и стоит локально) — для консистентности между всеми Flutter-проектами, которые собирает пользователь.
- **Git**: как и в comics-editor-build — **агент не выполняет git-команды** в `vpnclient-design-prototype` вообще (решено пользователем 2026-07-26). Все коммиты/пуши в этот репозиторий делает пользователь вручную; агент только изменяет файлы в рабочем дереве.

## Open Questions

Все вопросы решены пользователем 2026-07-25/26:

- [x] **Q1. Web в Native Build**: принят предложенный подход — `build-web` живёт только в Native Build (без Docker), т.к. у web-сборки нет нативного SDK, который может разъехаться между машинами.
- [x] **Q2. Unsigned iOS/Android**: принят предложенный подход — iOS-job в CI использует `flutter build ios --no-codesign`, Android — обычный debug/unsigned APK. Без подписи/секретов keystore.
- [x] **Q3. Git-операции**: **агент не трогает git** в этом репозитории вообще — ни коммитов, ни push. Только пользователь выполняет git-операции вручную.
- [x] **Q4. Nightly-расписание**: нет специфичного предпочтения — используется разумный дефолт, 03:00 UTC.
- [x] **Q5. `flutter_native_splash`**: нет специфичного запроса — оставляем вне scope этого build-инфраструктурного flow (пакет остаётся в зависимостях без конфигурации, как сейчас).
- [x] **Q6. compileSdk/NDK и версии Android/Xcode**: подтверждено — используем дефолтные версии, которые генерирует `flutter create .`/Flutter 3.44.6, без дополнительного ужесточения пина.

## References

- `flows/sdd-comics-editor-build/01-requirements.md`, `02-specifications.md`, `03-plan.md`, `04-implementation-log.md` — референсный flow, паттерн Native Build + Docker Build.
- `design/vpnclient-design-prototype-v1.0.12.2025.05.02/README.md` — текущее состояние прототипа (web-only, мок движка).
- `design/vpnclient-design-prototype-v1.0.12.2025.05.02/pubspec.yaml` — зависимости, версия Dart SDK (`^3.7.2`).

---

## Approval

- [x] Reviewed by: Anton
- [x] Approved on: 2026-07-26
- [x] Notes: «reqs approved». Q3 — явно: агент не трогает git в этом репозитории. Q6 — да, дефолтные версии. Q1, Q2, Q4, Q5 — приняты предложенные варианты по умолчанию.
