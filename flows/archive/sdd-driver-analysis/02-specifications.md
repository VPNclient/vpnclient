# Specifications: Flutter VPN Engine v2.0

> Version: 1.0
> Status: DRAFT
> Last Updated: 2025-12-31

## Executive Summary

This specification defines the technical design for **flutter_vpn_engine v2.0**, a unified VPN interface that wraps existing Flutter packages to support multiple VPN protocols across all platforms. The design follows a **non-reinventing-the-wheel** strategy by integrating battle-tested open-source libraries.

## Goals

1. **Unified API**: Single interface for all VPN protocols
2. **Multi-Protocol Support**: OpenVPN, WireGuard, V2Ray/Xray, IKEv2, SSTP, GOST
3. **Cross-Platform**: Android, iOS, Linux, Windows, macOS
4. **Multi-Implementation**: Support multiple implementations per protocol with auto-selection
5. **Version Management**: Handle different core versions (e.g., Xray 1.7.5 vs 1.8.4)
6. **TUN Driver Selection**: Support different TUN drivers and proxy-only mode
7. **Backward Compatibility**: Migration path for existing flutter_vpn_engine users

---

## Architecture Overview

### High-Level Design

```
┌────────────────────────────────────────────────────────┐
│                   Flutter App                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │           VpnEngine (Singleton)                  │  │
│  │  • initialize()                                  │  │
│  │  • connect(VpnConfig)                           │  │
│  │  • disconnect()                                  │  │
│  │  • statusStream                                  │  │
│  └────────────────────┬─────────────────────────────┘  │
│                       │                                │
│  ┌────────────────────▼─────────────────────────────┐  │
│  │       ImplementationRegistry                     │  │
│  │  • register(protocol, provider)                  │  │
│  │  • getImplementations(protocol)                  │  │
│  │  • selectBest(protocol, config, deviceInfo)     │  │
│  └────────────────────┬─────────────────────────────┘  │
│                       │                                │
│         ┌─────────────┴─────────────┐                  │
│         ▼                           ▼                  │
│  ┌─────────────┐            ┌─────────────┐            │
│  │   Protocol  │            │     Mode    │            │
│  │  Adapters   │            │  Selector   │            │
│  └──────┬──────┘            └──────┬──────┘            │
│         │                          │                   │
└─────────┼──────────────────────────┼───────────────────┘
          │                          │
    ┌─────┴─────┐              ┌─────▼─────┐
    ▼           ▼              ▼           ▼
┌────────┐ ┌────────┐    ┌─────────┐ ┌─────────┐
│OpenVPN │ │WireGd  │    │VPN Mode │ │Proxy    │
│Adapter │ │Adapter │    │+ TUN    │ │Mode     │
└────────┘ └────────┘    └─────────┘ └─────────┘
    │           │              │           │
    ▼           ▼              ▼           ▼
┌────────────────────────────────────────────┐
│      Platform-Specific Implementations     │
│  • openvpn_flutter (Android, iOS)         │
│  • wireguard_flutter (5 platforms)        │
│  • flutter_v2ray_plus (Android, iOS)      │
│  • flutter_vpn (IKEv2 - multi-platform)   │
└────────────────────────────────────────────┘
```

---

## Core Components

### 1. VpnEngine (Singleton)

**File:** `lib/src/core/vpn_engine.dart`

**Responsibilities:**
- Singleton instance management
- Connection lifecycle (connect, disconnect, reconnect)
- Status management and event streaming
- Configuration validation
- Implementation selection delegation

**API Specification:**

```dart
class VpnEngine {
  // Singleton
  static VpnEngine get instance => _instance;
  static final VpnEngine _instance = VpnEngine._internal();

  VpnEngine._internal();

  /// Initialize the engine (call once at app startup)
  ///
  /// This registers all available implementations and
  /// performs platform-specific setup.
  Future<void> initialize() async;

  /// Connect to VPN with the given configuration
  ///
  /// Throws [VpnException] if:
  /// - No compatible implementation found
  /// - Connection fails
  /// - Invalid configuration
  Future<void> connect(VpnConfig config) async;

  /// Disconnect from VPN
  Future<void> disconnect() async;

  /// Reconnect using last configuration
  Future<void> reconnect() async;

  /// Current VPN status
  VpnStatus get status;

  /// Status change stream
  Stream<VpnStatus> get statusStream;

  /// Statistics stream (bytes sent/received, latency)
  Stream<VpnStatistics> get statisticsStream;

  /// List of supported protocols on this platform
  List<ProtocolType> get supportedProtocols;

  /// Get all available implementations for a protocol
  List<ImplementationInfo> getImplementations(ProtocolType protocol);

  /// Dispose resources
  Future<void> dispose() async;
}
```

**Status Enum:**

```dart
enum VpnStatus {
  disconnected,
  connecting,
  connected,
  reconnecting,
  disconnecting,
  error,
}

class VpnStatistics {
  final int bytesSent;
  final int bytesReceived;
  final int latencyMs;
  final DateTime timestamp;

  const VpnStatistics({
    required this.bytesSent,
    required this.bytesReceived,
    required this.latencyMs,
    required this.timestamp,
  });
}
```

---

### 2. VpnConfig (Configuration)

**File:** `lib/src/config/vpn_config.dart`

**Multi-Dimensional Configuration:**

