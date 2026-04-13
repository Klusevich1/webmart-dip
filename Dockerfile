# Multi-stage build for Webmart application

# Stage 1: Build server
FROM node:18-alpine AS server-builder

WORKDIR /app/server

# Copy server package files
COPY server/package*.json ./

# Install all server dependencies (including dev dependencies for build)
RUN npm install

# Copy server source
COPY server/ ./

# Build server
RUN npm run build

# Stage 2: Build client
FROM node:18-alpine AS client-builder

WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install all client dependencies (including dev dependencies for build)
RUN npm install

# Copy client source
COPY client/ ./

# Copy shared packages if needed
COPY packages/ ../packages/

# Build client
RUN npm run build

# Install only production dependencies
RUN npm install --production

# Stage 3: Production image
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S webmart -u 1001

# Copy server production files
COPY --from=server-builder --chown=webmart:nodejs /app/server/dist ./server/dist
COPY --from=server-builder --chown=webmart:nodejs /app/server/src ./server/src
COPY --from=server-builder --chown=webmart:nodejs /app/server/package*.json ./server/
COPY --from=server-builder --chown=webmart:nodejs /app/server/node_modules ./server/node_modules

# Database will be created in mounted volume

# Copy client production files
COPY --from=client-builder --chown=webmart:nodejs /app/client/.next ./client/.next
COPY --from=client-builder --chown=webmart:nodejs /app/client/node_modules ./client/node_modules
COPY --from=client-builder --chown=webmart:nodejs /app/client/package*.json ./client/
COPY --from=client-builder --chown=webmart:nodejs /app/client/public ./client/public
COPY --from=client-builder --chown=webmart:nodejs /app/client/next.config.js ./client/
COPY --from=client-builder --chown=webmart:nodejs /app/client/next-env.d.ts ./client/

# Switch to non-root user
USER webmart

# Expose ports
EXPOSE 3000 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

# Start both applications
CMD ["dumb-init", "sh", "-c", "cd server && npm run start:prod & cd client && npm start"]
