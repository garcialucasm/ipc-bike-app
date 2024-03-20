export interface Bike {
  id?: number;
  numbering: string;
  bikeType: string;
  size: string;
  currentStatus: BikeStatus;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export enum BikeStatus {
  FREE = "FREE",
  BOOKED = "BOOKED",
  INUSE = "INUSE",
  DISABLED = "DISABLED",
}

export enum BikeSize {
  STANDARD = "STANDARD",
  LARGE = "LARGE",
  SMALL = "SMALL",
}

export enum BikeType {
  ALL = 'ALL',
  CLASSIC = "CLASSIC",
  CITY = "CITY",
  FOLDING = "FOLDING",
}

export type BikeDTO = {
  ID: number,
  Numbering: string,
  CurrentStatus: string,
  Size: string,
  BikeType: string,
  IsActive: boolean,
}

export type BikeStatusCard = {
  [BikeStatus.BOOKED]: number | null,
  [BikeStatus.INUSE]: number | null,
  [BikeStatus.FREE]: number | null,
  [BikeStatus.DISABLED]: number | null
};