```dart
class VpnConfig {
  // ===== Protocol Selection =====

  /// Target protocol
  final ProtocolType protocol;

  /// Protocol-specific configuration
  final ProtocolConfig protocolConfig;

  // ===== Implementation Selection =====

  /// Selection strategy (auto, manual, benchmark, etc.)
  final SelectionStrategy selectionStrategy;

  /// Preferred implementation base name ("xray", "singbox", "v2ray_plus")
  final String? preferredBaseName;

  /// Preferred core version ("1.8.4")
  final String? preferredCoreVersion;

  /// Full implementation ID ("xray_1.8.4")
  final String? preferredImplementation;

  /// Required features for auto-selection (e.g., {'reality', 'vision'})
  final Set<String> requiredFeatures;

  /// Version constraints
  final String? minimumCoreVersion;  // ">= 1.8.0"
  final String? maximumCoreVersion;  // "< 2.0.0"

  /// Fallback chain
  final List<String>? fallbackChain;

  // ===== Mode Selection =====

  /// VPN mode: system-wide VPN, app-only proxy, or auto
  final VpnMode mode;

  /// TUN driver type
  final TunDriverType tunDriver;

  /// TUN driver selection strategy
  final SelectionStrategy tunDriverStrategy;

  // ===== Network Settings =====

  /// DNS servers (optional, protocol-specific default if null)
  final List<String>? dnsServers;

  /// Routes to include (default: all traffic)
  final List<String>? includedRoutes;

  /// Routes to exclude (split tunneling)
  final List<String>? excludedRoutes;

  /// MTU (default: 1500)
  final int? mtu;

  /// IPv6 support
  final bool enableIpv6;

  // ===== Advanced Options =====

  /// Auto-reconnect on failure
  final bool autoReconnect;

  /// Connection timeout (seconds)
  final int connectionTimeout;

  /// Allow insecure connections (development only)
  final bool allowInsecure;

  VpnConfig({
    required this.protocol,
    required this.protocolConfig,
    this.selectionStrategy = SelectionStrategy.auto,
    this.preferredBaseName,
    this.preferredCoreVersion,
    this.preferredImplementation,
    this.requiredFeatures = const {},
    this.minimumCoreVersion,
    this.maximumCoreVersion,
    this.fallbackChain,
    this.mode = VpnMode.auto,
    this.tunDriver = TunDriverType.auto,
    this.tunDriverStrategy = SelectionStrategy.auto,
    this.dnsServers,
    this.includedRoutes,
    this.excludedRoutes,
    this.mtu = 1500,
    this.enableIpv6 = true,
    this.autoReconnect = true,
    this.connectionTimeout = 30,
    this.allowInsecure = false,
  });

  /// Validate configuration consistency
  void validate() {
    // Mode-Driver compatibility
    if (mode == VpnMode.proxy && tunDriver != TunDriverType.none) {
      throw VpnConfigException(
        'TUN driver must be "none" in Proxy mode',
      );
    }

    // Feature requirements
    if (requiredFeatures.isNotEmpty && selectionStrategy == SelectionStrategy.manual) {
      // Warn: manual selection may not support required features
    }

    // Version constraints
    if (minimumCoreVersion != null && maximumCoreVersion != null) {
      // Validate version range
    }

    // Protocol-specific validation
    protocolConfig.validate();
  }
}
```

**Enums:**

```dart
enum ProtocolType {
  openVpn,
  wireGuard,
  vmess,
  vless,
  trojan,
  shadowsocks,
  ikev2,
  sstp,
  gost,
  // Legacy (backward compatibility)
  singbox,
  libxray,
}

enum SelectionStrategy {
  auto,          // Automatic based on heuristics
  byPriority,    // Use priority scores
  byBenchmark,   // Run benchmarks
  manual,        // User-specified
  crowd,         // Crowd-sourced analytics
}

enum VpnMode {
  vpn,    // System-wide VPN
  proxy,  // App-only proxy (no TUN)
  auto,   // Auto-select based on platform/permissions
}

enum TunDriverType {
  hevSocks5,  // HevSocks5 Tunnel
  tun2socks,  // Generic Tun2Socks
  direct,     // Direct TUN (SingBox)
  auto,       // Auto-select
  none,       // No TUN (proxy mode)
}
```

---

### 3. ProtocolConfig (Abstract)

**File:** `lib/src/config/protocol_config.dart`

Each protocol has a specific configuration class:

