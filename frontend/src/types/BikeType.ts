export enum BikeStatus {
  FREE = "FREE",
  BOOKED = "BOOKED",
  INUSE = "INUSE",
  DISABLED = "DISABLED",
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
  [BikeStatus.BOOKED]: number,
  [BikeStatus.INUSE]: number,
  [BikeStatus.FREE]: number,
  [BikeStatus.DISABLED]: number
};