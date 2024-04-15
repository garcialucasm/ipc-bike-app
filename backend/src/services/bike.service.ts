import { Bike, BikeStatus } from "../models/bike.model";

export default interface IBikeService {
  createBike(numbering: number, size: string, bikeType: string): Promise<Bike>;
  changeStatus(bike: Bike, status: BikeStatus): Promise<Bike>;
  findAll(
    bikeSize?: string,
    bikeNumbering?: number,
    currentStatus?: BikeStatus
  ): Promise<Bike[]>;
  countBikesByStatus(): Promise<Map<BikeStatus, number>>;
}
