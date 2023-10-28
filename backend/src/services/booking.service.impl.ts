
import { Bike, BikeStatus } from "../models/bike.model";
import { Booking, BookingStatus } from "../models/booking.model";
import { User, UserStatus, UserType } from "../models/user.model";
import IBookingRepository from "../repositories/booking.repository";
import IBikeChooser from "./bike.chooser";
import IBikeService from "./bike.service";
import IBookingService from "./booking.service";
import IUserService from "./user.service";

export default class BookingService implements IBookingService {

  bookingRepository: IBookingRepository;
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
    this.bikeService = bikeService
    this.bikeChooser = bikeChooser
    this.userService = userService
    this.currentTerm = currentTerm
  }

  async createSingleBooking(userName: string, room: string, bikeSize: string): Promise<Booking> {

    let availableBikes = await this.bikeService.findAllAvailable(bikeSize)

    if (availableBikes.length == 0)
      throw new Error(`There's no available bikes for size ${bikeSize}`)

    let user = await this.userService.getOrCreate(userName, room, this.currentTerm)

    this.validateUserForBooking(user)

    let bike = await this.bikeChooser.chooseBike(availableBikes)

    let booking: Booking = {
      Bike: [bike],
      User: user,
      Status: BookingStatus.BOOKED,
      ReturnedCondition: ""
    }

    booking = await this.bookingRepository.save(booking)
    this.bikeService.changeStatus(bike, BikeStatus.BOOKED)
    this.userService.changeStatus(user, UserStatus.BOOKED)

    return booking
  }

  private validateUserForBooking(user: User) {
    // TODO consider if this should be in another component, and if we should create customized errors
    if (!user.IsActive)
      throw new Error("User is inacative")
    if (user.Status === UserStatus.BOOKED)
      throw new Error("User has already booked a bike")
    if (user.Status === UserStatus.INUSE)
      throw new Error("User is already using a bike")
    if (user.Type !== UserType.STUDENT)
      throw new Error("User is not a student")
  }


  async approve(bookingId: number): Promise<Booking> {
    let booking: Booking = await this.bookingRepository.findById(bookingId)

    booking.Status = BookingStatus.HANDOVER
    booking.User = await this.userService.changeStatus(booking.User, UserStatus.INUSE)
    booking.Bike[0] = await this.bikeService.changeStatus(booking.Bike[0], BikeStatus.INUSE)
    let updatedBooking = await this.bookingRepository.update(booking)

    return updatedBooking
  }
  returnBike(bookingId: number): Promise<Booking> {
    throw new Error("Method not implemented.");
  }
  cancel(bookingId: number): Promise<Booking> {
    throw new Error("Method not implemented.");
  }
  listAllOpened(): Promise<Booking[]> {
    throw new Error("Method not implemented.");
  }
  listInUse(): Promise<Booking[]> {
    throw new Error("Method not implemented.");
  }

}