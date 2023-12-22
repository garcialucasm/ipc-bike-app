export enum UserType {
  STUDENT = "student",
  PROFESSOR = "professor",
  KEYKEEPER = "keyKeeper",
}

export enum UserStatus {
  BOOKED = "booked",
  INUSE = "inUse",
  FREE = "free",
}
interface UserData {
  firstName: string;
  lastName: string;
  roomNumber: string;
}

export type { UserData };
