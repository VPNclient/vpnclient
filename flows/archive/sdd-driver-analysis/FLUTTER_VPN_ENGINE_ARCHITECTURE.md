# Flutter VPN Engine - Финальная архитектура

> Generated: 2025-12-30
> Status: ARCHITECTURAL VISION (based on research)

---

## 🎯 Концепция: Unified VPN API для Flutter

`flutter_vpn_engine` станет **единой точкой входа** для работы с любым VPN протоколом на любой платформе.

```
┌─────────────────────────────────────────────────────────┐
│                    Flutter App                          │
│              (VPNclient-green-app)                      │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              flutter_vpn_engine                         │
│           (Unified VPN Interface)                       │
│                                                          │
│  VpnEngine.connect(protocol: ProtocolType)              │
│  VpnEngine.disconnect()                                 │
│  VpnEngine.getStatus() → VpnStatus                      │
│  VpnEngine.getStats() → VpnStats                        │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
    ┌────▼─────┐                    ┌────▼──────┐
    │ Protocol │                    │  Platform │
    │ Adapters │                    │  Bridge   │
    └────┬─────┘                    └────┬──────┘
         │                               │
    ┌────┴────────────────────────────────┴─────┐
    │                                            │
┌───▼─────┐  ┌─────▼───┐  ┌────▼────┐  ┌───▼────┐
│OpenVPN  │  │WireGuard│  │ V2Ray/  │  │  GOST  │
│Adapter  │  │Adapter  │  │ Xray    │  │ Adapter│
│         │  │         │  │ Adapter │  │        │
└───┬─────┘  └─────┬───┘  └────┬────┘  └───┬────┘
    │              │           │            │
┌───▼──────────────▼───────────▼────────────▼────┐
│           Third-party Packages                 │
│  openvpn_flutter | wireguard_flutter          │
│  flutter_v2ray_plus | flutter_vpn_gost        │
└────────────────────────────────────────────────┘
```

---

## 1. Архитектура слоев

### Layer 1: Public API (Dart)

**Файл:** `lib/vpnclient_engine.dart`

```dart
/// Единый интерфейс для работы с VPN
class VpnEngine {
  static VpnEngine get instance => _instance;

  /// Инициализация с конфигурацией
  Future<void> initialize(VpnConfig config);

  /// Подключение к VPN
  Future<void> connect();

  /// Отключение от VPN
  Future<void> disconnect();

  /// Текущий статус
  VpnStatus get status;

  /// Stream статуса
  Stream<VpnStatus> get statusStream;

  /// Статистика трафика
  VpnStats get stats;

  /// Stream статистики
  Stream<VpnStats> get statsStream;

  /// Поддерживаемые протоколы на текущей платформе
  List<ProtocolType> get supportedProtocols;
}
```

### Layer 2: Protocol Configuration (Dart Models)

**Файл:** `lib/src/models/vpn_config.dart`

```dart
/// Конфигурация VPN
class VpnConfig {
  final ProtocolType protocol;
  final ProtocolConfig protocolConfig;
  final DriverConfig? driverConfig; // Опционально для legacy

  VpnConfig({
    required this.protocol,
    required this.protocolConfig,
    this.driverConfig,
  });
}

/// Типы протоколов
enum ProtocolType {
  openVpn,      // OpenVPN (openvpn_flutter)
  wireGuard,    // WireGuard (wireguard_flutter)
  v2ray,        // V2Ray/Xray (flutter_v2ray_plus/client)
  ikev2,        // IKEv2/IPsec (flutter_vpn)
  sstp,         // SSTP (sstp_flutter)
  gost,         // GOST VPN (flutter_vpn_gost)

  // Legacy (для обратной совместимости)
  singbox,      // SingBox core
  libxray,      // LibXray core
}

/// Базовый класс конфигурации протокола
abstract class ProtocolConfig {
  Map<String, dynamic> toJson();
}

/// OpenVPN конфигурация
class OpenVpnConfig extends ProtocolConfig {
  final String ovpnFileContent; // .ovpn file
  final String? username;
  final String? password;

  OpenVpnConfig({
    required this.ovpnFileContent,
    this.username,
    this.password,
  });
}

/// WireGuard конфигурация
class WireGuardConfig extends ProtocolConfig {
  final String privateKey;
  final String address;
  final String dns;
  final String publicKey;
  final String endpoint;
  final String? allowedIPs;

  WireGuardConfig({
    required this.privateKey,
    required this.address,
    required this.dns,
    required this.publicKey,
    required this.endpoint,
    this.allowedIPs,
  });
}

/// V2Ray/Xray конфигурация
class V2RayConfig extends ProtocolConfig {
  final String remark;
  final String address;
  final int port;
  final String id;
  final int alterId;
  final String security;
  final String network;
  final Map<String, dynamic>? streamSettings;

  // Или из URL
  factory V2RayConfig.fromUrl(String url); // vmess://, vless://, etc.
}

/// GOST VPN конфигурация
class GostConfig extends ProtocolConfig {
  final GostProtocol protocol; // GLess, GMess, GReality
  final String server;
  final int port;
  final String id;
  final Map<String, dynamic> cryptoSettings;
}
```

