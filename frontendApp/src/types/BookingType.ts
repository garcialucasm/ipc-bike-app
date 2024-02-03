import { BikeSize } from "./BikeType";
import { UserData } from "./UserType";

export enum BookingStatus {
  BOOKED = "BOOKED",
  DELIVERED = "DELIVERED",
  RETURNED = "RETURNED",
  CANCELED = "CANCELED",
}

export enum BookingType {
  SINGLE = "SINGLE",
  GROUP = "GROUP",
  CLASSROOM = "CLASSROOM",
}

export interface SingleBookingProps {
  bookingBikeSize: BikeSize | null;
  bookingUserData: UserData | null;
  bookingStatus: BookingStatus | null;
}