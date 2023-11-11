import { Client } from "pg";
import { User, UserStatus, UserType } from "../models/user.model";
import IUserRepository from "./user.repository";
import { createWhereClausule } from "./sql.util";

export default class UserRepository implements IUserRepository {

  client: Client

  insertUserStmt: string = `INSERT INTO user(name, type, room, status, is_active)
    VALUES($1, $2, $3, $4, $5) RETURNING id`

  updateUserStmt: string = `UPDATE user SET status=$1 is_active=$2 WHERE id=$3 RETURNING *`

  deleteUserStmt: string = `UPDATE user set is_inactive=$1 deleted_at=$2 WHERE id=$3 RETURNING *`

  findByIdStmt: string = `SELECT * FROM user WHERE id=$1`

  findAllStmt: string = `SELECT * FROM user`

  constructor(client: Client) {
    this.client = client;
  }

  async save(user: User): Promise<User> {
    user.CreatedAt = new Date()

    let result = await this.client.query(this.insertUserStmt, [user.Name, user.Type, user.Room, user.Status, user.IsActive])

    let [id] = result.rows

    if (id === undefined)
      throw new Error("Couldn't insert user")

    user.ID = id
    return user
  }


  async update(user: User): Promise<User> {
    if (user.ID === undefined)
      throw new Error("Cant update user with undefined id")

    user.UpdatedAt = new Date()
    let result = await this.client.query(this.updateUserStmt, [user.Status, user.IsActive, user.ID])

    if (result.rowCount == 0)
      throw new Error("Couldn't update user")

    let [row] = result.rows

    return this.userFromRow(row)
  }

  async delete(userId: number): Promise<User> {
    let result = await this.client.query(this.deleteUserStmt, [false, new Date(), userId])

    if (result.rowCount == 0)
      throw new Error("Couldn't delete user")

    let [row] = result.rows

    return this.userFromRow(row)
  }

  async findById(userId: number): Promise<User> {
    let result = await this.client.query(this.findByIdStmt, [userId])

    if (result.rowCount == 0)
      throw new Error("Couldn't find user")

    let [row] = result.rows

    return this.userFromRow(row)
  }

  async findAll(searchCriteria: { name?: string | undefined; term?: string | undefined; room?: string | undefined; }): Promise<User[]> {
    let query: string = this.findAllStmt

    query += createWhereClausule(searchCriteria)

    let result = await this.client.query(query, Object.values(searchCriteria))

    return result.rows.map(row => this.userFromRow(row))
  }

  userFromRow(row: any) : User {
    return {
      ID: 1,
      Name: "",
      Room: "",
      Type: UserType.STUDENT,
      Term: "",
      Status: UserStatus.FREE,
      IsActive: true,
      CreatedAt: row['created_at'] ? new Date(row['created_at']) : undefined,
      UpdatedAt: row['updated_at'] ? new Date(row['updated_at']) : undefined,
      DeletedAt: row['deleted_at'] ? new Date(row['deleted_at']) : undefined
    }
  }

}
