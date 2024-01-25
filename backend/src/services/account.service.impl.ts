import bcrypt from "bcrypt";
import { userAccount } from "../models/account.model";
import IAccountRepository from "../repositories/account.repository";
import IAccountService from "./account.service";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config'

// TODO: Correct this part
// const jwtSecretKey = process.env.JWT_SECRET_KEY
const jwtSecretKey = "process.env.JWT_SECRET_KEY"

export default class AccountService implements IAccountService {

  accountRepository: IAccountRepository

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository
  }

  async registerAccount(email: string, password: string): Promise<userAccount> {
    const users = await this.accountRepository.findByEmail(email)
    let account: userAccount

    if (!users) {
      account = {
        user: {
          email: email,
          password: password,
          isActive: true
        }
      } as userAccount

      account = await this.accountRepository.save(account)
    } else {
      throw new Error("E-mail already registered")
    }

    return account
  }

  async login(email: string, password: string): Promise<userAccount> {

    try {
      if (!email) {
        throw new Error("Email is not provided");
      }

      const foundAccount = await this.accountRepository.findAccount(email, password);
      console.log(foundAccount)

      if (!foundAccount.user.email) {
        throw new Error("Email is not correct or does not exist");
      }

      if (!foundAccount.user.password) {
        throw new Error("Password is not provided");
      }

      const isMatch = bcrypt.compareSync(password, foundAccount.user.password);

      if (isMatch) {
        const token = jwt.sign({ id: foundAccount.user.id?.toString(), email: foundAccount.user.email }, jwtSecretKey, {
          expiresIn: '2 days',
        });

        console.log(token)

        return { user: { id: foundAccount.user.id, email: foundAccount.user.email }, token: token };
      } else {
        throw new Error('Password is not correct');
      }
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<userAccount[]> {
    let accounts: userAccount[] = []
    let result = this.accountRepository.findByEmail(email)
    accounts.push(await result)
    return accounts
  }
}
