# Implementation Plan: Flutter VPN Engine v2.0

> Version: 1.0
> Status: DRAFT
> Last Updated: 2025-12-31

## Overview

This document outlines the step-by-step implementation plan for flutter_vpn_engine v2.0. The implementation will be broken down into phases, each with specific deliverables and testing milestones.

## Implementation Strategy

**Approach:** Incremental development with continuous integration
**Timeline:** Phased rollout (no specific dates, focus on completion)
**Testing:** Test-driven development where applicable
**Platform Priority:** Mobile-first (Android, iOS), then Desktop (Linux, Windows, macOS)

---

## Phase 1: Project Foundation

### 1.1 Project Setup

**Goal:** Create the basic project structure and dependencies

**Tasks:**

1. **Initialize Flutter plugin project**
   ```bash
   flutter create --template=plugin --platforms=android,ios,linux,macos,windows flutter_vpn_engine
   ```

2. **Set up directory structure**
   ```
   flutter_vpn_engine/
   ├── lib/
   │   ├── flutter_vpn_engine.dart          # Main export
   │   └── src/
   │       ├── core/                         # Core engine
   │       │   ├── vpn_engine.dart
   │       │   ├── implementation_registry.dart
   │       │   ├── implementation_selector.dart
   │       │   └── mode_driver_selector.dart
   │       ├── config/                       # Configuration
   │       │   ├── vpn_config.dart
   │       │   ├── protocol_config.dart
   │       │   └── enums.dart
   │       ├── adapters/                     # Protocol adapters
   │       │   ├── implementation_provider.dart
   │       │   ├── protocol_adapter.dart
   │       │   ├── openvpn_adapter.dart
   │       │   ├── wireguard_adapter.dart
   │       │   ├── v2ray_adapter.dart
   │       │   └── ...
   │       ├── models/                       # Data models
   │       │   ├── vpn_status.dart
   │       │   ├── vpn_statistics.dart
   │       │   ├── device_info.dart
   │       │   ├── known_issue.dart
   │       │   └── performance_metrics.dart
   │       ├── data/                         # Databases
   │       │   └── known_issues_db.dart
   │       ├── utils/                        # Utilities
   │       │   ├── secure_storage.dart
   │       │   ├── benchmark.dart
   │       │   └── version_compare.dart
   │       ├── exceptions/                   # Exceptions
   │       │   └── vpn_exception.dart
   │       └── legacy/                       # Backward compatibility
   │           ├── legacy_api.dart
   │           ├── driver_config.dart
   │           └── core_config.dart
   ```

3. **Configure pubspec.yaml**
   - Add dependencies (openvpn_flutter, wireguard_flutter, flutter_v2ray_plus, etc.)
   - Configure platform plugins
   - Set SDK constraints

4. **Set up native code structure**
   - Android: Kotlin packages in `android/src/main/kotlin/`
   - iOS: Swift files in `ios/Classes/` and Network Extension in `ios/VpnEngineExtension/`

**Deliverables:**
- ✅ Project initialized with proper structure
- ✅ All dependencies configured
- ✅ Native code skeleton ready
- ✅ Git repository initialized with `.gitignore`

**Testing:**
- Build succeeds on all platforms: `flutter build apk`, `flutter build ios`, etc.

---

## Phase 2: Core Engine Implementation

### 2.1 Data Models and Enums

**Goal:** Implement all foundational data structures

**Tasks:**

1. **Enums** (`lib/src/config/enums.dart`)
   - `ProtocolType`
   - `VpnStatus`
   - `VpnMode`
   - `TunDriverType`
   - `SelectionStrategy`
   - `Severity`

2. **Models** (`lib/src/models/`)
   - `VpnStatistics`
   - `DeviceInfo` with platform detection
   - `KnownIssue`
   - `PerformanceMetrics`
   - `ImplementationInfo`

3. **Exceptions** (`lib/src/exceptions/vpn_exception.dart`)
   - `VpnException` base class
   - `VpnConfigException`
   - `VpnConnectionException`
   - `VpnPermissionException`
   - `VpnPlatformException`

**Deliverables:**
- ✅ All enums defined
- ✅ All models implemented with `toJson()` / `fromJson()`
- ✅ Exception hierarchy complete

**Testing:**
- Unit tests for model serialization/deserialization
- Test exception hierarchy

