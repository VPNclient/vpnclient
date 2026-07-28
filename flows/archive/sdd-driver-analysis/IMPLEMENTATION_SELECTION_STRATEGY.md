# Implementation Selection Strategy

> Generated: 2025-12-30
> Purpose: Решение проблемы выбора оптимальной реализации протокола для конкретного устройства

---

## 🎯 Проблема

На разных устройствах **одной платформы** разные реализации одного протокола могут иметь **разную производительность**:

```
Устройство A (Android 12, Snapdragon 888):
  VMess через libxray → 100 Mbps ✅
  VMess через v2ray_plus → 50 Mbps ⚠️
  VMess через sing-box → 80 Mbps 🔶

Устройство B (Android 11, MediaTek):
  VMess через libxray → 40 Mbps ⚠️
  VMess через v2ray_plus → 90 Mbps ✅
  VMess через sing-box → 60 Mbps 🔶
```

**Причины различий:**
- CPU архитектура (ARM, x86, RISC-V)
- OS версия и kernel
- Аппаратное ускорение (AES-NI, NEON)
- Драйверы и firmware
- Доступная память

---

## ✅ Решение: Multi-Implementation Architecture

### Концепция: Multiple Implementations per Protocol

```
┌─────────────────────────────────────────────────────┐
│               VpnEngine API                         │
│  connect(protocol: ProtocolType, config: Config)    │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│        ImplementationSelector                       │
│  • Auto-detect best implementation                  │
│  • Allow manual override                            │
│  • Fallback chain                                   │
└────────────────────┬────────────────────────────────┘
                     │
         ┌───────────┴──────────┬──────────────┐
         ▼                      ▼              ▼
    ┌─────────┐          ┌─────────┐    ┌─────────┐
    │libxray  │          │v2ray_   │    │sing-box │
    │Adapter  │          │plus     │    │Adapter  │
    │         │          │Adapter  │    │         │
    └─────────┘          └─────────┘    └─────────┘
      (impl 1)             (impl 2)       (impl 3)
```

---

## 1. Архитектура: Implementation Registry

### Файл: `lib/src/engine/implementation_registry.dart`

```dart
/// Реестр доступных реализаций для каждого протокола
class ImplementationRegistry {
  static final Map<ProtocolType, List<ImplementationProvider>> _registry = {};

  /// Регистрация реализации
  static void register(
    ProtocolType protocol,
    ImplementationProvider provider,
  ) {
    _registry.putIfAbsent(protocol, () => []);
    _registry[protocol]!.add(provider);
  }

  /// Получить все доступные реализации для протокола
  static List<ImplementationProvider> getImplementations(
    ProtocolType protocol,
  ) {
    return _registry[protocol] ?? [];
  }

  /// Инициализация встроенных реализаций
  static void initialize() {
    // V2Ray/Xray реализации
    register(ProtocolType.vmess, LibxrayImplementation());
    register(ProtocolType.vmess, V2RayPlusImplementation());
    register(ProtocolType.vmess, SingBoxImplementation());

    register(ProtocolType.vless, LibxrayImplementation());
    register(ProtocolType.vless, V2RayPlusImplementation());
    register(ProtocolType.vless, SingBoxImplementation());

    register(ProtocolType.trojan, LibxrayImplementation());
    register(ProtocolType.trojan, V2RayPlusImplementation());
    register(ProtocolType.trojan, SingBoxImplementation());

    // OpenVPN (обычно одна реализация)
    register(ProtocolType.openVpn, OpenVpnFlutterImplementation());

    // WireGuard (может быть kernel vs userspace)
    register(ProtocolType.wireGuard, WireGuardKernelImplementation());
    register(ProtocolType.wireGuard, WireGuardUserspaceImplementation());

    // GOST (может быть разные версии)
    register(ProtocolType.gost, GostImplementation());
  }
}
```

---

## 2. Implementation Provider Interface

### Файл: `lib/src/models/implementation_provider.dart`

