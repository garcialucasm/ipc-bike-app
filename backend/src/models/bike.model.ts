import { RowDataPacket } from "mysql2"

export default interface Bike extends RowDataPacket {
  ID?: number;
  Numbering?: string;
  Size?: string;
  CurrentStatus?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}