### Layer 3: Protocol Adapters (Dart)

**Файл:** `lib/src/adapters/protocol_adapter.dart`

```dart
/// Базовый адаптер протокола
abstract class ProtocolAdapter {
  Future<void> initialize(ProtocolConfig config);
  Future<void> connect();
  Future<void> disconnect();
  Stream<VpnStatus> get statusStream;
  Stream<VpnStats> get statsStream;
  VpnStatus get currentStatus;
}
```

**Файл:** `lib/src/adapters/openvpn_adapter.dart`

```dart
import 'package:openvpn_flutter/openvpn_flutter.dart';

class OpenVpnAdapter extends ProtocolAdapter {
  late OpenVPN _engine;
  final _statusController = StreamController<VpnStatus>.broadcast();

  @override
  Future<void> initialize(ProtocolConfig config) async {
    final openvpnConfig = config as OpenVpnConfig;

    _engine = OpenVPN(
      onVpnStatusChanged: (status) {
        _statusController.add(_mapStatus(status));
      },
    );

    await _engine.initialize(
      ovpnFileContent: openvpnConfig.ovpnFileContent,
      username: openvpnConfig.username,
      password: openvpnConfig.password,
    );
  }

  @override
  Future<void> connect() => _engine.connect();

  @override
  Future<void> disconnect() => _engine.disconnect();

  VpnStatus _mapStatus(dynamic status) {
    // Маппинг OpenVPN статусов в unified VpnStatus
    // ...
  }
}
```

**Файл:** `lib/src/adapters/wireguard_adapter.dart`

```dart
import 'package:wireguard_flutter/wireguard_flutter.dart';

class WireGuardAdapter extends ProtocolAdapter {
  final _wireguard = WireGuardFlutter.instance;
  final _statusController = StreamController<VpnStatus>.broadcast();

  @override
  Future<void> initialize(ProtocolConfig config) async {
    final wgConfig = config as WireGuardConfig;

    await _wireguard.initialize(interfaceName: 'wg0');

    _wireguard.vpnStageSnapshot.listen((state) {
      _statusController.add(_mapStatus(state));
    });
  }

  @override
  Future<void> connect() async {
    await _wireguard.startVpn(
      serverAddress: wgConfig.endpoint,
      wgQuickConfig: _buildWgQuickConfig(),
      providerBundleIdentifier: 'com.example.vpn.tunnel', // iOS
    );
  }

  String _buildWgQuickConfig() {
    return '''
[Interface]
PrivateKey = ${wgConfig.privateKey}
Address = ${wgConfig.address}
DNS = ${wgConfig.dns}

[Peer]
PublicKey = ${wgConfig.publicKey}
Endpoint = ${wgConfig.endpoint}
AllowedIPs = ${wgConfig.allowedIPs ?? '0.0.0.0/0'}
''';
  }
}
```

**Файл:** `lib/src/adapters/v2ray_adapter.dart`

```dart
import 'package:flutter_v2ray_plus/flutter_v2ray_plus.dart';
// ИЛИ для cross-platform:
// import 'package:flutter_v2ray_client/flutter_v2ray_client.dart';

class V2RayAdapter extends ProtocolAdapter {
  late FlutterV2ray _v2ray;
  final _statusController = StreamController<VpnStatus>.broadcast();

  @override
  Future<void> initialize(ProtocolConfig config) async {
    final v2rayConfig = config as V2RayConfig;

    _v2ray = FlutterV2ray(
      onStatusChanged: (status) {
        _statusController.add(_mapStatus(status));
      },
    );

    await _v2ray.initializeV2Ray();
  }

  @override
  Future<void> connect() async {
    await _v2ray.connectV2Ray(
      remark: v2rayConfig.remark,
      config: v2rayConfig.toJson(),
      proxyOnly: false, // VPN mode
    );
  }
}
```

**Файл:** `lib/src/adapters/gost_adapter.dart`

```dart
import 'package:flutter_vpn_gost/flutter_vpn_gost.dart';

class GostAdapter extends ProtocolAdapter {
  late GostVpn _gost;

  @override
  Future<void> initialize(ProtocolConfig config) async {
    final gostConfig = config as GostConfig;

    _gost = GostVpn.instance;

    await _gost.initialize(
      protocol: gostConfig.protocol,
      server: gostConfig.server,
      port: gostConfig.port,
      cryptoSettings: gostConfig.cryptoSettings,
    );
  }
}
```

### Layer 4: Platform Bridge (за кулисами)

Каждый adapter автоматически использует нативные реализации:

