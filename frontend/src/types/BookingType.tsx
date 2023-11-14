import { BikeSize } from "./BikeType";
import { UserData } from "./UserType";

export enum BookingStatus {
  BOOKED = "booked",
  HANDEDOVER = "handedOver",
  RETURNED = "returned",
  CANCELED = "canceled",
}

interface BookingType {
  bookingBikeSize: BikeSize;
  bookingUserData: UserData;
}

export type { BookingType };
