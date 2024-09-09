import { ServerResult } from "./ServerResult"
import { UserData } from "./UserType"

export interface Booking {
  id?: number
  user: string
  term: string
  room: string
  bike: string
  bikeType: string
  bikeCount?: string
  status: BookingStatus | null
  type: BookingType | null
  createdAt?: string
  confirmedAt?: string
  returnedAt?: string
  createdByAccount?: string
  confirmedByAccount?: string
  returnedByAccount?: string
  returnedCondition: string
  notes?: string
}

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

export enum BookingModalActions {
  CANCEL = "Cancel",
  CONFIRM = "Confirm",
  RESPONSE = "Response",
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
  currentSection: SingleBookingSections | null
  bikeNumbering: string
  bikeSize: string | null
  bikeType: string | null
  userData: UserData
  bookingStatus: BookingStatus | null
  serverResult: ServerResult | null
}

export interface SingleBookingDTO {
  userName: string
  room: string
  bikeNumbering: string
}