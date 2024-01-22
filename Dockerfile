FROM oven/bun

WORKDIR /app

COPY . .
RUN bun install
RUN bun add -d @types/bun

EXPOSE 4321

CMD [ "bun", "run", "dev" ]
