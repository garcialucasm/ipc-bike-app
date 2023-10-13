export interface Bike {
  id: number;
  numbering: string;
  size: string;
  // currentStatus?: string;
  // availability?: string;
  // usageCount?: number;
  // createdAt?: string;
  // updatedAt?: string;
}


export interface BikesRequested {
  bikesRequested: Bike[];
}
