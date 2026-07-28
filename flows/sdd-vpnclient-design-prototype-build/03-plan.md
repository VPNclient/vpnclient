# Implementation Plan: vpnclient-design-prototype-build — мультиплатформенный scaffolding + Native Build/Docker Build

> Version: 1.0
> Status: DRAFT
> Last Updated: 2026-07-26
> Specifications: [02-specifications.md](02-specifications.md) (APPROVED)

## Summary

Всё — в `design/vpnclient-design-prototype-v1.0.12.2025.05.02` (отдельный git-репозиторий; агент git не трогает — файлы правятся в рабочем дереве, коммиты/пуш делает пользователь). Порядок жёсткий: сначала l10n-пререквизит (иначе всё дальше красное), потом `flutter create .` (нужен для всех платформенных job), потом Docker-образы (можно проверить независимо от workflow), потом обёртка, потом сами workflow-файлы, потом документация. Bundle org — `net.nativemind.vpn.design.prototype`.

## Task Breakdown

### Phase 0: Пререквизит-фикс l10n

#### Task 0.1: `l10n.yaml` + 7 import-строк в `lib/`
- **Description**: `l10n.yaml` — убрать `synthetic-package: true` (deprecated, без эффекта), добавить `output-dir: lib/l10n/generated`. В `lib/main.dart`, `lib/pages/apps/apps_page.dart`, `lib/pages/main/location_widget.dart`, `lib/pages/main/main_page.dart`, `lib/pages/servers/servers_list.dart`, `lib/pages/servers/servers_page.dart`, `lib/search_dialog.dart` — заменить `import 'package:flutter_gen/gen_l10n/app_localizations.dart';` на `import 'package:vpn_client/l10n/generated/app_localizations.dart';`. Больше никаких изменений в этих файлах.
- **Files**: `l10n.yaml` — Modify; 7 файлов в `lib/` — Modify (1 строка import каждый)
- **Dependencies**: None
- **Verification**: `flutter pub get && flutter analyze` — 0 ошибок, связанных с `AppLocalizations`/`flutter_gen` (уже проверено в scratch-копии на этапе Specifications, здесь — повторить на реальном репозитории)
- **Complexity**: Low

### Phase 1: Платформенный scaffolding

#### Task 1.1: `flutter create .`
- **Description**: `flutter create . --org net.nativemind.vpn.design.prototype --project-name vpn_client` — добавляет `android/`, `ios/`, `macos/`, `windows/`, `linux/`, `.metadata`, `.gitignore`, `test/widget_test.dart` (boilerplate). Выполняется **после** Task 0.1 (чтобы `flutter analyze` в Verification этого таска уже был чист от l10n-ошибок).
- **Files**: `android/`, `ios/`, `macos/`, `windows/`, `linux/`, `.metadata`, `.gitignore` — Create
- **Dependencies**: 0.1
- **Verification**: `lib/`, `pubspec.yaml`, `web/`, `assets/` не изменились (`git diff --stat` покажет только новые файлы, 0 изменённых существующих — кроме l10n-правки из 0.1); `flutter analyze` по-прежнему чист
- **Complexity**: Low

#### Task 1.2: Удалить boilerplate `test/widget_test.dart`
- **Description**: Сгенерированный `flutter create .` тест ссылается на несуществующий `MyApp` (реальный класс — `App`) и тестирует counter-логику, которой в проекте нет. Проект не имел тестов раньше — файл просто удаляется, не переписывается.
- **Files**: `test/widget_test.dart` — Delete
- **Dependencies**: 1.1
- **Verification**: `flutter test` — «no test files», exit code 0
- **Complexity**: Low

### Phase 2: Docker-образы

