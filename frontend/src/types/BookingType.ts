import { BikeSize } from "./BikeType";
import { UserData } from "./UserType";

export enum BookingStatus {
  BOOKED = "BOOKED",
  DELIVERED = "DELIVERED",
  RETURNED = "RETURNED",
  CANCELED = "CANCELED",
}

export enum Booking {
  SINGLE = "SINGLE",
  GROUP = "GROUP",
  CLASSROOM = "CLASSROOM",
}
export interface SingleBookingProps {
  currentSection: SingleBookingSections | null;
  bikeSize: BikeSize | null;
  userData: UserData;
  bookingStatus: BookingStatus | null;
  serverResult: number | null;
}

export enum SingleBookingSections {
  selectBikeSize = "selectBikeSize",
  inputUserData = "inputUserData",
  preBookingConfirmation = "preBookingConfirmation",
  bookingConfirmation = "bookingConfirmationStatus",
}