```
┌──────────────────────────────────────────────────────┐
│              OpenVpnAdapter                          │
└────────────────────┬─────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
    ┌─────────┐            ┌──────────┐
    │ Android │            │   iOS    │
    │ ics-    │            │ OpenVPN  │
    │ openvpn │            │ Adapter  │
    │(VpnService)│         │(NEPacketTunnelProvider)│
    └─────────┘            └──────────┘

┌──────────────────────────────────────────────────────┐
│            WireGuardAdapter                          │
└────────────────────┬─────────────────────────────────┘
                     │
    ┌────────────────┼─────────────────────┐
    ▼                ▼                     ▼
┌─────────┐   ┌────────────┐      ┌──────────┐
│ Android │   │    iOS     │      │ Desktop  │
│WireGuard│   │WireGuard   │      │WireGuard │
│  Go     │   │Swift+Go    │      │   Go     │
│(VpnService)│ │(NetworkExtension)│ │(/dev/tun)│
└─────────┘   └────────────┘      └──────────┘

┌──────────────────────────────────────────────────────┐
│              V2RayAdapter                            │
└────────────────────┬─────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
    ┌─────────┐            ┌──────────┐
    │ Android │            │   iOS    │
    │ Xray    │            │  Xray    │
    │  Core   │            │  Core    │
    │(VpnService)│         │(NEPacketTunnelProvider)│
    └─────────┘            └──────────┘
```

---

## 2. Структура пакета flutter_vpn_engine

```
flutter_vpn_engine/
├── lib/
│   ├── vpnclient_engine.dart              # Main export
│   │
│   ├── src/
│   │   ├── models/
│   │   │   ├── vpn_config.dart            # VpnConfig, ProtocolType
│   │   │   ├── protocol_configs.dart      # OpenVpnConfig, WireGuardConfig, etc.
│   │   │   ├── vpn_status.dart            # VpnStatus enum
│   │   │   ├── vpn_stats.dart             # VpnStats (traffic, latency)
│   │   │   └── connection_info.dart       # IP, server info
│   │   │
│   │   ├── adapters/
│   │   │   ├── protocol_adapter.dart      # Abstract base class
│   │   │   ├── openvpn_adapter.dart       # OpenVPN wrapper
│   │   │   ├── wireguard_adapter.dart     # WireGuard wrapper
│   │   │   ├── v2ray_adapter.dart         # V2Ray/Xray wrapper
│   │   │   ├── ikev2_adapter.dart         # IKEv2 wrapper
│   │   │   ├── sstp_adapter.dart          # SSTP wrapper
│   │   │   ├── gost_adapter.dart          # GOST wrapper
│   │   │   └── adapter_factory.dart       # Factory pattern
│   │   │
│   │   ├── engine/
│   │   │   ├── vpn_engine.dart            # Main engine implementation
│   │   │   ├── vpn_engine_impl.dart       # Platform-specific logic
│   │   │   └── platform_capabilities.dart # Protocol availability per platform
│   │   │
│   │   ├── utils/
│   │   │   ├── url_parser.dart            # Parse vmess://, vless://, etc.
│   │   │   ├── config_validator.dart      # Validate configs
│   │   │   └── stats_formatter.dart       # Format bytes, latency
│   │   │
│   │   └── legacy/                        # Backward compatibility
│   │       ├── legacy_api.dart            # Old API support
│   │       ├── driver_config.dart         # DriverType (deprecated)
│   │       └── core_config.dart           # CoreType (deprecated)
│   │
│   └── vpnclient_engine_legacy.dart       # Export для миграции
│
├── android/                               # Android native code
│   ├── src/main/kotlin/
│   │   └── VpnServiceBridge.kt           # Android VPNService integration
│   └── build.gradle
│
├── ios/                                   # iOS native code
│   ├── Classes/
│   │   ├── VpnEnginePlugin.swift         # iOS plugin
│   │   └── PacketTunnelBridge.swift      # NetworkExtension integration
│   ├── VpnEngineExtension/               # Network Extension target
│   │   ├── PacketTunnelProvider.swift    # NEPacketTunnelProvider
│   │   └── Info.plist                    # Extension entitlements
│   └── flutter_vpn_engine.podspec
│
├── pubspec.yaml                           # Dependencies
├── README.md
├── CHANGELOG.md
├── IOS_SETUP.md                          # iOS-specific setup guide
└── example/
    ├── lib/
    │   └── main.dart                      # Usage examples
    ├── ios/
    │   ├── Runner/
    │   │   └── Info.plist                # App entitlements
    │   └── VpnExtension/                 # Example extension
    │       ├── PacketTunnelProvider.swift
    │       └── Info.plist
    └── android/
        └── app/
            └── src/main/AndroidManifest.xml
```

---

## 2.1. iOS-специфичная архитектура

### iOS требует Network Extension

На iOS VPN работает через **Network Extension** (NEPacketTunnelProvider), который запускается в отдельном процессе.

```
┌─────────────────────────────────────────────────────┐
│           Main App (Runner)                         │
│  ┌───────────────────────────────────────────────┐  │
│  │  Flutter App                                  │  │
│  │  └─> VpnEngine.instance.connect()            │  │
│  └─────────────────┬─────────────────────────────┘  │
│                    │ Method Channel                 │
│  ┌─────────────────▼─────────────────────────────┐  │
│  │  VpnEnginePlugin.swift                        │  │
│  │  └─> startTunnel()                            │  │
│  └─────────────────┬─────────────────────────────┘  │
└────────────────────┼────────────────────────────────┘
                     │ IPC (XPC)
┌────────────────────▼────────────────────────────────┐
│     Network Extension (отдельный процесс)           │
│  ┌───────────────────────────────────────────────┐  │
│  │  PacketTunnelProvider.swift                   │  │
│  │  (наследуется от NEPacketTunnelProvider)      │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │ startTunnel() override                  │  │  │
│  │  │  ├─> OpenVPN: OpenVPNAdapter            │  │  │
│  │  │  ├─> WireGuard: WireGuardTunnel         │  │  │
│  │  │  ├─> V2Ray: Xray Core                   │  │  │
│  │  │  └─> GOST: go-gost                      │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### iOS Network Extension файлы

**Файл:** `ios/VpnEngineExtension/PacketTunnelProvider.swift`

```swift
import NetworkExtension
import OpenVPNAdapter  // Для OpenVPN
import WireGuardKit    // Для WireGuard
// import XrayKit      // Для V2Ray/Xray

