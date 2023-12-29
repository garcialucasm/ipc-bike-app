FROM node:21

WORKDIR /app
COPY ./backend/src ./src
COPY ./backend/resources ./resources 
COPY ./backend/package.json ./package.json
COPY ./backend/tsconfig.json ./tsconfig.json
COPY ./backend/node_modules  ./node_modules

ENV TEST_DB_USER=""
ENV TEST_DB_USER=""
ENV TEST_HOST=""
ENV TEST_DATABASE=""
ENV TEST_PASSWORD=""
ENV TEST_PORT=5432
#ENTRYPOINT [ "ls" ]
ENTRYPOINT [ "npm", "run", "integration-test" ]
