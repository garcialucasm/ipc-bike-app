import { BikeSize } from "./BikeType";
import { UserData } from "./UserType";

interface BookingType {
  bookingBikeSize: BikeSize;
  bookingUserData: UserData;
}

export type { BookingType };
