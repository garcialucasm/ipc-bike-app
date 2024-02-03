export enum BikeStatus {
  BOOKED = "BOOKED",
  INUSE = "INUSE",
  DISABLED = "DISABLED",
  FREE = "FREE",
}

export enum BikeSize {
  STANDARD = "STANDARD",
  CLASSIC = "CLASSIC",
  SMALL = "SMALL",
}

export type BikeCounter = {
  [status in BikeStatus]: {
    [size in BikeSize]: number;
  };
};