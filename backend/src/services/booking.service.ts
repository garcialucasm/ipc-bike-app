import { Booking, BookingStatus } from "../models/booking.model";

export default interface IBookingService { 
  bookABike(userName: string, bikeSize: string) : Promise<Booking>;
  approve(bookingId: number) : Promise<Booking>;
  returnBike(bookingId: number) : Promise<Booking>;
  cancel(booking: number) : Promise<Booking>; 
  listAllOpened() : Promise<Booking[]>;
  listInUse() : Promise<Booking[]>;
}