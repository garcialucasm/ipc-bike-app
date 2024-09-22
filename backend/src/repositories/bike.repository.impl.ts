import { Bike, BikeStatus } from "../models/bike.model";
import IBikeRepository from "./bike.repository";

import { Client } from 'pg'
import { createWhereClausule } from "./sql.util";
import { getLogger } from "../logger";

const logger = getLogger('BikeRepository')

export default class BikeRepository implements IBikeRepository {

  client: Client

  insertStmt: string = "INSERT INTO bike (numbering, size, current_status, is_active, created_at) " +
    "VALUES ($1, $2, $3, $4, $5) RETURNING *"

  updateStmt: string = "UPDATE bike SET is_active=$1, updated_at=$2, current_status=$3 WHERE id=$4 RETURNING *"

  deleteStmt: string = "UPDATE bike SET is_active=$1, deleted_at=$2, current_status=$3 WHERE id=$4 RETURNING *"

  findByIdStmt: string = "SELECT * from bike where id=$1"

  findAllStmt: string = `SELECT * FROM "bike"`

  countBikesByStatusStmt: string = `SELECT b.current_status, count(b.current_status) FROM bike b GROUP BY b.current_status`

  constructor(client: Client) {
    this.client = client
  }

  async save(bike: Bike): Promise<Bike> {
    logger.silly("save")
    bike.CreatedAt = new Date()
    const result = await this
      .client.query(this.insertStmt, [bike.Numbering, bike.Size, bike.BikeType,
      BikeStatus[bike.CurrentStatus], bike.IsActive, bike.CreatedAt])

    if (result.rowCount == 0) {
      logger.error("save to database have failed")
      throw new Error("save to database have failed")
    }

    let [row] = result.rows
    return this.bikeFromRow(row)
  }

  async update(bike: Bike): Promise<Bike> {
    logger.silly("update")
    if (bike.ID == undefined)
      throw new Error()

    bike.UpdatedAt = new Date()

    const result = await this
      .client.query(this.updateStmt, [bike.IsActive, bike.UpdatedAt,
      BikeStatus[bike.CurrentStatus], bike.ID])

    if (result.rowCount == 0) {
      logger.error("No bikes updated")
      throw new Error("No bikes updated")
    }

    return bike;
  }

  async delete(bikeId: number): Promise<Bike> {
    logger.silly("delete")
    const result = await this
      .client.query(this.deleteStmt, [false, new Date(),
        BikeStatus[BikeStatus.DISABLED], bikeId])

    if (result.rowCount == 0) {
      logger.error("No bikes deleted")
      throw new Error("No bikes deleted")
    }

    let [row] = result.rows

    return this.bikeFromRow(row)
  }

  async findById(bikeId: number): Promise<Bike> {
    logger.silly("findById")
    const result = await this.client.query(this.findByIdStmt, [bikeId])

    if (result.rowCount == 0) {
      logger.error("No bikes found")
      throw new Error("No bikes found")
    }

    let [row] = result.rows

    return this.bikeFromRow(row)
  }

  async findAll(searchCriteria: {
    numbering?: number | undefined;
    size?: string | undefined;
    currentStatus?: BikeStatus | undefined;
  }): Promise<Bike[]> {

    logger.silly("findAll")
    let query: string = this.findAllStmt

    query += createWhereClausule(searchCriteria)
    query += "ORDER BY numbering"
    let result = await this.client.query(query, Object.values(searchCriteria))
    return result.rows.map(row => this.bikeFromRow(row))
  }

  private bikeFromRow(row: any): Bike {
    logger.silly("bikeFromRow")
    let bike: Bike = {
      ID: Number.parseInt(row['id']),
      IsActive: row['is_active'] ? new Boolean(row['is_active']).valueOf() : false,
      CurrentStatus: row['current_status'] ? BikeStatus[row['current_status'] as keyof typeof BikeStatus] : BikeStatus.DISABLED,
      Numbering: Number.parseInt(row['numbering']),
      BikeType: row['bike_type'],
      Size: row['size'],
      CreatedAt: row['created_at'] ? new Date(row['created_at']) : undefined,
      UpdatedAt: row['updated_at'] ? new Date(row['updated_at']) : undefined,
      DeletedAt: row['deleted_at'] ? new Date(row['deleted_at']) : undefined,
    }

    return bike;
  }

  async countBikesByStatus(): Promise<Map<BikeStatus, number>> {
    logger.silly("countBikesByStatus")
    let query: string = this.countBikesByStatusStmt

    const result = await this.client.query(query)
    let ans: Map<BikeStatus, number> = new Map<BikeStatus, number>()

    result.rows.forEach(row => {
      ans.set(BikeStatus[row.current_status as keyof typeof BikeStatus], Number.parseInt(row.count))
    });

    return ans
  }
}
