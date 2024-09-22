FROM node:21-alpine AS node

FROM node AS builder

WORKDIR /build

COPY package.json /build/package.json
COPY package-lock.json /build/package-lock.json
RUN npm i typescript@5.2.2
RUN npm i
RUN npm ls

COPY tsconfig.json /build/tsconfig.json
COPY resources /build/resources
COPY src /build/src

RUN npm run build

FROM node as final

WORKDIR /home/node/app
RUN apk --no-cache -U upgrade
RUN chown -R node:node /home/node/app

USER node

ENV NODE_ENV production

COPY package*.json ./
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules

ENV IPC_BIKES_HOST=""
ENV IPC_BIKES_USER=""
ENV IPC_BIKES_PASSWORD_FILE=""
ENV IPC_BIKES_DB=""
ENV IPC_BIKES_PORT=""
ENV PUBLIC_JWT_KEY=""
ENV PRIVATE_JWT_KEY=""

ENV PORT=3000

EXPOSE ${PORT}

ENTRYPOINT [ "node", "dist/index.js" ]

