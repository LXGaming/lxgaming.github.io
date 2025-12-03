# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM node:lts-alpine AS build
RUN npm install --global pnpm@latest
WORKDIR /src

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:alpine
COPY --from=build /src/out /usr/share/nginx/html