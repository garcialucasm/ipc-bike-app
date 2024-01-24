import { Client } from "pg";
import { Account } from "../models/account.model";
import IAccountRepository from "./account.repository";
import { createWhereClausule } from "./sql.util";
import { accountFromRow } from "./mappings";
import bcrypt from 'bcrypt';

const saltRounds = 8

export default class AccountRepository implements IAccountRepository {

  client: Client

  insertAccountStmt: string = `INSERT INTO "account" (email, password, is_active, created_at)
    VALUES($1, $2, $3, $4) RETURNING *`

  findByEmailStmt: string = `SELECT id, email, is_active, created_at, updated_at, deleted_at FROM "account" WHERE email=$1`;

  loginStmt: string = `SELECT email, password FROM "account" WHERE email=$1`;

  // findAllStmt: string = `SELECT * FROM "account"`

  // updateUserStmt: string = `UPDATE "account" SET password=$1, is_active=$2, updated_at=$3 WHERE email=$4 RETURNING *`

  // deleteUserStmt: string = `UPDATE "account" set is_active=$1, deleted_at=$2 WHERE email=$3 RETURNING *`

  constructor(client: Client) {
    this.client = client;
  }

  async save(account: Account): Promise<Account> {
    account.createdAt = new Date()
    if (account.password) {
      account.password = await bcrypt.hash(account.password, saltRounds);
    }

    let result = await this.client.query(this.insertAccountStmt, [account.email, account.password, account.isActive, account.createdAt])

    let [row] = result.rows

    if (row === undefined)
      throw new Error("Couldn't insert user account")

    return accountFromRow(row)
  }

  async findByEmail(email: string): Promise<Account> {
    let result = await this.client.query(this.findByEmailStmt, [email])

    let [row] = result.rows

    return row
  }

  async login(email: string): Promise<Account> {
    let result = await this.client.query(this.loginStmt, [email])

    let [row] = result.rows

    return row
  }

  // // TODO: Complete this method
  // async update(account: Account): Promise<Account> {
  //   if (account.email === undefined)
  //     throw new Error("Cant update user with undefined email")

  //   account.updatedAt = new Date()
  //   let result = await this.client.query(this.updateUserStmt, [account.email])

  //   if (result.rowCount == 0)
  //     throw new Error("Couldn't update user account")

  //   let [row] = result.rows

  //   return accountFromRow(row)
  // }

  // // TODO: Complete this method
  // async delete(email: string): Promise<Account> {
  //   let result = await this.client.query(this.deleteUserStmt, [false, new Date(), email])

  //   if (result.rowCount == 0)
  //     throw new Error("Couldn't delete user account")

  //   let [row] = result.rows

  //   return accountFromRow(row)
  // }

  // // TODO: Complete this method
  // async findAll(searchCriteria: { email?: string | undefined }): Promise<Account[]> {
  //   let query: string = this.findAllStmt

  //   query += createWhereClausule(searchCriteria)
  //   let result = await this.client.query(query, Object.values(searchCriteria))

  //   return result.rows.map(row => accountFromRow(row))
  // }

}
