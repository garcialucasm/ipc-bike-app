
enum BikeStatus {
  BOOKED, INUSE, DISABLED, FREE
} 

interface Bike {
  ID?: number;
  Numbering?: number;
  Size?: string;
  CurrentStatus?: BikeStatus;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeltedAt?: Date;
  IsActive?: boolean;
}

export {BikeStatus, Bike}