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

export type AllBikesAvailability = {
  [size in BikeSize]: {
    [status in BikeStatus]: number;
  };
};

export type BikeAvailabilityCard = {
  [status in BikeStatus]: number
};