class PacketTunnelProvider: NEPacketTunnelProvider {

    private var protocolType: String?
    private var protocolConfig: [String: Any]?

    // OpenVPN
    private var openVpnAdapter: OpenVPNAdapter?

    // WireGuard
    private var wireguardAdapter: WireGuardAdapter?

    // V2Ray/Xray
    private var xrayCore: XrayAdapter?

    override func startTunnel(
        options: [String : NSObject]?,
        completionHandler: @escaping (Error?) -> Void
    ) {
        // Получаем конфигурацию из main app
        guard let config = (protocolConfiguration as? NETunnelProviderProtocol)?.providerConfiguration,
              let type = config["protocolType"] as? String else {
            completionHandler(NSError(domain: "VpnEngine", code: -1))
            return
        }

        protocolType = type
        protocolConfig = config

        switch type {
        case "openVpn":
            startOpenVpn(config: config, completion: completionHandler)
        case "wireGuard":
            startWireGuard(config: config, completion: completionHandler)
        case "v2ray":
            startV2Ray(config: config, completion: completionHandler)
        case "gost":
            startGost(config: config, completion: completionHandler)
        default:
            completionHandler(NSError(domain: "VpnEngine", code: -2))
        }
    }

    override func stopTunnel(
        with reason: NEProviderStopReason,
        completionHandler: @escaping () -> Void
    ) {
        // Остановка соответствующего адаптера
        switch protocolType {
        case "openVpn":
            openVpnAdapter?.disconnect()
        case "wireGuard":
            wireguardAdapter?.stop()
        case "v2ray":
            xrayCore?.stop()
        case "gost":
            // stop GOST
            break
        default:
            break
        }

        completionHandler()
    }

    // MARK: - OpenVPN

    private func startOpenVpn(
        config: [String: Any],
        completion: @escaping (Error?) -> Void
    ) {
        guard let ovpnContent = config["ovpnFileContent"] as? String else {
            completion(NSError(domain: "VpnEngine", code: -3))
            return
        }

        openVpnAdapter = OpenVPNAdapter()
        openVpnAdapter?.delegate = self

        // Конфигурация OpenVPN
        let configuration = OpenVPN.Configuration()
        configuration.fileContent = ovpnContent

        // Применение конфигурации
        let properties = try? openVpnAdapter?.apply(configuration: configuration)

        // Настройка TUN интерфейса
        let settings = NEPacketTunnelNetworkSettings(tunnelRemoteAddress: "127.0.0.1")
        settings.mtu = NSNumber(value: properties?.mtu ?? 1500)

        // IPv4
        let ipv4Settings = NEIPv4Settings(
            addresses: properties?.addresses ?? [],
            subnetMasks: properties?.subnetMasks ?? []
        )
        settings.ipv4Settings = ipv4Settings

        setTunnelNetworkSettings(settings) { error in
            if let error = error {
                completion(error)
                return
            }

            // Старт OpenVPN
            self.openVpnAdapter?.connect()
            completion(nil)
        }
    }

    // MARK: - WireGuard

    private func startWireGuard(
        config: [String: Any],
        completion: @escaping (Error?) -> Void
    ) {
        guard let wgQuickConfig = config["wgQuickConfig"] as? String else {
            completion(NSError(domain: "VpnEngine", code: -4))
            return
        }

        // Парсинг WireGuard конфигурации
        guard let tunnelConfig = try? TunnelConfiguration(fromWgQuickConfig: wgQuickConfig) else {
            completion(NSError(domain: "VpnEngine", code: -5))
            return
        }

        // Настройка network settings
        let networkSettings = tunnelConfig.generateNetworkSettings()

        setTunnelNetworkSettings(networkSettings) { error in
            if let error = error {
                completion(error)
                return
            }

            // Старт WireGuard
            self.wireguardAdapter = WireGuardAdapter(
                with: tunnelConfig,
                logHandler: { level, message in
                    NSLog("[WireGuard] \(message)")
                }
            )

            self.wireguardAdapter?.start { error in
                completion(error)
            }
        }
    }

    // MARK: - V2Ray/Xray

