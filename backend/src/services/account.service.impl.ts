import bcrypt from "bcrypt";
import { Account } from "../models/account.model";
import IAccountRepository from "../repositories/account.repository";
import IAccountService from "./account.service";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv"
import { generateAsyncToken } from "../utils/auth";
import { AccountDataDTO } from "../dto/account.dto";

dotenv.config()

export default class AccountService implements IAccountService {

  accountRepository: IAccountRepository

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository
  }

  async registerAccount(name: string, email: string, password: string): Promise<Account> {
    const users = await this.accountRepository.findByEmail(email)
    let account: Account

    if (!users) {
      account = {
        AccountName: name,
        Email: email,
        Password: password,
        IsActive: true
      } as Account

      account = await this.accountRepository.save(account)
    } else {
      throw new Error("E-mail already registered")
    }

    return account
  }

  async login(loginEmail: string, loginPassword: string): Promise<AccountDataDTO> {

    try {
      if (!loginEmail) {
        throw new Error("Email is not provided");
      }

      const foundAccount = await this.accountRepository.findAccount(loginEmail, loginPassword);
      const storedEmail = foundAccount.Email
      const storedPassword = foundAccount.Password
      const storedId = foundAccount.ID
      const storedAccountName = foundAccount.AccountName

      if (!storedEmail) {
        throw new Error("Email is not correct or does not exist");
      }

      if (!storedPassword) {
        throw new Error("Password is not provided");
      }

      if (!storedId) {
        throw new Error("Id does not exist");
      }

      if (!storedAccountName) {
        throw new Error("Account name is not valid or does not exist");
      }

      const isMatch = await bcrypt.compare(loginPassword, storedPassword);

      if (isMatch) {
        const asyncToken = await generateAsyncToken({ id: storedId?.toString(), accountName: storedAccountName });

        return { id: storedId, accountName: storedAccountName, token: asyncToken };
      } else {
        throw new Error('Password is not correct');
      }
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<Account | null> {
    let result = this.accountRepository.findByEmail(email)
    return result
  }
}