```dart
/// Базовый интерфейс для провайдера реализации
abstract class ImplementationProvider {
  /// Уникальный ID реализации
  String get implementationId;

  /// Человеко-читаемое имя
  String get displayName;

  /// Версия реализации
  String get version;

  /// Поддерживаемые платформы
  List<TargetPlatform> get supportedPlatforms;

  /// Минимальная версия OS
  Map<TargetPlatform, String> get minimumOsVersion;

  /// Приоритет (больше = выше приоритет)
  int get priority;

  /// Проверка доступности на текущем устройстве
  Future<bool> isAvailable();

  /// Benchmark производительности (опционально)
  Future<PerformanceMetrics>? benchmark();

  /// Создание adapter для этой реализации
  ProtocolAdapter createAdapter();
}

/// Метрики производительности
class PerformanceMetrics {
  final double throughputMbps;  // Пропускная способность
  final int latencyMs;          // Задержка
  final double cpuUsagePercent; // Использование CPU
  final int memoryMb;           // Использование памяти

  // Общий score (выше = лучше)
  double get score =>
    (throughputMbps / 100) * 0.5 +      // 50% вес
    (100 - latencyMs) / 100 * 0.3 +     // 30% вес
    (100 - cpuUsagePercent) / 100 * 0.2; // 20% вес
}
```

---

## 3. Примеры реализаций

### Файл: `lib/src/implementations/libxray_implementation.dart`

```dart
class LibxrayImplementation extends ImplementationProvider {
  @override
  String get implementationId => 'libxray';

  @override
  String get displayName => 'LibXray Core';

  @override
  String get version => '1.8.0';

  @override
  List<TargetPlatform> get supportedPlatforms => [
    TargetPlatform.android,
    TargetPlatform.iOS,
    TargetPlatform.linux,
    TargetPlatform.macOS,
    TargetPlatform.windows,
  ];

  @override
  Map<TargetPlatform, String> get minimumOsVersion => {
    TargetPlatform.android: '5.0',
    TargetPlatform.iOS: '12.0',
  };

  @override
  int get priority => 100; // Высокий приоритет по умолчанию

  @override
  Future<bool> isAvailable() async {
    // Проверка доступности libxray
    try {
      // Попытка загрузить библиотеку
      await _loadLibxrayCore();
      return true;
    } catch (e) {
      return false;
    }
  }

  @override
  Future<PerformanceMetrics>? benchmark() async {
    // Опционально: quick benchmark
    // Например, тест скорости шифрования
    final startTime = DateTime.now();

    // Simulate encryption test
    final testData = Uint8List(1024 * 1024); // 1MB
    await _testEncryption(testData);

    final duration = DateTime.now().difference(startTime);

    return PerformanceMetrics(
      throughputMbps: 1000.0 / duration.inMilliseconds,
      latencyMs: duration.inMilliseconds,
      cpuUsagePercent: await _getCpuUsage(),
      memoryMb: await _getMemoryUsage(),
    );
  }

  @override
  ProtocolAdapter createAdapter() {
    return LibxrayAdapter();
  }
}
```

### Файл: `lib/src/implementations/v2ray_plus_implementation.dart`

```dart
class V2RayPlusImplementation extends ImplementationProvider {
  @override
  String get implementationId => 'v2ray_plus';

  @override
  String get displayName => 'V2Ray Plus (flutter_v2ray_plus)';

  @override
  String get version => '1.0.15';

  @override
  List<TargetPlatform> get supportedPlatforms => [
    TargetPlatform.android,
    TargetPlatform.iOS,
  ];

  @override
  int get priority => 90; // Чуть ниже libxray

  @override
  Future<bool> isAvailable() async {
    // Проверка flutter_v2ray_plus
    return Platform.isAndroid || Platform.isIOS;
  }

  @override
  ProtocolAdapter createAdapter() {
    return V2RayPlusAdapter();
  }
}
```

---

## 4. Implementation Selector

### Файл: `lib/src/engine/implementation_selector.dart`

