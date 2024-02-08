import { Client } from "pg";
import { Account } from "../models/account.model";
import IAccountRepository from "./account.repository";
import { accountFromRow } from "./mappings";
import bcrypt from 'bcrypt';

const saltRounds = 8

export default class AccountRepository implements IAccountRepository {

  client: Client

  insertAccountStmt: string = `INSERT INTO "account" (name, email, password, is_active, created_at)
    VALUES($1, $2, $3, $4, $5) RETURNING *`

  findByEmailStmt: string = `SELECT id, name, email, is_active, created_at, updated_at, deleted_at FROM "account" WHERE email=$1`;

  loginStmt: string = `SELECT id, email, name, password FROM "account" WHERE email=$1`;

  constructor(client: Client) {
    this.client = client;
  }

  async save(account: Account): Promise<Account> {
    try {
      const name = account.AccountName
      const email = account.Email
      let password = account.Password ?? ''
      const isActive = account.IsActive
      const createdAt = new Date()

      password = await bcrypt.hash(password, saltRounds);

      let result = await this.client.query(this.insertAccountStmt, [name, email, password, isActive, createdAt])

      let [row] = result.rows

      if (row === undefined)
        throw new Error("Couldn't insert user account")

      return accountFromRow(row)
    }
    catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<Account> {
    try {
      let result = await this.client.query(this.findByEmailStmt, [email])

      let [row] = result.rows

      return row
    } catch (error) {
      throw error;
    }
  }

  async findAccount(email: string): Promise<Account> {
    try {
      let result = await this.client.query(this.loginStmt, [email])

      let [row] = result.rows

      if (!row) {
        throw new Error("Email not found");
      }

      return {
        ID: row.id,
        AccountName: row.name,
        Email: row.email,
        Password: row.password,
      };
    } catch (error) {
      throw error;
    }
  }

}
