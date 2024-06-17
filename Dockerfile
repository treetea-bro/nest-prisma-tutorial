FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN npx prisma generate

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]