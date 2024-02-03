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
  currentSection: SingleBookingSections | null;
  bookingBikeSize: BikeSize | null;
  bookingUserData: UserData;
  bookingStatus: BookingStatus | null;
}

export enum SingleBookingSections {
  selectBikeSize = "selectBikeSize",
  inputUserData = "inputUserData",
  preBookingConfirmation = "preBookingConfirmation",
  bookingConfirmationStatus = "bookingConfirmationStatus",
}