```dart
/// Стратегия выбора реализации
enum SelectionStrategy {
  /// Автоматический выбор лучшей
  auto,

  /// По приоритету (priority field)
  byPriority,

  /// По benchmark производительности
  byBenchmark,

  /// Ручной выбор пользователем
  manual,
}

/// Селектор реализации протокола
class ImplementationSelector {
  final SelectionStrategy strategy;
  final String? manualImplementationId; // Для manual стратегии

  ImplementationSelector({
    this.strategy = SelectionStrategy.auto,
    this.manualImplementationId,
  });

  /// Выбрать лучшую реализацию для протокола
  Future<ImplementationProvider?> select(
    ProtocolType protocol, {
    DeviceInfo? deviceInfo,
  }) async {
    final implementations = ImplementationRegistry.getImplementations(protocol);

    if (implementations.isEmpty) {
      return null;
    }

    // Manual selection
    if (strategy == SelectionStrategy.manual && manualImplementationId != null) {
      return implementations.firstWhere(
        (impl) => impl.implementationId == manualImplementationId,
        orElse: () => implementations.first,
      );
    }

    // Filter by availability
    final available = <ImplementationProvider>[];
    for (final impl in implementations) {
      if (await impl.isAvailable()) {
        available.add(impl);
      }
    }

    if (available.isEmpty) {
      return null;
    }

    // Selection by strategy
    switch (strategy) {
      case SelectionStrategy.byPriority:
        return _selectByPriority(available);

      case SelectionStrategy.byBenchmark:
        return await _selectByBenchmark(available);

      case SelectionStrategy.auto:
        return await _selectAuto(available, deviceInfo);

      case SelectionStrategy.manual:
        return available.first; // Fallback
    }
  }

  /// Выбор по приоритету
  ImplementationProvider _selectByPriority(
    List<ImplementationProvider> implementations,
  ) {
    implementations.sort((a, b) => b.priority.compareTo(a.priority));
    return implementations.first;
  }

  /// Выбор по benchmark
  Future<ImplementationProvider> _selectByBenchmark(
    List<ImplementationProvider> implementations,
  ) async {
    ImplementationProvider? best;
    double bestScore = 0.0;

    for (final impl in implementations) {
      final metrics = await impl.benchmark();
      if (metrics != null && metrics.score > bestScore) {
        bestScore = metrics.score;
        best = impl;
      }
    }

    return best ?? implementations.first;
  }

  /// Автоматический выбор (умный)
  Future<ImplementationProvider> _selectAuto(
    List<ImplementationProvider> implementations,
    DeviceInfo? deviceInfo,
  ) async {
    // 1. Проверяем кэш предыдущих benchmark'ов
    final cached = await _getCachedBestImplementation(deviceInfo);
    if (cached != null && implementations.contains(cached)) {
      return cached;
    }

    // 2. Используем эвристики на основе device info
    if (deviceInfo != null) {
      final heuristic = _selectByHeuristics(implementations, deviceInfo);
      if (heuristic != null) {
        return heuristic;
      }
    }

    // 3. Fallback на priority
    return _selectByPriority(implementations);
  }

  /// Эвристики выбора на основе device info
  ImplementationProvider? _selectByHeuristics(
    List<ImplementationProvider> implementations,
    DeviceInfo deviceInfo,
  ) {
    // Пример эвристик:

    // Snapdragon чипы лучше работают с libxray (AES-NI)
    if (deviceInfo.chipset?.contains('Snapdragon') ?? false) {
      return implementations.firstWhere(
        (impl) => impl.implementationId == 'libxray',
        orElse: () => implementations.first,
      );
    }

    // MediaTek чипы лучше с v2ray_plus
    if (deviceInfo.chipset?.contains('MediaTek') ?? false) {
      return implementations.firstWhere(
        (impl) => impl.implementationId == 'v2ray_plus',
        orElse: () => implementations.first,
      );
    }

    // iOS 15+ лучше с sing-box
    if (Platform.isIOS && deviceInfo.osVersion.startsWith('15')) {
      return implementations.firstWhere(
        (impl) => impl.implementationId == 'singbox',
        orElse: () => implementations.first,
      );
    }

    return null;
  }

  /// Кэш лучших реализаций для устройства
  Future<ImplementationProvider?> _getCachedBestImplementation(
    DeviceInfo? deviceInfo,
  ) async {
    if (deviceInfo == null) return null;

    final prefs = await SharedPreferences.getInstance();
    final key = 'best_impl_${deviceInfo.deviceId}';
    final cachedId = prefs.getString(key);

    if (cachedId != null) {
      // TODO: Вернуть по ID из registry
      return null;
    }

    return null;
  }
}
```

---

## 5. Device Info для эвристик

### Файл: `lib/src/models/device_info.dart`

