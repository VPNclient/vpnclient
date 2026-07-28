# TUN Driver & Mode Selection Strategy

> Generated: 2025-12-30
> Purpose: Выбор драйвера TUN и режима работы (VPN vs Proxy)

---

## 🎯 Проблема: Двухуровневая архитектура

### Уровень 1: Режим работы

```
VPN Mode                      Proxy Mode
────────────                  ────────────
Весь трафик через VPN    →    Только app трафик через proxy
Требует TUN driver       →    TUN НЕ нужен
System-wide              →    Per-app или system proxy
```

### Уровень 2: TUN Driver (только для VPN mode)

```
HevSocks5 Tunnel          Tun2Socks              Direct (No Driver)
────────────────          ──────────             ──────────────────
SOCKS5 proxy layer   →    Generic tun2socks  →   Прямой доступ к TUN
Легковесный          →    Универсальный      →   Максимальная производительность
```

---

## 1. Архитектура с режимами и драйверами

```
┌─────────────────────────────────────────────────────┐
│                VpnConfig                            │
│  ┌───────────────────────────────────────────────┐  │
│  │ mode: VpnMode (vpn / proxy)                   │  │
│  │ tunDriver: TunDriverType? (для VPN mode)      │  │
│  │ implementation: String? (xray_1.8.4)          │  │
│  └───────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────┘
                     │
         ┌───────────┴──────────┐
         ▼                      ▼
    ┌─────────┐           ┌─────────┐
    │VPN Mode │           │Proxy    │
    │         │           │Mode     │
    └────┬────┘           └────┬────┘
         │                     │
    ┌────▼────────┐            │
    │TUN Driver:  │            │
    │ • HevSocks5 │            │ (No TUN driver)
    │ • Tun2Socks │            │
    │ • Direct    │            │
    │ • Auto      │            │
    └─────────────┘            │
         │                     │
         └──────────┬──────────┘
                    ▼
         ┌────────────────────┐
         │ Protocol Core      │
         │ (Xray, SingBox,    │
         │  flutter_v2ray,    │
         │  etc.)             │
         └────────────────────┘
```

---

## 2. VpnMode enum

### Файл: `lib/src/models/vpn_mode.dart`

```dart
/// Режим работы VPN
enum VpnMode {
  /// VPN режим - весь трафик через TUN
  vpn,

  /// Proxy режим - только app трафик
  proxy,

  /// Авто-выбор на основе платформы и конфигурации
  auto,
}

extension VpnModeExtension on VpnMode {
  /// Требуется ли TUN driver для этого режима
  bool get requiresTunDriver {
    switch (this) {
      case VpnMode.vpn:
        return true;
      case VpnMode.proxy:
        return false;
      case VpnMode.auto:
        return false; // Определится динамически
    }
  }

  String get displayName {
    switch (this) {
      case VpnMode.vpn:
        return 'VPN Mode (System-wide)';
      case VpnMode.proxy:
        return 'Proxy Mode (App-only)';
      case VpnMode.auto:
        return 'Auto';
    }
  }
}
```

---

## 3. TunDriverType enum

### Файл: `lib/src/models/tun_driver_type.dart`

