import assert from 'assert'
import IBookingService from '../services/booking.service'
import { Booking, BookingStatus } from '../models/booking.model' // Update this path
import IBikeChooser from '../services/bike.chooser'
import IBikeService from '../services/bike.service'
import IUserService from '../services/user.service'
import BikeService from '../services/bike.service.impl'
import MockBikeRepository from './bike.fixtures'
import UserService from '../services/user.service.impl'
import MockUserRepository from './user.fixtures'
import RandomBikeChooser from '../services/random.bike.chooser'
import BookingService from '../services/booking.service.impl'
import IBookingRepository from '../repositories/booking.repository'
import MockBookingRepository from './booking.fixtures'
import { UserStatus } from '../models/user.model'
import { BikeStatus } from '../models/bike.model'

let bookingRepository: IBookingRepository
let bikeService: IBikeService
let bikeChooser: IBikeChooser
let userService: IUserService
let bookingService: IBookingService

const userName = 'testUser'
const userName2 = 'testUser2'
const userName3 = 'testUser3'
const bikeSize = 'medium'
const room = 'A101'
let booking: Booking
let booking2: Booking

before(() => {
  // Initialize bookingService before each test
  // Assuming you have a concrete implementation of IBookingService called BookingService
  bookingRepository = new MockBookingRepository()
  bikeService = new BikeService(new MockBikeRepository())
  userService = new UserService(new MockUserRepository())
  bikeChooser = new RandomBikeChooser()
  bookingService = new BookingService(bookingRepository, bikeService, bikeChooser, userService, "term")
})

describe('For a valid user', () => {
  before(async () => {
    await bikeService.createBike(1, bikeSize)
  })


  it('should create a student booking', async () => {
    booking = await bookingService.createSingleBooking(userName, room, bikeSize)
    assert.strictEqual(booking.User.Name, userName)
    assert.strictEqual(booking.Bike[0].Size, bikeSize)
    assert.strictEqual(booking.Status, BookingStatus.BOOKED)
    assert.equal(booking.User.Status, UserStatus.BOOKED)
    assert.equal(booking.Bike[0].CurrentStatus, BikeStatus.BOOKED)
  })
})

describe('For an opened booking', () => {
  before(async () => {
    await bikeService.createBike(2, bikeSize)
    booking = await bookingService.createSingleBooking(userName2, room, bikeSize)
    await bikeService.createBike(3, bikeSize)
    booking2 = await bookingService.createSingleBooking(userName3, room, bikeSize)
  })

  it('should approve a booking', async () => {
    assert.ok(booking.ID)
    booking = await bookingService.approve(booking.ID)
    assert.equal(booking.Status, BookingStatus.HANDEDOVER)
    assert.equal(booking.User.Status, UserStatus.INUSE)
    assert.equal(booking.Bike[0].CurrentStatus, BikeStatus.INUSE)
  })

  it('should not approve a booking with (booking, user or bike) in a state other than booked', async () => {
    // Booking state
    try {
      assert.ok(booking.ID)
      await bookingService.approve(booking.ID)
      assert.fail("something went wrong with the booking status during approval ")
    } catch (error: any) {
      assert.equal(error.message, "Booking not allowed by Current Booking Status")
    }

    // Bike state
    try {
      assert.ok(booking.ID)
      booking.Status = BookingStatus.BOOKED
      await bookingService.approve(booking.ID)
      assert.fail("something went wrong with the bike status during approval ")
    } catch (error: any) {
      assert.equal(error.message, "Booking not allowed by Bike Status")
    }

    // User state
    try {
      assert.ok(booking.ID)
      booking.Status = BookingStatus.BOOKED
      booking.Bike[0].CurrentStatus = BikeStatus.BOOKED
      await bookingService.approve(booking.ID)
      assert.fail("something went wrong with the User status during approval ")
    } catch (error: any) {
      assert.equal(error.message, "Booking not allowed by User Status")
    }
  })

  it('should return a bike', async () => {
    assert.ok(booking.ID)
    booking = await bookingService.returnBike(booking.ID)
    assert.equal(booking.Status, BookingStatus.RETURNED)
    assert.equal(booking.User.Status, UserStatus.FREE)
    assert.equal(booking.Bike[0].CurrentStatus, BikeStatus.FREE)
  })
  {

    it('should cancel a booking', async () => {
      assert.ok(booking2.ID)
      booking2 = await bookingService.approve(booking2.ID)
      assert.ok(booking2.ID)
      booking2 = await bookingService.cancel(booking2.ID)
      assert.equal(booking2.Status, BookingStatus.CANCELED)
      assert.equal(booking2.Bike[0].CurrentStatus, BikeStatus.FREE)
      assert.equal(booking2.User.Status, UserStatus.FREE)
    })
  }
})


describe('title', () => {

  it('should list all opened bookings')

  it('should list all bookings in use')
})