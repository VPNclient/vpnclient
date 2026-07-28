# Specifications: vpnclient-design-prototype-build — мультиплатформенный scaffolding + Native Build/Docker Build для `design/vpnclient-design-prototype-v1.0.12.2025.05.02`

> Version: 1.1
> Status: APPROVED
> Last Updated: 2026-07-26
> Requirements: [01-requirements.md](01-requirements.md) (APPROVED)

## Overview

Три слоя работы, в строгом порядке зависимости:

1. **Пререквизит-фикс** — `l10n.yaml`: убрать `synthetic-package` (больше не поддерживается Flutter 3.44.6), задать `output-dir`, поправить 7 import-строк в `lib/`. Без этого `flutter analyze`/`flutter test`/сборка не проходят уже сейчас, на любом Flutter.
2. **Платформенный scaffolding** — `flutter create .` добавляет `android/`, `ios/`, `macos/`, `windows/`, `linux/` рядом с существующим `web/`. Подтверждено локально (scratch-копия): не трогает `lib/`, `pubspec.yaml`, `assets/`, `web/`; добавляет `.gitignore`/`.metadata`/`.idea` (генерируемый `.gitignore` уже исключает `.idea`/`*.iml`/`.dart_tool`/`build`). Генерируемый `test/widget_test.dart` — boilerplate counter-test с `MyApp`, которого в проекте нет (реальный класс — `App`) — будет удалён (проект не имел тестов раньше, поддерживать несуществующий смоук-тест не нужно).
3. **Сборочная инфраструктура** (аналогично `sdd-comics-editor-build`, без `dotnet`-слоя):
   - **Native Build** (`build.yml`, новый — сейчас `.github/` нет вообще) — `analyze`, `build-web`, `build-windows`, `build-macos`, `build-linux`, `build-android`, `build-ios`, каждый push/PR, без Docker.
   - **Docker Build** (`docker-build.yml`, новый) — `docker-build-linux`/`docker-build-android` на двух Dockerfile, триггеры `push:main`/nightly (03:00 UTC)/`release:published`, публикация артефактов (+ прикрепление к Release).

