export enum BikeSize {
  NONE = "none",
  CLASSIC = "classic",
  SMALL = "small",
  STANDARD = "standard",
}

export enum BikeStatus {
  BOOKED = "booked",
  INUSE = "inUse",
  DISABLED = "disabled",
  FREE = "free",
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
