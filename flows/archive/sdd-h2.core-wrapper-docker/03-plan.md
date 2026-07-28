# Implementation Plan: h2.core Docker Wrapper

> Version: 1.0
> Status: APPROVED
> Last Updated: 2026-06-21
> Specifications: [02-specifications.md](./02-specifications.md)

## Summary

Создание Docker образа для h2.core с поддержкой multi-arch (linux/amd64, linux/arm64) и Windows бинарника. Минимальные изменения в коде — только default config path. Основная работа — Dockerfile.

## Task Breakdown

### Phase 1: Dockerfile

#### Task 1.1: Create Dockerfile
- **Description**: Multi-stage Dockerfile с golang build и distroless runtime
- **Files**:
  - `Dockerfile` - Create (в корне h2.core)
- **Dependencies**: None
- **Verification**: `docker build` успешен
- **Complexity**: Medium

#### Task 1.2: Add geodata download
- **Description**: Добавить скачивание geoip.dat и geosite.dat в build stage
- **Files**:
  - `Dockerfile` - Modify
- **Dependencies**: Task 1.1
- **Verification**: Файлы присутствуют в `/usr/local/share/h2/`
- **Complexity**: Low

#### Task 1.3: Add OCI labels
- **Description**: Добавить Docker Hub metadata labels
- **Files**:
  - `Dockerfile` - Modify
- **Dependencies**: Task 1.1
- **Verification**: `docker inspect` показывает labels
- **Complexity**: Low

### Phase 2: Build Scripts

#### Task 2.1: Create build script for Windows
- **Description**: Скрипт для сборки Windows бинарника
- **Files**:
  - `build-windows.sh` - Create
- **Dependencies**: None
- **Verification**: `h2.exe` собирается и работает
- **Complexity**: Low

### Phase 3: Testing

#### Task 3.1: Test Docker build (amd64)
- **Description**: Локальная сборка и тест
- **Files**: None
- **Dependencies**: Task 1.1, 1.2, 1.3
- **Verification**: Container стартует с тестовым конфигом
- **Complexity**: Low

#### Task 3.2: Test multi-arch build
- **Description**: Сборка для arm64 через buildx
- **Files**: None
- **Dependencies**: Task 3.1
- **Verification**: `docker buildx build --platform linux/arm64` успешен
- **Complexity**: Low

## Dependency Graph

```
Task 1.1 (Dockerfile) ──┬── Task 1.2 (geodata)
                        │
                        └── Task 1.3 (labels) ──→ Task 3.1 (test amd64)
                                                          │
Task 2.1 (Windows) ─────────────────────────────          ▼
                                                  Task 3.2 (test arm64)
```

## File Change Summary

| File | Action | Reason |
|------|--------|--------|
| `Dockerfile` | Create | Multi-stage build для Docker Hub |
| `build-windows.sh` | Create | Windows binary build script |

**Note**: main.go не изменяется — путь передаётся через CMD в Dockerfile.

## Implementation Details

### Dockerfile Content

```dockerfile
# syntax=docker/dockerfile:latest
FROM --platform=$BUILDPLATFORM golang:1.25 AS build

WORKDIR /src
COPY . .

ARG TARGETOS
ARG TARGETARCH
ARG VERSION=dev

RUN CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH \
    go build -o h2 -trimpath \
    -ldflags "-s -w -X main.Version=$VERSION" \
    ./cmd/https-vpn

# Download geodata
ADD https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/geoip.dat /tmp/geodat/
ADD https://raw.githubusercontent.com/Loyalsoldier/v2ray-rules-dat/release/geosite.dat /tmp/geodat/

# Runtime
FROM gcr.io/distroless/static:nonroot

COPY --from=build /src/h2 /usr/local/bin/h2
COPY --from=build /tmp/geodat/*.dat /usr/local/share/h2/

VOLUME /etc/h2

EXPOSE 443 1080

LABEL org.opencontainers.image.title="h2-core"
LABEL org.opencontainers.image.description="HTTPS VPN over HTTP/2"

ENTRYPOINT ["/usr/local/bin/h2"]
CMD ["run", "-c", "/etc/h2/config.json"]
```

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Go version mismatch | Low | Medium | Use golang:1.25 in Dockerfile |
| Geodata download fails | Low | Low | Build succeeds, just no geodata |
| arm64 build issues | Low | Medium | Test on Apple Silicon |

## Rollback Strategy

1. Delete Dockerfile
2. Delete build-windows.sh

## Checkpoints

After implementation:

- [ ] `docker build -t h2-core .` успешен
- [ ] Container стартует без ошибок
- [ ] `docker run h2-core version` выводит версию
- [ ] geoip.dat присутствует в образе
- [ ] Windows build создаёт рабочий h2.exe

---

## Approval

- [x] Reviewed by: User
- [x] Approved on: 2026-06-21
- [x] Notes: Вариант 1 (CMD в Dockerfile), main.go не изменяется
