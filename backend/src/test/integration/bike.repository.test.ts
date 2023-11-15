import assert from 'assert'
import { Client } from 'pg'
import IBikeRepository from '../../repositories/bike.repository'
import { Bike, BikeStatus } from '../../models/bike.model' 
import BikeRepository from '../../repositories/bike.repository.impl'
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

describe('IBikeRepository Integration Tests', () => {
    let bikeRepository: IBikeRepository;


    before(async () => {
        cleanupDb(client)
        bikeRepository = new BikeRepository(client); 
        await bikeRepository.save({Numbering: 1, Size: "medium", CurrentStatus: BikeStatus.FREE, IsActive: true})
        await bikeRepository.save({Numbering: 2, Size: "small", CurrentStatus: BikeStatus.INUSE, IsActive: true})
        await bikeRepository.save({Numbering: 3, Size: "small", CurrentStatus: BikeStatus.BOOKED, IsActive: true})
        await bikeRepository.save({Numbering: 4, Size: "medium", CurrentStatus: BikeStatus.INUSE, IsActive: true})
        await bikeRepository.save({Numbering: 5, Size: "smal", CurrentStatus: BikeStatus.DISABLED, IsActive: false})
    });

    let savedBike: Bike 

    it('should save a bike to the database', async () => {
        const bike: Bike = {
            Numbering: 123,
            Size: 'medium',
            CurrentStatus: BikeStatus.FREE,
            IsActive: true
        }

        savedBike = await bikeRepository.save(bike)
        assert.strictEqual(savedBike.Size, bike.Size)
        assert.strictEqual(savedBike.CurrentStatus, BikeStatus.FREE)
        assert.ok(savedBike.IsActive)
        assert.ok(savedBike.ID)
    })

    it('should update a bike in the database', async () => {
        const bikeToUpdate: Bike = savedBike

        bikeToUpdate.CurrentStatus = BikeStatus.INUSE

        const updatedBike = await bikeRepository.update(bikeToUpdate)
        
        assert.strictEqual(updatedBike.CurrentStatus, bikeToUpdate.CurrentStatus)
    });

    it('should find a bike by ID', async () => {
        assert.ok(savedBike.ID)
        const bikeIdToFind = savedBike.ID
        const foundBike = await bikeRepository.findById(bikeIdToFind)
        assert.strictEqual(foundBike.ID, bikeIdToFind)
    });
    
    it('should find all the bikes', async() => {
      const bikes = await bikeRepository.findAll({})
      assert.ok(Array.isArray(bikes))
      assert.equal(6, bikes.length)
    })

    it('should find bikes by search criteria', async () => {
        const searchCriteria = {
            numbering: 123,
            size: 'medium',
            currentStatus: BikeStatus.INUSE,
        };
        const bikes = await bikeRepository.findAll(searchCriteria);
        assert.ok(Array.isArray(bikes));
        assert.strictEqual(bikes.length, 1);
        assert.strictEqual(bikes[0].Numbering, searchCriteria.numbering);
        assert.strictEqual(bikes[0].Size, searchCriteria.size);
        assert.strictEqual(bikes[0].CurrentStatus, searchCriteria.currentStatus);
    });


    it('should delete a bike from the database', async () => {
        assert.ok(savedBike.ID)
        const deletedBike = await bikeRepository.delete(savedBike.ID);
        assert.strictEqual(deletedBike.ID, savedBike.ID);
    });
});
