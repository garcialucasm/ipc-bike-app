
import assert from 'assert'
import { Client } from 'pg'
import IBookingRepository from '../../repositories/booking.repository'
import IBikeRepository from '../../repositories/bike.repository'
import IUserRepository from '../../repositories/user.repository'
import { Booking, BookingType, BookingStatus } from '../../models/booking.model' 
import BikeRepository from '../../repositories/bike.repository.impl'
import BookingRepository from '../../repositories/booking.repository.impl'
import UserRepository from '../../repositories/user.repository.impl'
import { User, UserStatus, UserType } from '../../models/user.model'
import { Bike, BikeStatus } from '../../models/bike.model'
import cleanupDb from './database.util'

const client = new Client({
  user: process.env.TEST_USER,
  host: process.env.TEST_HOST,
  database: process.env.TEST_DATABASE,
  password: process.env.TEST_PASSWORD,
  port: 5432,
})

describe('IBookingRepository Integration Test', function() {
  let bookingRepository: IBookingRepository
  let bikeRepository: IBikeRepository
  let userRepository: IUserRepository

  let bike1: Bike, bike2: Bike, bike3: Bike
  let user1: User, user2: User


  before(async function() {
    await client.connect()

    bikeRepository = new BikeRepository(client) 

    bike1 = await bikeRepository.save({Numbering: 11, Size: "medium", 
                                      CurrentStatus: BikeStatus.FREE, IsActive: true})
    bike2 = await bikeRepository.save({Numbering: 12, Size: "small", 
                                      CurrentStatus: BikeStatus.INUSE, IsActive: true})
    bike3 = await bikeRepository.save({Numbering: 13, Size: "small", 
                                      CurrentStatus: BikeStatus.BOOKED, IsActive: true})
    userRepository = new UserRepository(client)
    user1 = await userRepository.save({Name: 'user1', Room: '101', Term: 'spring 2023', 
                                      Type: UserType.STUDENT, Status: UserStatus.FREE, IsActive: true})
    user2 = await userRepository.save({Name: 'user2', Room: '202', Term: 'spring 2023', 
                                      Type: UserType.STUDENT, Status: UserStatus.FREE, IsActive: true})

    bookingRepository = new BookingRepository(client)
  })

  after(async function() {
    await cleanupDb(client)
    client.end()
  })

  let savedSingleBooking: Booking, savedGroupBooking: Booking 

  it('should save a booking to the database', function() {
    const booking: Booking = {
      Bike: [bike1],
      BikeCount: 1,
      User: user1,
      Status: BookingStatus.BOOKED,
      Type: BookingType.SINGLE,
      ReturnedCondition: "", 
    }

    return bookingRepository.save(booking).then(singleBooking => {
      savedSingleBooking = singleBooking
      assert.strictEqual(savedSingleBooking.Bike[0], bike1)
      assert.strictEqual(savedSingleBooking.User, user1)
      assert.strictEqual(savedSingleBooking.Status, BookingStatus.BOOKED)
      assert.strictEqual(savedSingleBooking.Type, BookingType.SINGLE)
      assert.ok(savedSingleBooking.ID)
    })
  })

  it('should save a group booking', function() {
    const groupBooking: Booking = {
      Bike: [bike2, bike3],
      BikeCount: 2, 
      User: user2, 
      Status: BookingStatus.RETURNED,
      Type: BookingType.GROUP,
      ReturnedCondition: "good",
    }

    return bookingRepository.save(groupBooking).then(groupBooking => {
      savedGroupBooking = groupBooking
      assert.strictEqual(savedGroupBooking.Bike.length, 2)
      assert.strictEqual(savedGroupBooking.User, user2)
      assert.strictEqual(savedGroupBooking.Status, BookingStatus.RETURNED)
      assert.strictEqual(savedGroupBooking.Type, BookingType.GROUP)
    })
  })

  it('should update a booking in the database', function() {
    const bookingToUpdate: Booking = savedSingleBooking

    bookingToUpdate.Status = BookingStatus.DELIVERED

    return bookingRepository.update(bookingToUpdate).then(updatedBooking => {
      assert.strictEqual(BookingStatus.DELIVERED, updatedBooking.Status)
    })
  })

  it('should find a booking by ID', function() {
    assert.ok(savedSingleBooking.ID)
    const bookingIdToFind = savedSingleBooking.ID
    return bookingRepository.findById(bookingIdToFind).then(foundBooking => {
      assert.strictEqual(foundBooking.ID, bookingIdToFind)
    })
  })

  it('should find all the bookings', function() {
    return bookingRepository.findAll().then((bookings) => {
      assert.ok(Array.isArray(bookings))
      assert.equal(2, bookings.length)
    })
  })
})
