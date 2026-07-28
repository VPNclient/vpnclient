# iOS Architecture Summary для flutter_vpn_engine

> Generated: 2025-12-30
> Purpose: Краткое описание iOS специфики

---

## 🍎 Ключевые особенности iOS

### 1. Network Extension = Обязательное требование

**iOS НЕ позволяет** VPN работать в main app процессе. Обязательно использовать **Network Extension**.

```
Main App Process              Network Extension Process
┌──────────────┐             ┌─────────────────────────┐
│ Flutter App  │             │ PacketTunnelProvider    │
│ VpnEngine    │────XPC─────→│ (Swift)                 │
│ (Dart)       │             │  ├─ OpenVPN             │
└──────────────┘             │  ├─ WireGuard           │
                              │  ├─ V2Ray/Xray         │
                              │  └─ GOST                │
                              └─────────────────────────┘
```

### 2. Два targets в Xcode

| Target | Цель | Bundle ID |
|--------|------|-----------|
| **Runner** | Main app (Flutter) | com.example.vpnclient |
| **VpnEngineExtension** | Network Extension (Swift) | com.example.vpnclient.extension |

### 3. Требования

✅ **Apple Developer Account** ($99/year)
✅ **Network Extension capability**
✅ **Provisioning Profiles** для обоих targets
✅ **Code Signing** для app + extension
✅ **App Groups** для IPC
✅ **Физическое устройство** (симулятор не поддерживает VPN)

---

## 📦 Структура файлов iOS

```
ios/
├── Runner/                              # Main app
│   ├── AppDelegate.swift
│   ├── Info.plist
│   └── Runner.entitlements             # ⚠️ Обязательно!
│
├── VpnEngineExtension/                 # Network Extension
│   ├── PacketTunnelProvider.swift      # ⚠️ Главный файл
│   ├── Info.plist                      # ⚠️ Extension config
│   └── VpnEngineExtension.entitlements # ⚠️ Обязательно!
│
├── Podfile                             # CocoaPods dependencies
└── flutter_vpn_engine.podspec          # Plugin spec
```

---

## 🔧 PacketTunnelProvider.swift

Это **сердце** VPN на iOS. Наследуется от `NEPacketTunnelProvider`.

```swift
class PacketTunnelProvider: NEPacketTunnelProvider {

    // Вызывается при startVPN()
    override func startTunnel(
        options: [String : NSObject]?,
        completionHandler: @escaping (Error?) -> Void
    ) {
        // Получить конфигурацию из Flutter app
        let config = (protocolConfiguration as? NETunnelProviderProtocol)?.providerConfiguration

        // Выбрать протокол (OpenVPN, WireGuard, V2Ray, GOST)
        switch protocolType {
        case "openVpn":
            startOpenVpn(config, completionHandler)
        case "wireGuard":
            startWireGuard(config, completionHandler)
        // ...
        }
    }

    // Вызывается при stopVPN()
    override func stopTunnel(
        with reason: NEProviderStopReason,
        completionHandler: @escaping () -> Void
    ) {
        // Остановить VPN
        adapter?.disconnect()
        completionHandler()
    }
}
```

---

## 🔐 Entitlements (критично!)

### Runner.entitlements

```xml
<dict>
    <!-- Network Extension capability -->
    <key>com.apple.developer.networking.networkextension</key>
    <array>
        <string>packet-tunnel-provider</string>
    </array>

    <!-- App Groups для IPC -->
    <key>com.apple.security.application-groups</key>
    <array>
        <string>group.com.example.vpnclient</string>
    </array>
</dict>
```

### VpnEngineExtension.entitlements

```xml
<dict>
    <!-- То же самое! -->
    <key>com.apple.developer.networking.networkextension</key>
    <array>
        <string>packet-tunnel-provider</string>
    </array>

    <key>com.apple.security.application-groups</key>
    <array>
        <string>group.com.example.vpnclient</string>
    </array>
</dict>
```

⚠️ **ВАЖНО:** App Group ID должен быть **одинаковым** в обоих targets!

---

## 📱 Поддерживаемые протоколы на iOS

| Протокол | Библиотека | Статус | Примечания |
|----------|-----------|--------|------------|
| **OpenVPN** | OpenVPNAdapter (CocoaPods) | ✅ Готово | openvpn_flutter использует |
| **WireGuard** | WireGuardKit (CocoaPods) | ✅ Готово | wireguard_flutter использует |
| **V2Ray/Xray** | Xray Core (Go binary) | ✅ Готово | flutter_v2ray_plus использует |
| **IKEv2/IPsec** | NEVPNManager (system) | ✅ Готово | flutter_vpn использует |
| **SSTP** | Custom implementation | ✅ Готово | sstp_flutter использует |
| **GOST** | go-gost (Go binary) | 🔶 Требует интеграции | flutter_vpn_gost |

---

## 🛠️ CocoaPods Dependencies

