
import { userAccount } from "../models/account.model";

export default interface IAccountRepository {
    save(account: userAccount): Promise<userAccount>;
    // update(account: Account): Promise<Account>;
    // delete(email: string): Promise<Account>;
    findByEmail(email: string): Promise<userAccount>
    findAccount(email: string, password: string): Promise<userAccount>
    // findAll(searchCriteria: { email?: string }): Promise<Account[]>
}

