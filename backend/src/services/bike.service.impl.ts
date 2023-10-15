import { Bike, BikeStatus } from "../models/bike.model";
import IBikeRepository from "../repositories/bike.repository";
import IBikeService from "./bike.service";

export default class BikeService implements IBikeService {

  bikeRepository: IBikeRepository;

  validBikeStatusTransitions: Map<BikeStatus, BikeStatus[]>

  constructor(bikeRepository: IBikeRepository){
    this.bikeRepository = bikeRepository;

    this.validBikeStatusTransitions = new Map([
      [BikeStatus.FREE, [BikeStatus.BOOKED, BikeStatus.DISABLED]],
      [BikeStatus.BOOKED, [BikeStatus.FREE, BikeStatus.INUSE]],
      [BikeStatus.INUSE, [BikeStatus.FREE]],
      [BikeStatus.DISABLED, [BikeStatus.FREE]]
    ])
  }

  async createBike(Numbering: number, Size: string) : Promise<Bike> {

    let bikes = await this.bikeRepository.findAll({Numbering: Numbering})
    
    if (bikes.length) {
      throw new Error("Numbering already exist")
    }

    let bike: Bike = {
      Numbering: Numbering,
      Size: Size,
      CreatedAt: new Date(),
      IsActive: true
    }

    return await this.bikeRepository.save(bike)
  }

  async changeStatus(bike: Bike, status: BikeStatus): Promise<Bike> {
    
    if (bike.CurrentStatus === undefined)
      throw new Error()

    let statusChange = this.validBikeStatusTransitions.get(bike.CurrentStatus)
    
    if (!statusChange?.includes(status))
      throw new Error()

      bike.CurrentStatus = status;

      if (bike.CurrentStatus === BikeStatus.DISABLED)
        bike.IsActive = false;

    return await this.bikeRepository.update(bike)
  }


  async findAllAvailable(): Promise<Bike[]> {
    return await this.bikeRepository.findAll({Status: BikeStatus.FREE})
  }

}