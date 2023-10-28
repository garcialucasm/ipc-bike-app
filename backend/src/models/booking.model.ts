
import { Bike } from "./bike.model";
import { User } from "./user.model";

enum BookingStatus {
  BOOKED,
  HANDOVER,
  RETURNED,
  CANCELED
}


interface Booking {
  ID?: number;
  User: User;
  Bike: Bike[];
  Status: BookingStatus;
  CreatedAt?: Date;
  ConfirmedAt?: Date;
  ReturnedAt?: Date,
  ReturnedCondition: string,
  Notes?: string
}

export { BookingStatus, Booking };