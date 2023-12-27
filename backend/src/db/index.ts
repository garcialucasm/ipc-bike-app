import {Client} from 'pg'


export default new Client({
  host: process.env.IPC_BIKES_HOST,
  user: process.env.IPC_BIKES_USER,
  password: process.env.IPC_BIKES_PASSWORD,
  database: process.env.IPC_BIKES_DB
})
