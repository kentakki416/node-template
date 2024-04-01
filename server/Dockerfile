## パッケージのインストール
FROM node:20-alpine3.17 as install
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

## ビルド環境
FROM node:20-alpine3.17 as build
WORKDIR /work
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build

## テスト環境
FROM node:20-alpine3.17 as test
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "test"]

## 開発環境
FROM node:20-alpine3.17 as dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
USER node
EXPOSE 8080
ENV NODE_ENV dev

CMD ["node", "dist/index", "--max-old-space-size=500"]

## ランタイム環境
FROM node:20-alpine3.17 as runtime
WORKDIR /app
COPY --from=install --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /work/dist ./dist
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
USER node
EXPOSE 8080
ENV NODE_ENV prod

CMD ["node", "dist/index", "--max-old-space-size=500"]
