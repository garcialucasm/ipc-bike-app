
import { Bike, BikeStatus } from "../models/bike.model";
import IBikeRepository from "../repositories/bike.repository"

export default class MockBikeRepository implements IBikeRepository {

    bikes: Map<number, Bike>;
    nextId: number;

    constructor() {
        this.bikes = new Map<number, Bike>()
        this.nextId = 1; 

    }

    async save(bike: Bike): Promise<Bike> {
        bike.ID = this.nextId;
        this.bikes.set(this.nextId, bike);
        this.nextId += 1;
        return bike;
    }
    
    async update(bike: Bike): Promise<Bike> {
        if (bike.ID == undefined)
            throw new Error("Bike doesnt exist on DB");

        this.bikes.set(bike.ID, bike);
        return bike;
    }
    
    async delete(bikeId: number): Promise<Bike> {
        let bike = this.bikes.get(bikeId);
        
        if (bike == undefined) 
          throw new Error();

        this.bikes.delete(bikeId);
        bike.DeltedAt = new Date();
        bike.IsActive = false;

        return bike;

    }
    
    async findById(bikeId: number): Promise<Bike> {
      let bike = this.bikes.get(bikeId);

      if (bike == undefined)
        throw Error();

      return bike;
    }

    async findAll(searchCriteria: { Size?: string | undefined; Status?: BikeStatus | undefined; }): Promise<Bike[]> {

       let result = Array.from(this.bikes.values())
          .filter(bike => searchCriteria.Size? searchCriteria.Size == bike.Size : true)
          .filter(bike => searchCriteria.Status? searchCriteria.Status == bike.CurrentStatus : true)

        return result;
    } 

}