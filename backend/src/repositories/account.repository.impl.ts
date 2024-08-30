import { Client } from "pg";
import { Account } from "../models/account.model";
import IAccountRepository from "./account.repository";
import { accountFromRow } from "./mappings";
import { getLogger } from "../logger";
import { accountMessages } from "../utils/errorMessages";

const logger = getLogger("AccountRepository");

export default class AccountRepository implements IAccountRepository {
  client: Client;

  insertAccountStmt: string = `INSERT INTO "account" (type, name, email, hash, is_active, created_at)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

  findByEmailStmt: string = `SELECT id, type, name, email, is_active, created_at, updated_at, deleted_at 
                             FROM "account" WHERE email=$1`;

  loginStmt: string = `SELECT id, type, email, name, hash, is_active 
                       FROM "account" WHERE email=$1`;

  constructor(client: Client) {
    this.client = client;
  }

  async save(account: Account): Promise<Account> {
    logger.silly("save");
    try {
      const { Type, AccountName, Email, Hash, IsActive } = account;
      const createdAt = new Date();

      const result = await this.client.query(this.insertAccountStmt, [
        Type,
        AccountName,
        Email,
        Hash,
        IsActive,
        createdAt,
      ]);

      const row = result.rows[0];

      if (!row) {
        logger.error("Couldn't insert user account");
        throw new Error("Couldn't insert user account");
      }

      return accountFromRow(row);
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<Account | null> {
    logger.silly("findByEmail");
    try {
      const result = await this.client.query(this.findByEmailStmt, [email]);

      if (result.rows.length) {
        const account = result.rows[0];
        return accountFromRow(account);
      } else {
        return null;
      }
    } catch (error) {
      logger.silly("Couldn't find account by email");
      throw new Error("Couldn't find account by email");
    }
  }

  async findAccount(email: string): Promise<Account> {
    logger.silly("findAccount");
    try {
      const result = await this.client.query(this.loginStmt, [email]);
      const account = result.rows[0];

      if (!account) {
        logger.silly(accountMessages.EMAIL_NOT_FOUND);
        throw new Error(accountMessages.EMAIL_NOT_FOUND);
      }

      return {
        ID: account.id,
        Type: account.type,
        AccountName: account.name,
        Email: account.email,
        Hash: account.hash,
        IsActive: account.is_active,
      };
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  }
}