```dart
abstract class ProtocolConfig {
  void validate();
  Map<String, dynamic> toJson();
}

// ===== OpenVPN =====

class OpenVpnConfig extends ProtocolConfig {
  final String ovpnFileContent;  // .ovpn file content
  final String? username;
  final String? password;

  OpenVpnConfig({
    required this.ovpnFileContent,
    this.username,
    this.password,
  });

  factory OpenVpnConfig.fromFile(String filePath) {
    // Read .ovpn file
  }

  @override
  void validate() {
    if (ovpnFileContent.isEmpty) {
      throw VpnConfigException('OpenVPN config cannot be empty');
    }
  }

  @override
  Map<String, dynamic> toJson() => {
    'ovpnFileContent': ovpnFileContent,
    'username': username,
    'password': password,
  };
}

// ===== WireGuard =====

class WireGuardConfig extends ProtocolConfig {
  final String wgQuickConfig;  // WireGuard config format

  WireGuardConfig({required this.wgQuickConfig});

  factory WireGuardConfig.fromFile(String filePath) {
    // Read WireGuard config
  }

  factory WireGuardConfig.manual({
    required String privateKey,
    required String address,
    required String dns,
    required String publicKey,
    required String endpoint,
    required String allowedIps,
  }) {
    // Generate wg-quick format
  }

  @override
  void validate() {
    // Validate WireGuard config format
  }

  @override
  Map<String, dynamic> toJson() => {
    'wgQuickConfig': wgQuickConfig,
  };
}

// ===== V2Ray/Xray (VMess) =====

class VMessConfig extends ProtocolConfig {
  final String address;
  final int port;
  final String id;  // UUID
  final int alterId;
  final String security;  // "auto", "aes-128-gcm", "chacha20-poly1305", "none"
  final String network;   // "tcp", "kcp", "ws", "http", "quic", "grpc"
  final Map<String, dynamic>? networkSettings;  // WebSocket/gRPC/etc. settings
  final Map<String, dynamic>? tlsSettings;      // TLS/XTLS settings

  VMessConfig({
    required this.address,
    required this.port,
    required this.id,
    this.alterId = 0,
    this.security = 'auto',
    this.network = 'tcp',
    this.networkSettings,
    this.tlsSettings,
  });

  factory VMessConfig.fromUrl(String vmessUrl) {
    // Parse vmess:// URL
  }

  @override
  void validate() {
    // Validate UUID format, port range, etc.
  }

  @override
  Map<String, dynamic> toJson() => {
    'address': address,
    'port': port,
    'id': id,
    'alterId': alterId,
    'security': security,
    'network': network,
    'networkSettings': networkSettings,
    'tlsSettings': tlsSettings,
  };
}

// ===== VLess =====

class VLessConfig extends ProtocolConfig {
  final String address;
  final int port;
  final String id;  // UUID
  final String encryption;  // "none"
  final String flow;        // "", "xtls-rprx-vision", etc.
  final String network;
  final Map<String, dynamic>? networkSettings;
  final Map<String, dynamic>? tlsSettings;    // TLS settings
  final Map<String, dynamic>? realitySettings; // REALITY settings

  VLessConfig({
    required this.address,
    required this.port,
    required this.id,
    this.encryption = 'none',
    this.flow = '',
    this.network = 'tcp',
    this.networkSettings,
    this.tlsSettings,
    this.realitySettings,
  });

  factory VLessConfig.fromUrl(String vlessUrl) {
    // Parse vless:// URL
  }

  @override
  void validate() {
    // REALITY requires Xray 1.8+
    if (realitySettings != null) {
      // Will be checked by ImplementationSelector
    }
  }

  @override
  Map<String, dynamic> toJson() => {
    'address': address,
    'port': port,
    'id': id,
    'encryption': encryption,
    'flow': flow,
    'network': network,
    'networkSettings': networkSettings,
    'tlsSettings': tlsSettings,
    'realitySettings': realitySettings,
  };
}

// ===== Trojan =====

class TrojanConfig extends ProtocolConfig {
  final String address;
  final int port;
  final String password;
  final String sni;  // Server Name Indication
  final bool allowInsecure;

  TrojanConfig({
    required this.address,
    required this.port,
    required this.password,
    required this.sni,
    this.allowInsecure = false,
  });

  factory TrojanConfig.fromUrl(String trojanUrl) {
    // Parse trojan:// URL
  }

  @override
  void validate() {
    // Validate password, SNI, etc.
  }

  @override
  Map<String, dynamic> toJson() => {
    'address': address,
    'port': port,
    'password': password,
    'sni': sni,
    'allowInsecure': allowInsecure,
  };
}

// ===== Shadowsocks =====

class ShadowsocksConfig extends ProtocolConfig {
  final String address;
  final int port;
  final String password;
  final String method;  // "aes-256-gcm", "chacha20-ietf-poly1305", etc.

  ShadowsocksConfig({
    required this.address,
    required this.port,
    required this.password,
    required this.method,
  });

  factory ShadowsocksConfig.fromUrl(String ssUrl) {
    // Parse ss:// URL
  }

  @override
  void validate() {
    // Validate method, password, etc.
  }

  @override
  Map<String, dynamic> toJson() => {
    'address': address,
    'port': port,
    'password': password,
    'method': method,
  };
}

// ===== IKEv2/IPsec =====

class IKEv2Config extends ProtocolConfig {
  final String address;
  final String username;
  final String password;
  final String? remoteId;
  final String? certificateContent;  // PEM format

  IKEv2Config({
    required this.address,
    required this.username,
    required this.password,
    this.remoteId,
    this.certificateContent,
  });

  @override
  void validate() {
    // Validate credentials
  }

  @override
  Map<String, dynamic> toJson() => {
    'address': address,
    'username': username,
    'password': password,
    'remoteId': remoteId,
    'certificateContent': certificateContent,
  };
}

// ===== SSTP =====

class SstpConfig extends ProtocolConfig {
  final String address;
  final int port;
  final String username;
  final String password;
  final bool verifyCertificate;

  SstpConfig({
    required this.address,
    this.port = 443,
    required this.username,
    required this.password,
    this.verifyCertificate = true,
  });

  @override
  void validate() {
    // Validate credentials
  }

  @override
  Map<String, dynamic> toJson() => {
    'address': address,
    'port': port,
    'username': username,
    'password': password,
    'verifyCertificate': verifyCertificate,
  };
}

// ===== GOST =====

class GostConfig extends ProtocolConfig {
  final String address;
  final int port;
  final String? username;
  final String? password;
  final String protocol;  // "socks5", "http", "ss", etc.
  final GostCryptoConfig? crypto;  // GOST crypto settings

  GostConfig({
    required this.address,
    required this.port,
    this.username,
    this.password,
    required this.protocol,
    this.crypto,
  });

  @override
  void validate() {
    // Validate GOST-specific settings
  }

  @override
  Map<String, dynamic> toJson() => {
    'address': address,
    'port': port,
    'username': username,
    'password': password,
    'protocol': protocol,
    'crypto': crypto?.toJson(),
  };
}

class GostCryptoConfig {
  final String algorithm;  // "GOST28147", "GOST_R_34_10_2012", etc.
  final Map<String, dynamic> parameters;

  GostCryptoConfig({
    required this.algorithm,
    required this.parameters,
  });

  Map<String, dynamic> toJson() => {
    'algorithm': algorithm,
    'parameters': parameters,
  };
}
```

---

### 4. ImplementationRegistry

**File:** `lib/src/core/implementation_registry.dart`

**Responsibilities:**
- Register available implementations
- Query implementations by protocol
- Select best implementation based on criteria

```dart
class ImplementationRegistry {
  static final Map<ProtocolType, List<ImplementationProvider>> _implementations = {};

  /// Register an implementation for a protocol
  static void register(ProtocolType protocol, ImplementationProvider provider) {
    _implementations.putIfAbsent(protocol, () => []).add(provider);
  }

  /// Get all implementations for a protocol
  static List<ImplementationProvider> getImplementations(ProtocolType protocol) {
    return _implementations[protocol] ?? [];
  }

  /// Select best implementation based on config and device info
  static Future<ImplementationProvider?> selectBest(
    ProtocolType protocol,
    VpnConfig config,
    DeviceInfo deviceInfo,
  ) async {
    final selector = ImplementationSelector();
    return await selector.select(protocol, config, deviceInfo);
  }

  /// Clear all registrations (for testing)
  static void clear() {
    _implementations.clear();
  }
}
```

---

### 5. ImplementationProvider (Abstract)

**File:** `lib/src/adapters/implementation_provider.dart`

