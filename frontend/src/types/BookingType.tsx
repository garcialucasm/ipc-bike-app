import { BikeSize } from "./BikeType";
import { UserData } from "./UserType";

export enum BookingStatus {
  FREE = "FREE",
  BOOKED = "BOOKED",
  INUSE = "INUSE",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

interface BookingType {
  bookingBikeSize: BikeSize;
  bookingUserData: UserData;
  bookingStatus: BookingStatus;
}

export type { BookingType };
