
import { User, UserStatus, UserType } from "../models/user.model";

export default interface IUserService {

    /**
     * if there's an user with a similar name in the database for the same term, gets the user
     * if there's no existing user, it creates it and returns a new user
     * 
     * @param userName user 
     * @param room 
     * @param term
     */
    getOrCreate(userName: string, room: string, term: string): Promise<User>;

    /**
     * find a user by the corresponding id
     * @param userId 
     */
    findById(userId: number): Promise<User>;

    /**
     * change a user status, following the rule:
     *  FREE -> BOOKED
     *  BOOKED -> INUSE | FREE 
     *  INUSE -> FREE
     *
     * @param user 
     * @param status 
     */
    changeStatus(user: User, status: UserStatus): Promise<User>;
}