```dart
abstract class ImplementationProvider {
  /// Unique implementation ID (e.g., "xray_1.8.4")
  String get implementationId;

  /// Display name for UI (e.g., "Xray Core v1.8.4")
  String get displayName;

  /// Base name without version (e.g., "xray")
  String get baseName;

  /// Core version (e.g., "1.8.4")
  String get coreVersion;

  /// Priority score (higher = preferred)
  int get priority;

  /// Supported features (e.g., {'reality', 'vision', 'xudp'})
  Set<String> get supportedFeatures;

  /// Known issues for this implementation
  List<KnownIssue> get knownIssues;

  /// Supported VPN modes
  Set<VpnMode> get supportedModes;

  /// Supported TUN drivers
  Set<TunDriverType> get supportedTunDrivers;

  /// Check if this implementation is available on current platform
  Future<bool> isAvailable();

  /// Optional: Run benchmark (for SelectionStrategy.byBenchmark)
  Future<PerformanceMetrics>? benchmark();

  /// Create a protocol adapter instance
  ProtocolAdapter createAdapter();
}

class KnownIssue {
  final String description;
  final Severity severity;
  final List<String> affectedPlatforms;  // ['android', 'ios', ...]
  final String? workaround;

  const KnownIssue({
    required this.description,
    required this.severity,
    required this.affectedPlatforms,
    this.workaround,
  });
}

enum Severity {
  low,
  medium,
  high,
  critical,
}

class PerformanceMetrics {
  final double throughputMbps;
  final int latencyMs;
  final double cpuUsagePercent;
  final int memoryUsageMb;

  const PerformanceMetrics({
    required this.throughputMbps,
    required this.latencyMs,
    required this.cpuUsagePercent,
    required this.memoryUsageMb,
  });
}
```

---

### 6. ProtocolAdapter (Abstract)

**File:** `lib/src/adapters/protocol_adapter.dart`

```dart
abstract class ProtocolAdapter {
  /// Connect to VPN
  Future<void> connect(VpnConfig config);

  /// Disconnect from VPN
  Future<void> disconnect();

  /// Current status
  VpnStatus get status;

  /// Status stream
  Stream<VpnStatus> get statusStream;

  /// Statistics stream
  Stream<VpnStatistics> get statisticsStream;

  /// Dispose resources
  Future<void> dispose();
}
```

**Concrete Implementations:**

```dart
// lib/src/adapters/openvpn_adapter.dart
class OpenVpnAdapter extends ProtocolAdapter {
  final OpenVpnFlutter _nativePlugin;

  @override
  Future<void> connect(VpnConfig config) async {
    final ovpnConfig = config.protocolConfig as OpenVpnConfig;
    await _nativePlugin.connect(
      ovpnContent: ovpnConfig.ovpnFileContent,
      username: ovpnConfig.username,
      password: ovpnConfig.password,
    );
  }
  // ...
}

// lib/src/adapters/wireguard_adapter.dart
class WireGuardAdapter extends ProtocolAdapter {
  final WireGuardFlutter _nativePlugin;

  @override
  Future<void> connect(VpnConfig config) async {
    final wgConfig = config.protocolConfig as WireGuardConfig;
    await _nativePlugin.startVpn(
      serverAddress: /* parse from config */,
      wgQuickConfig: wgConfig.wgQuickConfig,
    );
  }
  // ...
}

// lib/src/adapters/v2ray_adapter.dart
class V2RayAdapter extends ProtocolAdapter {
  final FlutterV2rayPlus _nativePlugin;

  @override
  Future<void> connect(VpnConfig config) async {
    final configJson = _buildV2RayConfig(config);
    await _nativePlugin.startV2Ray(
      remark: 'VPN',
      config: configJson,
    );
  }

  String _buildV2RayConfig(VpnConfig config) {
    // Build V2Ray JSON config based on protocol
    switch (config.protocol) {
      case ProtocolType.vmess:
        return _buildVMessConfig(config.protocolConfig as VMessConfig);
      case ProtocolType.vless:
        return _buildVLessConfig(config.protocolConfig as VLessConfig);
      // ...
    }
  }
  // ...
}
```

---

### 7. ImplementationSelector

**File:** `lib/src/core/implementation_selector.dart`

