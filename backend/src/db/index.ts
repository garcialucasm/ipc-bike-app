import {Client} from 'pg'
import * as fs from 'fs'

export default function getClient() {
  let dbPassword: string

  if (process.env.IPC_BIKES_PASSWORD) {
    dbPassword = process.env.IPC_BIKES_PASSWORD
  } else if (process.env.IPC_BIKES_PASSWORD_FILE) {
    dbPassword = fs.readFileSync(process.env.IPC_BIKES_PASSWORD_FILE, 'utf8')
  } else {
    throw new Error("could not find database password, please verify your configuration")
  }

  return new Client({
    host: process.env.IPC_BIKES_HOST,
    user: process.env.IPC_BIKES_USER,
    password: dbPassword,
    database: process.env.IPC_BIKES_DB,
    port: Number.parseInt(process.env.IPC_BIKES_PORT ?? "5432")
  })
}
