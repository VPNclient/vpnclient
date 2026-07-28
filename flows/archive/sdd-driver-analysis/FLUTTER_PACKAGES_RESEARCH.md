# Flutter VPN Protocol Packages Research Report

> Generated: 2025-12-30
> Status: Complete

## Executive Summary

Полное исследование существующих Flutter пакетов на pub.dev для VPN протоколов. Цель: использовать готовые библиотеки, не изобретая велосипед.

---

## 1. OpenVPN 🔓

### ✅ Рекомендация: `openvpn_flutter`

| Параметр | Значение |
|----------|----------|
| **Версия** | 1.3.4 (Feb 17, 2025) |
| **Платформы** | Android, iOS |
| **Лицензия** | GPL-3.0 |
| **Популярность** | 129 likes, 567/week downloads |
| **Статус** | ✅ Активная поддержка |
| **URL** | https://pub.dev/packages/openvpn_flutter |
| **GitHub** | https://github.com/nizwar/openvpn_flutter |

**Возможности:**
- Нативная Android поддержка (ics-openvpn)
- Нативная iOS поддержка (OpenVPNAdapter)
- Управление VPN соединением
- Мониторинг статуса
- Поддержка OVPN файлов
- Android SDK 34 support

**Альтернативы:**
- ❌ `flutter_openvpn` - устаревший (2020), несовместим с Dart 3

---

## 2. WireGuard 🔵

### ✅ Рекомендация: `wireguard_flutter`

| Параметр | Значение |
|----------|----------|
| **Версия** | 0.1.3 (Mar 26, 2024) |
| **Платформы** | Android (21+), iOS (15.0+), macOS (12+), Windows (7+), Linux |
| **Лицензия** | MIT |
| **Популярность** | 34 likes, 517/week downloads |
| **Статус** | ✅ Активная поддержка |
| **URL** | https://pub.dev/packages/wireguard_flutter |
| **GitHub** | https://github.com/Caqil/wireguard_flutter |

**Возможности:**
- **Кроссплатформенность** (5 платформ!)
- Android: работает out-of-the-box
- iOS: использует Packet Tunnel extension + WireGuard Swift/Go bridge
- Мониторинг статуса через event streams
- Инициализация интерфейса с конфигурацией

**Альтернативы:**
- 🔶 `wireguard_vpn` - только Android, менее активная разработка

---

## 3. V2Ray/Xray (VLESS/VMess/Shadowsocks/Trojan) 🚀

### ✅ Рекомендация для Mobile: `flutter_v2ray_plus`

| Параметр | Значение |
|----------|----------|
| **Версия** | 1.0.15 (Dec 29, 2025) |
| **Платформы** | Android, iOS |
| **Лицензия** | MIT |
| **Популярность** | 5 likes, 453/week downloads |
| **Статус** | ✅ Очень активная (обновлено 34 часа назад!) |
| **URL** | https://pub.dev/packages/flutter_v2ray_plus |
| **GitHub** | https://github.com/shafiquecbl/flutter_v2ray_plus |

**Возможности:**
- Протоколы: VLESS, VMess, Shadowsocks, Trojan, SOCKS5
- VPN и Proxy режимы
- Fine-grained routing (домены, сайты, приложения)
- Встроенный tracking статуса
- Тестирование задержки серверов
- Расширенная конфигурация
- Android 16KB page size support (API 35+)
- Автоматическая iOS framework дистрибуция

### ✅ Рекомендация для Cross-Platform: `flutter_v2ray_client`

| Параметр | Значение |
|----------|----------|
| **Версия** | 3.1.0 (Dec 3, 2025) |
| **Платформы** | Android, iOS, Windows, Linux, macOS |
| **Лицензия** | MIT |
| **Популярность** | 7 likes, 359/week downloads |
| **Статус** | ✅ Активная поддержка |
| **URL** | https://pub.dev/packages/flutter_v2ray_client |
| **GitHub** | https://github.com/amir-zr/flutter_v2ray_client |

**Возможности:**
- **Полная кроссплатформенность** (5 платформ)
- VPN и Proxy режимы
- Современный API и документация
- Android 16KB page size support
- Определение задержки серверов
- Управление трафиком
- Просмотр логов
- Нет конфликтов с openvpn_flutter

**Другие пакеты:**
- 🔶 `flutter_v2ray` (1.0.10) - новейшее Xray ядро (25.3.6), iOS/Desktop платные
- 🔶 `flutter_vless` - оригинальный пакет, на котором основан flutter_v2ray_plus

