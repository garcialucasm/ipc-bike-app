
import {Bike} from "./bike.model";
import {User} from "./user.model";

enum BookingStatus {
  BOOKED, 
  DELIVERED,
  RETURNED, 
  CANCELED
}


interface Booking {
  ID?: number;
  User: User;
  Bike: Bike[];
  State: BookingStatus;
  CreatedAt?: Date;
  ConfirmedAt?: Date;
  ReturnedAt?: Date,
  ReturnedCondition: string,
  Notes?: string
}

export { BookingStatus, Booking };