```ruby
# Podfile

target 'Runner' do
  use_frameworks!
  flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))
end

target 'VpnEngineExtension' do
  use_frameworks!

  # OpenVPN
  pod 'OpenVPNAdapter', '~> 0.8.0'

  # WireGuard
  pod 'WireGuardKit', '~> 1.0'

  # V2Ray/Xray (опционально, если нужен напрямую)
  # pod 'Libbox', :git => 'https://github.com/SagerNet/sing-box.git'
end
```

**После изменений:**
```bash
cd ios
pod install
```

---

## 🚀 Workflow разработки

### 1. Создание Extension в Xcode

```
Xcode → File → New → Target → Network Extension
Name: VpnEngineExtension
Bundle ID: com.yourcompany.app.VpnEngineExtension
```

### 2. Настройка Capabilities

**Для обоих targets (Runner + VpnEngineExtension):**
- ✅ Signing & Capabilities → + Capability → Network Extensions
  - Выбрать: Packet Tunnel
- ✅ Signing & Capabilities → + Capability → App Groups
  - Add: group.com.yourcompany.vpnclient

### 3. Provisioning Profiles

На developer.apple.com создать:
1. **App ID** для main app (com.example.vpnclient)
   - Enable: Network Extensions, App Groups
2. **App ID** для extension (com.example.vpnclient.extension)
   - Enable: Network Extensions, App Groups
3. **Provisioning Profiles** для обоих

### 4. Build & Run

```bash
# ВАЖНО: Только на физическом устройстве!
flutter run --release
```

---

## ⚠️ Распространенные ошибки

### ❌ "Failed to start tunnel"

**Причины:**
- Отсутствуют entitlements
- Неправильный Bundle ID
- Provisioning profile не содержит Network Extension capability
- Код не подписан правильно

**Решение:**
1. Проверить entitlements файлы
2. Убедиться что provisioning profiles правильные
3. Clean build folder: Xcode → Product → Clean Build Folder
4. Пересоздать provisioning profiles

### ❌ "Extension не запускается"

**Причины:**
- NSExtensionPointIdentifier неправильный в Info.plist
- NSExtensionPrincipalClass не указывает на PacketTunnelProvider
- Bundle ID extension не соответствует в Xcode и Info.plist

**Решение:**
Проверить `VpnEngineExtension/Info.plist`:
```xml
<key>NSExtensionPointIdentifier</key>
<string>com.apple.networkextension.packet-tunnel</string>

<key>NSExtensionPrincipalClass</key>
<string>$(PRODUCT_MODULE_NAME).PacketTunnelProvider</string>
```

### ❌ "Simulator не поддерживает VPN"

**Причина:** iOS Simulator не может запускать Network Extensions.

**Решение:** Использовать **только физическое устройство**.

### ❌ "IPC между app и extension не работает"

**Причины:**
- Разные App Group IDs в app и extension
- Отсутствует entitlement для App Groups

**Решение:**
Убедиться что `group.com.example.vpnclient` одинаковый в:
- Runner.entitlements
- VpnEngineExtension.entitlements
- Xcode Capabilities для обоих targets

---

## 📊 Архитектура IPC (Inter-Process Communication)

iOS использует **XPC** для связи между app и extension:

```
Flutter App                  iOS System              Network Extension
──────────────────────────────────────────────────────────────────────
VpnEngine.connect()
    │
    ├─> Method Channel
    │       │
    │       ▼
    │   VpnEnginePlugin.swift
    │       │
    │       ├─> NEVPNManager.loadFromPreferences()
    │       │
    │       ├─> NETunnelProviderProtocol.providerConfiguration = config
    │       │                                   │
    │       └─> manager.connection.startVPNTunnel()
    │                                           │
    │                                           ▼
    │                                    iOS System запускает extension
    │                                           │
    │                                           ▼
    │                              PacketTunnelProvider.startTunnel()
    │                                           │
    │                                           ├─> Получить config
    │                                           ├─> Выбрать протокол
    │                                           └─> Запустить VPN
    │
    ◀─── Status updates ──────────────────────────── observeStatus()
```

---

## 🎯 Итого: iOS Checklist

Перед запуском на iOS убедитесь:

- [ ] ✅ Apple Developer Account активен
- [ ] ✅ Network Extension target создан в Xcode
- [ ] ✅ Bundle IDs правильные (app + extension)
- [ ] ✅ Entitlements файлы созданы для обоих targets
- [ ] ✅ App Groups настроены одинаково
- [ ] ✅ Provisioning Profiles созданы для обоих targets
- [ ] ✅ Code Signing настроен
- [ ] ✅ CocoaPods зависимости установлены (`pod install`)
- [ ] ✅ PacketTunnelProvider.swift реализован
- [ ] ✅ Тестируем на **физическом устройстве** (не simulator!)

---

## 📚 Дополнительные ресурсы

- [Apple: Network Extension Programming Guide](https://developer.apple.com/documentation/networkextension)
- [Apple: NEPacketTunnelProvider](https://developer.apple.com/documentation/networkextension/nepackettunnelprovider)
- [OpenVPNAdapter GitHub](https://github.com/ss-abramchuk/OpenVPNAdapter)
- [WireGuardKit GitHub](https://github.com/WireGuard/wireguard-apple)