---

## 4. IKEv2/IPsec 🔐

### ✅ Рекомендация: `flutter_vpn`

| Параметр | Значение |
|----------|----------|
| **Версия** | 0.13.0 (Sep 6, 2024) |
| **Платформы** | Android, iOS |
| **Лицензия** | LGPL-3.0 |
| **Популярность** | 111 likes, 210/week downloads |
| **Статус** | ✅ Активная поддержка |
| **URL** | https://pub.dev/packages/flutter_vpn |
| **GitHub** | https://github.com/X-dea/flutter_vpn |

**Возможности:**
- Android: strongSwan implementation (IKEv2)
- iOS: NEVPNManager implementation
- IKEv2-EAP и IPsec поддержка
- Универсальный доступ к VPN сервисам

---

## 5. SSTP 📡

### ✅ Рекомендация: `sstp_flutter`

| Параметр | Значение |
|----------|----------|
| **Версия** | 1.3.0 (Jan 31, 2025) |
| **Платформы** | Android, iOS |
| **Лицензия** | BSD-3-Clause |
| **Популярность** | 9 likes, 27/week downloads |
| **Статус** | ✅ Очень активная (обновлено в январе 2025) |
| **URL** | https://pub.dev/packages/sstp_flutter |
| **GitHub** | https://github.com/NavidShokoufeh/sstp_flutter |

**Возможности:**
- SSTP VPN протокол
- Управление соединением
- Мониторинг статуса
- Анализ трафика
- Android и iOS support

---

## 6. GOST VPN 🇷🇺

### ❌ Статус: НЕТ опубликованных пакетов на pub.dev

**Найдено:** Кастомная реализация в проекте `/flutter_vpn_gost/`

**Кастомные протоколы:**
- **GLess** (GOST-based VLESS)
- **GMess** (GOST-based VMess)
- **GReality** (GOST-based REALITY)

**ГОСТ стандарты:**
- ГОСТ 28147-89 (шифрование, 256-bit ключ, 64-bit блок)
- ГОСТ Р 34.11-2012 (хеширование, 256-bit)
- ГОСТ Р 34.10-2012 (цифровые подписи)

**Производительность:**
- Шифрование: ~50 MB/s
- Хеширование: ~100 MB/s
- Криптостойкость: 2^56 до 2^256 операций

**Соответствие:**
- FSTEC Russia сертифицированные алгоритмы
- Требования Роскомнадзора
- Стандарты Минцифры

⚠️ **Важно:** НЕ совместим со стандартными VLESS/VMess/REALITY из-за других криптографических алгоритмов.

---

## 7. Китайские стандарты SM2/SM3/SM4 🇨🇳

### 🔶 Частичная поддержка: `sm_crypto`

| Параметр | Значение |
|----------|----------|
| **Версия** | 1.0.3 |
| **Платформы** | Dart/Flutter (все платформы) |
| **Лицензия** | Не указана |
| **URL** | https://pub.dev/packages/sm_crypto (предположительно) |
| **GitHub** | https://github.com/greenking19/sm_crypto |

**Поддерживаемые алгоритмы:**
- **SM2**: Криптография на эллиптических кривых (в разработке)
- **SM3**: Хеш алгоритм (256-bit выход)
- **SM4**: Симметричный блочный шифр (128-bit блок и ключ)
  - ECB режим
  - CBC режим

**Возможности:**
- Вывод hex string или hex List<int>
- Китайские национальные алгоритмы шифрования
- Замена DES/AES для китайского compliance

**Установка:**
```yaml
dependencies:
  sm_crypto: ^1.0.3
```

⚠️ **Важно:** Это только криптографические примитивы, НЕТ готового VPN пакета с SM алгоритмами.

---

## 8. Generic VPN Framework 🔧

### ✅ Рекомендация для низкоуровневого доступа (Android): `flutter_vpn_service`

| Параметр | Значение |
|----------|----------|
| **Версия** | 1.1.0 (Dec 2, 2024) |
| **Платформы** | Android только |
| **Лицензия** | MIT |
| **Популярность** | 5 likes, 31/week downloads |
| **Статус** | ✅ Активная поддержка |
| **URL** | https://pub.dev/packages/flutter_vpn_service |
| **GitHub** | https://github.com/shafiquecbl/flutter_vpn_service |

**Возможности:**
- Доступ к Android VPNService API
- Программное управление VPN соединением
- Защита сокетов
- Обработка сетевой маршрутизации
- Управление TUN интерфейсом

---

## 9. Сводная таблица рекомендаций

