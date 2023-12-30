export enum UserType {
  STUDENT = "student",
  PROFESSOR = "professor",
  KEYKEEPER = "keyKeeper",
}

export enum UserStatus {
  BOOKED = "BOOKED",
  INUSE = "INUSE",
  FREE = "FREE",
}
interface UserData {
  firstName: string;
  lastName: string;
  roomNumber: string;
}

export type { UserData };
