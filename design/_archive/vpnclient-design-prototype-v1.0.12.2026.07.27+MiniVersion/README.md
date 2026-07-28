# VPNclient App — Design Prototype (mocked)

This is a design-only prototype derived from the original VPNclient-app Flutter
codebase. Structure, file names and procedure names are unchanged; only the
calls into the real native VPN engine were replaced with mocks so the UI can
run standalone, with no real network/VPN behavior.

## What changed
- `lib/pages/main/main_btn.dart` now imports `lib/mock/vpnclient_engine_mock.dart`
  instead of `package:vpnclient_engine_flutter`. The mock class is named
  `VPNclientEngine` and exposes the same static methods used by the UI
  (`connect`, `disconnect`, `addSubscription`, `ClearSubscriptions`,
  `updateSubscription`, `pingServer`, `onPingResult`) — each just waits a
  short delay and/or emits fake data instead of doing real work.
- `pubspec.yaml` no longer depends on the `vpnclient_engine_flutter` git
  package.
- Server list, app list and ping/speed numbers are the same static/mock data
  the original screens already used or generate locally — no backend calls.
- Native platform folders (android/ios/macos/windows/linux) were not
  included — this package is meant to run via `flutter run -d chrome` (the
  `web/` folder is included) or `flutter run` after `flutter create .` to
  regenerate platform scaffolding.

## Run
```
flutter pub get
flutter run -d chrome
```
