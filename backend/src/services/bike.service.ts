import { Bike, BikeStatus } from "../models/bike.model";


export default interface IBikeService {
  createBike(Numbering: number, Size: string) : Promise<Bike>;
  changeStatus(bike: Bike, status: BikeStatus) : Promise<Bike>;
  findAllAvailable(bikeSize?: string) : Promise<Bike[]>;
  countBikesByStatus() : Promise<Map<BikeStatus, number>>;
}