```dart
class ImplementationSelector {
  /// Select best implementation based on strategy
  Future<ImplementationProvider?> select(
    ProtocolType protocol,
    VpnConfig config,
    DeviceInfo deviceInfo,
  ) async {
    switch (config.selectionStrategy) {
      case SelectionStrategy.manual:
        return _selectManual(protocol, config);

      case SelectionStrategy.auto:
        return _selectAuto(protocol, config, deviceInfo);

      case SelectionStrategy.byPriority:
        return _selectByPriority(protocol, config, deviceInfo);

      case SelectionStrategy.byBenchmark:
        return _selectByBenchmark(protocol, config, deviceInfo);

      case SelectionStrategy.crowd:
        return _selectByCrowd(protocol, config, deviceInfo);
    }
  }

  Future<ImplementationProvider?> _selectManual(
    ProtocolType protocol,
    VpnConfig config,
  ) async {
    if (config.preferredImplementation != null) {
      return ImplementationRegistry
          .getImplementations(protocol)
          .firstWhereOrNull((impl) => impl.implementationId == config.preferredImplementation);
    }

    if (config.preferredBaseName != null) {
      final candidates = ImplementationRegistry
          .getImplementations(protocol)
          .where((impl) => impl.baseName == config.preferredBaseName);

      if (config.preferredCoreVersion != null) {
        return candidates.firstWhereOrNull(
          (impl) => impl.coreVersion == config.preferredCoreVersion,
        );
      }

      // Return latest version
      return candidates.reduce((a, b) =>
        _compareVersions(a.coreVersion, b.coreVersion) >= 0 ? a : b
      );
    }

    return null;
  }

  Future<ImplementationProvider?> _selectAuto(
    ProtocolType protocol,
    VpnConfig config,
    DeviceInfo deviceInfo,
  ) async {
    final allImpls = ImplementationRegistry.getImplementations(protocol);

    // 1. Filter by availability
    final available = await Future.wait(
      allImpls.map((impl) async => await impl.isAvailable() ? impl : null),
    );
    var candidates = available.whereType<ImplementationProvider>().toList();

    if (candidates.isEmpty) return null;

    // 2. Filter by mode/TUN driver support
    candidates = candidates.where((impl) =>
      impl.supportedModes.contains(config.mode) &&
      impl.supportedTunDrivers.contains(config.tunDriver)
    ).toList();

    if (candidates.isEmpty) return null;

    // 3. Filter by version constraints
    if (config.minimumCoreVersion != null) {
      candidates = candidates.where((impl) =>
        _compareVersions(impl.coreVersion, config.minimumCoreVersion!) >= 0
      ).toList();
    }

    if (config.maximumCoreVersion != null) {
      candidates = candidates.where((impl) =>
        _compareVersions(impl.coreVersion, config.maximumCoreVersion!) < 0
      ).toList();
    }

    // 4. Filter by required features
    if (config.requiredFeatures.isNotEmpty) {
      candidates = candidates.where((impl) =>
        config.requiredFeatures.every((feature) => impl.supportedFeatures.contains(feature))
      ).toList();
    }

    // 5. Filter by known issues
    candidates = candidates.where((impl) =>
      !_hasCriticalIssues(impl, deviceInfo)
    ).toList();

    if (candidates.isEmpty) return null;

    // 6. Apply platform-specific heuristics
    return _selectByHeuristics(candidates, deviceInfo);
  }

  bool _hasCriticalIssues(ImplementationProvider impl, DeviceInfo deviceInfo) {
    return impl.knownIssues.any((issue) =>
      issue.severity == Severity.critical &&
      issue.affectedPlatforms.contains(deviceInfo.platform.name.toLowerCase())
    );
  }

  ImplementationProvider _selectByHeuristics(
    List<ImplementationProvider> candidates,
    DeviceInfo deviceInfo,
  ) {
    // Platform-specific heuristics
    if (deviceInfo.platform == TargetPlatform.android) {
      // Snapdragon → prefer libxray
      if (deviceInfo.chipset?.contains('Snapdragon') == true) {
        final libxray = candidates.firstWhereOrNull((c) => c.baseName == 'xray');
        if (libxray != null) return libxray;
      }

      // MediaTek → prefer v2ray_plus
      if (deviceInfo.chipset?.contains('MediaTek') == true) {
        final v2rayPlus = candidates.firstWhereOrNull((c) => c.baseName == 'v2ray_plus');
        if (v2rayPlus != null) return v2rayPlus;
      }

      // High RAM → prefer SingBox
      if (deviceInfo.ramMb >= 6144) {
        final singbox = candidates.firstWhereOrNull((c) => c.baseName == 'singbox');
        if (singbox != null) return singbox;
      }
    }

    // Default: highest priority + latest version
    candidates.sort((a, b) {
      final priorityCmp = b.priority.compareTo(a.priority);
      if (priorityCmp != 0) return priorityCmp;
      return _compareVersions(b.coreVersion, a.coreVersion);
    });

    return candidates.first;
  }

  Future<ImplementationProvider?> _selectByPriority(
    ProtocolType protocol,
    VpnConfig config,
    DeviceInfo deviceInfo,
  ) async {
    // Similar to auto, but only use priority scores
    final candidates = await _filterCandidates(protocol, config, deviceInfo);
    if (candidates.isEmpty) return null;

    candidates.sort((a, b) => b.priority.compareTo(a.priority));
    return candidates.first;
  }

  Future<ImplementationProvider?> _selectByBenchmark(
    ProtocolType protocol,
    VpnConfig config,
    DeviceInfo deviceInfo,
  ) async {
    final candidates = await _filterCandidates(protocol, config, deviceInfo);
    if (candidates.isEmpty) return null;

    // Run benchmarks
    final results = <ImplementationProvider, PerformanceMetrics>{};
    for (final impl in candidates) {
      final metrics = await impl.benchmark();
      if (metrics != null) {
        results[impl] = metrics;
      }
    }

    // Score based on throughput and latency
    final scored = results.entries.map((e) {
      final score = e.value.throughputMbps * 0.7 - e.value.latencyMs * 0.3;
      return MapEntry(e.key, score);
    }).toList();

    scored.sort((a, b) => b.value.compareTo(a.value));
    return scored.first.key;
  }

  Future<List<ImplementationProvider>> _filterCandidates(
    ProtocolType protocol,
    VpnConfig config,
    DeviceInfo deviceInfo,
  ) async {
    // Same filtering logic as _selectAuto steps 1-5
    // ...
  }

  int _compareVersions(String v1, String v2) {
    // Semantic version comparison
    final parts1 = v1.split('.').map(int.parse).toList();
    final parts2 = v2.split('.').map(int.parse).toList();

    for (var i = 0; i < 3; i++) {
      final p1 = i < parts1.length ? parts1[i] : 0;
      final p2 = i < parts2.length ? parts2[i] : 0;
      if (p1 != p2) return p1.compareTo(p2);
    }
    return 0;
  }
}
```

---

### 8. ModeDriverSelector

**File:** `lib/src/core/mode_driver_selector.dart`

```dart
class ModeDriverSelector {
  /// Select VPN mode based on config and platform capabilities
  Future<VpnMode> selectMode(VpnConfig config, DeviceInfo deviceInfo) async {
    if (config.mode != VpnMode.auto) {
      return config.mode;
    }

    // Auto-select based on platform
    if (deviceInfo.platform == TargetPlatform.android) {
      // Check VPN permission
      final hasVpnPermission = await _checkVpnPermission();
      return hasVpnPermission ? VpnMode.vpn : VpnMode.proxy;
    }

    if (deviceInfo.platform == TargetPlatform.iOS) {
      // iOS always requires VPN mode (Network Extension)
      return VpnMode.vpn;
    }

    // Desktop: default to VPN
    return VpnMode.vpn;
  }

  /// Select TUN driver based on config, mode, and platform
  Future<TunDriverType> selectTunDriver(
    VpnConfig config,
    VpnMode mode,
    ImplementationProvider implementation,
    DeviceInfo deviceInfo,
  ) async {
    // Proxy mode → no TUN
    if (mode == VpnMode.proxy) {
      return TunDriverType.none;
    }

    // Manual selection
    if (config.tunDriver != TunDriverType.auto) {
      // Validate compatibility
      if (!implementation.supportedTunDrivers.contains(config.tunDriver)) {
        throw VpnException(
          'TUN driver ${config.tunDriver} not supported by ${implementation.displayName}',
        );
      }
      return config.tunDriver;
    }

    // Auto-select based on implementation
    if (implementation.baseName == 'singbox') {
      return TunDriverType.direct;  // SingBox uses direct TUN
    }

    // Platform-specific heuristics
    if (deviceInfo.platform == TargetPlatform.android) {
      final sdkInt = deviceInfo.androidSdkInt ?? 0;

      if (sdkInt >= 29) {
        // Android 10+ → Tun2Socks (better performance)
        return TunDriverType.tun2socks;
      } else {
        // Android 8-9 → HevSocks5 (more compatible)
        return TunDriverType.hevSocks5;
      }
    }

    if (deviceInfo.platform == TargetPlatform.iOS) {
      // iOS → Direct TUN (via Network Extension)
      return TunDriverType.direct;
    }

    // Desktop → Tun2Socks
    return TunDriverType.tun2socks;
  }

  Future<bool> _checkVpnPermission() async {
    // Platform-specific permission check
    // ...
  }
}
```

