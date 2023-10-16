import assert from 'assert';
import IUserService from '../services/user.service'; // Update this path
import { User, UserStatus, UserType } from '../models/user.model'; // Update this path

let userService: IUserService;

beforeEach(() => {
  // Initialize userService before each test
});

describe('for a new user', () => {

  it('should create it', async () => {
    const userName = 'testuser'
    const term = 'spring'
    const room = 'A101'
    const user = await userService.getOrCreate(userName, room, term)
    assert.strictEqual(user.Name, userName)
    assert.strictEqual(user.Term, term)
  })

  it('should find user by id', async () => {
    const userId = 1
    const user = await userService.findById(userId)
    assert.strictEqual(user.ID, userId)
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
    const updatedUser = await userService.changeStatus(user, UserStatus.INUSE)
    assert.strictEqual(updatedUser.Status, UserStatus.INUSE)
  })

  it('from INUSE to FREE is ok', async () => {
    const updatedUser = await userService.changeStatus(user, UserStatus.FREE)
    assert.strictEqual(updatedUser.Status, UserStatus.FREE)
  })

  it('from INUSE to BOOKED should throw an error', async () => {
    try {
      const updatedUser = await userService.changeStatus(user, UserStatus.FREE)
      assert.fail('Should throw an error')
    } catch (error) {
      assert.ok(error)
    }
  })
})