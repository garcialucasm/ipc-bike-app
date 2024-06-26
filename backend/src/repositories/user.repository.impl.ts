import { Client } from "pg";
import { User } from "../models/user.model";
import IUserRepository from "./user.repository";
import { createWhereClausule } from "./sql.util";
import { userFromRow } from "./mappings";
import { getLogger } from "../logger";

const logger = getLogger('UserRepository')

export default class UserRepository implements IUserRepository {

  client: Client

  insertUserStmt: string = `INSERT INTO "user" (name, type, room, term, status, is_active, created_at)
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`

  updateUserStmt: string = `UPDATE "user" SET status=$1, is_active=$2, updated_at=$3 WHERE id=$4 RETURNING *`

  deleteUserStmt: string = `UPDATE "user" set is_active=$1, deleted_at=$2 WHERE id=$3 RETURNING *`

  findByIdStmt: string = `SELECT * FROM "user" WHERE id=$1`

  findAllStmt: string = `SELECT * FROM "user"`

  constructor(client: Client) {
    this.client = client;
  }

  async save(user: User): Promise<User> {
    logger.silly("save")
    user.CreatedAt = new Date()

    let result = await this.client.query(this.insertUserStmt, [user.Name, user.Type,
    user.Room, user.Term, user.Status, user.IsActive, user.CreatedAt])

    let [row] = result.rows

    if (row === undefined) {
      logger.error("Couldn't insert user")
      throw new Error("Couldn't insert user")
    }

    return userFromRow(row)
  }


  async update(user: User): Promise<User> {
    logger.silly("update")
    if (user.ID === undefined)
      throw new Error("Cant update user with undefined id")

    user.UpdatedAt = new Date()
    let result = await this.client.query(this.updateUserStmt, [user.Status, user.IsActive, user.UpdatedAt, user.ID])

    if (result.rowCount == 0) {
      logger.error("Couldn't update user")
      throw new Error("Couldn't update user")
    }

    let [row] = result.rows

    return userFromRow(row)
  }

  async delete(userId: number): Promise<User> {
    logger.silly("delete")
    let result = await this.client.query(this.deleteUserStmt, [false, new Date(), userId])

    if (result.rowCount == 0) {
      logger.error("Couldn't delete user")
      throw new Error("Couldn't delete user")
    }

    let [row] = result.rows

    return userFromRow(row)
  }

  async findById(userId: number): Promise<User> {
    logger.silly("findById")
    let result = await this.client.query(this.findByIdStmt, [userId])

    if (result.rowCount == 0) {
      logger.error("Couldn't find user")
      throw new Error("Couldn't find user")
    }

    let [row] = result.rows

    return userFromRow(row)
  }

  async findAll(searchCriteria: { name?: undefined; term?: undefined; room?: undefined; }): Promise<User[]> {
    logger.silly("findById")
    let query: string = this.findAllStmt

    query += createWhereClausule(searchCriteria)
    let result = await this.client.query(query, Object.values(searchCriteria))

    return result.rows.map(row => userFromRow(row))
  }
}
