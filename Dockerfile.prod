FROM oven/bun:1 as builder
WORKDIR /app
COPY ./src/ .
RUN bun install
RUN bun run build

FROM oven/bun:1 as final
WORKDIR /app
COPY --from=builder /app/dist/ .

ARG PORT
EXPOSE ${PORT:-3000}
 
CMD ["bun", "run", "start"]