    private func startV2Ray(
        config: [String: Any],
        completion: @escaping (Error?) -> Void
    ) {
        guard let configJson = config["configJson"] as? String else {
            completion(NSError(domain: "VpnEngine", code: -6))
            return
        }

        // Настройка TUN для V2Ray
        let settings = NEPacketTunnelNetworkSettings(tunnelRemoteAddress: "127.0.0.1")
        settings.mtu = 1500

        let ipv4Settings = NEIPv4Settings(
            addresses: ["172.19.0.1"],
            subnetMasks: ["255.255.255.252"]
        )
        ipv4Settings.includedRoutes = [NEIPv4Route.default()]
        settings.ipv4Settings = ipv4Settings

        setTunnelNetworkSettings(settings) { error in
            if let error = error {
                completion(error)
                return
            }

            // Старт Xray core
            self.xrayCore = XrayAdapter()
            self.xrayCore?.start(configJson: configJson) { success in
                completion(success ? nil : NSError(domain: "VpnEngine", code: -7))
            }
        }
    }
}

// MARK: - OpenVPNAdapterDelegate

extension PacketTunnelProvider: OpenVPNAdapterDelegate {
    func openVPNAdapter(
        _ openVPNAdapter: OpenVPNAdapter,
        configureTunnelWithNetworkSettings networkSettings: NEPacketTunnelNetworkSettings?,
        completionHandler: @escaping (Error?) -> Void
    ) {
        setTunnelNetworkSettings(networkSettings, completionHandler: completionHandler)
    }

    func openVPNAdapter(
        _ openVPNAdapter: OpenVPNAdapter,
        handleEvent event: OpenVPNAdapterEvent,
        message: String?
    ) {
        NSLog("[OpenVPN] Event: \(event)")
    }
}
```

### iOS Entitlements

**Файл:** `ios/Runner/Runner.entitlements`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- Network Extension entitlement -->
    <key>com.apple.developer.networking.networkextension</key>
    <array>
        <string>packet-tunnel-provider</string>
    </array>

    <!-- App Groups (для IPC между app и extension) -->
    <key>com.apple.security.application-groups</key>
    <array>
        <string>group.com.example.vpnclient</string>
    </array>
</dict>
</plist>
```

**Файл:** `ios/VpnEngineExtension/Info.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>NSExtension</key>
    <dict>
        <key>NSExtensionPointIdentifier</key>
        <string>com.apple.networkextension.packet-tunnel</string>
        <key>NSExtensionPrincipalClass</key>
        <string>$(PRODUCT_MODULE_NAME).PacketTunnelProvider</string>
    </dict>
</dict>
</plist>
```

### iOS Setup для разработчиков

**Файл:** `IOS_SETUP.md`

```markdown
# iOS Setup для flutter_vpn_engine

## Требования

1. **Apple Developer Account** с Network Extension capability
2. **Provisioning Profile** для App + Network Extension
3. **Code Signing** для обоих targets

## Шаги настройки

### 1. Создание Network Extension target

В Xcode:
1. File → New → Target
2. Выбрать "Network Extension"
3. Имя: VpnEngineExtension
4. Bundle ID: com.yourcompany.app.VpnEngineExtension

### 2. Настройка Capabilities

**Main App (Runner):**
- ✅ Network Extensions (Packet Tunnel)
- ✅ App Groups: group.com.yourcompany.vpnclient

**Extension (VpnEngineExtension):**
- ✅ Network Extensions (Packet Tunnel)
- ✅ App Groups: group.com.yourcompany.vpnclient

### 3. Provisioning Profiles

Создайте 2 профиля на developer.apple.com:
1. **App Provisioning Profile** - для main app
2. **Extension Provisioning Profile** - для Network Extension

### 4. Dependencies (CocoaPods)

Добавьте в `ios/Podfile`:

```ruby
target 'Runner' do
  use_frameworks!
  use_modular_headers!

  flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))
end

target 'VpnEngineExtension' do
  use_frameworks!

  # OpenVPN
  pod 'OpenVPNAdapter', '~> 0.8.0'

  # WireGuard
  pod 'WireGuardKit', '~> 1.0'

  # V2Ray/Xray (если используется)
  # pod 'Libbox', :path => '../path/to/libbox'
end
```

### 5. Build Settings

В Xcode для extension target:
- Deployment Target: iOS 12.0+
- Swift Language Version: 5.0
- Enable Bitcode: NO

### 6. Тестирование

```bash
# Build
flutter build ios --release

# Run на устройстве (симулятор НЕ поддерживает VPN)
flutter run --release
```

## Troubleshooting

### "Failed to start tunnel"
- Проверьте entitlements
- Убедитесь что provisioning profiles правильные
- Проверьте code signing

### "Extension не запускается"
- Проверьте Bundle ID
- Убедитесь что NSExtensionPointIdentifier правильный
- Проверьте что NSExtensionPrincipalClass указывает на PacketTunnelProvider

### "IPC между app и extension не работает"
- Убедитесь что App Groups одинаковые в обоих targets
- Проверьте entitlements файлы
```

---

## 3. pubspec.yaml dependencies