```dart
/// Типы TUN драйверов (только для VPN mode)
enum TunDriverType {
  /// HevSocks5 Tunnel (легковесный, SOCKS5 based)
  hevSocks5,

  /// Tun2Socks (универсальный)
  tun2socks,

  /// Прямой доступ к TUN (без промежуточного драйвера)
  /// Используется когда ядро само умеет работать с TUN (SingBox, etc.)
  direct,

  /// Авто-выбор лучшего драйвера
  auto,

  /// Без драйвера (для proxy mode или когда TUN не нужен)
  none,
}

extension TunDriverTypeExtension on TunDriverType {
  String get displayName {
    switch (this) {
      case TunDriverType.hevSocks5:
        return 'HevSocks5 Tunnel';
      case TunDriverType.tun2socks:
        return 'Tun2Socks';
      case TunDriverType.direct:
        return 'Direct TUN';
      case TunDriverType.auto:
        return 'Auto';
      case TunDriverType.none:
        return 'None (Proxy mode)';
    }
  }

  /// Поддерживаемые платформы для этого драйвера
  List<TargetPlatform> get supportedPlatforms {
    switch (this) {
      case TunDriverType.hevSocks5:
        return [
          TargetPlatform.android,
          TargetPlatform.iOS,
          TargetPlatform.linux,
          TargetPlatform.macOS,
          TargetPlatform.windows,
        ];
      case TunDriverType.tun2socks:
        return [
          TargetPlatform.android,
          TargetPlatform.linux,
          TargetPlatform.macOS,
          TargetPlatform.windows,
        ];
      case TunDriverType.direct:
        return [
          TargetPlatform.android,
          TargetPlatform.iOS,
          TargetPlatform.linux,
          TargetPlatform.macOS,
          TargetPlatform.windows,
        ];
      case TunDriverType.auto:
      case TunDriverType.none:
        return TargetPlatform.values;
    }
  }
}
```

---

## 4. Обновленный VpnConfig

### Файл: `lib/src/models/vpn_config.dart`

```dart
class VpnConfig {
  final ProtocolType protocol;
  final ProtocolConfig protocolConfig;

  // ========== Режим работы ==========
  /// Режим: VPN (system-wide) или Proxy (app-only)
  final VpnMode mode;

  // ========== TUN Driver (только для VPN mode) ==========
  /// Тип TUN драйвера (игнорируется в Proxy mode)
  final TunDriverType tunDriver;

  /// Стратегия выбора TUN драйвера
  final SelectionStrategy tunDriverStrategy;

  /// Ручной выбор конкретного драйвера
  final String? preferredTunDriver; // "hevSocks5_v1.2", "tun2socks_v2.5"

  // ========== Protocol Implementation ==========
  /// Стратегия выбора реализации протокола
  final SelectionStrategy implementationStrategy;

  /// Ручной выбор реализации
  final String? preferredImplementation; // "xray_1.8.4"

  /// Feature requirements
  final Set<String> requiredFeatures;

  /// Version constraints
  final String? minimumCoreVersion;
  final String? maximumCoreVersion;

  /// Fallback chain
  final List<String>? fallbackChain;

  VpnConfig({
    required this.protocol,
    required this.protocolConfig,

    // Mode
    this.mode = VpnMode.auto,

    // TUN Driver
    this.tunDriver = TunDriverType.auto,
    this.tunDriverStrategy = SelectionStrategy.auto,
    this.preferredTunDriver,

    // Implementation
    this.implementationStrategy = SelectionStrategy.auto,
    this.preferredImplementation,
    this.requiredFeatures = const {},
    this.minimumCoreVersion,
    this.maximumCoreVersion,
    this.fallbackChain,
  });

  /// Валидация конфигурации
  void validate() {
    // Если mode = proxy, tunDriver должен быть none
    if (mode == VpnMode.proxy && tunDriver != TunDriverType.none) {
      throw ArgumentError(
        'TUN driver должен быть "none" в Proxy mode. '
        'Получено: $tunDriver',
      );
    }

    // Если mode = vpn, tunDriver не должен быть none
    if (mode == VpnMode.vpn && tunDriver == TunDriverType.none) {
      throw ArgumentError(
        'TUN driver обязателен в VPN mode. '
        'Используйте auto или укажите конкретный драйвер.',
      );
    }
  }
}
```

---

## 5. Mode & Driver Selector

### Файл: `lib/src/engine/mode_driver_selector.dart`

