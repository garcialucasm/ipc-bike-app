enum BikeStatus {
  BOOKED, INUSE, DISABLED, FREE
}

interface Bike {
  ID?: number;
  Numbering?: string;
  Size?: string;
  CurrentStatus?: BikeStatus;
  CreatedAt?: string;
  UpdatedAt?: string;
  IsActive?: boolean;
}


interface BikesRequested {
  ArrayOfBikes: Bike[];
}

export {BikeStatus, Bike, BikesRequested}