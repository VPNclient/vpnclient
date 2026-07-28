# Матрица поддержки платформ и протоколов

> Generated: 2025-12-30
> Based on: FLUTTER_PACKAGES_RESEARCH.md

---

## 1. Основная матрица поддержки

| Протокол/Пакет | Android | iOS | Linux | macOS | Windows | Web | Статус |
|----------------|---------|-----|-------|-------|---------|-----|--------|
| **OpenVPN** (openvpn_flutter) | ✅ API 21+ | ✅ 9.0+ | ❌ | ❌ | ❌ | ❌ | Mobile-only |
| **WireGuard** (wireguard_flutter) | ✅ API 21+ | ✅ 15.0+ | ✅ | ✅ 12+ | ✅ 7+ | ❌ | **Full cross-platform** |
| **V2Ray/Xray** (flutter_v2ray_plus) | ✅ API 21+ | ✅ | ❌ | ❌ | ❌ | ❌ | Mobile-only |
| **V2Ray/Xray** (flutter_v2ray_client) | ✅ API 21+ | ✅ | ✅ | ✅ | ✅ | ❌ | **Full cross-platform** |
| **IKEv2/IPsec** (flutter_vpn) | ✅ API 22+ | ✅ 9.0+ | ❌ | ❌ | ❌ | ❌ | Mobile-only |
| **SSTP** (sstp_flutter) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | Mobile-only |
| **GOST VPN** (flutter_vpn_gost) | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | **Custom implementation** |
| **SM2/SM3/SM4** (sm_crypto) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **Primitives only** |
| **TUN Service** (flutter_vpn_service) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | Android-only |

**Легенда:**
- ✅ Поддерживается
- ❌ Не поддерживается
- 🔶 Частичная поддержка
- 💰 Требует покупки/лицензии

---

## 2. Детальная разбивка по протоколам

### 2.1 OpenVPN

**Пакет:** `openvpn_flutter` v1.3.4

| Платформа | Минимальная версия | Нативная библиотека | Статус | Примечания |
|-----------|-------------------|---------------------|--------|------------|
| Android | API 21 (Lollipop 5.0) | ics-openvpn | ✅ Полная | Stable, хорошо протестирован |
| iOS | 9.0+ | OpenVPNAdapter | ✅ Полная | Stable, хорошо протестирован |
| Linux | - | - | ❌ | Не поддерживается |
| macOS | - | - | ❌ | Не поддерживается |
| Windows | - | - | ❌ | Не поддерживается |
| Web | - | - | ❌ | Невозможно (нет VPN API) |

**Функциональность:**
- ✅ OVPN file configuration
- ✅ Connection management
- ✅ Status monitoring
- ✅ Notifications (Android SDK 34+)
- ❌ Desktop поддержка

---

### 2.2 WireGuard

**Пакет:** `wireguard_flutter` v0.1.3

| Платформа | Минимальная версия | Нативная библиотека | Статус | Примечания |
|-----------|-------------------|---------------------|--------|------------|
| Android | API 21 (Lollipop 5.0) | WireGuard Android | ✅ Полная | Out-of-the-box |
| iOS | 15.0+ | WireGuard Swift + Go bridge | ✅ Полная | Packet Tunnel extension |
| Linux | Ubuntu 18.04+ | WireGuard Go | ✅ Полная | Requires root/CAP_NET_ADMIN |
| macOS | 12+ (Monterey) | WireGuard Go | ✅ Полная | NetworkExtension или utun |
| Windows | 7+ | WireGuard Go | ✅ Полная | TAP adapter required |
| Web | - | - | ❌ | Невозможно (нет VPN API) |

**Функциональность:**
- ✅ Full cross-platform (5 платформ!)
- ✅ Event streams для статуса
- ✅ Interface configuration
- ✅ Modern cryptography
- ⚠️ iOS требует минимум iOS 15.0

---

### 2.3 V2Ray/Xray (VLESS/VMess/Shadowsocks/Trojan)

#### Option A: `flutter_v2ray_plus` v1.0.15 (Mobile-focused)

| Платформа | Минимальная версия | Нативная библиотека | Статус | Примечания |
|-----------|-------------------|---------------------|--------|------------|
| Android | API 21+ | Xray core | ✅ Полная | 16KB page size support (API 35+) |
| iOS | 12.0+ | Xray core | ✅ Полная | Auto framework distribution |
| Linux | - | - | ❌ | Не поддерживается |
| macOS | - | - | ❌ | Не поддерживается |
| Windows | - | - | ❌ | Не поддерживается |
| Web | - | - | ❌ | Невозможно |