#### Task 2.1: `docker/linux-build.Dockerfile`
- **Description**: `ubuntu:24.04` + `clang cmake ninja-build pkg-config libgtk-3-dev liblzma-dev curl git unzip xz-utils ca-certificates`; Flutter 3.44.6 (`flutter_linux_3.44.6-stable.tar.xz`) в `/opt/flutter`, `PATH` включает `/opt/flutter/bin`; `flutter config --enable-linux-desktop --no-analytics`; `flutter precache --linux` на этапе сборки образа (слой). `WORKDIR /workspace`, без `ENTRYPOINT`/`CMD`. Без `.NET` (в отличие от comics-editor).
- **Files**: `docker/linux-build.Dockerfile` — Create
- **Dependencies**: None (параллельно остальным Phase 2)
- **Verification**: `docker build -f docker/linux-build.Dockerfile -t vpnclient-proto-linux-build:local docker` — успешно
- **Complexity**: Medium

#### Task 2.2: `docker/android-build.Dockerfile`
- **Description**: `ubuntu:24.04` + Adoptium APT-репозиторий → `temurin-17-jdk`; Android cmdline-tools (актуальная сборка Google, зафиксировать точный номер на этапе выполнения, не `latest`) в `/opt/android-sdk`; `sdkmanager --licenses` (auto-accept) + `sdkmanager "platform-tools" "platforms;android-<X>" "build-tools;<X>.0.0"`, где `<X>` — фактический `compileSdkVersion`, который Flutter Gradle Plugin 3.44.6 подставил в `android/app/build.gradle.kts` после Task 1.1 (посмотреть реальное значение `flutter.compileSdkVersion`, не гадать). `ANDROID_HOME=/opt/android-sdk`. Flutter 3.44.6 (тот же архив, что 2.1); `flutter precache --android`. NDK не ставим (чистый Dart, без native-кода).
- **Files**: `docker/android-build.Dockerfile` — Create
- **Dependencies**: 1.1 (нужно реальное значение `compileSdkVersion` из сгенерированного `build.gradle.kts`)
- **Verification**: `docker build -f docker/android-build.Dockerfile -t vpnclient-proto-android-build:local docker` — успешно
- **Complexity**: Medium

### Phase 3: Локальный запуск

#### Task 3.1: `tool/docker-build.sh`
- **Description**: `tool/docker-build.sh <linux|android> [command...]`. Проверка `command -v docker`. `docker build` (тег `vpnclient-proto-<target>-build:local`). `docker run --rm --platform linux/amd64 -v "$(pwd):/workspace" -w /workspace --env HOME=/tmp $( [ -z "${CI:-}" ] && echo "--user $(id -u):$(id -g)" ) <image> <command или дефолт: 'flutter pub get && flutter build linux --release'/'flutter pub get && flutter build apk --release'>`. `--platform linux/amd64` фиксированно (совпадает с GH-раннерами; известно из comics-editor-build — на Apple Silicon работает через Docker Desktop VM при включённой настройке Rosetta).
- **Files**: `tool/docker-build.sh` — Create
- **Dependencies**: 2.1, 2.2
- **Verification**: `tool/docker-build.sh linux` и `tool/docker-build.sh android` проходят полностью локально (после старта Docker Desktop — сейчас демон не запущен на этой машине)
- **Complexity**: Low

### Phase 4: Native Build (`build.yml`, новый)

#### Task 4.1: `.github/workflows/build.yml` — job `analyze`
- **Description**: `ubuntu-latest`; `actions/checkout@v4`; `subosito/flutter-action@v2` (`flutter-version: 3.44.6`, `channel: stable`); `flutter pub get`; `flutter analyze`; `flutter test`.
- **Files**: `.github/workflows/build.yml` — Create
- **Dependencies**: 0.1, 1.2
- **Verification**: синтаксис YAML валиден (`actionlint`/ручная проверка отступов); построчная сверка команд с тем, что реально прогонялось локально в Task 0.1/1.2
- **Complexity**: Low

#### Task 4.2: `build.yml` — job `build-web`
- **Description**: `ubuntu-latest`; тот же setup, что 4.1; `flutter build web --release`; `actions/upload-artifact` (`name: web-build`, путь `build/web`).
- **Files**: `.github/workflows/build.yml` — Modify (тот же файл)
- **Dependencies**: 4.1 (структура файла)
- **Verification**: команда идентична тому, что уже проверено локально (`flutter build web --release` прошёл в scratch-копии)
- **Complexity**: Low

