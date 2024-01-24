FROM node:18-alpine as builder
WORKDIR /my-space

COPY src/package.json src/package-lock.json ./
RUN npm ci
COPY ./src/ .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /app
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/package-lock.json .
COPY --from=builder /my-space/next.config.mjs ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static
RUN npm i
EXPOSE 3000
CMD ["node", "server.js"]