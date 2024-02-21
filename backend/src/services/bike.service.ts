import { Bike, BikeStatus } from "../models/bike.model";


export default interface IBikeService {
  createBike(numbering: number, size: string, bikeType: string): Promise<Bike>;
  changeStatus(bike: Bike, status: BikeStatus): Promise<Bike>;
  findAllAvailable(bikeSize?: string, bikeNumbering?: number): Promise<Bike[]>;
  countBikesByStatus(): Promise<Map<BikeStatus, number>>;
}
