import { Client } from "pg";
import { Account } from "../models/account.model";
import IAccountRepository from "./account.repository";
import { accountFromRow } from "./mappings";
import { getLogger } from "../logger";
import { accountMessages } from "../../../shared/constants/errorMessages";

const logger = getLogger('AccountRepository')

export default class AccountRepository implements IAccountRepository {

  client: Client

  insertAccountStmt: string = `INSERT INTO "account" (name, email, hash, is_active, created_at)
    VALUES($1, $2, $3, $4, $5) RETURNING *`

  findByEmailStmt: string = `SELECT id, name, email, is_active, created_at, updated_at, deleted_at FROM "account" WHERE email=$1`;

  loginStmt: string = `SELECT id, email, name, hash FROM "account" WHERE email=$1`;

  constructor(client: Client) {
    this.client = client;
  }

  async save(account: Account): Promise<Account> {
    logger.silly("save")
    try {
      const name = account.AccountName
      const email = account.Email
      const hash = account.Hash
      const isActive = account.IsActive
      const createdAt = new Date()
      console.log(`AccountRepository.save(${email})`)
      let result = await this.client.query(this.insertAccountStmt, [name, email, hash, isActive, createdAt])

      let [row] = result.rows

      if (row === undefined) {
        logger.error("Couldn't insert user account")
        throw new Error("Couldn't insert user account")
      }

      return accountFromRow(row)
    }
    catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<Account | null> {
    logger.silly("findByEmail")
    try {
      let result = await this.client.query(this.findByEmailStmt, [email])

      if (result.rows.length) {
        let account = result.rows[0]
        return accountFromRow(account)
      } else {
        return null;
      }
    } catch (error) {
      logger.silly("Couldn't find account by email")
      throw new Error("Couldn't find account by email")
    }
  }

  async findAccount(email: string): Promise<Account> {
    logger.silly("findAccount")
    try {
      let result = await this.client.query(this.loginStmt, [email])

      let account = result.rows[0]

      if (!account) {
        logger.silly(accountMessages.EMAIL_NOT_FOUND)
        throw new Error(accountMessages.EMAIL_NOT_FOUND);
      }

      return {
        ID: account.id,
        AccountName: account.name,
        Email: account.email,
        Hash: account.hash,
      };
    } catch (error) {
      {
        logger.error(`${error}`)
        throw error;
      }
    }
  }

}
