import bcrypt from "bcrypt";
import { Account } from "../models/account.model";
import IAccountRepository from "../repositories/account.repository";
import IAccountService from "./account.service";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

const jwtSecretKey = process.env.JWT_SECRET_KEY

export default class AccountService implements IAccountService {

  accountRepository: IAccountRepository

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository
  }

  async registerAccount(email: string, password: string): Promise<Account> {
    const users = await this.accountRepository.findByEmail(email)
    let account: Account

    if (!users) {
      account = {
        user: {
          email: email,
          password: password,
          isActive: true
        }
      } as Account

      account = await this.accountRepository.save(account)
    } else {
      throw new Error("E-mail already registered")
    }

    return account
  }

  async login(loginEmail: string, loginPassword: string): Promise<Account> {

    try {
      if (!loginEmail) {
        throw new Error("Email is not provided");
      }

      const foundAccount = await this.accountRepository.findAccount(loginEmail, loginPassword);
      const storedEmail = foundAccount.user.email
      const storedPassword = foundAccount.user.password
      const accountId = foundAccount.user.id

      if (!storedEmail) {
        throw new Error("Email is not correct or does not exist");
      }

      if (!storedPassword) {
        throw new Error("Password is not provided");
      }

      const isMatch = await bcrypt.compare(loginPassword, storedPassword);

      if (!jwtSecretKey) {
        throw new Error("JWT_SECRET_KEY is not set.Please configure it.");
      }

      if (isMatch) {
        const token = jwt.sign({ id: accountId?.toString(), email: storedEmail }, jwtSecretKey, {
          expiresIn: '2 days',
        });

        return { user: { id: accountId, email: storedEmail }, token: token };
      } else {
        throw new Error('Password is not correct');
      }
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<Account[]> {
    let accounts: Account[] = []
    let result = this.accountRepository.findByEmail(email)
    accounts.push(await result)
    return accounts
  }
}
