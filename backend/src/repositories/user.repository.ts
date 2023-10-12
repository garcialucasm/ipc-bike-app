import {User, UserStatus, UserType} from "../models/user.model";

interface IUserRepository { 
  save(user: User) : Promise<User>;
  update(user: User) : Promise<User>;
  delete(user: User) : Promise<User>;
  findById(userId: number) : Promise<User>;
  findAll(searchCriteria: {name?: String, term?: String}) : Promise<User[]>
}