import { User, UserStatus, UserType } from "../models/user.model";
import IUserRepository from "../repositories/user.repository";
import IUserService from "./user.service";

export default class UserService implements IUserService {

  userRepository: IUserRepository
  userStatusTransitions: Map<UserStatus, UserStatus[]>

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
    this.userStatusTransitions = new Map([
      [UserStatus.FREE, [UserStatus.BOOKED]],
      [UserStatus.BOOKED, [UserStatus.INUSE, UserStatus.FREE]],
      [UserStatus.INUSE, [UserStatus.FREE]]
    ])
  }

  async getOrCreate(userName: string, room: string, term: string): Promise<User> {
    const users = await this.userRepository.findAll({name: userName, term: term, room: room})
    let user: User 
    
    if (users.length == 1) {
      user = users[0]
    } else if (users.length > 1) {
      throw new Error("user name, room and term should be unique")
    } else {
      user = {
        Name: userName, 
        Term: term,
        Room: room,
        Type: UserType.STUDENT,
        Status: UserStatus.FREE
      }
      user = await this.userRepository.save(user)
    }

    return user
  }

  async findById(userId: number): Promise<User> {
    return await this.userRepository.findById(userId)
  }

  async changeStatus(user: User, status: UserStatus): Promise<User> {
    const transitions = this.userStatusTransitions.get(user.Status)
    console.log(user.Status)
    console.log(transitions)
    if (transitions?.includes(status)){
      user.Status = status;
      return await this.userRepository.update(user)
    }  else {
      throw new Error(`Unable to change status ${user.Status} to ${status}`)
    }
  }
}