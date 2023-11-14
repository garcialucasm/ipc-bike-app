
import { Bike } from "./bike.model";
import { User } from "./user.model";

enum BookingStatus {
  BOOKED = "booked",
  HANDEDOVER = "handedOver",
  RETURNED = "returned",
  CANCELED = "canceled"
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