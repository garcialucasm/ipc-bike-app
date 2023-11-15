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

before("initalize db connection", async () => {
  await client.connect()
})

after("close db connection", async () => {
  await client.end()
})

describe('IUserRepository Integration Tests', () => {
    let userRepository: IUserRepository;


    before(async () => {
        cleanupDb(client)
        userRepository = new UserRepository(client); 
        await userRepository.save({Name: 'user1' ,Room: '101', Term: 'spring 2020', Type: UserType.STUDENT, Status: UserStatus.FREE, IsActive: true})
        await userRepository.save({Name: 'user2' ,Room: '102', Term: 'spring 2020', Type: UserType.STUDENT, Status: UserStatus.FREE, IsActive: true})
        await userRepository.save({Name: 'user3' ,Room: '104', Term: 'spring 2020', Type: UserType.STUDENT, Status: UserStatus.FREE, IsActive: true})
        await userRepository.save({Name: 'user4' ,Room: '107', Term: 'spring 2020', Type: UserType.STUDENT, Status: UserStatus.FREE, IsActive: true})
    })

    let savedUser: User 

    it('should save a user to the database', async () => {
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

    it('should update a user in the database', async () => {
        const userToUpdate: User = savedUser

        userToUpdate.Status = UserStatus.INUSE

        const updatedUser = await userRepository.update(userToUpdate)
        
        assert.strictEqual(updatedUser.Status, userToUpdate.Status)
    });

    it('should find a user by ID', async () => {
        assert.ok(savedUser.ID)
        const userIdToFind = savedUser.ID
        const foundUser = await userRepository.findById(userIdToFind)
        assert.strictEqual(foundUser.ID, userIdToFind)
    });
    
    it('should find all the users', async() => {
      const users = await userRepository.findAll({})
      assert.ok(Array.isArray(users))
      assert.equal(6, users.length)
    })

    it('should find users by search criteria', async () => {
        const searchCriteria = {
            name: '',
            term: '',
            room: ''
        };
        const users = await userRepository.findAll(searchCriteria);
        assert.ok(Array.isArray(users));
        assert.strictEqual(users.length, 1);
        assert.strictEqual(users[0].Name, searchCriteria.name);
        assert.strictEqual(users[0].Term, searchCriteria.term);
        assert.strictEqual(users[0].Room, searchCriteria.room);
    });


    it('should delete a user from the database', async () => {
        assert.ok(savedUser.ID)
        const deletedUser = await userRepository.delete(savedUser.ID);
        assert.strictEqual(deletedUser.ID, savedUser.ID);
    });
});
