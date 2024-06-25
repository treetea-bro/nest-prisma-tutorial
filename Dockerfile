FROM node:20

WORKDIR /var/jenkins_home/workspace/test
# WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm@latest && pnpm install && pnpm run build && rm -rf ./src

CMD ["pnpm", "start:prod"]
