# ============================================================
# Stage 1: Build con Node + Astro (genera dist/ estático)
# ============================================================
FROM node:22-alpine AS builder

# Cache de deps con BuildKit
WORKDIR /app

# Copiar manifests primero para cache de npm ci
COPY package.json package-lock.json* ./

# Instalar deps (frozen lockfile si existe)
RUN if [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund; \
    else \
      npm install --no-audit --no-fund; \
    fi

# Copiar el resto del código
COPY . .

# Build estático
RUN npm run build

# ============================================================
# Stage 2: nginx alpine sirviendo estáticos (imagen final ~10MB)
# ============================================================
FROM nginx:1.27-alpine AS runner

# Labels OCI para trazabilidad
LABEL org.opencontainers.image.title="MIT Interiorismo Web" \
      org.opencontainers.image.description="Web profesional del estudio de interiorismo MIT Interiorismo" \
      org.opencontainers.image.vendor="MIT Interiorismo" \
      org.opencontainers.image.source="https://www.mitinteriorismo.studio"

# Copiar build estático de Astro a nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración custom de nginx (cache + compresión Brotli/Gzip)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck para Coolify
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Exponer puerto 80 (Coolify/Traefik lo mapea)
EXPOSE 80

# nginx ya tiene CMD definido en la imagen base, no hace falta redefinirlo