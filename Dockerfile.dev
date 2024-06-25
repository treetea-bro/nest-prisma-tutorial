FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm@latest && pnpm install

CMD ["pnpm", "start:dev"]
