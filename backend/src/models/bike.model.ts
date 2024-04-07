import { BikeDTO } from "../dto/bike.dto";

enum BikeStatus {
  BOOKED = "BOOKED",
  INUSE = "INUSE",
  DISABLED = "DISABLED",
  FREE = "FREE"
}

enum BikeType {
  CLASSIC = "CLASSIC",
  CITY = "CITY",
  FOLDING = "FOLDING",
}

interface Bike {
  ID?: number;
  Numbering: number;
  BikeType: string;
  Size: string;
  CurrentStatus: BikeStatus;
  IsActive: boolean;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeletedAt?: Date;
}

export { BikeStatus, Bike }