```dart
class DeviceInfo {
  final String deviceId;        // Уникальный ID устройства
  final String model;           // Модель (e.g., "Pixel 6")
  final String manufacturer;    // Производитель
  final String osVersion;       // Версия OS
  final String? chipset;        // Чипсет (Snapdragon 888, MediaTek, etc.)
  final int ramMb;              // Оперативная память
  final bool hasAesNi;          // Поддержка AES-NI (hardware encryption)
  final TargetPlatform platform;

  /// Получить информацию о текущем устройстве
  static Future<DeviceInfo> getCurrentDevice() async {
    final deviceInfoPlugin = DeviceInfoPlugin();

    if (Platform.isAndroid) {
      final androidInfo = await deviceInfoPlugin.androidInfo;
      return DeviceInfo(
        deviceId: androidInfo.id,
        model: androidInfo.model,
        manufacturer: androidInfo.manufacturer,
        osVersion: androidInfo.version.release,
        chipset: await _getAndroidChipset(),
        ramMb: await _getRamMb(),
        hasAesNi: await _checkAesNi(),
        platform: TargetPlatform.android,
      );
    } else if (Platform.isIOS) {
      final iosInfo = await deviceInfoPlugin.iosInfo;
      return DeviceInfo(
        deviceId: iosInfo.identifierForVendor ?? '',
        model: iosInfo.model,
        manufacturer: 'Apple',
        osVersion: iosInfo.systemVersion,
        chipset: _getAppleChipset(iosInfo.utsname.machine),
        ramMb: await _getRamMb(),
        hasAesNi: true, // Apple всегда поддерживает
        platform: TargetPlatform.iOS,
      );
    }

    // Fallback для других платформ
    return DeviceInfo(/* ... */);
  }

  static Future<String?> _getAndroidChipset() async {
    // Чтение /proc/cpuinfo или System.getProperty
    // Может вернуть: "Qualcomm Snapdragon 888", "MediaTek Dimensity 9000", etc.
    return null; // TODO: Реализовать
  }

  static String? _getAppleChipset(String machine) {
    // iPhone14,2 → A15 Bionic
    // iPhone13,4 → A14 Bionic
    final chipsetMap = {
      'iPhone14,2': 'A15 Bionic',
      'iPhone13,4': 'A14 Bionic',
      // ...
    };
    return chipsetMap[machine];
  }
}
```

---

## 6. VpnConfig с выбором реализации

### Обновленный `VpnConfig`

```dart
class VpnConfig {
  final ProtocolType protocol;
  final ProtocolConfig protocolConfig;

  /// Стратегия выбора реализации
  final SelectionStrategy selectionStrategy;

  /// Ручной выбор реализации (если strategy == manual)
  final String? preferredImplementation;

  /// Fallback chain (список реализаций в порядке приоритета)
  final List<String>? fallbackChain;

  VpnConfig({
    required this.protocol,
    required this.protocolConfig,
    this.selectionStrategy = SelectionStrategy.auto,
    this.preferredImplementation,
    this.fallbackChain,
  });
}
```

---

## 7. Использование в приложении

### Пример 1: Автоматический выбор

```dart
final config = VpnConfig(
  protocol: ProtocolType.vmess,
  protocolConfig: VMessConfig.fromUrl('vmess://...'),
  selectionStrategy: SelectionStrategy.auto, // По умолчанию
);

await VpnEngine.instance.initialize(config);
await VpnEngine.instance.connect();

// Узнать какая реализация выбрана
final selectedImpl = VpnEngine.instance.currentImplementation;
print('Using: ${selectedImpl?.displayName}'); // "LibXray Core"
```

### Пример 2: Ручной выбор реализации

```dart
final config = VpnConfig(
  protocol: ProtocolType.vmess,
  protocolConfig: VMessConfig.fromUrl('vmess://...'),
  selectionStrategy: SelectionStrategy.manual,
  preferredImplementation: 'v2ray_plus', // Выбрать flutter_v2ray_plus
);

await VpnEngine.instance.initialize(config);
```

### Пример 3: Fallback chain

```dart
final config = VpnConfig(
  protocol: ProtocolType.vmess,
  protocolConfig: VMessConfig.fromUrl('vmess://...'),
  fallbackChain: [
    'libxray',      // Попробовать сначала libxray
    'v2ray_plus',   // Если не работает → v2ray_plus
    'singbox',      // Если не работает → singbox
  ],
);
```

### Пример 4: UI для выбора реализации

```dart
class ImplementationSelectorWidget extends StatelessWidget {
  final ProtocolType protocol;

  @override
  Widget build(BuildContext context) {
    final implementations = ImplementationRegistry.getImplementations(protocol);

    return DropdownButton<String>(
      items: implementations.map((impl) {
        return DropdownMenuItem(
          value: impl.implementationId,
          child: Text('${impl.displayName} (${impl.version})'),
        );
      }).toList(),
      onChanged: (implementationId) {
        // Сохранить выбор пользователя
        _updateConfig(
          selectionStrategy: SelectionStrategy.manual,
          preferredImplementation: implementationId,
        );
      },
      hint: Text('Auto (recommended)'),
    );
  }
}
```

