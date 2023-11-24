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
})

describe('IBikeRepository Integration Tests', function() {
  let bikeRepository: IBikeRepository;


  before(async function () {
    await client.connect()
    bikeRepository = new BikeRepository(client); 
    let bike1 = await bikeRepository.save({Numbering: 1, Size: "medium", CurrentStatus: BikeStatus.FREE, IsActive: true})
    let bike2 = await bikeRepository.save({Numbering: 2, Size: "small", CurrentStatus: BikeStatus.INUSE, IsActive: true})
    let bike3 = await bikeRepository.save({Numbering: 3, Size: "small", CurrentStatus: BikeStatus.BOOKED, IsActive: true})
    let bike4 = await bikeRepository.save({Numbering: 4, Size: "medium", CurrentStatus: BikeStatus.INUSE, IsActive: true})
    let bike5 = await bikeRepository.save({Numbering: 5, Size: "small", CurrentStatus: BikeStatus.DISABLED, IsActive: false})
  
    console.log(bike1)
    console.log(bike2)
    console.log(bike3)
    console.log(bike4)
    console.log(bike5)

    bikeRepository.findAll({}).then(bikes => console.log(bikes))
  });

  after(function () {
    cleanupDb(client)
    client.end()
  })

  let savedBike: Bike 

  it('should save a bike to the database', function() {
    const bike: Bike = {
      Numbering: 123,
      Size: 'medium',
      CurrentStatus: BikeStatus.FREE,
      IsActive: true
    }

    return bikeRepository.save(bike).then(saved => {
      savedBike = saved
      assert.strictEqual(savedBike.Size, bike.Size)
      assert.strictEqual(savedBike.CurrentStatus, BikeStatus.FREE)
      assert.ok(savedBike.IsActive)
      assert.ok(savedBike.ID)
      console.log(1)
    })
  })

  it('should update a bike in the database', function() {
    const bikeToUpdate: Bike = savedBike

    bikeToUpdate.CurrentStatus = BikeStatus.INUSE

    return bikeRepository.update(bikeToUpdate).then(updatedBike => {
      assert.strictEqual(updatedBike.CurrentStatus, bikeToUpdate.CurrentStatus)
      console.log(2)
    })
  });

  it('should find a bike by ID', function() {
    console.log("looking for a single bike")
    assert.ok(savedBike.ID)
    bikeRepository.findAll({}).then(bikes => console.log(bikes))
    const bikeIdToFind = savedBike.ID
    return bikeRepository.findById(bikeIdToFind).then(foundBike => {
      assert.strictEqual(foundBike.ID, bikeIdToFind)
      console.log(3)
    })
  });

  it('should find all the bikes', function() {
    console.log("looking for all bikes")
    return bikeRepository.findAll({}).then(bikes => {
      console.log(bikes)
      assert.ok(Array.isArray(bikes))
      assert.equal(6, bikes.length)
      console.log(4)
    })
  })

  it('should find bikes by search criteria', function() {
    const searchCriteria = {
      numbering: 123,
      size: 'medium',
      currentStatus: BikeStatus.INUSE,
    };
    return bikeRepository.findAll(searchCriteria).then(bikes => {
      assert.ok(Array.isArray(bikes));
      assert.strictEqual(bikes.length, 1);
      assert.strictEqual(bikes[0].Numbering, searchCriteria.numbering);
      assert.strictEqual(bikes[0].Size, searchCriteria.size);
      assert.strictEqual(bikes[0].CurrentStatus, searchCriteria.currentStatus);
      console.log(5)
    })
  });


  it('should delete a bike from the database', function() {
    assert.ok(savedBike.ID)
    return bikeRepository.delete(savedBike.ID).then(deletedBike => {
      assert.strictEqual(deletedBike.ID, savedBike.ID);
      console.log(6)
    })
  });
});