---

### 9. DeviceInfo

**File:** `lib/src/utils/device_info.dart`

```dart
class DeviceInfo {
  final TargetPlatform platform;
  final String osVersion;
  final String? chipset;
  final int? ramMb;
  final int? androidSdkInt;
  final String? iosVersion;

  DeviceInfo({
    required this.platform,
    required this.osVersion,
    this.chipset,
    this.ramMb,
    this.androidSdkInt,
    this.iosVersion,
  });

  static Future<DeviceInfo> collect() async {
    // Use device_info_plus package
    final deviceInfo = DeviceInfoPlugin();

    if (Platform.isAndroid) {
      final androidInfo = await deviceInfo.androidInfo;
      return DeviceInfo(
        platform: TargetPlatform.android,
        osVersion: androidInfo.version.release,
        androidSdkInt: androidInfo.version.sdkInt,
        chipset: androidInfo.hardware,
        // RAM detection via system info
      );
    }

    if (Platform.isIOS) {
      final iosInfo = await deviceInfo.iosInfo;
      return DeviceInfo(
        platform: TargetPlatform.iOS,
        osVersion: iosInfo.systemVersion,
        iosVersion: iosInfo.systemVersion,
      );
    }

    // Other platforms...
  }
}
```

---

## Platform-Specific Integration

### Android

**File:** `android/src/main/kotlin/com/example/flutter_vpn_engine/VpnServiceBridge.kt`

```kotlin
class VpnServiceBridge : FlutterPlugin, MethodCallHandler {
    override fun onMethodCall(call: MethodCall, result: Result) {
        when (call.method) {
            "connect" -> {
                val protocol = call.argument<String>("protocol")
                val config = call.argument<Map<String, Any>>("config")

                // Delegate to appropriate adapter
                when (protocol) {
                    "openVpn" -> OpenVpnService.connect(config)
                    "wireGuard" -> WireGuardService.connect(config)
                    "v2ray" -> V2RayService.connect(config)
                    // ...
                }
            }
            // ...
        }
    }
}
```

### iOS

**File:** `ios/Classes/VpnEnginePlugin.swift`

```swift
public class VpnEnginePlugin: NSObject, FlutterPlugin {
    public static func register(with registrar: FlutterPluginRegistrar) {
        let channel = FlutterMethodChannel(
            name: "flutter_vpn_engine",
            binaryMessenger: registrar.messenger()
        )
        let instance = VpnEnginePlugin()
        registrar.addMethodCallDelegate(instance, channel: channel)
    }

    public func handle(_ call: FlutterMethodCall, result: @escaping FlutterResult) {
        switch call.method {
        case "connect":
            guard let args = call.arguments as? [String: Any],
                  let protocol = args["protocol"] as? String,
                  let config = args["config"] as? [String: Any] else {
                result(FlutterError(code: "INVALID_ARGS", message: nil, details: nil))
                return
            }

            startTunnel(protocol: protocol, config: config, result: result)
        // ...
        }
    }

    private func startTunnel(
        protocol: String,
        config: [String: Any],
        result: @escaping FlutterResult
    ) {
        // Use NEVPNManager to start Network Extension
        NEVPNManager.shared().loadFromPreferences { error in
            // Configure NETunnelProviderProtocol
            let providerProtocol = NETunnelProviderProtocol()
            providerProtocol.providerBundleIdentifier = "com.example.app.VpnEngineExtension"
            providerProtocol.serverAddress = "VPN Server"
            providerProtocol.providerConfiguration = [
                "protocolType": protocol,
                "config": config
            ]

            NEVPNManager.shared().protocolConfiguration = providerProtocol
            NEVPNManager.shared().isEnabled = true

            NEVPNManager.shared().saveToPreferences { error in
                guard error == nil else {
                    result(FlutterError(code: "SAVE_ERROR", message: error?.localizedDescription, details: nil))
                    return
                }

                do {
                    try NEVPNManager.shared().connection.startVPNTunnel()
                    result(true)
                } catch {
                    result(FlutterError(code: "START_ERROR", message: error.localizedDescription, details: nil))
                }
            }
        }
    }
}
```

**File:** `ios/VpnEngineExtension/PacketTunnelProvider.swift`

(See FLUTTER_VPN_ENGINE_ARCHITECTURE.md for complete implementation)

---

## Dependencies

### pubspec.yaml

```yaml
name: flutter_vpn_engine
description: Unified VPN interface for multiple protocols
version: 2.0.0

environment:
  sdk: ">=3.0.0 <4.0.0"
  flutter: ">=3.10.0"

dependencies:
  flutter:
    sdk: flutter

  # Existing packages
  openvpn_flutter: ^1.3.4
  wireguard_flutter: ^0.1.3
  flutter_v2ray_plus: ^1.0.15
  flutter_vpn: ^2.1.0  # IKEv2
  sstp_flutter: ^1.0.0

  # Utilities
  device_info_plus: ^9.1.0
  path_provider: ^2.1.0
  shared_preferences: ^2.2.0

  # JSON
  json_annotation: ^4.8.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  build_runner: ^2.4.6
  json_serializable: ^6.7.1
  mockito: ^5.4.3

flutter:
  plugin:
    platforms:
      android:
        package: com.example.flutter_vpn_engine
        pluginClass: VpnEnginePlugin
      ios:
        pluginClass: VpnEnginePlugin
      linux:
        pluginClass: VpnEnginePluginLinux
      macos:
        pluginClass: VpnEnginePluginMacOS
      windows:
        pluginClass: VpnEnginePluginWindows
```

