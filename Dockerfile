ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-slim

WORKDIR /app

#package.jsonを変更しない限りcacheを利用するため先にCOPY
COPY ./package.json ./pnpm-lock.yaml .npmrc /app/

RUN npm install -g pnpm@9.12.1

RUN pnpm config set store-dir /root/.local/share/pnpm/store/v3 --global

RUN pnpm install --frozen-lockfile

COPY . /app/

CMD ["pnpm", "run", "dev"]