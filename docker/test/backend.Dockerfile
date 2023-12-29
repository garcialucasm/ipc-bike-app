FROM node

WORKDIR /app
COPY ./backend/src ./src
COPY ./backend/resources ./resources 
COPY ./backend/package.json ./package.json
COPY ./backend/tsconfig.json ./tsconfig.json
RUN npm install 

ENV DB_USER=""
ENV DB_USER=""
ENV HOST=""
ENV DATABASE=""
ENV PASSWORD=""
ENV PORT=5432
ENTRYPOINT [ "npm", "run"]