---

## Error Handling

### VpnException Hierarchy

```dart
class VpnException implements Exception {
  final String message;
  final String? code;
  final dynamic details;

  const VpnException(this.message, {this.code, this.details});

  @override
  String toString() => 'VpnException: $message';
}

class VpnConfigException extends VpnException {
  const VpnConfigException(String message) : super(message, code: 'CONFIG_ERROR');
}

class VpnConnectionException extends VpnException {
  const VpnConnectionException(String message, {dynamic details})
      : super(message, code: 'CONNECTION_ERROR', details: details);
}

class VpnPermissionException extends VpnException {
  const VpnPermissionException(String message)
      : super(message, code: 'PERMISSION_ERROR');
}

class VpnPlatformException extends VpnException {
  const VpnPlatformException(String message, {dynamic details})
      : super(message, code: 'PLATFORM_ERROR', details: details);
}
```

---

## Testing Strategy

### Unit Tests

```dart
// test/core/implementation_selector_test.dart
void main() {
  group('ImplementationSelector', () {
    test('selects manual implementation correctly', () async {
      // Mock implementations
      final xray184 = MockXrayImplementation(version: '1.8.4');
      final xray180 = MockXrayImplementation(version: '1.8.0');

      ImplementationRegistry.register(ProtocolType.vmess, xray184);
      ImplementationRegistry.register(ProtocolType.vmess, xray180);

      final config = VpnConfig(
        protocol: ProtocolType.vmess,
        protocolConfig: VMessConfig.fromUrl('vmess://...'),
        selectionStrategy: SelectionStrategy.manual,
        preferredImplementation: 'xray_1.8.4',
      );

      final selector = ImplementationSelector();
      final result = await selector.select(
        ProtocolType.vmess,
        config,
        MockDeviceInfo(),
      );

      expect(result, equals(xray184));
    });

    test('auto-selects based on device chipset', () async {
      // Test Snapdragon → libxray preference
    });

    test('filters by required features', () async {
      // Test REALITY requirement → Xray 1.8+
    });
  });
}
```

### Integration Tests

```dart
// integration_test/vpn_connection_test.dart
void main() {
  testWidgets('connects to WireGuard VPN', (tester) async {
    await VpnEngine.instance.initialize();

    final config = VpnConfig(
      protocol: ProtocolType.wireGuard,
      protocolConfig: WireGuardConfig.fromFile('test/fixtures/wg.conf'),
    );

    await VpnEngine.instance.connect(config);

    await tester.pumpAndSettle();

    expect(VpnEngine.instance.status, equals(VpnStatus.connected));
  });
}
```

---

## Migration from v1.x

### Deprecated API Support

```dart
// lib/src/legacy/legacy_api.dart

@deprecated
enum DriverType {
  hevSocks5Tunnel,
  tun2socks,
  singboxTun,
}

@deprecated
enum CoreType {
  libxray,
  v2rayCore,
  singbox,
}

@deprecated
class DriverConfig {
  final DriverType driver;
  final CoreType core;
  final String configJson;

  // ...
}

@deprecated
class VpnClientEngine {
  static Future<void> connect(DriverConfig config) async {
    // Convert to new API
    final newConfig = _convertLegacyConfig(config);
    await VpnEngine.instance.connect(newConfig);
  }

  static VpnConfig _convertLegacyConfig(DriverConfig legacy) {
    // Migration logic
    ProtocolType protocol;
    ProtocolConfig protocolConfig;

    switch (legacy.core) {
      case CoreType.libxray:
      case CoreType.v2rayCore:
        // Parse JSON to detect protocol
        final json = jsonDecode(legacy.configJson);
        protocol = _detectProtocolFromJson(json);
        protocolConfig = _parseProtocolConfig(json, protocol);
        break;
      // ...
    }

    return VpnConfig(
      protocol: protocol,
      protocolConfig: protocolConfig,
      preferredImplementation: _mapCoreType(legacy.core),
      tunDriver: _mapDriverType(legacy.driver),
    );
  }
}
```

### Migration Guide

**File:** `MIGRATION.md`

```markdown
# Migration Guide: v1.x → v2.0

## Breaking Changes

### 1. API Restructuring

**v1.x:**
```dart
final config = DriverConfig(
  driver: DriverType.hevSocks5Tunnel,
  core: CoreType.libxray,
  configJson: '...',
);
await VpnClientEngine.connect(config);
```

**v2.0:**
```dart
final config = VpnConfig(
  protocol: ProtocolType.vmess,
  protocolConfig: VMessConfig.fromUrl('vmess://...'),
);
await VpnEngine.instance.connect(config);
```

### 2. Protocol-Specific Configs

v2.0 uses strongly-typed protocol configurations instead of JSON strings.

**Before:**
```dart
final configJson = '''{
  "outbounds": [{
    "protocol": "vmess",
    "settings": {"vnext": [...]}
  }]
}''';
```

**After:**
```dart
final config = VMessConfig(
  address: '1.2.3.4',
  port: 443,
  id: 'uuid-here',
  alterId: 0,
);
```

### 3. Initialization Required

v2.0 requires explicit initialization:

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await VpnEngine.instance.initialize();
  runApp(MyApp());
}
```

## Backward Compatibility

v2.0 provides a legacy API wrapper for gradual migration:

```dart
import 'package:flutter_vpn_engine/legacy.dart';

// Old API still works
await VpnClientEngine.connect(oldConfig);
```

**Note:** Legacy API will be removed in v3.0 (deprecation warnings shown).
```

---

## Performance Benchmarks

### Benchmark Targets

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Connection Time | < 5s | Time from connect() to connected status |
| Throughput | ≥ 50 Mbps | iperf3 test over VPN connection |
| Latency | ≤ 100ms | Ping RTT to VPN server |
| CPU Usage | ≤ 20% | Average CPU during active connection |
| Memory | ≤ 150 MB | RSS during active connection |
| Battery Impact | ≤ 5%/hour | Battery drain on mobile (idle VPN) |

### Benchmark Implementation

```dart
// lib/src/utils/benchmark.dart