#### Task 4.3: `build.yml` — job `build-linux`
- **Description**: `ubuntu-latest`; setup Flutter; `apt-get install clang cmake ninja-build pkg-config libgtk-3-dev liblzma-dev`; `flutter build linux --release`; `upload-artifact` (`build/linux/x64/release/bundle`).
- **Files**: `.github/workflows/build.yml` — Modify
- **Dependencies**: 4.1
- **Verification**: синтаксис + сверка с Task 2.1 (тот же набор пакетов/команда, что в Dockerfile — Native Build не в контейнере, но должен давать эквивалентный результат)
- **Complexity**: Low

#### Task 4.4: `build.yml` — job `build-android`
- **Description**: `ubuntu-latest`; setup Flutter; `actions/setup-java@v4` (`distribution: temurin`, `java-version: '17'`); `flutter build apk --release` (без секретов — debug-signing по умолчанию, подтверждено в Specifications); `upload-artifact` (`build/app/outputs/flutter-apk/*.apk`).
- **Files**: `.github/workflows/build.yml` — Modify
- **Dependencies**: 4.1
- **Verification**: синтаксис; сверка с Task 2.2
- **Complexity**: Low

#### Task 4.5: `build.yml` — job `build-windows`
- **Description**: `windows-latest`; setup Flutter; `flutter build windows --release`; `upload-artifact` (`build/windows/x64/runner/Release`).
- **Files**: `.github/workflows/build.yml` — Modify
- **Dependencies**: 4.1
- **Verification**: синтаксис; **не воспроизводимо локально на macOS** — финальная приёмка только реальным CI
- **Complexity**: Low

#### Task 4.6: `build.yml` — job `build-macos`
- **Description**: `macos-latest`; setup Flutter; `flutter build macos --release`; `upload-artifact` (`build/macos/Build/Products/Release/*.app`).
- **Files**: `.github/workflows/build.yml` — Modify
- **Dependencies**: 4.1
- **Verification**: команда идентична уже проверенной локально (`flutter build macos --release` прошёл в scratch-копии)
- **Complexity**: Low

#### Task 4.7: `build.yml` — job `build-ios`
- **Description**: `macos-latest`; setup Flutter; `flutter build ios --release --no-codesign`; `upload-artifact` (`build/ios/iphoneos/Runner.app` или `.xcarchive`, в зависимости от того, что реально создаёт `--no-codesign`-сборка).
- **Files**: `.github/workflows/build.yml` — Modify
- **Dependencies**: 4.1
- **Verification**: синтаксис; **не воспроизводимо локально** (на этой машине не установлен iOS platform-компонент в Xcode) — финальная приёмка только реальным CI (`macos-latest` поставляется с полным Xcode)
- **Complexity**: Low

### Phase 5: Docker Build (`docker-build.yml`, новый)

#### Task 5.1: `docker-build.yml` — job `docker-build-linux`
- **Description**: Триггеры: `push: branches: [main]`, `schedule: cron "0 3 * * *"`, `release: types: [published]`. `docker/build-push-action@v6` (`context: docker`, `file: docker/linux-build.Dockerfile`, `tags: vpnclient-proto-linux-build:ci`, `load: true`, `cache-from/to: type=gha,scope=linux-build`) → `run: docker run --rm -v ${{ github.workspace }}:/workspace -w /workspace vpnclient-proto-linux-build:ci bash -c 'flutter pub get && flutter build linux --release'`. `upload-artifact` (`name: linux-release-build`, `retention-days: 90`). При `github.event_name == 'release'`: `softprops/action-gh-release@v2` (`files: build/linux/x64/release/bundle/**`).
- **Files**: `.github/workflows/docker-build.yml` — Create
- **Dependencies**: 2.1, 3.1 (команда должна дословно совпадать с дефолтом `tool/docker-build.sh linux`)
- **Verification**: синтаксис YAML; построчная сверка с Task 3.1; финальная приёмка — реальный CI-прогон (`docker/build-push-action`/GHA cache — CI-специфичные, не тестируются локально)
- **Complexity**: Medium