---

## 8. Benchmark & Caching

### Автоматический benchmark при первом запуске

```dart
class VpnEngine {
  Future<void> runInitialBenchmark() async {
    final deviceInfo = await DeviceInfo.getCurrentDevice();

    // Для каждого протокола
    for (final protocol in ProtocolType.values) {
      final implementations = ImplementationRegistry.getImplementations(protocol);

      ImplementationProvider? best;
      double bestScore = 0.0;

      for (final impl in implementations) {
        if (!await impl.isAvailable()) continue;

        final metrics = await impl.benchmark();
        if (metrics != null && metrics.score > bestScore) {
          bestScore = metrics.score;
          best = impl;
        }
      }

      // Сохранить в кэш
      if (best != null) {
        await _cacheBestImplementation(deviceInfo, protocol, best);
      }
    }
  }

  Future<void> _cacheBestImplementation(
    DeviceInfo deviceInfo,
    ProtocolType protocol,
    ImplementationProvider impl,
  ) async {
    final prefs = await SharedPreferences.getInstance();
    final key = 'best_impl_${deviceInfo.deviceId}_${protocol.name}';
    await prefs.setString(key, impl.implementationId);
  }
}
```

---

## 9. Monitoring & Analytics

### Сбор статистики производительности

```dart
class ImplementationAnalytics {
  /// Запись метрик реализации
  static Future<void> recordMetrics(
    String implementationId,
    ProtocolType protocol,
    PerformanceMetrics metrics,
  ) async {
    // Отправка в аналитику (Firebase, Amplitude, etc.)
    await analytics.logEvent('implementation_performance', {
      'implementation': implementationId,
      'protocol': protocol.name,
      'throughput_mbps': metrics.throughputMbps,
      'latency_ms': metrics.latencyMs,
      'cpu_percent': metrics.cpuUsagePercent,
      'memory_mb': metrics.memoryMb,
      'score': metrics.score,
      'device_model': (await DeviceInfo.getCurrentDevice()).model,
      'chipset': (await DeviceInfo.getCurrentDevice()).chipset,
    });
  }

  /// Получить рекомендации с сервера
  static Future<Map<String, String>> getRecommendations(
    DeviceInfo deviceInfo,
  ) async {
    // Запрос к серверу за crowd-sourced данными
    final response = await http.get(
      'https://api.vpnclient.com/recommendations?device=${deviceInfo.model}',
    );

    // Вернет: { 'vmess': 'libxray', 'vless': 'v2ray_plus', ... }
    return json.decode(response.body);
  }
}
```

---

## 10. Итоговая архитектура

```
┌─────────────────────────────────────────────────────────┐
│                  VpnEngine API                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│           ImplementationSelector                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Strategy:                                         │  │
│  │  • Auto (heuristics + cache + analytics)         │  │
│  │  • ByPriority (hardcoded priorities)             │  │
│  │  • ByBenchmark (runtime performance test)        │  │
│  │  • Manual (user override)                        │  │
│  └───────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┼────────────┬──────────────┐
         ▼           ▼            ▼              ▼
    ┌─────────┐ ┌────────┐  ┌─────────┐   ┌─────────┐
    │libxray  │ │v2ray_  │  │sing-box │   │ gost    │
    │Impl     │ │plus    │  │Impl     │   │ Impl    │
    │         │ │Impl    │  │         │   │         │
    │Priority:│ │Priority│  │Priority │   │Priority │
    │  100    │ │   90   │  │   80    │   │   70    │
    └─────────┘ └────────┘  └─────────┘   └─────────┘
```

---

## 11. Преимущества решения

✅ **Гибкость**: Пользователь может выбрать любую реализацию
✅ **Автоматизация**: Умный выбор на основе device info
✅ **Производительность**: Benchmark определяет лучшую
✅ **Надежность**: Fallback chain при ошибках
✅ **Расширяемость**: Легко добавить новые реализации
✅ **Аналитика**: Сбор данных для улучшения эвристик
✅ **Кэширование**: Не делаем benchmark каждый раз
✅ **Crowd-sourced**: Можем получать рекомендации с сервера

---

## 12. Примеры эвристик

### Chipset-based

