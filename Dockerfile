FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN npx prisma generate

CMD ["pnpm", "start:dev"]
