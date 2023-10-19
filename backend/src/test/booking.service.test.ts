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
    await bikeService.createBike(1, 'medium')
  })

  const userName = 'testuser'
  const bikeSize = 'medium'
  const room = 'A101'
  let booking: Booking

  it('should create a student booking', async () => {
    booking = await bookingService.createStudentBooking(userName, room, bikeSize)
    
    assert.strictEqual(booking.User.Name, userName)
    assert.strictEqual(booking.Bike[0].Size, bikeSize)
    assert.strictEqual(booking.Status, BookingStatus.BOOKED)
    assert.equal(booking.User.Status, UserStatus.BOOKED)
    assert.equal(booking.Bike[0].CurrentStatus, BikeStatus.BOOKED)
  })

  it('should approve a booking')

  it('should return a bike')

  it('should cancel a booking')

  it('should list all opened bookings')

  it('should list all bookings in use')
})
