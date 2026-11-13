# Stage 1: Build dependencies
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package*.json ./

# Install exact dependencies from lockfile
RUN npm ci

# Stage 2: Production image
FROM node:22-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

# Create a dedicated non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy dependency manifests
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy application source
COPY --chown=appuser:appgroup src/ ./src/

# Run as non-root user
USER appuser

EXPOSE 5000

# Container health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:5000/healthz', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "src/server.js"]
