
import { Bike } from "./bike.model";
import { User } from "./user.model";

enum BookingStatus {
  BOOKED = "BOOKED",
  DELIVERED = "DELIVERED",
  RETURNED = "RETURNED",
  CANCELED = "CANCELED"
}

enum BookingType {
  SINGLE = "SINGLE",
  GROUP = "GROUP",
  CLASSROOM = "CLASSROOM"
}

interface Booking {
  ID?: number;
  User: User;
  Bike: Bike[];
  BikeCount: number;
  Status: BookingStatus;
  Type: BookingType;
  CreatedAt?: Date;
  ConfirmedAt?: Date;
  ReturnedAt?: Date;
  ReturnedCondition: string;
  Notes?: string;
}

export { BookingStatus, BookingType, Booking };
