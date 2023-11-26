FROM node:20 AS base

# Install dependencies only when needed
FROM base AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile
RUN yarn prisma generate

# Test runner dependencies
FROM deps AS test-deps
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
RUN yarn playwright install chromium webkit --with-deps
COPY prisma ./
RUN yarn prisma generate

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
# ENV POSTGRES_PRISMA_URL "postgres://fake:fake@fake/fake"
RUN yarn prisma generate
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
