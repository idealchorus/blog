FROM denoland/deno:latest AS builder

WORKDIR /app

COPY deno.json deno.lock ./
RUN deno install

COPY . .
RUN deno task build

FROM denoland/deno:latest AS runner

WORKDIR /app

COPY --from=builder /app/deno.json /app/deno.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["deno", "task", "start"]
