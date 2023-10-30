 import {Bike, BikeStatus} from "../models/bike.model";

export default interface IBikeRepository {
  save(bike: Bike): Promise<Bike>;
  update(bike: Bike): Promise<Bike>;
  delete(bikeId: number): Promise<Bike>;
  findById(bikeId: number) : Promise<Bike>;
  findAll(searchCriteria: {numbering?: number, size?: string, currentStatus?: BikeStatus}) : Promise<Bike[]>;
}

