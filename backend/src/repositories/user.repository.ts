import {User, UserStatus, UserType} from "../models/user.model";

export default interface IUserRepository { 
  save(user: User) : Promise<User>;
  update(user: User) : Promise<User>;
  delete(userId: number) : Promise<User>;
  findById(userId: number) : Promise<User>;
  findAll(searchCriteria: {name?: String, term?: String}) : Promise<User[]>
}