```dart
if (chipset == 'Snapdragon 8 Gen 2') {
  return 'libxray'; // Отличная поддержка AES-NI
}

if (chipset == 'MediaTek Dimensity 9200') {
  return 'v2ray_plus'; // Лучше оптимизирован для ARM Mali
}

if (chipset.contains('Apple A') || chipset.contains('Apple M')) {
  return 'singbox'; // Оптимизирован для Apple Silicon
}
```

### OS version-based

```dart
if (Platform.isAndroid && osVersion >= '13') {
  return 'libxray'; // Новые Android API лучше работают
}

if (Platform.isIOS && osVersion >= '16') {
  return 'singbox'; // Использует новые NetworkExtension фичи
}
```

### RAM-based

```dart
if (ramMb < 2048) {
  return 'v2ray_plus'; // Меньше потребление памяти
}

if (ramMb >= 6144) {
  return 'singbox'; // Можем использовать больше кэша
}
```

---

---

## 13. Версии ядер (Xray 1.7.5 vs 1.8.0 vs 1.8.4)

### Проблема: Разные версии одного ядра

```
Xray 1.7.5:
  ✅ Стабильный
  ⚠️ Старые оптимизации
  ⚠️ Может не поддерживать новые фичи

Xray 1.8.0:
  ✅ Новые оптимизации
  ⚠️ Может иметь баги
  ✅ Новые features (REALITY, Vision)

Xray 1.8.4:
  ✅ Bug fixes из 1.8.0
  ✅ Дополнительные оптимизации
  ⚠️ Новейшая - меньше тестирования
```

### Решение: Version-aware Implementation

```dart
class XrayImplementation extends ImplementationProvider {
  final String xrayVersion; // "1.7.5", "1.8.0", "1.8.4"

  XrayImplementation({required this.xrayVersion});

  @override
  String get implementationId => 'xray_$xrayVersion';

  @override
  String get displayName => 'Xray Core v$xrayVersion';

  @override
  String get version => xrayVersion;
}

// Регистрация нескольких версий
void _registerXrayVersions() {
  register(ProtocolType.vmess, XrayImplementation(xrayVersion: '1.7.5'));
  register(ProtocolType.vmess, XrayImplementation(xrayVersion: '1.8.0'));
  register(ProtocolType.vmess, XrayImplementation(xrayVersion: '1.8.4'));

  register(ProtocolType.vless, XrayImplementation(xrayVersion: '1.7.5'));
  register(ProtocolType.vless, XrayImplementation(xrayVersion: '1.8.0'));
  register(ProtocolType.vless, XrayImplementation(xrayVersion: '1.8.4'));
}
```

### Приоритеты версий

```dart
@override
int get priority {
  // Новейшие версии = выше приоритет (но с проверкой стабильности)
  switch (xrayVersion) {
    case '1.8.4':
      return 100; // Новейшая
    case '1.8.0':
      return 90;  // Средняя
    case '1.7.5':
      return 80;  // Стабильная, но старая
    default:
      return 50;
  }
}
```

### Версии с feature detection

```dart
class XrayImplementation extends ImplementationProvider {
  // ...

  /// Поддерживаемые фичи в этой версии
  Set<String> get supportedFeatures {
    final features = <String>{'vmess', 'vless', 'trojan', 'shadowsocks'};

    // REALITY поддержка только в 1.8+
    if (_versionGreaterOrEqual('1.8.0')) {
      features.add('reality');
    }

    // XUDP только в 1.8.4+
    if (_versionGreaterOrEqual('1.8.4')) {
      features.add('xudp');
    }

    // Vision flow control в 1.8+
    if (_versionGreaterOrEqual('1.8.0')) {
      features.add('vision');
    }

    return features;
  }

  bool _versionGreaterOrEqual(String minVersion) {
    // Сравнение версий (1.8.4 >= 1.8.0)
    return _compareVersions(xrayVersion, minVersion) >= 0;
  }
}
```

### UI для выбора версии

