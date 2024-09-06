export interface User {
  id?: number,
  type: UserType,
  name: string,
  room: string,
  term: string,
  status: UserStatus,
  isActive?: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date,
}

export enum UserType {
  STUDENT = "STUDENT",
  PROFESSOR = "PROFESSOR",
  KEYKEEPER = "KEYKEEPER",
}

export enum UserStatus {
  BOOKED = "BOOKED",
  INUSE = "INUSE",
  FREE = "FREE",
}
export interface UserData {
  firstName: string;
  lastName: string;
  roomNumber: string;
}