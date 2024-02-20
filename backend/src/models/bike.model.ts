import { BikeDTO } from "../dto/bike.dto";

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

export type AllBikesAvailableBySize = {
  allBikes: BikeDTO[] | [],
  largeBikes: BikeDTO[] | [],
  standardBikes: BikeDTO[] | [],
  smallBikes: BikeDTO[] | [],
}

export { BikeStatus, Bike }
