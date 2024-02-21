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

describe('IBikeRepository Integration Tests', function () {
  let bikeRepository: IBikeRepository;


  before(async function () {
    await client.connect()
    bikeRepository = new BikeRepository(client);
    await bikeRepository.save({ Numbering: 1, Size: "medium", BikeType: 'classic', CurrentStatus: BikeStatus.FREE, IsActive: true })
    await bikeRepository.save({ Numbering: 2, Size: "small", BikeType: 'classic', CurrentStatus: BikeStatus.INUSE, IsActive: true })
    await bikeRepository.save({ Numbering: 3, Size: "small", BikeType: 'classic', CurrentStatus: BikeStatus.BOOKED, IsActive: true })
    await bikeRepository.save({ Numbering: 4, Size: "medium", BikeType: 'classic', CurrentStatus: BikeStatus.INUSE, IsActive: true })
    await bikeRepository.save({ Numbering: 5, Size: "small", BikeType: 'classic', CurrentStatus: BikeStatus.DISABLED, IsActive: false })
  });

  after(function () {
    cleanupDb(client)
    client.end()
  })

  let savedBike: Bike

  it('should save a bike to the database', function () {
    const bike: Bike = {
      Numbering: 123,
      Size: 'medium',
      BikeType: 'classic',
      CurrentStatus: BikeStatus.FREE,
      IsActive: true
    }

    return bikeRepository.save(bike).then(saved => {
      savedBike = saved
      assert.strictEqual(savedBike.Size, bike.Size)
      assert.strictEqual(savedBike.CurrentStatus, BikeStatus.FREE)
      assert.ok(savedBike.IsActive)
      assert.ok(savedBike.ID)
    })
  })

  it('should update a bike in the database', function () {
    const bikeToUpdate: Bike = savedBike

    bikeToUpdate.CurrentStatus = BikeStatus.INUSE

    return bikeRepository.update(bikeToUpdate).then(updatedBike => {
      assert.strictEqual(updatedBike.CurrentStatus, bikeToUpdate.CurrentStatus)
    })
  });

  it('should find a bike by ID', function () {
    assert.ok(savedBike.ID)
    const bikeIdToFind = savedBike.ID
    return bikeRepository.findById(bikeIdToFind).then(foundBike => {
      assert.strictEqual(foundBike.ID, bikeIdToFind)
    })
  });

  it('should find all the bikes', function () {
    return bikeRepository.findAll({}).then(bikes => {
      assert.ok(Array.isArray(bikes))
      assert.equal(6, bikes.length)
    })
  })

  it('should find bikes by search criteria', function () {
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
    })
  });


  it('should delete a bike from the database', function () {
    assert.ok(savedBike.ID)
    return bikeRepository.delete(savedBike.ID).then(deletedBike => {
      assert.strictEqual(deletedBike.ID, savedBike.ID);
    })
  });
});
