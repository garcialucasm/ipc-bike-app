
enum BikeStatus {
  BOOKED, INUSE, DISABLED, FREE
} 

interface Bike {
  ID?: number;
  Numbering: number;
  Size: string;
  CurrentStatus: BikeStatus;
  IsActive: boolean;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeltedAt?: Date;
}

export {BikeStatus, Bike}