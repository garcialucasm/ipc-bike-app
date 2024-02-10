export enum BikeSize {
  NONE = "NONE",
  CLASSIC = "CLASSIC",
  SMALL = "SMALL",
  STANDARD = "STANDARD",
}

export enum BikeStatus {
  BOOKED = "BOOKED",
  INUSE = "INUSE",
  DISABLED = "DISABLED",
  FREE = "FREE",
}

export interface BikeAvailability {
  bikeType: BikeSize;
  bikeFreeCount: {
    standardType: number;
    classicType: number;
    smallType: number;
  };
  countBooked?: {
    standardType: number;
    classicType: number;
    smallType: number;
  };
  countInUse?: {
    standardType: number;
    classicType: number;
    smallType: number;
  };
  countDisabled?: {
    standardType: number;
    classicType: number;
    smallType: number;
  };
}
