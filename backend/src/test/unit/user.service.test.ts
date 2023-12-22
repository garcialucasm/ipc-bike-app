import assert from 'assert';
import IUserService from '../../services/user.service'; // Update this path
import { User, UserStatus, UserType } from '../../models/user.model'; // Update this path
import IUserRepository from '../../repositories/user.repository';
import MockUserRepository from './user.fixtures';
import UserService from '../../services/user.service.impl';

let userService: IUserService;
let userRepository: IUserRepository

beforeEach(() => {
  userRepository = new MockUserRepository()
  userService = new UserService(userRepository)
});

describe('for a new user', () => {

  const userName = 'testuser'
  const term = 'spring'
  const room = 'A101'

  it('should create it', async () => {
    const user = await userService.getOrCreate(userName, room, term)
    assert.strictEqual(user.Name, userName)
    assert.strictEqual(user.Term, term)
    assert.ok(user.IsActive)
  })

  it('should find user by id', async () => {

    const user = await userService.getOrCreate(userName, term, room)
    assert.ok(user.ID)
    const found = await userService.findById(user.ID)
    assert.strictEqual(user, found)
  })

});


describe("changing user status", async () => {
  let user: User
  beforeEach(async () => {
    user = await userService.getOrCreate('testuser', 'A101', 'spring')
  })

  it('from FREE to BOOKED is ok', async () => {
    const updatedUser = await userService.changeStatus(user, UserStatus.BOOKED)
    assert.strictEqual(updatedUser.Status, UserStatus.BOOKED)
  })

  it('from FREE to INUSE should throw an error', async () => {
    try {
      const updatedUser = await userService.changeStatus(user, UserStatus.INUSE)
      assert.fail('Should throw an error')
    } catch (error) {
      assert.ok(error)
    }
  })

  it('from BOOKED to INUSE is ok', async () => {
    user.Status = UserStatus.BOOKED
    const updatedUser = await userService.changeStatus(user, UserStatus.INUSE)
    assert.strictEqual(updatedUser.Status, UserStatus.INUSE)
  })

  it('from INUSE to FREE is ok', async () => {
    user.Status = UserStatus.INUSE
    const updatedUser = await userService.changeStatus(user, UserStatus.FREE)
    assert.strictEqual(updatedUser.Status, UserStatus.FREE)
  })

  it('from INUSE to BOOKED should throw an error', async () => {
    user.Status = UserStatus.INUSE
    try {
      const updatedUser = await userService.changeStatus(user, UserStatus.FREE)
      assert.fail('Should throw an error')
    } catch (error) {
      assert.ok(error)
    }
  })
})