```dart
class ModeDriverSelector {
  /// Определить режим и драйвер автоматически
  Future<ModeDriverSelection> selectAuto(
    VpnConfig config,
    DeviceInfo deviceInfo,
  ) async {
    // 1. Определить режим
    final mode = await _selectMode(config, deviceInfo);

    // 2. Если VPN mode - выбрать TUN driver
    TunDriverType? tunDriver;
    if (mode == VpnMode.vpn) {
      tunDriver = await _selectTunDriver(config, deviceInfo);
    } else {
      tunDriver = TunDriverType.none;
    }

    // 3. Выбрать реализацию протокола
    final implementation = await _selectImplementation(
      config,
      deviceInfo,
      mode,
      tunDriver,
    );

    return ModeDriverSelection(
      mode: mode,
      tunDriver: tunDriver,
      implementation: implementation,
    );
  }

  /// Выбор режима
  Future<VpnMode> _selectMode(
    VpnConfig config,
    DeviceInfo deviceInfo,
  ) async {
    if (config.mode != VpnMode.auto) {
      return config.mode;
    }

    // Эвристики для auto-mode:

    // iOS App Store часто требует объяснения зачем нужен VPN
    // Proxy mode проще в одобрении
    if (Platform.isIOS && await _isAppStoreVersion()) {
      return VpnMode.proxy;
    }

    // На Android некоторые производители блокируют VPN API
    if (Platform.isAndroid && deviceInfo.manufacturer == 'Huawei') {
      // Huawei без Google Services может блокировать VPN
      return VpnMode.proxy;
    }

    // Desktop по умолчанию VPN mode (больше прав у пользователя)
    if (Platform.isLinux || Platform.isMacOS || Platform.isWindows) {
      return VpnMode.vpn;
    }

    // По умолчанию VPN mode (более безопасный)
    return VpnMode.vpn;
  }

  /// Выбор TUN драйвера
  Future<TunDriverType> _selectTunDriver(
    VpnConfig config,
    DeviceInfo deviceInfo,
  ) async {
    if (config.tunDriver != TunDriverType.auto) {
      return config.tunDriver;
    }

    // Проверка какие ядра поддерживают Direct TUN
    final implementation = config.preferredImplementation;
    final supportsDirectTun = _supportsDirectTun(implementation);

    if (supportsDirectTun) {
      // SingBox, некоторые версии Xray поддерживают Direct TUN
      return TunDriverType.direct;
    }

    // Эвристики:

    // iOS всегда используем HevSocks5 (лучше работает с NetworkExtension)
    if (Platform.isIOS) {
      return TunDriverType.hevSocks5;
    }

    // Android на Snapdragon чипах - HevSocks5 (лучше производительность)
    if (Platform.isAndroid &&
        deviceInfo.chipset?.contains('Snapdragon') == true) {
      return TunDriverType.hevSocks5;
    }

    // Android на MediaTek - Tun2Socks (меньше багов)
    if (Platform.isAndroid &&
        deviceInfo.chipset?.contains('MediaTek') == true) {
      return TunDriverType.tun2socks;
    }

    // Desktop - Tun2Socks (более универсальный)
    if (Platform.isLinux || Platform.isMacOS || Platform.isWindows) {
      return TunDriverType.tun2socks;
    }

    // Fallback
    return TunDriverType.hevSocks5;
  }

  bool _supportsDirectTun(String? implementation) {
    if (implementation == null) return false;

    // SingBox всегда поддерживает Direct TUN
    if (implementation.startsWith('singbox')) {
      return true;
    }

    // Xray 1.8+ с правильной конфигурацией
    if (implementation.startsWith('xray')) {
      final version = implementation.split('_').last;
      return _compareVersions(version, '1.8.0') >= 0;
    }

    return false;
  }

  /// Выбор реализации с учетом mode и driver
  Future<ImplementationProvider?> _selectImplementation(
    VpnConfig config,
    DeviceInfo deviceInfo,
    VpnMode mode,
    TunDriverType? tunDriver,
  ) async {
    final implementations = ImplementationRegistry.getImplementations(
      config.protocol,
    );

    // Фильтр по поддержке режима
    final compatibleImpls = implementations.where((impl) {
      // Proxy mode поддерживают все
      if (mode == VpnMode.proxy) {
        return impl.supportsProxyMode;
      }

      // VPN mode с конкретным драйвером
      if (mode == VpnMode.vpn && tunDriver != null) {
        return impl.supportsTunDriver(tunDriver);
      }

      return true;
    }).toList();

    // Стандартный селектор
    final selector = ImplementationSelector(
      strategy: config.implementationStrategy,
      manualImplementationId: config.preferredImplementation,
    );

    return await selector.select(
      config.protocol,
      deviceInfo: deviceInfo,
      availableImplementations: compatibleImpls,
    );
  }
}

class ModeDriverSelection {
  final VpnMode mode;
  final TunDriverType? tunDriver;
  final ImplementationProvider? implementation;

  ModeDriverSelection({
    required this.mode,
    this.tunDriver,
    this.implementation,
  });

  @override
  String toString() {
    return 'Mode: ${mode.displayName}, '
           'TUN Driver: ${tunDriver?.displayName ?? 'None'}, '
           'Implementation: ${implementation?.displayName ?? 'None'}';
  }
}
```

