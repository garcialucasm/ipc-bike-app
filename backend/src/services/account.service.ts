
import { AccountDTO } from "../dto/account.dto";
import { Account } from "../models/account.model";

export default interface IAccountService {

    /**
     * find a user account by the corresponding email 
     * 
     * @param email 
     */
    findByEmail(email: string): Promise<Account | null>;

    /**
     * if there's an user account with the same email in the database, gets the user account
     * if there's no existing email, it creates it and returns a new user account
     * 
     * @param email 
     * @param password
     */
    registerAccount(name: string, email: string, password: string): Promise<Account>;

    /**
     * if there's an user with the same email in the database, gets the userEmail and the userPassword
     * if there's no existing email, return that authentication was denied
     * 
     * @param email 
     * @param password
     */
    login(email: string, password: string): Promise<AccountDTO>;

    /**
     * if there's an user with the same email in the database, gets the userEmail and the userPassword
     * if there's no existing email, return that authentication was denied
     * 
     * @param email 
     */
    toggleAccountActivation(email: string): Promise<Account>;

}