```yaml
name: flutter_vpn_engine
description: Unified VPN interface for Flutter supporting multiple protocols
version: 2.0.0

dependencies:
  flutter:
    sdk: flutter

  # Protocol packages
  openvpn_flutter: ^1.3.4           # OpenVPN
  wireguard_flutter: ^0.1.3         # WireGuard (cross-platform)
  flutter_v2ray_plus: ^1.0.15       # V2Ray/Xray (mobile)
  flutter_v2ray_client: ^3.1.0      # V2Ray/Xray (cross-platform alternative)
  flutter_vpn: ^0.13.0              # IKEv2/IPsec
  sstp_flutter: ^1.3.0              # SSTP

  # Custom implementations (path dependencies)
  flutter_vpn_gost:
    path: ../flutter_vpn_gost       # GOST VPN

  # Utilities
  rxdart: ^0.27.0                   # Stream utilities
  equatable: ^2.0.0                 # Value equality

dev_dependencies:
  flutter_test:
    sdk: flutter
  mockito: ^5.0.0
  build_runner: ^2.0.0
```

---

## 4. Использование в приложении

### Пример 1: OpenVPN подключение

```dart
import 'package:flutter_vpn_engine/vpnclient_engine.dart';

// Конфигурация
final config = VpnConfig(
  protocol: ProtocolType.openVpn,
  protocolConfig: OpenVpnConfig(
    ovpnFileContent: await File('config.ovpn').readAsString(),
    username: 'user',
    password: 'pass',
  ),
);

// Инициализация
final vpn = VpnEngine.instance;
await vpn.initialize(config);

// Подписка на статус
vpn.statusStream.listen((status) {
  print('VPN Status: $status');
  if (status == VpnStatus.connected) {
    print('Connected!');
  }
});

// Подключение
await vpn.connect();

// Отключение
await vpn.disconnect();
```

### Пример 2: WireGuard подключение

```dart
final config = VpnConfig(
  protocol: ProtocolType.wireGuard,
  protocolConfig: WireGuardConfig(
    privateKey: 'your-private-key',
    address: '10.0.0.2/24',
    dns: '1.1.1.1',
    publicKey: 'server-public-key',
    endpoint: 'vpn.example.com:51820',
  ),
);

await VpnEngine.instance.initialize(config);
await VpnEngine.instance.connect();
```

### Пример 3: V2Ray из URL

```dart
final config = VpnConfig(
  protocol: ProtocolType.v2ray,
  protocolConfig: V2RayConfig.fromUrl(
    'vmess://eyJhZGQiOiJleGFtcGxlLmNvbSIsInBvcnQiOiI0NDMiLCJpZCI6InV1aWQifQ==',
  ),
);

await VpnEngine.instance.initialize(config);
await VpnEngine.instance.connect();
```

### Пример 4: GOST VPN (Россия/СНГ)

```dart
final config = VpnConfig(
  protocol: ProtocolType.gost,
  protocolConfig: GostConfig(
    protocol: GostProtocol.gless, // GLess, GMess, GReality
    server: 'vpn.example.ru',
    port: 443,
    id: 'uuid',
    cryptoSettings: {
      'cipher': 'GOST-28147-89',
      'hash': 'GOST-R-34.11-2012',
    },
  ),
);

await VpnEngine.instance.initialize(config);
await VpnEngine.instance.connect();
```

### Пример 5: Динамический выбор протокола

```dart
// Проверка поддержки на текущей платформе
final supported = VpnEngine.instance.supportedProtocols;

Widget buildProtocolSelector() {
  return DropdownButton<ProtocolType>(
    items: supported.map((protocol) {
      return DropdownMenuItem(
        value: protocol,
        child: Text(protocol.displayName),
      );
    }).toList(),
    onChanged: (protocol) async {
      final config = await _buildConfigForProtocol(protocol);
      await VpnEngine.instance.initialize(config);
    },
  );
}
```

---

## 5. Платформо-зависимая логика

### Файл: `lib/src/engine/platform_capabilities.dart`

```dart
class PlatformCapabilities {
  static List<ProtocolType> get supportedProtocols {
    if (Platform.isAndroid) {
      return [
        ProtocolType.openVpn,
        ProtocolType.wireGuard,
        ProtocolType.v2ray,
        ProtocolType.ikev2,
        ProtocolType.sstp,
        ProtocolType.gost,
      ];
    } else if (Platform.isIOS) {
      return [
        ProtocolType.openVpn,
        ProtocolType.wireGuard,
        ProtocolType.v2ray,
        ProtocolType.ikev2,
        ProtocolType.sstp,
        ProtocolType.gost,
      ];
    } else if (Platform.isLinux || Platform.isMacOS || Platform.isWindows) {
      return [
        ProtocolType.wireGuard,    // Cross-platform
        ProtocolType.v2ray,        // Via flutter_v2ray_client
        ProtocolType.gost,         // Custom implementation
      ];
    } else {
      return []; // Web, etc.
    }
  }

  static bool isProtocolSupported(ProtocolType protocol) {
    return supportedProtocols.contains(protocol);
  }
}
```

### Файл: `lib/src/adapters/adapter_factory.dart`

