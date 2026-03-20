FROM node:25-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV VITE_PLUS_HOME="/root/.vite-plus"
ENV PATH="$VITE_PLUS_HOME/bin:$PNPM_HOME:$PATH"

RUN npm install --global --force corepack@latest
RUN corepack enable pnpm
RUN corepack use pnpm@latest-10
RUN apt-get update && apt-get install -y curl && apt-get install -y git
RUN curl -fsSL https://vite.plus | bash

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN vp build

FROM base
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
EXPOSE 3000
CMD ["vp", "run", "start"]
