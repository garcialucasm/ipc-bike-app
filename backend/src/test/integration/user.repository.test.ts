import assert from 'assert'
import { Client } from 'pg'
import IUserRepository from '../../repositories/user.repository'
import { User, UserStatus, UserType } from '../../models/user.model' 
import UserRepository from '../../repositories/user.repository.impl'
import cleanupDb from './database.util'

const client = new Client({
  user: process.env.TEST_USER,
  host: process.env.TEST_HOST,
  database: process.env.TEST_DATABASE,
  password: process.env.TEST_PASSWORD,
  port: 5432,
});

describe('IUserRepository Integration Tests', () => {
  let userRepository: IUserRepository;


  before(async function() {
    await client.connect()
    userRepository = new UserRepository(client); 
    await userRepository.save({Name: 'user1' ,Room: '101', Term: 'spring 2020', Type: UserType.STUDENT, Status: UserStatus.FREE, IsActive: true})
    await userRepository.save({Name: 'user2' ,Room: '102', Term: 'spring 2020', Type: UserType.STUDENT, Status: UserStatus.FREE, IsActive: true})
    await userRepository.save({Name: 'user3' ,Room: '104', Term: 'spring 2020', Type: UserType.STUDENT, Status: UserStatus.FREE, IsActive: true})
    await userRepository.save({Name: 'user4' ,Room: '107', Term: 'spring 2020', Type: UserType.STUDENT, Status: UserStatus.FREE, IsActive: true})
  })

  after(function() {
    cleanupDb(client)
  })

  let savedUser: User 

  it('should save a user to the database', async function() {
    const user: User = {
      Name: 'user5',
      Type: UserType.STUDENT, 
      Status: UserStatus.FREE,
      Term: 'spring 2023', 
      Room: '201',
      IsActive: true
    }

    savedUser = await userRepository.save(user)
    assert.strictEqual(savedUser.Name, user.Name)
    assert.strictEqual(savedUser.Type, user.Type)
    assert.strictEqual(savedUser.Term, user.Term)
    assert.strictEqual(savedUser.Room, user.Room)
    assert.strictEqual(savedUser.Status, user.Status)
    assert.ok(savedUser.IsActive)
    assert.ok(savedUser.ID)
  })

  after(function() {
    cleanupDb(client)
  })

  it('should update a user in the database', function() {
    const userToUpdate: User = savedUser

    userToUpdate.Status = UserStatus.INUSE

    return userRepository.update(userToUpdate).then(updatedUser => {
      assert.strictEqual(updatedUser.Status, userToUpdate.Status)
    })
  });

  it('should find a user by ID', function() {
    assert.ok(savedUser.ID)
    const userIdToFind = savedUser.ID
    userRepository.findById(userIdToFind).then(foundUser => {
      assert.strictEqual(foundUser.ID, userIdToFind)
    })
  });

  it('should find all the users', function() {
    return userRepository.findAll({}).then(users => {
      assert.ok(Array.isArray(users))
      assert.equal(5, users.length)
    })
  })

  it('should find users by search criteria', function () {
    const searchCriteria = {
      name: 'user1',
      term: 'spring 2020',
      room: '101'
    };
    return userRepository.findAll(searchCriteria).then(users => {
      assert.ok(Array.isArray(users));
      assert.strictEqual(users.length, 1);
      assert.strictEqual(users[0].Name, searchCriteria.name);
      assert.strictEqual(users[0].Term, searchCriteria.term);
      assert.strictEqual(users[0].Room, searchCriteria.room);
    })
  });


  it('should delete a user from the database', function () {
    assert.ok(savedUser.ID)
    return userRepository.delete(savedUser.ID).then(deletedUser => {
      assert.strictEqual(deletedUser.ID, savedUser.ID)
    })
  });
});