---

### 2.2 Configuration Classes

**Goal:** Implement VpnConfig and all ProtocolConfig classes

**Tasks:**

1. **Abstract ProtocolConfig** (`lib/src/config/protocol_config.dart`)
   - `validate()` method
   - `toJson()` method

2. **Concrete Protocol Configs:**
   - `OpenVpnConfig` with `.ovpn` file parsing
   - `WireGuardConfig` with wg-quick format parsing
   - `VMessConfig` with `vmess://` URL parsing
   - `VLessConfig` with `vless://` URL parsing (REALITY support)
   - `TrojanConfig` with `trojan://` URL parsing
   - `ShadowsocksConfig` with `ss://` URL parsing
   - `IKEv2Config`
   - `SstpConfig`
   - `GostConfig` with GOST crypto support

3. **VpnConfig** (`lib/src/config/vpn_config.dart`)
   - All fields as per specification
   - `validate()` method with comprehensive checks
   - Builder pattern for easier construction

**Deliverables:**
- ✅ All protocol configs implemented
- ✅ URL parsing for all protocols (vmess://, vless://, trojan://, ss://)
- ✅ VpnConfig with validation logic

**Testing:**
- Unit tests for each ProtocolConfig
- URL parsing tests (valid and invalid URLs)
- VpnConfig validation tests (mode/driver compatibility, etc.)

---

### 2.3 Implementation Registry and Provider

**Goal:** Implement the registry pattern for managing multiple implementations

**Tasks:**

1. **ImplementationProvider** (`lib/src/adapters/implementation_provider.dart`)
   - Abstract class with all required getters
   - `isAvailable()` platform check
   - Optional `benchmark()` method

2. **ImplementationRegistry** (`lib/src/core/implementation_registry.dart`)
   - Static registry map
   - `register()` method
   - `getImplementations()` method
   - `selectBest()` delegation to selector

3. **Concrete Implementation Providers:**
   - `XrayImplementationProvider` (versioned: 1.7.5, 1.8.0, 1.8.4)
   - `V2RayPlusImplementationProvider`
   - `SingBoxImplementationProvider`
   - `OpenVpnImplementationProvider`
   - `WireGuardImplementationProvider`
   - `IKEv2ImplementationProvider`
   - `SstpImplementationProvider`
   - `GostImplementationProvider`

**Deliverables:**
- ✅ ImplementationProvider abstract class
- ✅ ImplementationRegistry with static methods
- ✅ At least 3 concrete implementations (Xray, V2RayPlus, SingBox)

**Testing:**
- Test registration and retrieval
- Test version comparison
- Test feature detection

---

### 2.4 Implementation Selector

**Goal:** Implement smart auto-selection logic

**Tasks:**

1. **ImplementationSelector** (`lib/src/core/implementation_selector.dart`)
   - `select()` method with strategy pattern
   - `_selectManual()` for manual selection
   - `_selectAuto()` with device heuristics
   - `_selectByPriority()` using priority scores
   - `_selectByBenchmark()` with performance testing
   - `_selectByCrowd()` (stub for future analytics)

2. **Device Heuristics:**
   - Chipset detection (Snapdragon → Xray, MediaTek → V2RayPlus)
   - RAM detection (>6GB → SingBox)
   - OS version checks

3. **Known Issues Database** (`lib/src/data/known_issues_db.dart`)
   - Static database of known issues
   - `getIssues()` method
   - `hasCriticalIssues()` helper

4. **Version Comparison** (`lib/src/utils/version_compare.dart`)
   - Semantic version comparison
   - Version constraint checking

**Deliverables:**
- ✅ ImplementationSelector with all 5 strategies
- ✅ Known issues database populated
- ✅ Device heuristics implemented

**Testing:**
- Test each selection strategy
- Test known issues filtering
- Test version comparison logic
- Mock DeviceInfo for different scenarios

---

### 2.5 Mode and Driver Selector

**Goal:** Implement VPN mode and TUN driver selection

**Tasks:**

1. **ModeDriverSelector** (`lib/src/core/mode_driver_selector.dart`)
   - `selectMode()` with auto-detection
   - `selectTunDriver()` based on mode and platform
   - Platform-specific logic (Android SDK version, iOS always VPN)

2. **Validation:**
   - Ensure Proxy mode → TunDriverType.none
   - Ensure SingBox → TunDriverType.direct
   - Platform capability checks

**Deliverables:**
- ✅ ModeDriverSelector implemented
- ✅ Mode/driver validation logic

**Testing:**
- Test mode auto-selection for each platform
- Test TUN driver selection for different implementations
- Test validation logic (incompatible combinations)

---

### 2.6 VpnEngine Singleton

**Goal:** Implement the main VpnEngine API

**Tasks:**

1. **VpnEngine** (`lib/src/core/vpn_engine.dart`)
   - Singleton pattern
   - `initialize()` method (register all implementations)
   - `connect()` method with configuration
   - `disconnect()` method
   - `reconnect()` method
   - Status and statistics streams
   - `getImplementations()` method

2. **Connection Lifecycle:**
   - State management (disconnected → connecting → connected)
   - Error handling and recovery
   - Auto-reconnect logic

3. **Event Streams:**
   - `statusStream` with `StreamController`
   - `statisticsStream` with periodic updates

**Deliverables:**
- ✅ VpnEngine singleton fully implemented
- ✅ Connection lifecycle managed
- ✅ Event streams working

**Testing:**
- Unit tests for lifecycle transitions
- Integration tests with mock adapters
- Test auto-reconnect logic

---

## Phase 3: Protocol Adapters

### 3.1 Abstract Protocol Adapter

**Goal:** Define the adapter interface

**Tasks:**

1. **ProtocolAdapter** (`lib/src/adapters/protocol_adapter.dart`)
   - Abstract class with required methods
   - `connect()`, `disconnect()`
   - Status and statistics streams
   - `dispose()` method

**Deliverables:**
- ✅ ProtocolAdapter abstract class

---

### 3.2 OpenVPN Adapter

**Goal:** Integrate openvpn_flutter package

**Tasks:**

1. **OpenVpnAdapter** (`lib/src/adapters/openvpn_adapter.dart`)
   - Wrap `OpenVpnFlutter` plugin
   - Parse `.ovpn` files
   - Handle username/password authentication
   - Map status events to VpnStatus enum

2. **Testing:**
   - Test with sample `.ovpn` file
   - Test authentication
   - Test disconnect

**Deliverables:**
- ✅ OpenVpnAdapter implemented
- ✅ Works on Android and iOS

---

### 3.3 WireGuard Adapter

**Goal:** Integrate wireguard_flutter package

**Tasks:**

1. **WireGuardAdapter** (`lib/src/adapters/wireguard_adapter.dart`)
   - Wrap `WireGuardFlutter` plugin
   - Parse wg-quick config format
   - Support manual config building
   - Handle statistics (bytes sent/received)

2. **Testing:**
   - Test with sample wg-quick config
   - Test on multiple platforms (5 platforms supported)

**Deliverables:**
- ✅ WireGuardAdapter implemented
- ✅ Works on Android, iOS, Linux, macOS, Windows

---

### 3.4 V2Ray/Xray Adapter

**Goal:** Integrate flutter_v2ray_plus package

**Tasks:**

1. **V2RayAdapter** (`lib/src/adapters/v2ray_adapter.dart`)
   - Wrap `FlutterV2rayPlus` plugin
   - Build V2Ray JSON config from protocol configs
   - Support VMess, VLess, Trojan, Shadowsocks, SOCKS
   - Handle TUN driver selection (HevSocks5, Tun2Socks)

2. **Config Builders:**
   - `_buildVMessConfig()` from VMessConfig
   - `_buildVLessConfig()` from VLessConfig (REALITY support)
   - `_buildTrojanConfig()` from TrojanConfig
   - `_buildShadowsocksConfig()` from ShadowsocksConfig

3. **Testing:**
   - Test each protocol type
   - Test REALITY config (VLess 1.8+)
   - Test different TUN drivers

**Deliverables:**
- ✅ V2RayAdapter implemented
- ✅ All V2Ray protocols supported
- ✅ REALITY support for VLess

---

### 3.5 Other Adapters

**Goal:** Implement remaining protocol adapters

**Tasks:**

1. **IKEv2Adapter** (`lib/src/adapters/ikev2_adapter.dart`)
   - Wrap `flutter_vpn` package
   - Support username/password and certificate auth

2. **SstpAdapter** (`lib/src/adapters/sstp_adapter.dart`)
   - Wrap `sstp_flutter` package
   - Windows support

3. **GostAdapter** (`lib/src/adapters/gost_adapter.dart`)
   - Integrate existing `flutter_vpn_gost` implementation
   - Support GOST crypto primitives

**Deliverables:**
- ✅ All adapters implemented

---

## Phase 4: Platform Integration

### 4.1 Android Integration

**Goal:** Implement Android VPNService bridge

**Tasks:**

1. **VpnServiceBridge.kt** (`android/src/main/kotlin/`)
   - Method channel handler
   - Delegate to appropriate adapters
   - Permission handling (VPN permission)

2. **AndroidManifest.xml:**
   - Add VPN permission
   - Declare VPNService

3. **Build.gradle:**
   - Add dependencies for native libraries

**Deliverables:**
- ✅ Android native bridge working
- ✅ All protocol adapters functional on Android

**Testing:**
- Test on Android 8, 10, 12+ devices
- Test permission flow

---

### 4.2 iOS Integration

**Goal:** Implement iOS Network Extension

**Tasks:**

1. **VpnEnginePlugin.swift** (`ios/Classes/`)
   - Method channel handler
   - NEVPNManager integration
   - Start/stop tunnel

2. **PacketTunnelProvider.swift** (`ios/VpnEngineExtension/`)
   - Inherit from NEPacketTunnelProvider
   - `startTunnel()` override with protocol switching
   - `stopTunnel()` override
   - Protocol-specific methods (OpenVPN, WireGuard, V2Ray, GOST)

3. **Podfile:**
   - Add CocoaPods dependencies (OpenVPNAdapter, WireGuardKit)

4. **Entitlements:**
   - Runner.entitlements (main app)
   - VpnEngineExtension.entitlements (extension)
   - App Groups for IPC

5. **IOS_SETUP.md:**
   - Detailed setup guide for developers

**Deliverables:**
- ✅ iOS Network Extension working
- ✅ All protocol adapters functional on iOS
- ✅ Setup documentation complete

**Testing:**
- Test on physical iOS device (simulator doesn't support VPN)
- Test all protocols
- Verify entitlements and provisioning

---

### 4.3 Desktop Integration

**Goal:** Implement Linux, macOS, Windows support

**Tasks:**

1. **Linux:**
   - TUN device access (`/dev/net/tun`)
   - WireGuard support via wireguard-go

2. **macOS:**
   - Similar to iOS but without Network Extension requirement
   - Native VPN APIs

3. **Windows:**
   - WireGuard support
   - SSTP support (native protocol)

**Deliverables:**
- ✅ Desktop platforms supported (at least WireGuard)

**Testing:**
- Test on Ubuntu 22.04, macOS 13+, Windows 11

---

## Phase 5: Advanced Features

### 5.1 Benchmarking

**Goal:** Implement performance benchmarking

**Tasks:**

1. **VpnBenchmark** (`lib/src/utils/benchmark.dart`)
   - Measure connection time
   - Measure throughput (download test file)
   - Measure latency (ping test)
   - Measure CPU and memory usage

**Deliverables:**
- ✅ Benchmark utility implemented
- ✅ SelectionStrategy.byBenchmark functional

**Testing:**
- Run benchmarks on different implementations
- Verify metrics accuracy

---

### 5.2 Security Features

**Goal:** Implement security best practices

**Tasks:**

1. **Certificate Validation:**
   - Enforce by default
   - `allowInsecure` only in debug mode

2. **Secure Credential Storage** (`lib/src/utils/secure_storage.dart`)
   - Use `flutter_secure_storage` for passwords
   - Never log credentials

3. **DNS Leak Prevention:**
   - Default DNS servers (1.1.1.1, 1.0.0.1)
   - Force DNS through VPN tunnel

**Deliverables:**
- ✅ Security features implemented

**Testing:**
- Test certificate validation (reject self-signed in production)
- Test DNS leak prevention

---

### 5.3 Legacy API Wrapper

**Goal:** Provide backward compatibility

**Tasks:**

1. **Legacy Classes** (`lib/src/legacy/`)
   - `DriverType` enum (deprecated)
   - `CoreType` enum (deprecated)
   - `DriverConfig` class (deprecated)
   - `VpnClientEngine` wrapper class

2. **Conversion Logic:**
   - Convert old DriverConfig to new VpnConfig
   - Map old enums to new enums

**Deliverables:**
- ✅ Legacy API working
- ✅ Deprecation warnings visible

**Testing:**
- Test migration from v1.x configs
- Verify deprecation warnings

---

## Phase 6: Documentation and Examples

### 6.1 API Documentation

**Goal:** Complete Dartdoc comments for all public APIs

**Tasks:**

1. **Core Classes:**
   - VpnEngine with usage examples
   - VpnConfig with all parameters explained
   - All ProtocolConfig classes

2. **Generate Dartdoc:**
   ```bash
   dart doc .
   ```

**Deliverables:**
- ✅ All public APIs documented
- ✅ Dartdoc HTML generated

---

### 6.2 README and Guides

**Goal:** Write comprehensive documentation

**Tasks:**

1. **README.md:**
   - Quick start guide
   - Installation instructions
   - Basic usage examples
   - Platform requirements

2. **IOS_SETUP.md:**
   - iOS-specific setup (Network Extension, entitlements, provisioning)

3. **MIGRATION.md:**
   - Migration guide from v1.x to v2.0
   - Breaking changes
   - Code examples (before/after)

4. **EXAMPLES.md:**
   - Usage examples for each protocol
   - Advanced configuration examples
   - Multi-implementation selection examples

**Deliverables:**
- ✅ All documentation files complete

---

### 6.3 Example App

**Goal:** Create a comprehensive example application

**Tasks:**

1. **Example App Features:**
   - Protocol selector (dropdown)
   - Config input (text field or file picker)
   - Implementation selector (manual override)
   - Connect/disconnect button
   - Status display
   - Statistics display (bytes, latency)

2. **Example Configs:**
   - Sample `.ovpn` file
   - Sample WireGuard config
   - Sample VMess URL
   - Sample VLess URL with REALITY

**Deliverables:**
- ✅ Fully functional example app
- ✅ Sample configs included

---

## Phase 7: Testing

### 7.1 Unit Tests

**Goal:** Achieve >80% code coverage

**Tasks:**

1. **Test Core Components:**
   - VpnEngine
   - ImplementationRegistry
   - ImplementationSelector
   - ModeDriverSelector

2. **Test Configs:**
   - All ProtocolConfig classes
   - VpnConfig validation

3. **Test Models:**
   - Serialization/deserialization
   - Version comparison

**Deliverables:**
- ✅ Unit test suite with >80% coverage

**Run:**
```bash
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
```

---

### 7.2 Integration Tests

**Goal:** Test end-to-end flows

**Tasks:**

1. **Connection Tests:**
   - Test connect/disconnect for each protocol
   - Test auto-reconnect
   - Test fallback chain

2. **Platform Tests:**
   - Test on Android
   - Test on iOS (physical device)
   - Test on Linux (optional)

**Deliverables:**
- ✅ Integration test suite passing

**Run:**
```bash
flutter test integration_test/
```

---

### 7.3 Manual Testing

**Goal:** Real-world testing with actual VPN servers

**Tasks:**

1. **Test Matrix:**
   | Protocol | Android | iOS | Linux | Windows | macOS |
   |----------|---------|-----|-------|---------|-------|
   | OpenVPN  | ✅      | ✅  | ⚠️    | ⚠️      | ⚠️    |
   | WireGuard| ✅      | ✅  | ✅    | ✅      | ✅    |
   | VMess    | ✅      | ✅  | ❌    | ❌      | ❌    |
   | VLess    | ✅      | ✅  | ❌    | ❌      | ❌    |
   | Trojan   | ✅      | ✅  | ❌    | ❌      | ❌    |
   | IKEv2    | ✅      | ✅  | ✅    | ✅      | ✅    |
   | SSTP     | ❌      | ❌  | ❌    | ✅      | ❌    |
   | GOST     | ✅      | ✅  | ⚠️    | ⚠️      | ⚠️    |

2. **Test Scenarios:**
   - Connect and browse websites
   - Test streaming video (throughput)
   - Test latency with ping
   - Test battery drain (mobile)
   - Test auto-reconnect on network change

**Deliverables:**
- ✅ Test report with results for each platform/protocol

---

## Phase 8: Release

### 8.1 Pre-Release Checklist

**Tasks:**

- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Manual testing complete on primary platforms (Android, iOS)
- [ ] Documentation complete (README, MIGRATION, API docs)
- [ ] Example app working
- [ ] Known issues database populated
- [ ] CHANGELOG.md updated
- [ ] Version bumped to 2.0.0 in pubspec.yaml

---

### 8.2 Publish to pub.dev

**Tasks:**

1. **Dry Run:**
   ```bash
   flutter pub publish --dry-run
   ```

2. **Publish:**
   ```bash
   flutter pub publish
   ```

3. **Verify:**
   - Check package page on pub.dev
   - Verify documentation rendering
   - Check example tab

**Deliverables:**
- ✅ Package published to pub.dev

---

### 8.3 Post-Release

**Tasks:**

1. **Announce:**
   - Post on Flutter Community
   - Update existing vpn.nativemind.net project to use v2.0

2. **Monitor:**
   - Watch for bug reports
   - Monitor pub.dev analytics

3. **Iterate:**
   - Address critical bugs in patch releases
   - Plan v2.1 with additional features (crowd analytics, etc.)

---

## Implementation Order Summary

**Priority 1 (MVP - Mobile-first):**
1. ✅ Phase 1: Project Foundation
2. ✅ Phase 2: Core Engine Implementation (2.1 - 2.6)
3. ✅ Phase 3: Protocol Adapters (3.1 - 3.4) - Focus on OpenVPN, WireGuard, V2Ray/Xray
4. ✅ Phase 4: Platform Integration (4.1 - 4.2) - Android and iOS only
5. ✅ Phase 6: Documentation (6.1 - 6.3) - Basic docs
7. ✅ Phase 7: Testing (7.1 - 7.2)

**Priority 2 (Post-MVP):**
6. Phase 4.3: Desktop Integration
8. Phase 3.5: Other Adapters (IKEv2, SSTP, GOST)
9. Phase 5: Advanced Features (Benchmarking, Security, Legacy API)

**Priority 3 (Polish):**
10. Phase 8: Release

---

## Risk Mitigation

### Risk 1: iOS Network Extension Complexity

**Risk:** iOS Network Extension setup is complex and error-prone

**Mitigation:**
- Create detailed IOS_SETUP.md guide
- Provide example project with working entitlements
- Test early on physical iOS device

### Risk 2: Platform Fragmentation

**Risk:** Different behavior on different Android/iOS versions

**Mitigation:**
- Test on multiple OS versions (Android 8, 10, 12+; iOS 13, 15, 17)
- Use known issues database to track version-specific bugs
- Implement version detection and fallbacks

### Risk 3: Third-Party Package Dependencies

**Risk:** Depending on third-party packages that may become unmaintained

**Mitigation:**
- Choose packages with good maintenance history
- Fork packages if necessary
- Design adapter pattern to allow easy swapping

### Risk 4: Performance Bottlenecks

**Risk:** Auto-selection logic or benchmarking may be slow

**Mitigation:**
- Implement caching for device info
- Make benchmarking optional (only for SelectionStrategy.byBenchmark)
- Profile and optimize hot paths

---

## Success Criteria

### MVP Success Criteria:

- [ ] VpnEngine API works on Android and iOS
- [ ] OpenVPN, WireGuard, and VMess/VLess protocols functional
- [ ] Auto-selection picks appropriate implementation
- [ ] Mode selection (VPN vs Proxy) works
- [ ] Example app demonstrates all features
- [ ] Documentation is clear and complete
- [ ] Unit test coverage >80%
- [ ] No critical bugs on Android 10+ and iOS 15+

### Post-MVP Success Criteria:

- [ ] Desktop platforms supported (at least WireGuard)
- [ ] All 8 protocols working
- [ ] Benchmarking system functional
- [ ] Legacy API provides smooth migration path
- [ ] Published to pub.dev with good score (130+)

---

## Next Steps

Once this plan is approved:

1. **Start with Phase 1:** Initialize project structure
2. **Implement Phase 2.1-2.2:** Data models and configs (foundation)
3. **Build incrementally:** Each phase builds on previous
4. **Test continuously:** Write tests alongside implementation
5. **Iterate:** Adjust plan based on discoveries during implementation

---

## Approval

- [ ] Reviewed by: Anton
- [ ] Approved on: [pending]
- [ ] Notes: [pending]