class VpnBenchmark {
  static Future<PerformanceMetrics> run(
    ImplementationProvider implementation,
    VpnConfig config,
  ) async {
    final adapter = implementation.createAdapter();

    // Measure connection time
    final connectStart = DateTime.now();
    await adapter.connect(config);
    final connectDuration = DateTime.now().difference(connectStart);

    // Wait for stable connection
    await Future.delayed(Duration(seconds: 2));

    // Measure throughput (download 10MB test file)
    final throughputMbps = await _measureThroughput();

    // Measure latency (ping test)
    final latencyMs = await _measureLatency();

    // Measure CPU usage
    final cpuPercent = await _measureCpu();

    // Measure memory
    final memoryMb = await _measureMemory();

    await adapter.disconnect();

    return PerformanceMetrics(
      throughputMbps: throughputMbps,
      latencyMs: latencyMs,
      cpuUsagePercent: cpuPercent,
      memoryUsageMb: memoryMb,
    );
  }
}
```

---

## Security Considerations

### 1. Certificate Validation

All TLS connections MUST validate certificates by default:

```dart
class VpnConfig {
  final bool allowInsecure;  // Default: false

  void validate() {
    if (allowInsecure && !kDebugMode) {
      throw VpnConfigException(
        'allowInsecure=true is only allowed in debug builds',
      );
    }
  }
}
```

### 2. Credentials Storage

Never store credentials in plain text. Use secure storage:

```dart
// lib/src/utils/secure_storage.dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class VpnCredentialStorage {
  static const _storage = FlutterSecureStorage();

  static Future<void> savePassword(String configId, String password) async {
    await _storage.write(key: 'vpn_pw_$configId', value: password);
  }

  static Future<String?> getPassword(String configId) async {
    return await _storage.read(key: 'vpn_pw_$configId');
  }
}
```

### 3. DNS Leak Prevention

Ensure DNS queries go through VPN tunnel:

```dart
class VpnConfig {
  final List<String>? dnsServers;  // If null, use protocol default

  List<String> get effectiveDnsServers {
    return dnsServers ?? _getProtocolDefaultDns();
  }

  List<String> _getProtocolDefaultDns() {
    // Cloudflare DNS (privacy-focused)
    return ['1.1.1.1', '1.0.0.1'];
  }
}
```

---

## Known Issues Database

### Structure

```dart
// lib/src/data/known_issues_db.dart

class KnownIssuesDatabase {
  static final Map<String, List<KnownIssue>> _issues = {
    'xray_1.8.0': [
      KnownIssue(
        description: 'Memory leak on prolonged connections',
        severity: Severity.medium,
        affectedPlatforms: ['android', 'ios'],
        workaround: 'Upgrade to 1.8.4 or reconnect every 12 hours',
      ),
      KnownIssue(
        description: 'Vision flow control crashes on MediaTek chipsets',
        severity: Severity.high,
        affectedPlatforms: ['android'],
        workaround: 'Disable Vision or use SingBox implementation',
      ),
    ],
    'xray_1.8.4': [
      KnownIssue(
        description: 'XUDP incompatible with some routers',
        severity: Severity.low,
        affectedPlatforms: ['android', 'ios', 'linux', 'macos', 'windows'],
        workaround: 'Disable XUDP in config',
      ),
    ],
    'singbox_1.5.0': [
      KnownIssue(
        description: 'TUN crash on iOS 14',
        severity: Severity.critical,
        affectedPlatforms: ['ios'],
        workaround: 'Upgrade to SingBox 1.6.0 or iOS 15+',
      ),
    ],
    'wireguard_flutter_0.1.3': [
      KnownIssue(
        description: 'Windows support incomplete',
        severity: Severity.high,
        affectedPlatforms: ['windows'],
        workaround: 'Use wireguard-windows native client',
      ),
    ],
  };

  static List<KnownIssue> getIssues(String implementationId) {
    return _issues[implementationId] ?? [];
  }

  /// Check if implementation has critical issues on this platform
  static bool hasCriticalIssues(
    String implementationId,
    String platform,
  ) {
    final issues = getIssues(implementationId);
    return issues.any((issue) =>
      issue.severity == Severity.critical &&
      issue.affectedPlatforms.contains(platform),
    );
  }
}
```

---

## Acceptance Criteria

### Must Have (MVP)

- [x] Unified VpnEngine API
- [x] ProtocolConfig for all major protocols (OpenVPN, WireGuard, VMess, VLess, Trojan, Shadowsocks, IKEv2, SSTP, GOST)
- [x] ImplementationRegistry with multi-implementation support
- [x] Auto-selection based on device heuristics
- [x] Manual selection with version control
- [x] Mode selection (VPN vs Proxy)
- [x] TUN driver selection (HevSocks5, Tun2Socks, Direct, None)
- [x] iOS Network Extension architecture
- [x] Android VPNService integration
- [ ] Integration with existing Flutter packages (implementation phase)
- [ ] Error handling and exceptions
- [ ] Status and statistics streams
- [ ] Documentation and examples

### Should Have

- [ ] Benchmark implementation for SelectionStrategy.byBenchmark
- [ ] Crowd-sourced analytics for SelectionStrategy.crowd
- [ ] Migration guide and legacy API wrapper
- [ ] Known issues database with platform-specific filtering
- [ ] Secure credential storage
- [ ] DNS leak prevention
- [ ] Certificate validation
- [ ] Performance benchmarks

### Nice to Have

- [ ] UI components for implementation/version selection
- [ ] Analytics dashboard for auto-selection effectiveness
- [ ] A/B testing framework for implementations
- [ ] Automated issue detection and fallback
- [ ] Connection quality monitoring

---

## Next Steps

1. **Approval**: Get user sign-off on this specification
2. **Planning**: Create detailed implementation plan (03-plan.md)
3. **Implementation**: Begin coding based on approved plan
4. **Testing**: Unit tests, integration tests, platform tests
5. **Documentation**: API docs, usage examples, migration guide
6. **Release**: v2.0.0 beta, gather feedback, iterate

---

## Approval

- [x] Reviewed by: Anton
- [x] Approved on: 2025-12-31
- [x] Notes: Specifications approved, moving to implementation planning