```dart
class ImplementationVersionSelector extends StatelessWidget {
  final ProtocolType protocol;

  @override
  Widget build(BuildContext context) {
    final implementations = ImplementationRegistry
        .getImplementations(protocol)
        .where((impl) => impl.implementationId.startsWith('xray_'))
        .toList();

    return Column(
      children: [
        Text('Xray Version:'),
        ...implementations.map((impl) {
          final xrayImpl = impl as XrayImplementation;
          return RadioListTile<String>(
            title: Text('v${xrayImpl.xrayVersion}'),
            subtitle: Text(
              'Features: ${xrayImpl.supportedFeatures.join(', ')}',
            ),
            value: xrayImpl.xrayVersion,
            groupValue: _selectedVersion,
            onChanged: (version) {
              setState(() => _selectedVersion = version);
              _updateConfig(preferredImplementation: 'xray_$version');
            },
          );
        }),
        // Indicator для рекомендованной версии
        if (_recommendedVersion != null)
          Text(
            'Recommended: v$_recommendedVersion (based on your device)',
            style: TextStyle(color: Colors.green),
          ),
      ],
    );
  }
}
```

---

## 14. Multi-dimensional Selection

### Реальная структура выбора

```
Протокол: VMess
  └─ Реализация:
      ├─ LibXray
      │   ├─ Version 1.7.5
      │   ├─ Version 1.8.0
      │   └─ Version 1.8.4 ✅ (Auto-selected)
      ├─ flutter_v2ray_plus
      │   ├─ Version 1.0.10
      │   └─ Version 1.0.15
      └─ SingBox
          ├─ Version 1.5.0
          └─ Version 1.6.0
```

### Расширенный ImplementationProvider

```dart
abstract class ImplementationProvider {
  // Existing fields...

  /// Базовое имя реализации (без версии)
  String get baseName; // "xray", "singbox", "v2ray_plus"

  /// Версия ядра
  String get coreVersion; // "1.8.4"

  /// Полный ID: baseName_coreVersion
  @override
  String get implementationId => '${baseName}_$coreVersion';

  /// Список известных багов в этой версии
  List<KnownIssue> get knownIssues;

  /// Changelog относительно предыдущей версии
  String? get changelog;
}

class KnownIssue {
  final String description;
  final Severity severity;
  final List<String> affectedPlatforms;
  final String? workaround;

  // Example:
  // KnownIssue(
  //   description: 'Memory leak on Android 11',
  //   severity: Severity.medium,
  //   affectedPlatforms: ['android'],
  //   workaround: 'Restart connection every 24h',
  // )
}

enum Severity { low, medium, high, critical }
```

### Умный селектор с версиями

```dart
class SmartVersionSelector {
  /// Выбрать лучшую версию для устройства
  Future<ImplementationProvider?> selectBestVersion(
    ProtocolType protocol,
    String baseName, // "xray", "singbox", etc.
    DeviceInfo deviceInfo,
  ) async {
    final allVersions = ImplementationRegistry
        .getImplementations(protocol)
        .where((impl) => impl.baseName == baseName)
        .toList();

    if (allVersions.isEmpty) return null;

    // 1. Фильтр по known issues для этого устройства
    final safeVersions = allVersions.where((impl) {
      return !_hasCriticalIssues(impl, deviceInfo);
    }).toList();

    if (safeVersions.isEmpty) {
      // Все версии имеют критичные баги - берем наименьший severity
      return _selectLeastBuggyVersion(allVersions, deviceInfo);
    }

    // 2. Проверка feature requirements
    final config = _getCurrentConfig();
    final compatibleVersions = safeVersions.where((impl) {
      return _supportsRequiredFeatures(impl, config);
    }).toList();

    if (compatibleVersions.isEmpty) {
      // Нет версий с нужными фичами
      return null;
    }

    // 3. Benchmark или эвристики
    return await _selectByPerformance(compatibleVersions, deviceInfo);
  }

  bool _hasCriticalIssues(
    ImplementationProvider impl,
    DeviceInfo deviceInfo,
  ) {
    return impl.knownIssues.any((issue) =>
      issue.severity == Severity.critical &&
      issue.affectedPlatforms.contains(deviceInfo.platform.name),
    );
  }

  bool _supportsRequiredFeatures(
    ImplementationProvider impl,
    VpnConfig config,
  ) {
    // Проверка что версия поддерживает нужные фичи
    // Например, REALITY требует Xray 1.8+
    if (config.requiresFeature('reality')) {
      return impl.supportedFeatures.contains('reality');
    }
    return true;
  }
}
```

### Database известных багов

