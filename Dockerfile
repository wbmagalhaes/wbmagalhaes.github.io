FROM oven/bun:latest

RUN apt-get -y update
RUN apt-get -y upgrade

RUN apt-get -y install python3

WORKDIR /app

COPY . .
RUN bun install
RUN bun add -d @types/bun

EXPOSE 4321

CMD [ "bun", "run", "--bun", "build" ]
