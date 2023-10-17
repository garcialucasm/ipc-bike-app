
import { Booking } from "../models/booking.model";
import IBookingRepository from "../repositories/booking.repository";
import IBikeService from "./bike.service";
import IBookingService from "./booking.service";

export default class BookingService implements IBookingService {

    bookingRepository: IBookingRepository;
    bikeService: IBikeService;

    constructor(bookingRepository: IBookingRepository, bikeService: IBikeService) {
        this.bookingRepository = bookingRepository; 
        this.bikeService = bikeService;
    }

    createStudentBooking(userName: string, bikeSize: string): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    approve(bookingId: number): Promise<Booking> {
        throw new Error("Method not implemented.");
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