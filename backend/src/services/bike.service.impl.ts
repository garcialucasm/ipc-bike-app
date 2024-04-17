import { Bike, BikeStatus } from "../models/bike.model";
import IBikeRepository from "../repositories/bike.repository";
import IBikeService from "./bike.service";
import { getLogger } from '../logger'

const logger = getLogger('BikeService')

export default class BikeService implements IBikeService {

  bikeRepository: IBikeRepository;

  validBikeStatusTransitions: Map<BikeStatus, BikeStatus[]>

  constructor(bikeRepository: IBikeRepository) {
    this.bikeRepository = bikeRepository;

    this.validBikeStatusTransitions = new Map([
      [BikeStatus.FREE, [BikeStatus.BOOKED, BikeStatus.DISABLED]],
      [BikeStatus.BOOKED, [BikeStatus.FREE, BikeStatus.INUSE]],
      [BikeStatus.INUSE, [BikeStatus.FREE, BikeStatus.DISABLED]],
      [BikeStatus.DISABLED, [BikeStatus.FREE]]
    ])
  }

  async createBike(numbering: number, bikeType: string, size: string): Promise<Bike> {
    logger.debug("createBike")

    let bikes = await this.bikeRepository.findAll({ numbering: numbering })

    if (bikes.length) {
      throw new Error("Numbering already exist")
    }

    let bike: Bike = {
      Numbering: numbering,
      BikeType: bikeType,
      Size: size,
      CreatedAt: new Date(),
      IsActive: true,
      CurrentStatus: BikeStatus.FREE
    }

    return await this.bikeRepository.save(bike)
  }

  async changeStatus(bike: Bike, status: BikeStatus): Promise<Bike> {
    logger.debug("changeStatus")

    if (bike.CurrentStatus === undefined) {
      throw new Error()
    }

    let statusChange = this.validBikeStatusTransitions.get(bike.CurrentStatus)

    if (!statusChange?.includes(status)) {
      throw new Error()
    }

    bike.CurrentStatus = status;

    if (bike.CurrentStatus === BikeStatus.DISABLED)
      bike.IsActive = false;

    return await this.bikeRepository.update(bike)
  }

  findAllAvailable(size?: string, numbering?: number): Promise<Bike[]> {
    logger.debug("findAllAvailable")

    const searchCriteria: { numbering?: number; currentStatus?: BikeStatus; size?: string; } = {
      currentStatus: BikeStatus.FREE
    };

    /* -- without this statement, findAllAvailable doesnt work with empty size -- */
    if (size) {
      searchCriteria.size = size;
    }
    if (numbering) {
      searchCriteria.numbering = numbering;
    }
    /* -------------------------------------------------------------------------- */

    return this.bikeRepository.findAll(searchCriteria);
  }

  countBikesByStatus(): Promise<Map<BikeStatus, number>> {
    logger.debug("countBikesByStatus")

    return this.bikeRepository.countBikesByStatus()
  }

}