**Протоколы:**
- ✅ VLESS
- ✅ VMess
- ✅ Shadowsocks
- ✅ Trojan
- ✅ SOCKS5

**Функциональность:**
- ✅ VPN mode
- ✅ Proxy mode
- ✅ Fine-grained routing (domains, sites, apps)
- ✅ Server delay testing
- ✅ Status tracking
- ❌ Desktop platforms

#### Option B: `flutter_v2ray_client` v3.1.0 (Cross-platform)

| Платформа | Минимальная версия | Нативная библиотека | Статус | Примечания |
|-----------|-------------------|---------------------|--------|------------|
| Android | API 21+ | Xray core | ✅ Полная | 16KB page size support |
| iOS | 12.0+ | Xray core | ✅ Полная | Stable |
| Linux | Ubuntu 20.04+ | Xray core | ✅ Полная | Requires root |
| macOS | 11+ (Big Sur) | Xray core | ✅ Полная | Stable |
| Windows | 10+ | Xray core | ✅ Полная | TAP driver |
| Web | - | - | ❌ | Невозможно |

**Функциональность:**
- ✅ **Full cross-platform** (5 платформ)
- ✅ VPN mode
- ✅ Proxy mode
- ✅ Server delay detection
- ✅ Traffic management
- ✅ Log viewing
- ✅ No conflicts with openvpn_flutter

---

### 2.4 IKEv2/IPsec

**Пакет:** `flutter_vpn` v0.13.0

| Платформа | Минимальная версия | Нативная библиотека | Статус | Примечания |
|-----------|-------------------|---------------------|--------|------------|
| Android | API 22+ | strongSwan | ✅ Полная | IKEv2 protocol |
| iOS | 9.0+ | NEVPNManager | ✅ Полная | Native implementation |
| Linux | - | - | ❌ | Не поддерживается |
| macOS | - | - | ❌ | Не поддерживается |
| Windows | - | - | ❌ | Не поддерживается |
| Web | - | - | ❌ | Невозможно |

**Функциональность:**
- ✅ IKEv2-EAP
- ✅ IPsec support
- ✅ Generic VPN service access
- ❌ Desktop platforms

---

### 2.5 SSTP

**Пакет:** `sstp_flutter` v1.3.0

| Платформа | Минимальная версия | Нативная библиотека | Статус | Примечания |
|-----------|-------------------|---------------------|--------|------------|
| Android | API 21+ | Custom SSTP impl | ✅ Полная | Recent updates (Jan 2025) |
| iOS | 12.0+ | Custom SSTP impl | ✅ Полная | Stable |
| Linux | - | - | ❌ | Не поддерживается |
| macOS | - | - | ❌ | Не поддерживается |
| Windows | - | - | ❌ | Не поддерживается |
| Web | - | - | ❌ | Невозможно |

**Функциональность:**
- ✅ Connection management
- ✅ Status monitoring
- ✅ Traffic analysis
- ❌ Desktop platforms

---

### 2.6 GOST VPN (Custom Implementation)

**Пакет:** `flutter_vpn_gost` (project-specific, не опубликован)

| Платформа | Минимальная версия | Нативная библиотека | Статус | Примечания |
|-----------|-------------------|---------------------|--------|------------|
| Android | API 21+ | go-gost | ✅ Полная | Custom protocols |
| iOS | 12.0+ | go-gost | ✅ Полная | Custom protocols |
| Linux | Ubuntu 20.04+ | go-gost | ✅ Полная | Requires root |
| macOS | 11+ | go-gost | ✅ Полная | Custom protocols |
| Windows | 10+ | go-gost | ✅ Полная | TAP adapter |
| Web | - | - | ❌ | Невозможно |

**Кастомные протоколы:**
- ✅ **GLess** (GOST-based VLESS)
- ✅ **GMess** (GOST-based VMess)
- ✅ **GReality** (GOST-based REALITY)

**GOST стандарты:**
- ✅ GOST 28147-89 (encryption, 256-bit key)
- ✅ GOST R 34.11-2012 (hashing, 256-bit)
- ✅ GOST R 34.10-2012 (digital signatures)

