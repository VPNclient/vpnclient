# Specifications: h2.core Docker Wrapper

> Version: 1.0
> Status: APPROVED
> Last Updated: 2026-06-21
> Requirements: [01-requirements.md](./01-requirements.md)

## Overview

Docker образ для h2.core VPN, поддерживающий режимы сервера и клиента через xray-compatible config.json. Образ публикуется на Docker Hub с поддержкой multi-arch (amd64, arm64).

## Affected Systems

| System | Impact | Notes |
|--------|--------|-------|
| `.github/docker/Dockerfile` | Modify | Заменить xray-core сборку на h2.core |
| `cmd/https-vpn/main.go` | Modify | Добавить default config path `/etc/h2/config.json` |

## Architecture

### Container Structure

```
/
├── usr/local/bin/
│   └── h2                      # h2.core binary (статически слинкованный)
├── usr/local/share/h2/
│   ├── geoip.dat               # GeoIP database (опционально, встроен)
│   └── geosite.dat             # GeoSite database (опционально, встроен)
└── etc/h2/
    └── config.json             # Конфигурация (монтируется пользователем)
```

### Build Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Stage 1: Build (golang:1.25)                                │
│                                                             │
│  COPY source → /src                                         │
│  CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH           │
│  go build -o h2 ./cmd/https-vpn                            │
│                                                             │
│  # Download geodata (optional, cached)                      │
│  ADD geoip.dat → /tmp/geodat/geoip.dat                     │
│  ADD geosite.dat → /tmp/geodat/geosite.dat                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Stage 2: Runtime (gcr.io/distroless/static:nonroot)        │
│                                                             │
│  COPY --from=build /src/h2 → /usr/local/bin/h2             │
│  COPY --from=build /tmp/geodat/*.dat → /usr/local/share/h2/│
│  ENTRYPOINT ["/usr/local/bin/h2"]                          │
│  CMD ["run", "-c", "/etc/h2/config.json"]                  │
└─────────────────────────────────────────────────────────────┘
```

### Geodata Sources

```dockerfile
# Loyalsoldier v2ray-rules-dat (recommended)
ADD https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/geoip.dat /tmp/geodat/
ADD https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/geosite.dat /tmp/geodat/
```

### Data Flow

**Server Mode:**
```
Client → [port 443] → h2 container → freedom outbound → Internet
```

**Client Mode (SOCKS5):**
```
App → [port 1080] → h2 container (socks inbound) → https-vpn outbound → VPN Server → Internet
```

## Interfaces

### CLI Interface

```bash
# Default (uses /etc/h2/config.json)
h2 run

# Custom config path
h2 run -c /path/to/config.json

# Show version
h2 version
```

### Docker Interface

```bash
# Minimal run
docker run -v ./config.json:/etc/h2/config.json h2-core

# With port mapping (server)
docker run -p 443:443 -v ./config.json:/etc/h2/config.json h2-core

# With port mapping (client)
docker run -p 1080:1080 -v ./config.json:/etc/h2/config.json h2-core
```

## Config Examples

### Server Config

```json
{
  "inbounds": [
    {
      "port": 443,
      "protocol": "https-vpn",
      "streamSettings": {
        "network": "h2",
        "security": "tls",
        "tlsSettings": {
          "cipherSuites": "us",
          "certificates": [
            {
              "certificateFile": "/etc/h2/certs/server.crt",
              "keyFile": "/etc/h2/certs/server.key"
            }
          ]
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom"
    }
  ]
}
```

### Client Config (SOCKS5 Proxy)

```json
{
  "inbounds": [
    {
      "port": 1080,
      "listen": "0.0.0.0",
      "protocol": "socks",
      "settings": {
        "auth": "noauth"
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "https-vpn",
      "settings": {
        "servers": [
          {
            "address": "vpn.example.com",
            "port": 443
          }
        ]
      },
      "streamSettings": {
        "network": "h2",
        "security": "tls",
        "tlsSettings": {
          "cipherSuites": "us",
          "serverName": "vpn.example.com"
        }
      }
    }
  ]
}
```

## Docker Hub Metadata

### Image Labels (OCI)

```dockerfile
LABEL org.opencontainers.image.title="h2-core"
LABEL org.opencontainers.image.description="HTTPS VPN over HTTP/2 - Server and Client"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.source="https://github.com/vpnclient/h2.core"
LABEL org.opencontainers.image.licenses="Apache-2.0"
```

### Supported Tags

- `latest` - последняя stable версия
- `x.y.z` - конкретная версия
- `x.y` - последний patch для minor версии

### Platforms

**Docker images:**
- `linux/amd64`
- `linux/arm64`

**Standalone binaries:**
- `windows/amd64` (`h2.exe`)

## Behavior Specifications

### Happy Path

1. User создаёт config.json с нужной конфигурацией
2. User запускает `docker run -v ./config.json:/etc/h2/config.json h2-core`
3. Container стартует, h2 читает config.json
4. h2 начинает слушать на указанных портах
5. Connections обрабатываются согласно inbounds/outbounds

### Edge Cases

| Case | Trigger | Expected Behavior |
|------|---------|-------------------|
| No config mounted | `/etc/h2/config.json` отсутствует | Exit с ошибкой "config file not found" |
| Invalid JSON | Синтаксическая ошибка | Exit с ошибкой парсинга |
| Port already bound | Порт занят на хосте | Exit с ошибкой "address already in use" |
| Missing certificates | Server mode без сертификатов | Exit с ошибкой "certificate file not found" |

### Error Handling

| Error | Cause | Response |
|-------|-------|----------|
| Config not found | Volume не смонтирован | Log error, exit 1 |
| Config parse error | Invalid JSON | Log error with details, exit 1 |
| TLS error | Bad certificates | Log error, exit 1 |
| Network error | Port conflict | Log error, exit 1 |

## Dependencies

### Build Dependencies

- Go 1.25+
- Docker with BuildKit
- `docker buildx` for multi-arch builds

### Runtime Dependencies

- None (статический бинарник в distroless)

## Testing Strategy

### Manual Verification

1. **Build test:**
   - [ ] `docker build` успешен для amd64
   - [ ] `docker buildx build --platform linux/arm64` успешен

2. **Server mode test:**
   - [ ] Container стартует с server config
   - [ ] Слушает на порту 443
   - [ ] Принимает HTTPS connections

3. **Client mode test:**
   - [ ] Container стартует с client config
   - [ ] Слушает на порту 1080
   - [ ] SOCKS5 proxy работает
   - [ ] Traffic идёт через VPN

4. **Error handling test:**
   - [ ] Без config.json — понятная ошибка
   - [ ] С битым JSON — понятная ошибка

## Build Commands

### Local Docker Build

```bash
docker build -t h2-core .
```

### Multi-arch Docker Build & Push

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag username/h2-core:latest \
  --tag username/h2-core:0.1.0 \
  --push \
  .
```

### Windows Binary Build

```bash
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 \
  go build -o h2.exe -trimpath -ldflags "-s -w" ./cmd/https-vpn
```

### Windows Usage

```cmd
h2.exe run -c config.json
```

## Open Design Questions

- [x] Default config path — `/etc/h2/config.json`
- [x] Binary name — `h2`
- [x] Base image — `gcr.io/distroless/static:nonroot`

---

## Approval

- [x] Reviewed by: User
- [x] Approved on: 2026-06-21
- [x] Notes: Added Windows binary build and geodata support
