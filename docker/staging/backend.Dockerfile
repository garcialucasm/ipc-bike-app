FROM node

WORKDIR /app
COPY ./backend/src ./src
COPY ./backend/resources ./resources 
COPY ./backend/package.json ./package.json
COPY ./backend/tsconfig.json ./tsconfig.json
COPY ./backend/node_modules ./node_modules

ENV IPC_BIKES_HOST=""
ENV IPC_BIKES_USER=""
ENV IPC_BIKES_PASSWORD=""
ENV IPC_BIKES_DB=""
ENV IPC_BIKES_PORT=""

ENTRYPOINT [ "npm", "run", "start"]

