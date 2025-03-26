import { Bike, BikeStatus } from "../models/bike.model"

export default interface IBikeService {
  /**
   * Creates a new bike with the given numbering, size, and type.
   * Returns the created Bike object.
   * @param numbering The unique identifier for the bike.
   * @param size The size of the bike.
   * @param bikeType The type of the bike.
   */
  createBike(numbering: number, size: string, bikeType: string): Promise<Bike>

  /**
   * Changes the status of a given bike to the provided status.
   * Returns the updated Bike object.
   * @param bike The bike object to update.
   * @param status The new status for the bike (e.g., FREE, INUSE, DISABLED).
   */
  changeStatus(bike: Bike, status: BikeStatus): Promise<Bike>

  /**
   * Retrieves a list of bikes, optionally filtered by size, numbering, and current status.
   * Returns an array of bikes that match the given criteria.
   * @param bikeSize (optional) The size of the bike to filter by.
   * @param bikeNumbering (optional) The numbering of the bike to filter by.
   * @param currentStatus (optional) The current status of the bike to filter by.
   */
  findAll(
    bikeSize?: string,
    bikeNumbering?: number,
    currentStatus?: BikeStatus
  ): Promise<Bike[]>

  /**
   * Counts the number of bikes grouped by their current status.
   * Returns a Map where the keys are BikeStatus and the values are counts of bikes in each status.
   */
  countBikesByStatus(): Promise<Map<BikeStatus, number>>

  /**
   * Puts or return a bike into maintenance.
   * Returns the updated Bike object.
   * @param numbering The unique identifier of the bike to be put in maintenance.
   */
  maintenance(numbering: number): Promise<Bike>
}
