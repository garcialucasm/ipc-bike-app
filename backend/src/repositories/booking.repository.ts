import { Booking, BookingStatus } from "../models/booking.model";

export default interface IBookingRepository {
  save(booking: Booking) : Promise<Booking>;
  update(booking: Booking) : Promise<Booking>;
  findById(bookingId : number) : Promise<Booking>;
  findByUser(userId: number, showInactive?: boolean) : Promise<Booking[]>;
  findByBike(bikeId : number) : Promise<Booking[]>;
  findByStatus(status: BookingStatus) : Promise<Booking[]>;
  findAll() : Promise<Booking[]>;
  countBookingsByStatus() : Promise<Map<BookingStatus, number>>
  findExpiredBookings(): Promise<Booking[]>
}
