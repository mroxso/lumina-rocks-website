FROM oven/bun:1
WORKDIR /app
COPY ./src/ .
RUN bun install
 
ARG PORT
EXPOSE ${PORT:-3000}

CMD ["bun", "dev"]