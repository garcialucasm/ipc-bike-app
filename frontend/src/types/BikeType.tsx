export enum BikeSize {
  NONE = "none",
  CLASSIC = "classic",
  SMALL = "small",
  STANDARD = "standard",
  FREE = "free"
}

export enum BikeStatus {
  BOOKED = "BOOKED",
  INUSE = "INUSE",
  DISABLED = "DISABLED",
  FREE = "FREE",
}

export interface BikeAvailability {
  bikeSize: BikeSize;
  countFree: {
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
