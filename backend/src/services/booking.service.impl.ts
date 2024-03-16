
import { Bike, BikeStatus } from "../models/bike.model";
import { Booking, BookingStatus, BookingType } from "../models/booking.model";
import { User, UserStatus, UserType } from "../models/user.model";
import IBookingRepository from "../repositories/booking.repository";
import IBikeChooser from "./bike.chooser";
import IBikeService from "./bike.service";
import IBookingService from "./booking.service";
import IUserService from "./user.service";

/* --- Define an array to store names of users with booking in process --- */
const usersInBookingProcess: string[] = [];

export default class BookingService implements IBookingService {

  bookingRepository: IBookingRepository;
  bookingStatusTransitions: Map<BookingStatus, BookingStatus[]>
  bikeService: IBikeService;
  userService: IUserService
  bikeChooser: IBikeChooser
  currentTerm: string

  constructor(
    bookingRepository: IBookingRepository,
    bikeService: IBikeService,
    bikeChooser: IBikeChooser,
    userService: IUserService,
    currentTerm: string) {

    this.bookingRepository = bookingRepository
    this.bookingStatusTransitions = new Map([
      [BookingStatus.BOOKED, [BookingStatus.DELIVERED, BookingStatus.CANCELED]],
      [BookingStatus.DELIVERED, [BookingStatus.RETURNED, BookingStatus.CANCELED]],
    ])
    this.bikeService = bikeService
    this.bikeChooser = bikeChooser
    this.userService = userService
    this.currentTerm = currentTerm
  }


  async createSingleBooking(userName: string, room: string, bikeNumbering: number): Promise<Booking> {
    let availableBikes = await this.bikeService.findAllAvailable(undefined, bikeNumbering)

    /* --------- Check if the user is already in the process of booking --------- */
    if (usersInBookingProcess.includes(userName)) {
      /* --------- If the user is already in the process, wait for a delay -------- */
      await this.delay(1000 * 5);
    }

    /* ------------- Add the user to the array usersInBookingProcess ------------ */
    usersInBookingProcess.push(userName);

    try {
      if (availableBikes.length == 0)
        throw new Error(`There's no available bikes for size ${bikeNumbering}`)

      let user = await this.userService.getOrCreate(userName, room, this.currentTerm)

      this.validateUserForBooking(user)

      let bike = availableBikes[0]

      this.validateBikeForBooking(bike)

      let booking: Booking = {
        Bike: [bike],
        User: user,
        Status: BookingStatus.BOOKED,
        CreatedAt: new Date(),
        ReturnedCondition: "",
        BikeCount: 1,
        Type: BookingType.SINGLE
      }

      booking = await this.bookingRepository.save(booking)
      this.bikeService.changeStatus(bike, BikeStatus.BOOKED)
      this.userService.changeStatus(user, UserStatus.BOOKED)

      /* -------------------------------------------------------------------------- */
      /* ----------- Skip to confirm booking status during initial tests ---------- */
      /* -------------------------------------------------------------------------- */
      if (booking.ID) {
        await this.approve(booking.ID);
      }
      /* -------------------------------------------------------------------------- */

      return booking
    } catch (error) {
      /* ----------- If an error occurs, remove the user from the array ----------- */
      const index = usersInBookingProcess.indexOf(userName);
      if (index !== -1) {
        usersInBookingProcess.splice(index, 1);
      }
      throw error;
    } finally {
      /* ------- Whether the booking result, remove the user from the array ------- */
      const index = usersInBookingProcess.indexOf(userName);
      if (index !== -1) {
        usersInBookingProcess.splice(index, 1);
      }
    }
  }

  private validateUserForBooking(user: User) {
    // TODO consider if this should be in another component, and if we should create customized errors
    if (!user.IsActive)
      throw new Error("User is inactive")
    if (user.Status === UserStatus.BOOKED)
      throw new Error("User has already booked a bike")
    if (user.Status === UserStatus.INUSE)
      throw new Error("User is already using a bike")
    if (user.Type !== UserType.STUDENT)
      throw new Error("User is not a student")
  }

  private validateBikeForBooking(bike: Bike) {
    // TODO consider if this should be in another component, and if we should create customized errors
    if (!bike.IsActive)
      throw new Error("Bike is inactive")
    if (bike.CurrentStatus === BikeStatus.BOOKED)
      throw new Error("Bike is already booked")
    if (bike.CurrentStatus === BikeStatus.INUSE)
      throw new Error("Bike is already in using")
  }

  async approve(bookingId: number): Promise<Booking> {
    let booking: Booking = await this.bookingRepository.findById(bookingId)
    booking.User = await this.userService.changeStatus(booking.User, UserStatus.INUSE)
    booking.Bike[0] = await this.bikeService.changeStatus(booking.Bike[0], BikeStatus.INUSE)
    let updatedBooking = await this.changeStatus(booking, BookingStatus.DELIVERED)

    return updatedBooking
  }

  async returnBike(bookingId: number): Promise<Booking> {
    let booking: Booking = await this.bookingRepository.findById(bookingId)
    booking.User = await this.userService.changeStatus(booking.User, UserStatus.FREE)
    booking.Bike[0] = await this.bikeService.changeStatus(booking.Bike[0], BikeStatus.FREE)
    let updatedBooking = await this.changeStatus(booking, BookingStatus.RETURNED)

    return updatedBooking
  }

  async changeStatus(booking: Booking, status: BookingStatus): Promise<Booking> {
    const transitions = this.bookingStatusTransitions.get(booking.Status)
    if (transitions?.includes(status)) {
      booking.Status = status;
      return await this.bookingRepository.update(booking)
    } else {
      throw new Error(`Unable to change booking status ${booking.Status} to ${status}`)
    }
  }

  async cancel(bookingId: number): Promise<Booking> {
    let booking: Booking = await this.bookingRepository.findById(bookingId)
    booking.Status = BookingStatus.CANCELED
    booking.User = await this.userService.changeStatus(booking.User, UserStatus.FREE)
    booking.Bike[0] = await this.bikeService.changeStatus(booking.Bike[0], BikeStatus.FREE)
    let updatedBooking = await this.bookingRepository.update(booking)

    return updatedBooking
  }

  async findAll(showInactive: boolean): Promise<Booking[]> {
    let openedBookings: Booking[] = []

    if (showInactive) {
      let all = this.bookingRepository.findAll()
      openedBookings.push(... await all)
    } else {
      let booked = this.bookingRepository.findByStatus(BookingStatus.BOOKED)
      let delivered = this.bookingRepository.findByStatus(BookingStatus.DELIVERED)
      openedBookings.push(... await booked)
      openedBookings.push(... await delivered)
    }

    return openedBookings
  }

  countBookingsByStatus(): Promise<Map<BookingStatus, number>> {
    return this.bookingRepository.countBookingsByStatus()
  }

  /* ---------------------- Function to introduce a delay --------------------- */
  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
