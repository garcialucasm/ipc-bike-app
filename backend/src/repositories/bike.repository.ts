 import {Bike, BikeStatus} from "../models/bike.model";

interface IBikeRepository {
  save(bike: Bike): Promise<Bike>;
  update(bike: Bike): Promise<Bike>;
  delete(bikeId: number): Promise<Bike>;
  findById(bikeId: number) : Promise<Bike>;
  findAll(searchCriteria: {Size?: string, Status?: BikeStatus}) : Promise<Bike[]>;
}

