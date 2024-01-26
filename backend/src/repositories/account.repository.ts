
import { Account } from "../models/account.model";

export default interface IAccountRepository {
    save(account: Account): Promise<Account>;
    findByEmail(email: string): Promise<Account>
    findAccount(email: string, password: string): Promise<Account>
}

