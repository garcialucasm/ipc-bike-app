
enum BikeStatus {
  BOOKED, INUSE, DISABLED, FREE
} 

interface Bike {
  ID?: number;
  Numbering?: string;
  Size?: string;
  CurrentStatus?: BikeStatus;
  CreatedAt?: string;
  UpdatedAt?: string;
  IsActive?: boolean;
}

export {BikeStatus, Bike}