import { accountMessages } from "./../../../shared/constants/errorMessages";
import bcrypt from "bcrypt";
import { Account } from "../models/account.model";
import IAccountRepository from "../repositories/account.repository";
import IAccountService from "./account.service";
import { generateAsyncToken } from "../utils/auth";
import { AccountDTO } from "../dto/account.dto";
import { getLogger } from "../logger";

const saltRounds = 8;

const logger = getLogger("AccountService");

export default class AccountService implements IAccountService {
  accountRepository: IAccountRepository;

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository;
  }

  async registerAccount(
    name: string,
    email: string,
    password: string
  ): Promise<Account> {
    logger.debug("registerAccount");
    let account: Account;

    const user = await this.accountRepository.findByEmail(email);

    if (user) {
      logger.warn(accountMessages.EMAIL_ALREADY_REGISTRED);
      throw new Error(accountMessages.EMAIL_ALREADY_REGISTRED);
    }
    logger.silly("Encripting password");
    const hash = await bcrypt.hash(password, saltRounds);

    account = {
      AccountName: name,
      Email: email,
      Hash: hash,
      IsActive: true,
    } as Account;

    account = await this.accountRepository.save(account);
    logger.silly("registered successfully");
    return account;
  }

  async login(loginEmail: string, loginPassword: string): Promise<AccountDTO> {
    logger.debug("login");

    if (!loginEmail) {
      logger.error(accountMessages.EMAIL_NOT_PROVIDED);
      throw new Error(accountMessages.EMAIL_NOT_PROVIDED);
    }

    const foundAccount = await this.accountRepository.findAccount(
      loginEmail,
      loginPassword
    );
    const storedEmail = foundAccount.Email;
    const storedPassword = foundAccount.Hash;
    const storedId = foundAccount.ID;
    const storedAccountName = foundAccount.AccountName;

    if (!storedEmail) {
      logger.silly(accountMessages.EMAIL_NOT_REGISTRED);
      throw new Error(accountMessages.EMAIL_NOT_REGISTRED);
    }

    if (!storedPassword) {
      logger.error(accountMessages.PASSWORD_NOT_PROVIDED);
      throw new Error(accountMessages.PASSWORD_NOT_PROVIDED);
    }

    if (!storedId) {
      logger.error(accountMessages.ID_NOT_REGISTRED);
      throw new Error(accountMessages.ID_NOT_REGISTRED);
    }

    if (!storedAccountName) {
      logger.error(accountMessages.NAME_NOT_REGISTRED);
      throw new Error(accountMessages.NAME_NOT_REGISTRED);
    }

    const isMatch = await bcrypt.compare(loginPassword, storedPassword);

    if (isMatch) {
      const asyncToken = await generateAsyncToken({
        id: storedId?.toString(),
        accountName: storedAccountName,
      });

      return {
        id: storedId,
        name: storedAccountName,
        email: storedEmail,
        token: asyncToken,
      };
    } else {
      logger.silly(accountMessages.PASSWORD_INCORRECT);
      throw new Error(accountMessages.PASSWORD_INCORRECT);
    }
  }

  async findByEmail(email: string): Promise<Account | null> {
    logger.debug("findByEmail");
    let result = this.accountRepository.findByEmail(email);
    return result;
  }
}
