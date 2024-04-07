import { getLogger } from "../logger";
import { User, UserStatus, UserType } from "../models/user.model";
import IUserRepository from "../repositories/user.repository";
import IUserService from "./user.service";

const logger = getLogger('UserService')

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
    logger.debug("getOrCreate")

    const users = await this.userRepository.findAll({ name: userName, term: term, room: room })
    let user: User

    if (users.length == 1) {
      logger.debug("user found")
      user = users[0]
    } else if (users.length > 1) {
      logger.error("user name, room and term should be unique")
      throw new Error("user name, room and term should be unique")
    } else {
      logger.debug("creating the user")
      user = {
        Name: userName,
        Term: term,
        Room: room,
        Type: UserType.STUDENT,
        Status: UserStatus.FREE,
        IsActive: true
      }
      user = await this.userRepository.save(user)
    }

    return user
  }

  async findById(userId: number): Promise<User> {
    logger.debug("findById")
    return await this.userRepository.findById(userId)
  }

  async changeStatus(user: User, status: UserStatus): Promise<User> {
    logger.debug("changeStatus")
    const transitions = this.userStatusTransitions.get(user.Status)
    if (transitions?.includes(status)) {
      user.Status = status;
      return await this.userRepository.update(user)
    } else {
      throw new Error(`Unable to change user status ${user.Status} to ${status}`)
    }
  }
}
