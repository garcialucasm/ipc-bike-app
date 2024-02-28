import { ServerResult } from "./ServerResult";
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
  INFO = "Info",
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
  bikeType: string | null;
  userData: UserData;
  bookingStatus: BookingStatus | null;
  serverResult: ServerResult | null;
}

export interface SingleBookingDTO {
  userName: string
  room: string
  bikeNumbering: string
}