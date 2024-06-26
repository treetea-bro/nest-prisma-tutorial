FROM node:20.15.0-alpine3.20

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm@latest && pnpm install && pnpm run build && rm -rf ./src

CMD ["pnpm", "start:prod"]