---

## 6. Implementation с поддержкой режимов

### Расширенный ImplementationProvider

```dart
abstract class ImplementationProvider {
  // ... existing fields ...

  /// Поддержка Proxy режима
  bool get supportsProxyMode;

  /// Поддержка VPN режима
  bool get supportsVpnMode;

  /// Поддерживаемые TUN драйверы (для VPN mode)
  List<TunDriverType> get supportedTunDrivers;

  /// Проверка поддержки конкретного TUN драйвера
  bool supportsTunDriver(TunDriverType driver) {
    return supportedTunDrivers.contains(driver);
  }
}
```

### Пример реализации

```dart
class XrayImplementation extends ImplementationProvider {
  // ...

  @override
  bool get supportsProxyMode => true; // Xray поддерживает SOCKS/HTTP proxy

  @override
  bool get supportsVpnMode => true; // Xray поддерживает TUN

  @override
  List<TunDriverType> get supportedTunDrivers {
    // Xray 1.8+ может работать напрямую с TUN
    if (_versionGreaterOrEqual('1.8.0')) {
      return [
        TunDriverType.direct,
        TunDriverType.hevSocks5,
        TunDriverType.tun2socks,
      ];
    }

    // Старые версии требуют SOCKS драйвер
    return [
      TunDriverType.hevSocks5,
      TunDriverType.tun2socks,
    ];
  }
}

class SingBoxImplementation extends ImplementationProvider {
  // ...

  @override
  bool get supportsProxyMode => true;

  @override
  bool get supportsVpnMode => true;

  @override
  List<TunDriverType> get supportedTunDrivers {
    // SingBox ВСЕГДА работает напрямую с TUN
    return [TunDriverType.direct];
  }
}

class OpenVpnImplementation extends ImplementationProvider {
  // ...

  @override
  bool get supportsProxyMode => false; // OpenVPN только VPN mode

  @override
  bool get supportsVpnMode => true;

  @override
  List<TunDriverType> get supportedTunDrivers {
    // OpenVPN имеет собственный TUN driver
    return [TunDriverType.direct];
  }
}
```

---

## 7. Примеры использования

### Пример 1: VPN mode с auto драйвером

```dart
final config = VpnConfig(
  protocol: ProtocolType.vmess,
  protocolConfig: VMessConfig.fromUrl(url),
  mode: VpnMode.vpn,           // VPN mode
  tunDriver: TunDriverType.auto, // Auto-select драйвер
);

await VpnEngine.instance.initialize(config);
await VpnEngine.instance.connect();

// Узнать что выбрано
print(VpnEngine.instance.currentMode);        // VpnMode.vpn
print(VpnEngine.instance.currentTunDriver);   // TunDriverType.hevSocks5
print(VpnEngine.instance.currentImplementation); // "xray_1.8.4"
```

### Пример 2: Proxy mode (без TUN)

