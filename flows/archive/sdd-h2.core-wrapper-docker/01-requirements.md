# Requirements: h2.core Docker Wrapper

> Version: 2.1
> Status: APPROVED
> Last Updated: 2026-06-21

## Problem Statement

Необходим Docker-контейнер для h2.core, который работает как VPN сервер или клиент в зависимости от переданного config.json. Формат конфигурации совместим с xray-core. Контейнер должен быть универсальным и поддерживать оба режима работы.

## User Stories

### Primary

**As a** пользователь/devops
**I want** запустить Docker-контейнер h2.core с кастомным config.json
**So that** получить VPN сервер или клиент (с SOCKS5 proxy) в зависимости от конфигурации

### Server Mode

**As a** администратор VPN
**I want** запустить h2.core как HTTPS VPN сервер в Docker
**So that** клиенты могли подключаться к нему

### Client Mode

**As a** пользователь VPN
**I want** запустить h2.core как клиент в Docker
**So that** получить SOCKS5 proxy для проксирования трафика через VPN

## Acceptance Criteria

### Must Have

1. **Given** config.json с server inbound конфигурацией
   **When** контейнер запущен
   **Then** h2.core работает как VPN сервер на указанном порту

2. **Given** config.json с client конфигурацией (socks inbound + https-vpn outbound)
   **When** контейнер запущен
   **Then** h2.core предоставляет SOCKS5 proxy, проксируя через VPN

3. **Given** Docker image собран для linux/amd64
   **When** запускается на x86_64 Linux
   **Then** контейнер работает корректно

4. **Given** Docker image собран для linux/arm64
   **When** запускается на ARM64 (Apple Silicon, AWS Graviton)
   **Then** контейнер работает корректно

5. **Given** Бинарник собран для windows/amd64
   **When** запускается на Windows
   **Then** h2.exe работает корректно с config.json

### Should Have

1. **Given** контейнер запущен
   **When** config.json некорректен
   **Then** контейнер логирует понятную ошибку и завершается

### Should Have

2. **Given** контейнер запущен с geoip.dat
   **When** routing rules используют geoip
   **Then** geo-based routing работает корректно

### Won't Have (This Iteration)

- Hot-reload конфигурации
- Встроенные примеры конфигов в образе
- Health check endpoint
- Metrics endpoint

## Configuration

Конфигурация передаётся через **config.json** (монтируется как volume).

Формат совместим с xray-core:

```json
{
  "inbounds": [...],
  "outbounds": [...]
}
```

### Примеры использования

**Server mode:**
```bash
docker run -d -p 443:443 \
  -v /path/to/server-config.json:/etc/h2/config.json \
  -v /path/to/certs:/etc/h2/certs \
  h2-core
```

**Client mode (SOCKS5 proxy):**
```bash
docker run -d -p 1080:1080 \
  -v /path/to/client-config.json:/etc/h2/config.json \
  h2-core
```

## Constraints

- **Config path**: `/etc/h2/config.json` (фиксированный путь в контейнере)
- **Geodata path**: `/usr/local/share/h2/` (опционально: geoip.dat, geosite.dat)
- **Platform**: linux/amd64, linux/arm64, windows/amd64
- **Base Image**: distroless (не alpine)
- **Build**: Multi-stage build, статическая линковка (CGO_ENABLED=0)
- **Format**: xray-compatible JSON config
- **Registry**: Docker Hub ready (proper labels, multi-arch manifest)

## Technical Notes

Существующий код:
- `cmd/https-vpn/main.go` — уже поддерживает `run -c config.json`
- `infra/conf/config.go` — xray-compatible структура конфигурации
- Поддержка inbounds/outbounds как в xray-core

Необходимо создать:
1. `Dockerfile` — multi-stage build для h2.core
2. Возможно адаптировать main.go для работы с фиксированным путём конфига

## References

- h2.core source: `vpnclient.engine/vendors/h2.core/`
- CLI: `vpnclient.engine/vendors/h2.core/cmd/https-vpn/main.go`
- Config: `vpnclient.engine/vendors/h2.core/infra/conf/config.go`
- Sample configs: `vpnclient.engine/vendors/h2.core/config.*.json`

---

## Open Questions

- [x] Server или Client? — **Оба, зависит от config.json**
- [x] Конфигурация? — **config.json (xray-compatible)**
- [x] Архитектуры? — **linux/amd64, linux/arm64**
- [x] Базовый образ? — **distroless (не alpine)**

---

## Approval

- [x] Reviewed by: User
- [x] Approved on: 2026-06-21
- [x] Notes: Added Docker Hub readiness requirement