```dart
class AdapterFactory {
  static ProtocolAdapter create(ProtocolType protocol) {
    if (!PlatformCapabilities.isProtocolSupported(protocol)) {
      throw UnsupportedError(
        '$protocol is not supported on ${Platform.operatingSystem}',
      );
    }

    switch (protocol) {
      case ProtocolType.openVpn:
        return OpenVpnAdapter();
      case ProtocolType.wireGuard:
        return WireGuardAdapter();
      case ProtocolType.v2ray:
        return V2RayAdapter();
      case ProtocolType.ikev2:
        return IKEv2Adapter();
      case ProtocolType.sstp:
        return SstpAdapter();
      case ProtocolType.gost:
        return GostAdapter();
      default:
        throw ArgumentError('Unknown protocol: $protocol');
    }
  }
}
```

---

## 6. Обратная совместимость (Legacy API)

### Файл: `lib/src/legacy/legacy_api.dart`

```dart
/// Legacy API для миграции со старого flutter_vpn_engine
@Deprecated('Use VpnConfig with ProtocolType instead')
class LegacyVpnEngineConfig {
  final CoreConfig core;
  final DriverConfig driver;

  // Преобразование в новый формат
  VpnConfig toModernConfig() {
    // Маппинг старых CoreType в новые ProtocolType
    final protocol = _mapCoreToProtocol(core.type);
    final protocolConfig = _buildProtocolConfig(core);

    return VpnConfig(
      protocol: protocol,
      protocolConfig: protocolConfig,
    );
  }

  ProtocolType _mapCoreToProtocol(CoreType coreType) {
    switch (coreType) {
      case CoreType.singbox:
        return ProtocolType.v2ray; // SingBox → V2Ray adapter
      case CoreType.libxray:
        return ProtocolType.v2ray; // LibXray → V2Ray adapter
      case CoreType.v2ray:
        return ProtocolType.v2ray;
      default:
        throw ArgumentError('Unsupported legacy core: $coreType');
    }
  }
}
```

---

## 7. Статистика и мониторинг

### Unified Stats API

```dart
class VpnStats {
  final int bytesSent;           // Отправлено байт
  final int bytesReceived;       // Получено байт
  final int totalBytes;          // Всего байт
  final Duration connectionTime; // Время соединения
  final int? latencyMs;          // Задержка (ping)
  final String? serverIp;        // IP сервера
  final String? localIp;         // Локальный IP

  // Форматированные значения
  String get formattedBytesSent => _formatBytes(bytesSent);
  String get formattedBytesReceived => _formatBytes(bytesReceived);
  String get formattedTotalBytes => _formatBytes(totalBytes);

  String _formatBytes(int bytes) {
    if (bytes < 1024) return '$bytes B';
    if (bytes < 1024 * 1024) return '${(bytes / 1024).toStringAsFixed(2)} KB';
    if (bytes < 1024 * 1024 * 1024) {
      return '${(bytes / (1024 * 1024)).toStringAsFixed(2)} MB';
    }
    return '${(bytes / (1024 * 1024 * 1024)).toStringAsFixed(2)} GB';
  }
}

// Использование
vpn.statsStream.listen((stats) {
  print('Traffic: ${stats.formattedTotalBytes}');
  print('Latency: ${stats.latencyMs}ms');
  print('Connected for: ${stats.connectionTime}');
});
```

---

## 8. Преимущества новой архитектуры

### ✅ Для разработчиков приложений:

```dart
// БЫЛО (старый API):
final config = VpnEngineConfig(
  core: CoreConfig(type: CoreType.singbox, configJson: '...'),
  driver: DriverConfig(type: DriverType.hevSocks5, mtu: 1500),
);

// СТАЛО (новый API):
final config = VpnConfig(
  protocol: ProtocolType.wireGuard,
  protocolConfig: WireGuardConfig(/* ... */),
);
```

**Преимущества:**
- 🎯 **Проще**: Не нужно понимать разницу между Core и Driver
- 🔧 **Единый API**: Одинаковый интерфейс для всех протоколов
- 🌍 **Кроссплатформенность**: Автоматический выбор доступных протоколов
- 📦 **Type Safety**: Строгая типизация конфигураций

### ✅ Для поддержки:

- **Модульность**: Каждый adapter изолирован
- **Тестируемость**: Легко mock'ать adapters
- **Расширяемость**: Добавить новый протокол = новый adapter
- **Обратная совместимость**: Legacy API сохранен

### ✅ Для производительности:

- **Нативные библиотеки**: Используются оптимизированные пакеты
- **Прямая интеграция**: Минимальный overhead
- **Platform-specific**: WireGuard на iOS использует Apple framework

---

## 9. Migration Path (миграция)

### Шаг 1: Для простых случаев

```dart
// OLD API
final oldEngine = VpnClientEngine.instance;
await oldEngine.initialize(VpnEngineConfig(
  core: CoreConfig(type: CoreType.v2ray, configJson: jsonConfig),
));

// NEW API (рекомендуется)
final newEngine = VpnEngine.instance;
await newEngine.initialize(VpnConfig(
  protocol: ProtocolType.v2ray,
  protocolConfig: V2RayConfig.fromUrl(vmessUrl),
));
```

### Шаг 2: Для legacy кода (backward compatibility)

```dart
import 'package:flutter_vpn_engine/vpnclient_engine_legacy.dart';

// Legacy API остается доступным
final engine = VpnClientEngine.instance; // Работает как раньше
```

