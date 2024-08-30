import { Booking, BookingStatus } from "../models/booking.model";

export default interface IBookingService {

  /**
   * Given a user's name of a Student and a bikeNumbering, chose a bike if available and book the bike for a user
   * return a booking object in state BOOKED 
   * @param userName 
   * @param bikeSize 
   */
  createSingleBooking(
    accountId: number | null,
    userName: string,
    room: string,
    bikeNumbering: number
  ): Promise<Booking>

  /**
   * Given a bookingId, if it's in a BOOKED state, move it to DELIVERED state,
   * updating both user and bike corresponding states to BOOKED state
   * Returns the updated Booking object 
   * @param bookingId 
   */
  approve(accountId: number, bookingId: number): Promise<Booking>;

  /**
   * given a bookingId, if it's in a INUSE, move the Booking to RETURNED state,
   * update both user and bike to FREE state 
   * Returns the updated Booking object 
   * @param bookingId 
   */
  returnBike(accountId: number, bookingId: number): Promise<Booking>;

  /**
   * Given a bookingId, if it's in BOOKED state, move it to CANCELED state,
   * update both user and bike to FREE state
   * returns the updated Booking object 
   * @param booking 
   */
  cancel(accountId: number, bookingId: number): Promise<Booking>;

  /**
   * List all bookings in BOOKED state
   */
  findAll(showInactive: boolean): Promise<Booking[]>;


  /**
    * Count all booking group by status
    */
  countBookingsByStatus(): Promise<Map<BookingStatus, number>>;
}