| Протокол | Пакет | Платформы | Статус | Рекомендация |
|----------|-------|-----------|--------|--------------|
| **OpenVPN** | openvpn_flutter | Android, iOS | ✅ Активный | ⭐ Использовать |
| **WireGuard** | wireguard_flutter | Android, iOS, macOS, Win, Linux | ✅ Активный | ⭐ Использовать |
| **V2Ray/Xray (Mobile)** | flutter_v2ray_plus | Android, iOS | ✅ Очень активный | ⭐ Наиболее функциональный |
| **V2Ray/Xray (Cross-platform)** | flutter_v2ray_client | Android, iOS, macOS, Win, Linux | ✅ Активный | ⭐ Для всех платформ |
| **IKEv2/IPsec** | flutter_vpn | Android, iOS | ✅ Активный | ⭐ Стандартная реализация |
| **SSTP** | sstp_flutter | Android, iOS | ✅ Очень активный | ⭐ Использовать |
| **GOST VPN** | ❌ Нет на pub.dev | - | - | 🔧 Кастомная реализация в проекте |
| **SM2/SM3/SM4** | sm_crypto | Все | 🔶 Примитивы | 🔶 Только криптография |
| **TUN/VPN Service** | flutter_vpn_service | Android | ✅ Активный | ⭐ Низкоуровневый API |

---

## 10. Выводы и стратегия

### ✅ Что можно использовать готовым:

1. **OpenVPN** - `openvpn_flutter` (отличная поддержка)
2. **WireGuard** - `wireguard_flutter` (полная кроссплатформенность)
3. **V2Ray/Xray** - `flutter_v2ray_plus` или `flutter_v2ray_client` (зависит от требований к платформам)
4. **IKEv2/IPsec** - `flutter_vpn` (стабильная реализация)
5. **SSTP** - `sstp_flutter` (свежие обновления)

### ⚠️ Что требует доработки:

1. **GOST VPN** - использовать существующую кастомную реализацию из `flutter_vpn_gost/`
2. **SM2/SM3/SM4** - интегрировать `sm_crypto` примитивы в существующий движок

### 🎯 Рекомендуемая архитектура:

```
┌─────────────────────────────────────────┐
│    flutter_vpn_engine (Единый API)      │
└─────────────────┬───────────────────────┘
                  │
         ┌────────┴────────┐
         │                 │
    ┌────▼─────┐     ┌─────▼──────┐
    │ Drivers  │     │   Cores    │
    └────┬─────┘     └─────┬──────┘
         │                 │
    ┌────┼────────┐   ┌────┼─────────────────────┐
    │    │        │   │    │     │     │          │
┌───▼┐ ┌─▼───┐   │ ┌─▼──┐ │   ┌─▼───────────┐   │
│Hev │ │Tun2 │   │ │Sing│ │   │flutter_v2ray│   │
│5   │ │Socks│   │ │Box │ │   │ _plus       │   │
└────┘ └─────┘   │ └────┘ │   └─────────────┘   │
                 │        │                      │
           ┌─────▼──┐  ┌──▼──────────┐  ┌───────▼──────┐
           │wireguard│ │openvpn      │  │flutter_vpn   │
           │_flutter │ │_flutter     │  │(IKEv2/IPsec) │
           └─────────┘ └─────────────┘  └──────────────┘
                 │
           ┌─────▼─────────┐
           │flutter_vpn_gost│
           │(custom)        │
           └────────────────┘
```

### 📋 Следующие шаги:

1. **Specifications фаза**: Детальный дизайн интеграции каждого пакета
2. **Plan фаза**: Пошаговый план интеграции с приоритетами
3. **Implementation фаза**: Пошаговая интеграция и тестирование

---

## Sources

- [openvpn_flutter | Flutter package](https://pub.dev/packages/openvpn_flutter)
- [wireguard_flutter | Flutter package](https://pub.dev/packages/wireguard_flutter)
- [flutter_v2ray_plus | Flutter package](https://pub.dev/packages/flutter_v2ray_plus)
- [flutter_v2ray_client | Flutter package](https://pub.dev/packages/flutter_v2ray_client)
- [flutter_vpn | Flutter package](https://pub.dev/packages/flutter_vpn)
- [sstp_flutter | Flutter package](https://pub.dev/packages/sstp_flutter)
- [flutter_vpn_service | Flutter package](https://pub.dev/packages/flutter_vpn_service)
- [sm_crypto - Dart API docs](https://pub.dev/documentation/sm_crypto/latest/)
