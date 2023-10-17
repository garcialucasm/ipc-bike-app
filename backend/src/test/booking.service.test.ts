import assert from 'assert'
import IBookingService from '../services/booking.service'
import { Booking, BookingStatus } from '../models/booking.model' // Update this path

let bookingService: IBookingService

beforeEach(() => {
  // Initialize bookingService before each test
  // Assuming you have a concrete implementation of IBookingService called BookingService
})
describe('For a valid user', () => {


  it('should create a student booking', async () => {
    const userName = 'testuser'
    const bikeSize = 'medium'
    const booking = await bookingService.createStudentBooking(userName, bikeSize)
    assert.strictEqual(booking.User.Name, userName)
    assert.strictEqual(booking.Bike[0].Size, bikeSize)
    assert.strictEqual(booking.State, BookingStatus.BOOKED)
  })

  it('should approve a booking', async () => {
    const bookingId = 1
    const booking = await bookingService.approve(bookingId)
    assert.strictEqual(booking.State, BookingStatus.DELIVERED)
  })

  it('should return a bike', async () => {
    const bookingId = 1
    const booking = await bookingService.returnBike(bookingId)
    assert.strictEqual(booking.State, BookingStatus.RETURNED)
  })

  it('should cancel a booking', async () => {
    const bookingId = 1
    const booking = await bookingService.cancel(bookingId)
    assert.strictEqual(booking.State, BookingStatus.CANCELED)
  })

  it('should list all opened bookings', async () => {
    const openedBookings = await bookingService.listAllOpened()
    assert.ok(Array.isArray(openedBookings))
    assert.ok(openedBookings.every(booking => booking.State === BookingStatus.BOOKED))
  })

  it('should list all bookings in use', async () => {
    const inUseBookings = await bookingService.listInUse()
    assert.ok(Array.isArray(inUseBookings))
    assert.ok(inUseBookings.every(booking => booking.State === BookingStatus.DELIVERED))
  })
})
