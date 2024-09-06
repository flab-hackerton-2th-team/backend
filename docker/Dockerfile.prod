ARG NODE_VERSION="18.20.4"
ARG ALPINE_VERSION="3.19"

# base
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as base

WORKDIR /app

RUN apk update
RUN corepack enable

# build
FROM base as builder

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm run build

# runner
FROM base as runner

RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules

ENV TZ=Asia/Seoul
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "main.js"]
