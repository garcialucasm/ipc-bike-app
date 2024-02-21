import assert from 'assert'
import IBookingService from '../../services/booking.service'
import { Booking, BookingStatus, BookingType } from '../../models/booking.model' // Update this path
import IBikeChooser from '../../services/bike.chooser'
import IBikeService from '../../services/bike.service'
import IUserService from '../../services/user.service'
import BikeService from '../../services/bike.service.impl'
import MockBikeRepository from './bike.fixtures'
import UserService from '../../services/user.service.impl'
import MockUserRepository from './user.fixtures'
import RandomBikeChooser from '../../services/random.bike.chooser'
import BookingService from '../../services/booking.service.impl'
import IBookingRepository from '../../repositories/booking.repository'
import MockBookingRepository from './booking.fixtures'
import { UserStatus, UserType } from '../../models/user.model'
import { BikeStatus } from '../../models/bike.model'

let bookingRepository: IBookingRepository
let bikeService: IBikeService
let bikeChooser: IBikeChooser
let userService: IUserService
let bookingService: IBookingService

const userName = 'TesterDaSilva'
const bikeNumbering = 1
const room = 'A101'

beforeEach(() => {
  // Initialize bookingService before each test
  // Assuming you have a concrete implementation of IBookingService called BookingService
  bookingRepository = new MockBookingRepository()
  bikeService = new BikeService(new MockBikeRepository())
  userService = new UserService(new MockUserRepository())
  bikeChooser = new RandomBikeChooser()

  bookingService = new BookingService(bookingRepository, bikeService, bikeChooser, userService, "term")

})

describe('For a valid user', () => {
  beforeEach(async () => {
    await bikeService.createBike(1, 'SMALL', 'CLASSIC')
  })

  it('should create a student booking', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)

    assert.strictEqual(singleBooking.User.Name, userName)
    assert.strictEqual(singleBooking.Status, BookingStatus.BOOKED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.BOOKED)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.BOOKED)
  })

  it('should approve a booking', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)

    assert.strictEqual(singleBooking.ID, 1)
    assert.strictEqual(singleBooking.Status, BookingStatus.BOOKED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.BOOKED)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.BOOKED)

  })

  it('should not approve a booking that has already been approved', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)
    await bookingService.approve(1)

    try {
      assert.doesNotThrow(async () => {
        await bookingService.approve(1);
      }, Error);
    } catch (error) {
      assert.ok(error)
    }

    assert.strictEqual(singleBooking.Status, BookingStatus.DELIVERED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.INUSE)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.INUSE)
  })


  it('should not approve a booking that has already been returned', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)
    await bookingService.approve(1)
    await bookingService.returnBike(1)

    try {
      assert.doesNotThrow(async () => {
        await bookingService.approve(1);
      }, Error)
    } catch (error) {
      assert.ok(error)
    }

    assert.strictEqual(singleBooking.Status, BookingStatus.RETURNED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.FREE)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.FREE)
  })

  it('should return a bike', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)
    await bookingService.approve(1)
    await bookingService.returnBike(1)

    assert.strictEqual(singleBooking.ID, 1)
    assert.strictEqual(singleBooking.Status, BookingStatus.RETURNED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.FREE)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.FREE)
  })


  it('should not return a bike that has not yet been approved', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)

    try {
      assert.doesNotThrow(async () => {
        await bookingService.returnBike(1);
      }, Error)
      assert.fail("should fail")
    } catch (error) {
      assert.ok(error)
    }

    assert.strictEqual(singleBooking.Status, BookingStatus.BOOKED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.BOOKED)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.BOOKED)
  })

  it('should not return a bike that has already been returned', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)
    await bookingService.approve(1)
    await bookingService.returnBike(1)

    try {
      assert.doesNotThrow(async () =>
        await bookingService.returnBike(1),
        Error,
      )
      assert.fail("should fail")
    } catch (error) {
      assert.ok(error)
    }

    assert.strictEqual(singleBooking.Status, BookingStatus.RETURNED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.FREE)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.FREE)
  })

  it('should cancel a booking with BOOKED status', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)
    await bookingService.cancel(1)

    assert.strictEqual(singleBooking.Status, BookingStatus.CANCELED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.FREE)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.FREE)
  })

  it('should cancel a booking with DELIVERED status', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)
    await bookingService.approve(1)
    await bookingService.cancel(1)

    assert.strictEqual(singleBooking.Status, BookingStatus.CANCELED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.FREE)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.FREE)
  })

  it('should not cancel a booking with RETURNED status', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)
    await bookingService.approve(1)
    await bookingService.returnBike(1)

    try {
      assert.doesNotThrow(async () =>
        await bookingService.cancel(1),
        Error,
      )
      assert.fail("should fail")
    } catch (error) {
      assert.ok(error)
    }

    assert.strictEqual(singleBooking.Status, BookingStatus.RETURNED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.FREE)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.FREE)
  })

  it('should not cancel a booking with CANCELED status', async () => {
    let singleBooking: Booking = await bookingService.createSingleBooking(userName, room, bikeNumbering)
    await bookingService.cancel(1)

    try {
      assert.doesNotThrow(async () =>
        await bookingService.cancel(1),
        Error,
      )
      assert.fail("should fail")
    } catch (error) {
      assert.ok(error)
    }

    assert.strictEqual(singleBooking.Status, BookingStatus.CANCELED)
    assert.strictEqual(singleBooking.User.Status, UserStatus.FREE)
    assert.strictEqual(singleBooking.Bike[0].CurrentStatus, BikeStatus.FREE)
  })

  it('should list all opened bookings')

  it('should list all bookings in use')

})