**Соответствие:**
- ✅ FSTEC Russia certified
- ✅ Roskomnadzor requirements
- ✅ Ministry of Digital Development standards

⚠️ **Важно:** НЕ совместим со стандартными VLESS/VMess/REALITY из-за других криптоалгоритмов

---

### 2.7 Chinese SM2/SM3/SM4

**Пакет:** `sm_crypto` v1.0.3 (криптографические примитивы)

| Платформа | Минимальная версия | Нативная библиотека | Статус | Примечания |
|-----------|-------------------|---------------------|--------|------------|
| Android | API 21+ | Dart implementation | ✅ Полная | Primitives only |
| iOS | 12.0+ | Dart implementation | ✅ Полная | Primitives only |
| Linux | Any | Dart implementation | ✅ Полная | Primitives only |
| macOS | Any | Dart implementation | ✅ Полная | Primitives only |
| Windows | Any | Dart implementation | ✅ Полная | Primitives only |
| Web | Any | Dart implementation | ✅ Полная | Primitives only |

**Поддерживаемые алгоритмы:**
- 🔶 **SM2** - Public key cryptography (в разработке)
- ✅ **SM3** - Hash algorithm (256-bit)
- ✅ **SM4** - Block cipher (ECB, CBC modes)

⚠️ **Важно:** Это ТОЛЬКО криптографические примитивы. Нет готового VPN пакета. Требуется интеграция в существующий движок.

---

### 2.8 Low-level TUN/VPN Service

**Пакет:** `flutter_vpn_service` v1.1.0

| Платформа | Минимальная версия | Нативная библиотека | Статус | Примечания |
|-----------|-------------------|---------------------|--------|------------|
| Android | API 21+ | Android VPNService | ✅ Полная | Low-level API |
| iOS | - | - | ❌ | Используйте NetworkExtension напрямую |
| Linux | - | - | ❌ | Не требуется |
| macOS | - | - | ❌ | Не требуется |
| Windows | - | - | ❌ | Не требуется |
| Web | - | - | ❌ | Невозможно |

**Функциональность:**
- ✅ Android VPNService API access
- ✅ Programmatic VPN management
- ✅ Socket protection
- ✅ Network routing
- ✅ TUN interface management

---

## 3. Сводная статистика

### 3.1 Поддержка по платформам

| Платформа | Количество поддерживаемых протоколов | Рекомендации |
|-----------|--------------------------------------|--------------|
| **Android** | 8/8 (100%) | ✅ Полная поддержка всех протоколов |
| **iOS** | 6/8 (75%) | ✅ Все кроме TUN Service |
| **Linux** | 3/8 (37.5%) | WireGuard, V2Ray/Xray (client), GOST |
| **macOS** | 3/8 (37.5%) | WireGuard, V2Ray/Xray (client), GOST |
| **Windows** | 3/8 (37.5%) | WireGuard, V2Ray/Xray (client), GOST |
| **Web** | 1/8 (12.5%) | SM crypto primitives only |

### 3.2 Поддержка по категориям

| Категория | Mobile (Android/iOS) | Desktop (Linux/macOS/Windows) | Cross-platform |
|-----------|----------------------|-------------------------------|----------------|
| **Traditional VPN** | OpenVPN, WireGuard, IKEv2, SSTP | WireGuard only | WireGuard ✅ |
| **Modern Protocols** | V2Ray/Xray (all packages) | V2Ray/Xray (client only) | flutter_v2ray_client ✅ |
| **National Crypto** | GOST, SM primitives | GOST only | GOST ✅ |
| **Low-level** | Android VPN Service, iOS NetworkExtension | Native APIs | Platform-specific |

### 3.3 Лицензирование

| Лицензия | Пакеты | Коммерческое использование |
|----------|--------|---------------------------|
| **MIT** | wireguard_flutter, flutter_v2ray_plus, flutter_v2ray_client, flutter_vpn_service | ✅ Разрешено |
| **GPL-3.0** | openvpn_flutter | ⚠️ Требует open-source при распространении |
| **LGPL-3.0** | flutter_vpn | ✅ Разрешено с динамической линковкой |
| **BSD-3-Clause** | sstp_flutter | ✅ Разрешено |
| **Custom** | flutter_vpn_gost, sm_crypto | 🔶 Проверить в проекте |

---

## 4. Рекомендации по выбору

### 4.1 Mobile-first проекты (Android + iOS)

