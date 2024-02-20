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
  ALL = "ALL",
}

export type Bike = {
  id: number,
  numbering: string,
  currentStatus: string,
  size: string,
  isActive: boolean,
}

export type AllBikesAvailable = {
  allBikes: Bike[] | [],
  largeBikes: Bike[] | [],
  standardBikes: Bike[] | [],
  smallBikes: Bike[] | [],
}

export type BikeStatusCard = {
  [BikeStatus.BOOKED]: number | null,
  [BikeStatus.INUSE]: number | null,
  [BikeStatus.FREE]: number | null,
  [BikeStatus.DISABLED]: number | null
};