#### Task 5.2: `docker-build.yml` — job `docker-build-android`
- **Description**: Тот же файл, второй независимый job (без `needs`). `docker/build-push-action@v6` для `android-build.Dockerfile` (`cache scope: android-build`); `run: docker run ... bash -c 'flutter pub get && flutter build apk --release'`. `upload-artifact` (`name: android-release-apk`, `retention-days: 90`). При `release`: то же прикрепление к Release (`files: build/app/outputs/flutter-apk/*.apk`).
- **Files**: `.github/workflows/docker-build.yml` — Modify (тот же файл, что 5.1)
- **Dependencies**: 2.2, 3.1
- **Verification**: то же, что 5.1
- **Complexity**: Low

### Phase 6: Документация и закрытие flow

#### Task 6.1: `docker/README.md`
- **Description**: Как собрать/запустить оба образа локально (`tool/docker-build.sh`), таблица платформ (Web/Windows/macOS/iOS — почему не контейнеризируются, три разные причины из Requirements), известное ограничение Apple Silicon (`--platform linux/amd64` + Rosetta), различие Native Build vs Docker Build (когда какой запускается, зачем нужны оба).
- **Files**: `docker/README.md` — Create
- **Dependencies**: 2.1–5.2
- **Verification**: шаги воспроизводимы по описанию
- **Complexity**: Low

#### Task 6.2: Финальное обновление `_status.md`/`04-implementation-log.md`
- **Description**: Зафиксировать, что сделано и проверено локально (l10n-фикс, scaffolding, web/macos/linux/android — если Docker поднят, — analyze/test), что ждёт реального CI-прогона (windows, ios, docker-build.yml целиком), какие версии зафиксированы (Android compileSdk/build-tools, cmdline-tools build number).
- **Files**: `flows/sdd-vpnclient-design-prototype-build/_status.md`, `04-implementation-log.md` — Modify
- **Dependencies**: всё выше
- **Verification**: —
- **Complexity**: Low

## Dependency Graph

```
0.1 → 1.1 → 1.2 ─────────────────────────┬─→ 4.1 ─┬─→ 4.2
                                          │        ├─→ 4.3
2.1 ─────────────────┬─→ 3.1 ─┬─→ 5.1 ───┤        ├─→ 4.4
2.2 (needs 1.1) ──────┘        └─→ 5.2 ───┤        ├─→ 4.5
                                          │        ├─→ 4.6
                                          │        └─→ 4.7
                                          │
                          5.1, 5.2, 4.2–4.7 → 6.1 → 6.2
```

## File Change Summary

| File | Action | Reason |
|------|--------|--------|
| `l10n.yaml` | Modify | Убрать deprecated `synthetic-package`, задать `output-dir` |
| `lib/main.dart` + 6 других файлов в `lib/` | Modify | 1 import каждый, путь к сгенерированным l10n-строкам |
| `android/`, `ios/`, `macos/`, `windows/`, `linux/` | Create | `flutter create .` scaffolding |
| `.metadata`, `.gitignore` | Create | Побочный продукт `flutter create .` |
| `test/widget_test.dart` | Create, затем Delete | Boilerplate, ссылается на несуществующий класс |
| `docker/linux-build.Dockerfile` | Create | Тулчейн-образ Linux desktop (без .NET) |
| `docker/android-build.Dockerfile` | Create | Тулчейн-образ Android (Flutter + JDK + SDK, без NDK) |
| `docker/README.md` | Create | Документация контейнеризованной сборки |
| `tool/docker-build.sh` | Create | Локальная обёртка `docker build` + `docker run` |
| `.github/workflows/build.yml` | Create | Native Build — 7 job |
| `.github/workflows/docker-build.yml` | Create | Docker Build — 2 job, триггеры main/nightly/release |