**Приоритет 1 (Must-have):**
- ✅ WireGuard → `wireguard_flutter`
- ✅ V2Ray/Xray → `flutter_v2ray_plus`
- ✅ OpenVPN → `openvpn_flutter`

**Приоритет 2 (Should-have):**
- 🔶 GOST → `flutter_vpn_gost` (custom)
- 🔶 IKEv2 → `flutter_vpn`

**Приоритет 3 (Nice-to-have):**
- 🔶 SSTP → `sstp_flutter`

### 4.2 Cross-platform проекты (Mobile + Desktop)

**Приоритет 1 (Must-have):**
- ✅ WireGuard → `wireguard_flutter` (5 платформ!)
- ✅ V2Ray/Xray → `flutter_v2ray_client` (5 платформ!)
- ✅ GOST → `flutter_vpn_gost` (5 платформ, custom)

**Приоритет 2 (Mobile-only fallback):**
- 🔶 OpenVPN → `openvpn_flutter` (только mobile)
- 🔶 IKEv2 → `flutter_vpn` (только mobile)

### 4.3 По регионам

**Россия/СНГ:**
- ✅ GOST VPN (приоритет #1 для compliance)
- ✅ WireGuard (современный стандарт)
- ✅ V2Ray/Xray (обход блокировок)

**Китай:**
- ✅ SM2/SM3/SM4 интеграция (для compliance)
- ✅ V2Ray/Xray (обход GFW)
- ✅ WireGuard

**Западные рынки:**
- ✅ OpenVPN (корпоративный стандарт)
- ✅ WireGuard (современный стандарт)
- ✅ IKEv2/IPsec (legacy support)

---

## 5. Архитектурные ограничения

### 5.1 Mobile платформы (Android/iOS)

**Android ограничения:**
- ✅ VPNService API доступен с API 21+
- ✅ 16KB page size support нужен для Android 15+ (API 35+)
- ⚠️ Requires BIND_VPN_SERVICE permission
- ⚠️ User consent required для VPN соединения

**iOS ограничения:**
- ✅ NetworkExtension framework (iOS 9+)
- ✅ Packet Tunnel Provider для custom VPN
- ⚠️ WireGuard требует iOS 15.0+
- ⚠️ App + Network Extension entitlements required
- ⚠️ Code signing обязателен

### 5.2 Desktop платформы

**Linux ограничения:**
- ⚠️ Root или CAP_NET_ADMIN для `/dev/net/tun`
- ⚠️ Network configuration требует elevated privileges
- ✅ systemd-resolved для DNS management

**macOS ограничения:**
- ⚠️ Admin права для utun devices
- ⚠️ NetworkExtension требует app signing + entitlements
- ✅ Можно использовать прямой доступ к utun (без NetworkExtension)

**Windows ограничения:**
- ⚠️ TAP-Windows driver required (OpenVPN TAP)
- ⚠️ Admin права для network adapter configuration
- ⚠️ Firewall rules требуют elevated privileges

### 5.3 Web ограничения

- ❌ VPN протоколы невозможны (нет доступа к network stack)
- ✅ Только криптографические примитивы (sm_crypto)
- 🔶 Возможен SOCKS/HTTP proxy через WebSocket

---

## 6. Выводы

### ✅ Full Cross-Platform (5 платформ):
1. **WireGuard** - `wireguard_flutter`
2. **V2Ray/Xray** - `flutter_v2ray_client`
3. **GOST VPN** - `flutter_vpn_gost` (custom)

### 📱 Mobile-Only (Android + iOS):
1. **OpenVPN** - `openvpn_flutter`
2. **V2Ray/Xray** - `flutter_v2ray_plus` (более функциональный)
3. **IKEv2/IPsec** - `flutter_vpn`
4. **SSTP** - `sstp_flutter`

### 🔧 Специальные случаи:
- **Android low-level API** - `flutter_vpn_service`
- **SM2/SM3/SM4 crypto** - `sm_crypto` (primitives)

### 🎯 Рекомендованный минимальный набор:
- ✅ WireGuard (cross-platform)
- ✅ V2Ray/Xray (cross-platform или mobile)
- ✅ OpenVPN (mobile, корпоративный стандарт)
- ✅ GOST (custom, для России/СНГ)

---

**Next step:** Утвердить эту матрицу и перейти к Specifications фазе для детального дизайна интеграции.
