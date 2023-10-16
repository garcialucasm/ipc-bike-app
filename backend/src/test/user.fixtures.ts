
import { User, UserStatus, UserType } from "../models/user.model";
import IUserRepository from "../repositories/user.repository"

export default class MockUserRepository implements IUserRepository {

    users: Map<number, User>;
    nextId: number;

    constructor() {
        this.users = new Map<number, User>()
        this.nextId = 1; 

    }

    async save(user: User): Promise<User> {
        user.ID = this.nextId;
        this.users.set(this.nextId, user);
        this.nextId += 1;
        return user;
    }
    
    async update(user: User): Promise<User> {
        if (user.ID == undefined)
            throw new Error("user doesnt exist on DB");

        this.users.set(user.ID, user);
        return user;
    }

    async delete(userId: number) : Promise<User> {
        let user = this.users.get(userId);
        
        if (user == undefined) 
          throw new Error();

        this.users.delete(userId);
        user.DeletedAt = new Date();
        return user;
    }


    async findById(userId: number): Promise<User> {
      let user = this.users.get(userId);

      if (user == undefined)
        throw Error();

      return user;
    }

    async findAll(searchCriteria: {name?: String, term?: String}): Promise<User[]> {
      let result = Array.from(this.users.values())
        .filter(user => searchCriteria.name? searchCriteria.name == user.Name : true)
        .filter(user => searchCriteria.term? searchCriteria.term == user.Term: true )

        return result;
    } 

}