`release.yml`-эквивалент не создаётся (Won't Have — нет подписи/публикации в сторы для design-прототипа).

## Affected Systems

| System | Impact | Notes |
|--------|--------|-------|
| `l10n.yaml` | Modify | Убрать `synthetic-package: true` (не задавать вовсе — параметр deprecated и не имеет эффекта), добавить `output-dir: lib/l10n/generated` |
| `lib/main.dart`, `lib/pages/apps/apps_page.dart`, `lib/pages/main/location_widget.dart`, `lib/pages/main/main_page.dart`, `lib/pages/servers/servers_list.dart`, `lib/pages/servers/servers_page.dart`, `lib/search_dialog.dart` | Modify | Один import меняется в каждом: `package:flutter_gen/gen_l10n/app_localizations.dart` → `package:vpn_client/l10n/generated/app_localizations.dart`. Никакой другой код не меняется. |
| `android/`, `ios/`, `macos/`, `windows/`, `linux/` | Create | Генерируются `flutter create . --org net.nativemind.vpn.design.prototype` (решено пользователем 2026-07-26) → Android `applicationId`/iOS-macOS bundle id = `net.nativemind.vpn.design.prototype.vpn_client` |
| `test/widget_test.dart` | Create, затем Delete | Генерируется `flutter create .` как boilerplate, ссылается на несуществующий `MyApp` — удаляется сразу после генерации |
| `.gitignore`, `.metadata` | Create | Побочный продукт `flutter create .`, стандартные файлы Flutter-проекта |
| `docker/linux-build.Dockerfile` | Create | Ubuntu 24.04 + Flutter 3.44.6 + GTK3/CMake/ninja/clang. Без `.NET` (в отличие от comics-editor — здесь нет C#-ядра) |
| `docker/android-build.Dockerfile` | Create | Ubuntu 24.04 + Flutter 3.44.6 + Temurin JDK 17 + Android SDK/cmdline-tools |
| `tool/docker-build.sh` | Create | `tool/docker-build.sh <linux\|android> [command...]` — аналогично comics-editor-build |
| `.github/workflows/build.yml` | Create | Native Build — 7 job (analyze + 6 платформ) |
| `.github/workflows/docker-build.yml` | Create | Docker Build — 2 job (linux, android) |
| `docker/README.md` | Create | Описание контура, платформенная таблица, почему Web/Windows/macOS/iOS не контейнеризируются (три разные причины) |

Не затрагивается: `lib/mock/*`, экраны, `assets/`, `web/index.html` и другое содержимое `web/` — бизнес-логика/UI прототипа не меняется (только один import на файл ради l10n-фикса).

## Architecture

```
design/vpnclient-design-prototype-v1.0.12.2025.05.02/
├── lib/                        # без функциональных изменений (7 файлов: 1 строка import)
├── web/                        # без изменений
├── android/ ios/ macos/        # НОВЫЕ — flutter create . scaffolding
├── windows/ linux/             # НОВЫЕ — flutter create . scaffolding
├── docker/
│   ├── linux-build.Dockerfile  # Flutter + GTK3/CMake/ninja/clang (без .NET)
│   ├── android-build.Dockerfile# Flutter + JDK 17 + Android SDK
│   └── README.md
├── tool/
│   └── docker-build.sh         # build image → docker run -v .:/workspace
└── .github/workflows/
    ├── build.yml               # Native Build — НОВЫЙ, каждый push/PR
    └── docker-build.yml        # Docker Build — НОВЫЙ, main/nightly/release
```

### Native Build — граф job'ов (`build.yml`)

```
analyze (ubuntu-latest, быстрый, без платформенных SDK)
build-web      (ubuntu-latest)
build-linux    (ubuntu-latest)
build-android  (ubuntu-latest)
build-windows  (windows-latest)
build-macos    (macos-latest)
build-ios      (macos-latest, --no-codesign)
```

Все 7 job независимы (без `needs`) — параллельны, быстрая обратная связь. `analyze` не блокирует остальные (не нужен `needs: analyze` — падение lint не должно откладывать проверку сборки платформ; GitHub Actions и так покажет job красным).

### Docker Build — поток (`docker-build-linux`, аналогично `docker-build-android`)

```
триггер: push→main | schedule(cron "0 3 * * *") | release(published)
checkout → docker/build-push-action@v6 (context: docker/, file: linux-build.Dockerfile,
           cache-from/to: type=gha, load: true, tags: vpnclient-proto-linux-build:ci)
         → docker run --rm -v $GITHUB_WORKSPACE:/workspace -w /workspace \
             vpnclient-proto-linux-build:ci bash -c "flutter pub get && flutter build linux --release"
         → upload-artifact (build/linux/x64/release/bundle, retention 90 дней)
         → если триггер == release: прикрепить .tar.gz/бандл к GitHub Release
```

Локально: `tool/docker-build.sh linux` — идентичная последовательность, без публикации.

## Interfaces

### `docker/linux-build.Dockerfile` (ключевые решения)

- База: `ubuntu:24.04` (совпадает с `ubuntu-latest`).
- `Flutter` — `flutter_linux_3.44.6-stable.tar.xz`, `flutter precache --linux` на этапе сборки образа (в слой), `flutter config --enable-linux-desktop`.
- Debian-пакеты: `clang cmake ninja-build pkg-config libgtk-3-dev liblzma-dev` — стандартный набор для Flutter Linux desktop (нет специфичных для comics-editor зависимостей типа .NET runtime).
- `WORKDIR /workspace`, без `ENTRYPOINT`/`CMD` — команда передаётся в `docker run`, как в comics-editor-build.

### `docker/android-build.Dockerfile` (ключевые решения)

- База: `ubuntu:24.04`.
- JDK — Eclipse Temurin 17 (Adoptium APT-репозиторий) — для соответствия `actions/setup-java` (`distribution: temurin`) в Native Build.
- Android SDK — `commandlinetools-linux` + `sdkmanager --install "platform-tools" "platforms;android-<X>" "build-tools;<X>.0.0"`, где `<X>` — то значение `compileSdkVersion`, которое реально генерирует Flutter Gradle Plugin 3.44.6 в `flutter.compileSdkVersion` (определяется на этапе Implementation, точным числом — версия должна быть запинена, не `latest`, по Q6 — «дефолт без ужесточения», т.е. используем именно то число, которое подставляет сам плагин, а не переопределяем его). **NDK не устанавливается** — проект чисто Dart, нативного Android-кода нет.
- `ANDROID_HOME`/`ANDROID_SDK_ROOT` — `/opt/android-sdk`.
- Сборка **`flutter build apk --release`** без каких-либо секретов: подтверждено локально (сгенерированный `android/app/build.gradle.kts`) — `buildTypes.release.signingConfig = signingConfigs.getByName("debug")` из коробки (штатный Flutter-темплейт, TODO-комментарий «Add your own signing config» не тронут) → release-сборка не требует keystore, что закрывает Q2 (unsigned) без дополнительной работы.

### `tool/docker-build.sh`

```bash
tool/docker-build.sh <linux|android> [command...]
# Без command — дефолтная verification-последовательность (та же, что в build.yml).
# С command — заменяет её (например `bash` для интерактивной отладки).
```

Аналогично comics-editor-build: `--user "$(id -u):$(id -g)"` вне CI, `--platform linux/amd64` фиксированно (совпадает с архитектурой GH-раннеров; на Apple Silicon работает через Docker Desktop VM/Rosetta — см. известные грабли ниже).

### `.github/workflows/build.yml` (Native Build)

```yaml
on:
  push:
  pull_request:
  workflow_dispatch:

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps: [checkout, subosito/flutter-action@v2 (flutter-version: 3.44.6),
            flutter pub get, flutter analyze, flutter test]

  build-web:
    runs-on: ubuntu-latest
    steps: [..., flutter build web --release, upload-artifact]

  build-linux:
    runs-on: ubuntu-latest
    steps: [..., apt-get install <toolchain>, flutter build linux --release, upload-artifact]

  build-android:
    runs-on: ubuntu-latest
    steps: [..., actions/setup-java@v4 (temurin, 17), flutter build apk --release, upload-artifact]

  build-windows:
    runs-on: windows-latest
    steps: [..., flutter build windows --release, upload-artifact]

  build-macos:
    runs-on: macos-latest
    steps: [..., flutter build macos --release, upload-artifact]

  build-ios:
    runs-on: macos-latest
    steps: [..., flutter build ios --release --no-codesign, upload-artifact]
```

`retention-days` — дефолт verification-артефактов (14, как в comics-editor-build Native Build).

### `.github/workflows/docker-build.yml` (Docker Build)

```yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: "0 3 * * *"   # nightly, 03:00 UTC — дефолт (Q4, легко поменять)
  release:
    types: [published]

jobs:
  docker-build-linux:    # без needs, параллельно docker-build-android
    runs-on: ubuntu-latest
    steps: [checkout, docker/build-push-action@v6 (cache: gha), docker run ...,
            upload-artifact (retention-days: 90),
            if: github.event_name == 'release' → softprops/action-gh-release@v2]

  docker-build-android:
    # аналогично, APK вместо Linux-бандла
```

## Behavior Specifications

### Happy Path

1. Пуш в любую ветку → Native Build запускает все 7 job параллельно → зелёные чек-марки на PR за несколько минут (без Docker-оверхеда).
2. Пуш в `main` (мёрж PR) → дополнительно Docker Build собирает Linux+Android в контейнерах, публикует артефакты с retention 90 дней.
3. Ночью по расписанию (03:00 UTC) Docker Build перепрогоняется на `main` независимо от пушей — свежая воспроизводимая сборка на случай дрейфа образа/кэша.
4. При публикации GitHub Release — Docker Build запускается и дополнительно прикрепляет `.tar.gz`(Linux)/`.apk`(Android) к самому Release.

### Edge Cases

| Case | Trigger | Expected Behavior |
|------|---------|--------------------|
| `flutter create .` перезаписывает существующий файл | Совпадение имени с уже существующим (напр. `lib/main.dart`) | Подтверждено локально: `flutter create .` не трогает уже существующие `lib/`, `pubspec.yaml`, `web/` — только добавляет отсутствующие платформенные файлы. Единственная новая коллизия — `test/widget_test.dart` (файла раньше не было) — сразу удаляется (см. Affected Systems). |
| Apple Silicon (arm64) хост, Docker-образ — Linux amd64 | Локальный `tool/docker-build.sh` без Docker-специфичных настроек | Известно из comics-editor-build: `--platform linux/amd64` работает через Docker Desktop VM-механизм, если включена настройка Rosetta (Settings → General → «Use Rosetta for x86_64/amd64 emulation»); без неё падает на qemu-user binfmt. Документируется в `docker/README.md` как пререквизит локальной проверки. |
| iOS-сборка недоступна для верификации на этой машине | Локально `flutter build ios --no-codesign` падает с «iOS 26.5 is not installed» (нет закачанного iOS platform-компонента в локальном Xcode) | Это ограничение конкретной машины разработчика, не Dockerfile/workflow; `macos-latest` GH-раннер поставляется с полным Xcode + iOS SDK — финальная верификация `build-ios` возможна только в реальном CI (аналогично comics-editor-build: «финальная приёмка ждёт реального CI-прогона»). |
| Android SDK-компонент не запинен точной версией | `sdkmanager --install ... "platforms;android-latest"` | Не допускается — версия фиксируется явным числом (то, что выдаёт `flutter.compileSdkVersion` при генерации), не `latest`, для воспроизводимости слоя. |
| l10n import обновлён в `lib/`, но `output-dir` не сгенерирован до `flutter pub get`/`flutter gen-l10n` | Свежий чекаут репозитория, `flutter_gen`-код ещё не сгенерирован | `generate: true` в `pubspec.yaml` заставляет `flutter pub get`/`flutter build`/`flutter test` генерировать l10n-код автоматически (подтверждено локально) — отдельный шаг `flutter gen-l10n` в CI не требуется. |

### Error Handling

Ошибки внутри Docker-контейнера всплывают как ненулевой exit-код `docker run` → падение CI-шага, как и в comics-editor-build. Ошибки Native Build — стандартное поведение `flutter build`/`flutter analyze`/`flutter test` (ненулевой exit → красный job).

## Dependencies

### Requires

- Docker (локально — Docker Desktop; в CI — предустановлен на `ubuntu-latest`).
- `subosito/flutter-action@v2`, `actions/setup-java@v4`, `docker/build-push-action@v6`, `softprops/action-gh-release@v2` — стандартные community-actions, тот же класс, что использовался в comics-editor-build.
- Пререквизит-фикс `l10n.yaml`/imports должен быть сделан **до** `flutter create .` и до первого CI-прогона — иначе `analyze`/`test` красные с самого начала (см. AC #0).

### Blocks

- Ничего вне этого репозитория.

## Testing Strategy

### Manual Verification

- [x] `flutter create .` в scratch-копии — не ломает `lib/`/`pubspec.yaml`/`web/`, добавляет все 5 платформ (проверено).
- [x] l10n-фикс (`synthetic-package` убран, import путь изменён) — `flutter analyze` чист от l10n-ошибок (проверено).
- [x] `flutter build web --release` — проходит после фикса (проверено).
- [x] `flutter build macos --release` — проходит нативно на этой машине (проверено).
- [ ] `flutter build linux --release` / `flutter build apk --release` — через `tool/docker-build.sh` (Docker daemon сейчас не запущен на этой машине — прогон запланирован на Implementation).
- [ ] `flutter build windows --release` — только через реальный CI (`windows-latest`), не воспроизводимо локально на macOS.
- [ ] `flutter build ios --release --no-codesign` — только через реальный CI (`macos-latest` с полным Xcode); локально падает из-за отсутствующего iOS platform-компонента (ограничение машины, не кода).
- [ ] `build.yml`/`docker-build.yml` — финальная приёмка только реальным GitHub Actions прогоном после пуша пользователем (агент git не трогает — см. Constraints).

## Open Design Questions

- [x] **Bundle/Application ID**: решено пользователем 2026-07-26 — `net.nativemind.vpn.design.prototype` (org), итоговый ID `net.nativemind.vpn.design.prototype.vpn_client`.
- [ ] **Точное число Android `compileSdkVersion`** — фиксируется по факту генерации на Implementation (не блокирует Specifications, это техническая деталь одной строки в Dockerfile).

---

## Approval

- [x] Reviewed by: Anton
- [x] Approved on: 2026-07-26
- [x] Notes: «specs approved». Bundle ID = `net.nativemind.vpn.design.prototype`.
