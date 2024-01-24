
import { Account } from "../models/account.model";

export default interface IAccountRepository {
    save(account: Account): Promise<Account>;
    // update(account: Account): Promise<Account>;
    // delete(email: string): Promise<Account>;
    findByEmail(email: string): Promise<Account>
    login(email: string, password: string): Promise<Account>
    // findAll(searchCriteria: { email?: string }): Promise<Account[]>
}

