
enum BikeStatus {
  BOOKED = "BOOKED", 
  INUSE = "INUSE",
  DISABLED = "DISABLED",
  FREE = "FREE"
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

export { BikeStatus, Bike }