```dart
// Файл: lib/src/data/known_issues_db.dart

class KnownIssuesDatabase {
  static final Map<String, List<KnownIssue>> _issues = {
    'xray_1.8.0': [
      KnownIssue(
        description: 'Memory leak on prolonged connections',
        severity: Severity.medium,
        affectedPlatforms: ['android', 'ios'],
        workaround: 'Reconnect every 12 hours',
      ),
      KnownIssue(
        description: 'Vision flow control crashes on MediaTek',
        severity: Severity.high,
        affectedPlatforms: ['android'],
        workaround: 'Disable Vision or use 1.8.4+',
      ),
    ],
    'xray_1.8.4': [
      // Fixed memory leak, но:
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
  };

  static List<KnownIssue> getIssues(String implementationId) {
    return _issues[implementationId] ?? [];
  }
}
```

---

## 15. Итоговая VpnConfig с версиями

```dart
class VpnConfig {
  final ProtocolType protocol;
  final ProtocolConfig protocolConfig;

  // Selection strategy
  final SelectionStrategy selectionStrategy;

  // Manual implementation selection
  final String? preferredBaseName;     // "xray", "singbox"
  final String? preferredCoreVersion;  // "1.8.4"

  // Или полный ID
  final String? preferredImplementation; // "xray_1.8.4"

  // Feature requirements (для auto-selection)
  final Set<String> requiredFeatures; // {'reality', 'vision'}

  // Version constraints
  final String? minimumCoreVersion;  // ">= 1.8.0"
  final String? maximumCoreVersion;  // "< 2.0.0"

  // Fallback chain с версиями
  final List<String>? fallbackChain; // ["xray_1.8.4", "xray_1.8.0", "singbox_1.6.0"]

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
  });
}
```

### Примеры использования

```dart
// Пример 1: Auto с требованием REALITY (только Xray 1.8+)
final config = VpnConfig(
  protocol: ProtocolType.vless,
  protocolConfig: VLessConfig(/* REALITY config */),
  requiredFeatures: {'reality'},
  // Auto выберет Xray 1.8.4 (новейшая с REALITY)
);

// Пример 2: Выбор конкретной версии Xray
final config = VpnConfig(
  protocol: ProtocolType.vmess,
  protocolConfig: VMessConfig.fromUrl(url),
  selectionStrategy: SelectionStrategy.manual,
  preferredImplementation: 'xray_1.8.0', // Конкретная версия
);

// Пример 3: Диапазон версий
final config = VpnConfig(
  protocol: ProtocolType.trojan,
  protocolConfig: TrojanConfig(/* ... */),
  preferredBaseName: 'xray',
  minimumCoreVersion: '1.8.0',  // >= 1.8.0
  maximumCoreVersion: '1.9.0',  // < 1.9.0
  // Auto выберет лучшую версию в диапазоне 1.8.x
);

// Пример 4: Fallback chain с версиями
final config = VpnConfig(
  protocol: ProtocolType.vmess,
  protocolConfig: VMessConfig.fromUrl(url),
  fallbackChain: [
    'xray_1.8.4',      // Попробовать новейшую
    'xray_1.8.0',      // Fallback на 1.8.0
    'singbox_1.6.0',   // Fallback на SingBox
    'v2ray_plus_1.0.15', // Last resort
  ],
);
```

---

## Summary

**Финальное решение поддерживает:**

1. ✅ **Множество реализаций** одного протокола (libxray, v2ray_plus, singbox)
2. ✅ **Множество версий** одной реализации (Xray 1.7.5, 1.8.0, 1.8.4)
3. ✅ **Автоматический выбор** на основе:
   - Device info (chipset, RAM, OS version)
   - Known issues database
   - Feature requirements (REALITY, Vision, XUDP)
   - Benchmark производительности
   - Crowd-sourced analytics
4. ✅ **Ручной выбор** пользователем:
   - Выбор реализации (libxray vs singbox)
   - Выбор версии (1.8.0 vs 1.8.4)
   - Полный контроль: `preferredImplementation: 'xray_1.8.4'`
5. ✅ **Fallback chain** с приоритетами
6. ✅ **Version constraints** (>= 1.8.0, < 2.0.0)
7. ✅ **Feature detection** (auto-filter несовместимые версии)
8. ✅ **Known issues tracking** (избегать багованных версий)

**Для вашего случая:**
```
VMess можно запустить через:
  - Xray 1.7.5 (stable, old)
  - Xray 1.8.0 (new features, some bugs)
  - Xray 1.8.4 (latest, most features) ✅ Auto-selected
  - flutter_v2ray_plus 1.0.15
  - SingBox 1.6.0
  - Пользователь может вручную выбрать любую
```