### Шаг 3: Постепенная миграция

```dart
// Конвертер из legacy в modern
final legacyConfig = VpnEngineConfig(/* ... */);
final modernConfig = legacyConfig.toModernConfig();

await VpnEngine.instance.initialize(modernConfig);
```

---

## 10. Roadmap

### Version 2.0.0 (MVP)
- ✅ OpenVPN (openvpn_flutter)
- ✅ WireGuard (wireguard_flutter)
- ✅ V2Ray/Xray (flutter_v2ray_plus)
- ✅ Unified API
- ✅ Platform capabilities detection
- ✅ Legacy API compatibility

### Version 2.1.0
- 🔶 IKEv2/IPsec (flutter_vpn)
- 🔶 SSTP (sstp_flutter)
- 🔶 Enhanced stats (bandwidth charts)
- 🔶 Multi-hop VPN support

### Version 2.2.0
- 🔶 GOST VPN (flutter_vpn_gost)
- 🔶 SM2/SM3 crypto integration (sm_crypto)
- 🔶 Server selection based on latency
- 🔶 Auto-reconnect on connection drop

### Version 3.0.0 (Future)
- 🔮 Custom protocol plugins
- 🔮 VPN protocol switching without disconnect
- 🔮 Split tunneling (per-app VPN)
- 🔮 Traffic obfuscation

---

## Final Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                      Flutter App Layer                       │
│                  (Business Logic / UI)                       │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             │ VpnEngine.instance.initialize(config)
                             │ VpnEngine.instance.connect()
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                  flutter_vpn_engine (v2.0)                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              VpnEngine (Singleton)                     │  │
│  │  - initialize(VpnConfig)                               │  │
│  │  - connect() / disconnect()                            │  │
│  │  - statusStream / statsStream                          │  │
│  │  - supportedProtocols                                  │  │
│  └──────────────────┬─────────────────────────────────────┘  │
│                     │                                         │
│  ┌──────────────────▼─────────────────────────────────────┐  │
│  │           AdapterFactory                               │  │
│  │  create(ProtocolType) → ProtocolAdapter                │  │
│  └──────────────────┬─────────────────────────────────────┘  │
│                     │                                         │
│    ┌────────────────┴────────────────────────────┐           │
│    │                                             │           │
│  ┌─▼────────┐  ┌──────────┐  ┌──────────┐  ┌───▼──────┐    │
│  │OpenVPN   │  │WireGuard │  │ V2Ray/   │  │  GOST    │    │
│  │Adapter   │  │Adapter   │  │ Xray     │  │ Adapter  │    │
│  │          │  │          │  │ Adapter  │  │          │    │
│  └─┬────────┘  └──┬───────┘  └───┬──────┘  └───┬──────┘    │
└────┼────────────────┼─────────────┼─────────────┼───────────┘
     │                │             │             │
     │ wraps          │ wraps       │ wraps       │ wraps
     ▼                ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│              Third-party Flutter Packages                   │
│  ┌───────────┐  ┌───────────┐  ┌──────────┐  ┌──────────┐  │
│  │ openvpn_  │  │wireguard_ │  │flutter_  │  │flutter_  │  │
│  │ flutter   │  │ flutter   │  │v2ray_plus│  │vpn_gost  │  │
│  └─────┬─────┘  └─────┬─────┘  └────┬─────┘  └────┬─────┘  │
└────────┼──────────────┼──────────────┼─────────────┼────────┘
         │              │              │             │
         │ Platform     │ Platform     │ Platform    │ Platform
         │ Channels     │ Channels     │ Channels    │ Channels
         ▼              ▼              ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│                   Native Platform Layer                     │
│  ┌───────────┐  ┌───────────┐  ┌──────────┐  ┌──────────┐  │
│  │Android:   │  │Android:   │  │Android:  │  │Android:  │  │
│  │ics-openvpn│  │WireGuard  │  │Xray core │  │go-gost   │  │
│  ├───────────┤  ├───────────┤  ├──────────┤  ├──────────┤  │
│  │iOS:       │  │iOS:       │  │iOS:      │  │iOS:      │  │
│  │OpenVPN    │  │WireGuard  │  │Xray core │  │go-gost   │  │
│  │Adapter    │  │Swift+Go   │  │          │  │          │  │
│  ├───────────┤  ├───────────┤  ├──────────┤  ├──────────┤  │
│  │Desktop:   │  │Desktop:   │  │Desktop:  │  │Desktop:  │  │
│  │    N/A    │  │WireGuard  │  │Xray core │  │go-gost   │  │
│  │           │  │    Go     │  │          │  │          │  │
│  └───────────┘  └───────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Summary

**flutter_vpn_engine v2.0** станет:

1. **Unified API** для всех VPN протоколов
2. **Protocol-agnostic** - легко добавлять новые протоколы
3. **Cross-platform first** - автоматическая поддержка доступных платформ
4. **Type-safe** - строгая типизация Dart
5. **Battle-tested** - использует проверенные pub.dev пакеты
6. **Backward compatible** - поддержка legacy API

**Вместо того чтобы писать свои драйверы, мы оркестрируем лучшие решения из Flutter ecosystem.**
