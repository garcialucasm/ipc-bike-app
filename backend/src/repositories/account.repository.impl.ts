import { Client } from "pg";
import { userAccount } from "../models/account.model";
import IAccountRepository from "./account.repository";
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

  async save(account: userAccount): Promise<userAccount> {
    try {
      account.user.createdAt = new Date()
      if (account.user.password) {
        account.user.password = await bcrypt.hash(account.user.password, saltRounds);
      }

      let result = await this.client.query(this.insertAccountStmt, [account.user.email, account.user.password, account.user.isActive, account.user.createdAt])

      let [row] = result.rows

      if (row === undefined)
        throw new Error("Couldn't insert user account")

      return accountFromRow(row)
    }
    catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<userAccount> {
    try {
      let result = await this.client.query(this.findByEmailStmt, [email])

      let [row] = result.rows

      return row
    } catch (error) {
      throw error;
    }
  }

  async findAccount(email: string): Promise<userAccount> {
    try {
      let result = await this.client.query(this.loginStmt, [email])

      let [row] = result.rows

      if (!row) {
        throw new Error("Email not found");
      }

      return {
        user: {
          id: row.id,
          email: row.email,
          password: row.password,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // // TODO: Complete this method
  // async update(account: Account): Promise<Account> {
  //   if (account.user.email === undefined)
  //     throw new Error("Cant update user with undefined email")

  //   account.user.updatedAt = new Date()
  //   let result = await this.client.query(this.updateUserStmt, [account.user.email])

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
