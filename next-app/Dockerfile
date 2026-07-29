# =============================================================================
# Dockerfile — Polza Agency Portal (Next.js 16)
# Multi-stage: deps → builder → etl-deps → runner
#
# Build context is the REPO ROOT (not next-app/), because this image also
# bundles scripts/ + data_pack/ so the container can self-seed the database
# on first boot. See docker-entrypoint.sh and scripts/seed_if_empty.mjs.
#   docker build -f next-app/Dockerfile .
# =============================================================================

FROM node:22-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

# ---------------------------------------------------------------------------
# Stage 1: production dependencies (Next.js app)
# ---------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app
COPY next-app/package.json next-app/package-lock.json* ./
RUN npm ci --only-production --ignore-scripts

# ---------------------------------------------------------------------------
# Stage 2: build the app
# ---------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY next-app/package.json next-app/package-lock.json* ./
RUN npm ci
COPY next-app/. .
RUN npx next build

# ---------------------------------------------------------------------------
# Stage 3: ETL dependencies (csv-parse, pg-format, iconv-lite, tsx …)
# ---------------------------------------------------------------------------
FROM base AS etl-deps
WORKDIR /etl
COPY scripts/package.json scripts/package-lock.json* ./
RUN npm ci

# ---------------------------------------------------------------------------
# Stage 4: production runner
# ---------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next          ./.next
COPY --from=builder /app/public         ./public
COPY --from=builder /app/package.json   ./
COPY --from=builder /app/next.config.ts ./

# ETL bundle: lets the container seed an empty database on first boot
# (see docker-entrypoint.sh). Mirrors the repo's scripts/ + data_pack/
# layout so load_data.ts's relative path (__dirname/../data_pack) resolves.
COPY --from=etl-deps /etl/node_modules   ./etl/scripts/node_modules
COPY scripts/load_data.ts                ./etl/scripts/load_data.ts
COPY scripts/seed_if_empty.mjs           ./etl/scripts/seed_if_empty.mjs
COPY data_pack                           ./etl/data_pack

COPY next-app/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000
CMD ["./docker-entrypoint.sh"]
