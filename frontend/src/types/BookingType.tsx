import { BikeSize } from "./BikeType";
import { UserData } from "./UserType";

export enum BookingStatus {
  FREE = "free",
  BOOKED = "booked",
  HANDEDOVER = "handedOver",
  RETURNED = "returned",
  CANCELED = "canceled",
}

interface BookingType {
  bookingBikeSize: BikeSize;
  bookingUserData: UserData;
  bookingStatus: BookingStatus;
}

export type { BookingType };
