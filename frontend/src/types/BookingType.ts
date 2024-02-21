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

export enum BookingModalActions {
  CANCEL = "Cancel",
  CONFIRM = "Confirm",
  CLOSERESPONSE = "Close",
}

export enum SingleBookingSections {
  selectBikeSize = "selectBikeSize",
  inputUserData = "inputUserData",
  preBookingConfirmation = "preBookingConfirmation",
  isLoading = "isLoading",
  bookingConfirmation = "bookingConfirmationStatus",
}

export interface SingleBookingProps {
  currentSection: SingleBookingSections | null;
  bikeNumbering: string;
  bikeSize: string | null;
  userData: UserData;
  bookingStatus: BookingStatus | null;
  serverResult: number | null | undefined;
}

export interface SingleBookingDTO {
  userName: string
  room: string
  bikeNumbering: string
}