```dart
final config = VpnConfig(
  protocol: ProtocolType.vmess,
  protocolConfig: VMessConfig.fromUrl(url),
  mode: VpnMode.proxy,           // Proxy mode
  tunDriver: TunDriverType.none, // TUN не нужен
);

await VpnEngine.instance.initialize(config);
await VpnEngine.instance.connect();

// В proxy mode трафик идет только от app, не system-wide
```

### Пример 3: Ручной выбор драйвера

```dart
final config = VpnConfig(
  protocol: ProtocolType.vless,
  protocolConfig: VLessConfig(/* ... */),
  mode: VpnMode.vpn,
  tunDriver: TunDriverType.tun2socks, // Конкретный драйвер
  tunDriverStrategy: SelectionStrategy.manual,
);
```

### Пример 4: SingBox с Direct TUN

```dart
final config = VpnConfig(
  protocol: ProtocolType.vmess,
  protocolConfig: VMessConfig.fromUrl(url),
  mode: VpnMode.vpn,
  tunDriver: TunDriverType.direct, // Прямой доступ к TUN
  preferredImplementation: 'singbox_1.6.0', // SingBox поддерживает
);
```

### Пример 5: Auto mode (умный выбор)

```dart
final config = VpnConfig(
  protocol: ProtocolType.trojan,
  protocolConfig: TrojanConfig(/* ... */),
  mode: VpnMode.auto,              // Auto-select режим
  tunDriver: TunDriverType.auto,   // Auto-select драйвер
);

// На iOS App Store version → Proxy mode
// На Android Snapdragon → VPN mode + HevSocks5
// На Desktop → VPN mode + Tun2Socks
```

---

## 8. UI для выбора режима и драйвера

```dart
class VpnConfigWidget extends StatefulWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Выбор режима
        Text('Mode:'),
        SegmentedButton<VpnMode>(
          segments: [
            ButtonSegment(
              value: VpnMode.auto,
              label: Text('Auto'),
              icon: Icon(Icons.auto_awesome),
            ),
            ButtonSegment(
              value: VpnMode.vpn,
              label: Text('VPN'),
              icon: Icon(Icons.vpn_lock),
            ),
            ButtonSegment(
              value: VpnMode.proxy,
              label: Text('Proxy'),
              icon: Icon(Icons.proxy),
            ),
          ],
          selected: {_selectedMode},
          onSelectionChanged: (modes) {
            setState(() => _selectedMode = modes.first);
          },
        ),

        SizedBox(height: 16),

        // Выбор TUN драйвера (только если VPN mode)
        if (_selectedMode == VpnMode.vpn) ...[
          Text('TUN Driver:'),
          DropdownButton<TunDriverType>(
            value: _selectedTunDriver,
            items: [
              DropdownMenuItem(
                value: TunDriverType.auto,
                child: Text('Auto (recommended)'),
              ),
              DropdownMenuItem(
                value: TunDriverType.hevSocks5,
                child: Text('HevSocks5 Tunnel'),
              ),
              DropdownMenuItem(
                value: TunDriverType.tun2socks,
                child: Text('Tun2Socks'),
              ),
              DropdownMenuItem(
                value: TunDriverType.direct,
                child: Text('Direct TUN (SingBox only)'),
              ),
            ],
            onChanged: (driver) {
              setState(() => _selectedTunDriver = driver!);
            },
          ),
        ],

        SizedBox(height: 16),

        // Выбор реализации
        Text('Implementation:'),
        DropdownButton<String>(
          value: _selectedImplementation,
          items: _getCompatibleImplementations().map((impl) {
            return DropdownMenuItem(
              value: impl.implementationId,
              child: Text(impl.displayName),
            );
          }).toList(),
          onChanged: (implId) {
            setState(() => _selectedImplementation = implId);
          },
        ),

        // Info card
        if (_selectedMode == VpnMode.vpn)
          InfoCard(
            icon: Icons.info_outline,
            text: 'VPN mode routes all system traffic through VPN. '
                  'Requires VPN permission.',
          )
        else
          InfoCard(
            icon: Icons.info_outline,
            text: 'Proxy mode routes only app traffic. '
                  'No VPN permission needed.',
          ),
      ],
    );
  }

  List<ImplementationProvider> _getCompatibleImplementations() {
    final allImpls = ImplementationRegistry.getImplementations(_protocol);

    return allImpls.where((impl) {
      // Фильтр по режиму
      if (_selectedMode == VpnMode.vpn && !impl.supportsVpnMode) {
        return false;
      }
      if (_selectedMode == VpnMode.proxy && !impl.supportsProxyMode) {
        return false;
      }

      // Фильтр по TUN драйверу
      if (_selectedMode == VpnMode.vpn &&
          _selectedTunDriver != TunDriverType.auto) {
        if (!impl.supportsTunDriver(_selectedTunDriver)) {
          return false;
        }
      }

      return true;
    }).toList();
  }
}
```

