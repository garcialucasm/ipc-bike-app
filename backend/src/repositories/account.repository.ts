
import { Account } from "../models/account.model";

export default interface IAccountRepository {
    save(account: Account): Promise<Account>;
    findByEmail(email: string): Promise<Account | null>
    findAccount(email: string, password: string): Promise<Account>
    toggleIsActive(email: string): Promise<Account>;
}

