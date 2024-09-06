import bcrypt from "bcrypt";
import { Account, AccountType } from "../models/account.model";
import IAccountRepository from "../repositories/account.repository";
import IAccountService from "./account.service";
import { generateAsyncToken } from "../utils/auth";
import { getLogger } from "../logger";
import { accountMessages } from "../utils/errorMessages";

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
      Type: AccountType.KEYKEEPER,
      Name: name,
      Email: email,
      Hash: hash,
      IsActive: false,
    } as Account;

    account = await this.accountRepository.save(account);
    logger.silly("registered successfully");
    return account;
  }

  async login(loginEmail: string, loginPassword: string): Promise<Account> {
    logger.debug("login");

    if (!loginEmail) {
      logger.error(accountMessages.EMAIL_NOT_PROVIDED);
      throw new Error(accountMessages.EMAIL_NOT_PROVIDED);
    }

    const foundAccount = await this.accountRepository.findAccount(
      loginEmail,
      loginPassword
    );
    const storedType = foundAccount.Type;
    const storedEmail = foundAccount.Email;
    const storedPassword = foundAccount.Hash;
    const storedId = foundAccount.ID;
    const storedAccountName = foundAccount.Name;
    const storedIsActive = foundAccount.IsActive;

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

    if (!storedIsActive) {
      logger.error(accountMessages.ACCOUNT_INACTIVE);
      throw new Error(accountMessages.ACCOUNT_INACTIVE);
    }

    if (!storedType) {
      logger.error(accountMessages.ACCOUNT_TYPE_NOT_FOUND);
      throw new Error(accountMessages.ACCOUNT_TYPE_NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(loginPassword, storedPassword);

    if (isMatch) {
      const asyncToken = await generateAsyncToken({
        accountId: storedId?.toString(),
        accountName: storedAccountName,
        accountType: storedType,
      });

      return {
        ID: storedId,
        Type: storedType,
        IsActive: storedIsActive,
        Email: storedEmail,
        Name: storedAccountName,
        Token: asyncToken,
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

  async findAllAccounts(): Promise<Account[]> {
    logger.debug("findAll");
    let result = this.accountRepository.findAllAccounts();
    return result;
  }

  async toggleAccountActivation(email: string): Promise<Account> {
    logger.debug("toggleAccountActivation");
    let result = this.accountRepository.toggleIsActive(email);
    
    return result;
  }
}
