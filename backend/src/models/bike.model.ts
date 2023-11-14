
enum BikeStatus {
  BOOKED = "booked",
  INUSE = "inUse",
  DISABLED = "disabled",
  FREE = "free"
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