---

## 9. Матрица поддержки

| Implementation | Proxy Mode | VPN Mode | HevSocks5 | Tun2Socks | Direct TUN |
|----------------|------------|----------|-----------|-----------|------------|
| **Xray 1.7.5** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Xray 1.8.0+** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **SingBox** | ✅ | ✅ | ❌ | ❌ | ✅ (only) |
| **flutter_v2ray_plus** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **OpenVPN** | ❌ | ✅ | ❌ | ❌ | ✅ (own) |
| **WireGuard** | ❌ | ✅ | ❌ | ❌ | ✅ (own) |
| **GOST** | ✅ | ✅ | ✅ | ✅ | 🔶 |

---

## 10. Fallback Chain с режимами

```dart
final config = VpnConfig(
  protocol: ProtocolType.vmess,
  protocolConfig: VMessConfig.fromUrl(url),
  mode: VpnMode.vpn,

  // Fallback chain: сначала Direct TUN, потом SOCKS драйверы
  fallbackChain: [
    // Попробовать SingBox с Direct TUN
    FallbackEntry(
      implementation: 'singbox_1.6.0',
      tunDriver: TunDriverType.direct,
    ),
    // Fallback на Xray 1.8.4 с Direct TUN
    FallbackEntry(
      implementation: 'xray_1.8.4',
      tunDriver: TunDriverType.direct,
    ),
    // Fallback на Xray 1.8.4 с HevSocks5
    FallbackEntry(
      implementation: 'xray_1.8.4',
      tunDriver: TunDriverType.hevSocks5,
    ),
    // Last resort: Proxy mode
    FallbackEntry(
      implementation: 'xray_1.8.4',
      mode: VpnMode.proxy,
      tunDriver: TunDriverType.none,
    ),
  ],
);
```

---

## Summary

**Решение поддерживает:**

1. ✅ **Два режима**: VPN mode (system-wide) и Proxy mode (app-only)
2. ✅ **Три типа TUN драйверов**: HevSocks5, Tun2Socks, Direct
3. ✅ **Автоматический выбор** режима и драйвера на основе:
   - Платформы (iOS, Android, Desktop)
   - Device info (chipset, manufacturer)
   - Возможностей реализации (SingBox = Direct TUN)
4. ✅ **Ручной выбор** пользователем
5. ✅ **Валидация**: Proxy mode требует tunDriver = none
6. ✅ **Fallback chain** с режимами и драйверами

**Для вашего случая:**
```dart
// VPN mode с HevSocks5
VpnConfig(mode: VpnMode.vpn, tunDriver: TunDriverType.hevSocks5)

// VPN mode с Tun2Socks
VpnConfig(mode: VpnMode.vpn, tunDriver: TunDriverType.tun2socks)

// VPN mode с Direct TUN (SingBox)
VpnConfig(mode: VpnMode.vpn, tunDriver: TunDriverType.direct,
          preferredImplementation: 'singbox_1.6.0')

// Proxy mode (без TUN)
VpnConfig(mode: VpnMode.proxy, tunDriver: TunDriverType.none)
```