Не создаётся: `release.yml`-эквивалент (нет подписи/публикации в сторы — Won't Have).

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Расхождение команд между `tool/docker-build.sh`, `build.yml`, `docker-build.yml` | Med | Med | Все последовательности пишутся дословно идентично (Task 3.1/4.3/4.4/5.1/5.2 одновременно), сверяются построчно |
| Docker daemon не запущен на этой машине сейчас | High (известно) | Low | Пользователь запускает Docker Desktop перед Phase 2/3 верификацией; не блокирует написание файлов, только их локальную проверку |
| Windows/iOS-сборки не проверяемы локально на macOS | High (известно, объективное ограничение) | Low | Зафиксировано в Requirements/Specs как принятое; финальная приёмка — реальный CI-прогон после пуша пользователем |
| Точное число `compileSdkVersion`/build number cmdline-tools не определено заранее | Med | Low | Определяется по факту после Task 1.1 (реальный сгенерированный `build.gradle.kts`), фиксируется явным числом в Dockerfile — не блокирует остальные задачи |
| l10n-фикс (Task 0.1) случайно заденет что-то ещё в 7 файлах `lib/` | Low | Med | Изменяется ровно одна import-строка на файл, остальной код не трогается — diff после Task 0.1 должен показать ровно 7 однострочных изменений |

## Rollback Strategy

1. Все изменения — новые файлы или однострочные правки существующих (l10n imports). Откат: удалить созданные файлы/директории (`android/`, `ios/`, `macos/`, `windows/`, `linux/`, `docker/`, `tool/docker-build.sh`, `.github/workflows/*.yml`, `.metadata`, `.gitignore`, `test/`), вернуть 7 import-строк и `l10n.yaml` к исходному виду.
2. Поскольку агент не коммитит/не пушит — до тех пор, пока пользователь сам не закоммитит, откат — это просто `git checkout -- .`/`git clean` на усмотрение пользователя (агент этого не выполняет).

## Checkpoints

- [x] После Phase 0: `flutter analyze` чист от l10n-ошибок на реальном репозитории (2026-07-26; **регрессия** 2026-07-27 из-за content-import коммита `2c782db`, l10n-фикс переприменён в той же сессии — см. `04-implementation-log.md`). `flutter test` не показателен — см. ниже, Phase 1.
- [x] После Phase 1: `flutter create .` не изменил ничего, кроме l10n-правки — подтверждено. `flutter test` — **не** exit 0: `test/` пустой, современный Flutter возвращает exit 1 "does not appear to contain any test files" (не 0, как считалось на момент Task 1.2). Влияет на `analyze` job в `build.yml` — не блокирует эту задачу, но требует решения пользователя.
- [ ] После Phase 2: оба Docker-образа собираются локально (Docker Desktop не запускался в сессии 2026-07-27)
- [ ] После Phase 3: `tool/docker-build.sh linux|android` проходят полный прогон локально
- [x] После Phase 4: `flutter build web/macos/android(apk)` подтверждены локально (2026-07-27, включая Android — тулчейн теперь есть на машине); `ios` — синтаксис ок, локально всё ещё не собирается (не хватает iOS-платформенного компонента в Xcode, не блокер — ожидается работа на `macos-latest`); `windows`/`linux` — не воспроизводимы на этой machine, ждут реального CI
- [ ] После Phase 5: YAML валиден, команды сверены построчно с Phase 3; окончательная приёмка — зелёный реальный CI-прогон (сообщает пользователь после пуша)
- [x] Отклонения — в `04-implementation-log.md`

## Open Implementation Questions

- [ ] Точный build number Android `commandlinetools-linux` — зафиксировать на Task 2.2 (проверить актуальную ссылку Google, аналогично тому, как это делалось в comics-editor-build).
- [ ] Точное значение `compileSdkVersion` — зафиксировать на Task 2.2 по факту сгенерированного `android/app/build.gradle.kts` из Task 1.1.

---

## Approval

- [ ] Reviewed by: Anton
- [ ] Approved on:
- [ ] Notes:
