import winston from "winston";

// logger.js
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: "app.log"
    }),
  ],
});

export { logger };