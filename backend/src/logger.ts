import winston from "winston";

// logger.js
const { combine, timestamp, json, printf } = winston.format;

const transports = [
    new winston.transports.Console(), 
    new winston.transports.File({
      filename: "app.log"
    }),
]

const formatter = printf(({ level, message, timestamp, className }) => {
  return `${timestamp} [${className}] ${level}: ${message}`;
})

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), formatter),
  defaultMeta: {
    className: 'global'
  },
  transports: transports
});



function getLogger(className: string = "") {
  if (className === "")
    return logger
  console.log('pudim')
  return winston.createLogger({
    level: process.env[`LOG_LEVEL_${className}`] || process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), formatter), 
      defaultMeta: {
      className: className,
    },
    transports: transports
  })
}

export { logger, getLogger };
