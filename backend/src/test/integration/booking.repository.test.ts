
import assert from 'assert'
import { Client } from 'pg'
import IBookingRepository from '../../repositories/booking.repository'
import IBikeRepository from '../../repositories/bike.repository'
import IUserRepository from '../../repositories/user.repository'
import { Booking, BookingType, BookingStatus } from '../../models/booking.model' 
import BikeRepository from '../../repositories/bike.repository.impl'
import BookingRepository from '../../repositories/booking.repository.impl'
import UserRepository from '../../repositories/user.repository.impl'
import { UserStatus, UserType } from '../../models/user.model'
import { BikeStatus } from '../../models/bike.model'

const client = new Client({
  user: process.env.TEST_USER,
  host: process.env.TEST_HOST,
  database: process.env.TEST_DATABASE,
  password: process.env.TEST_PASSWORD,
  port: 5432,
})

before("initalize db connection", async () => {
  await client.connect()
})

after("close db connection", async () => {
  await client.end()
})

describe('IBookingRepository Integration Te', async() => {
    let bookingRepository: IBookingRepository
    let bikeRepository: IBikeRepository
    let userRepository: IUserRepository
   
    
    bikeRepository = new BikeRepository(client) 
    const bike1 = await bikeRepository.save({Numbering: 1, Size: "medium", 
                                      CurrentStatus: BikeStatus.FREE, IsActive: true})
    const bike2 = await bikeRepository.save({Numbering: 2, Size: "small", 
                                      CurrentStatus: BikeStatus.INUSE, IsActive: true})
    const bike3 = await bikeRepository.save({Numbering: 3, Size: "small", 
                                      CurrentStatus: BikeStatus.BOOKED, IsActive: true})

    userRepository = new UserRepository(client)
    const user1 = await userRepository.save({Name: 'user1', Room: '101', Term: 'spring 2023', 
                                      Type: UserType.STUDENT, Status: UserStatus.FREE})
    const user2 = await userRepository.save({Name: 'user2', Room: '202', Term: 'spring 2023', 
                                      Type: UserType.STUDENT, Status: UserStatus.INUSE})

    bookingRepository = new BookingRepository(client)

    let savedSingleBooking: Booking, savedGroupBooking: Booking 

    it('should save a booking to the database', async () => {
        const booking: Booking = {
          Bike: [bike1], 
          User: user1,
          Status: BookingStatus.BOOKED,
          Type: BookingType.SINGLE,
          ReturnedCondition: "", 
        }

        savedSingleBooking = await bookingRepository.save(booking)
        assert.strictEqual(savedSingleBooking.Bike[0], bike1)
        assert.strictEqual(savedSingleBooking.User, user1)
        assert.strictEqual(savedSingleBooking.Status, BookingStatus.BOOKED)
        assert.strictEqual(savedSingleBooking.Type, BookingType.SINGLE)
        assert.ok(savedSingleBooking.ID)

        const groupBooking: Booking = {
          Bike: [bike2, bike3],
          User: user2, 
          Status: BookingStatus.RETURNED,
          Type: BookingType.GROUP,
          ReturnedCondition: "good",
        }

        savedGroupBooking = await bookingRepository.save(groupBooking)
        assert.strictEqual(savedGroupBooking.Bike.length, 2)
        assert.strictEqual(savedGroupBooking.User, user2)
        assert.strictEqual(savedSingleBooking.Status, BookingStatus.RETURNED);
        assert.strictEqual(savedSingleBooking.Type, BookingType.GROUP);
    })

    it('should update a booking in the database', async () => {
        const bookingToUpdate: Booking = savedSingleBooking

        bookingToUpdate.Status = BookingStatus.DELIVERED

        const updatedBooking = await bookingRepository.update(bookingToUpdate)
        
        assert.strictEqual(updatedBooking.Status, bookingToUpdate.Status)
    })

    it('should find a booking by ID', async () => {
        assert.ok(savedSingleBooking.ID)
        const bookingIdToFind = savedSingleBooking.ID
        const foundBooking = await bookingRepository.findById(bookingIdToFind)
        assert.strictEqual(foundBooking.ID, bookingIdToFind)
    })
    
    it('should find all the bookings', async() => {
      const bookings = await bookingRepository.findAll({})
      assert.ok(Array.isArray(bookings))
      assert.equal(2, bookings.length)
    })

    it('should find bookings by search criteria', async () => {
        const searchCriteria = {
          userId: user2.ID,
          bikeId: bike3.ID
        }
        const bookings = await bookingRepository.findAll(searchCriteria)
        assert.ok(Array.isArray(bookings))
        assert.strictEqual(bookings.length, 1)
        assert.strictEqual(bookings[0].Type, savedGroupBooking.Type)
        assert.strictEqual(bookings[0].User.Name, savedGroupBooking.User.Name)
        assert.strictEqual(bookings[0].Status, savedGroupBooking.Status)
    })
})
