# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM node:alpine AS build
WORKDIR /src

COPY . .
RUN npm ci
RUN npx --no-install next build

FROM nginx:alpine
COPY --from=build /src/out /usr/share/nginx/html