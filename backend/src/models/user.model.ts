
enum UserType {
  STUDENT = "student",
  PROFESSOR = "professor",
  KEYKEEPER = "keyKeeper"
}

enum UserStatus {
  BOOKED = "booked",
  INUSE = "inUse",
  FREE = "free"
}

interface User {
  ID?: number,
  Type: UserType,
  Name: string,
  Room: string,
  Term: string,
  Status: UserStatus,
  IsActive?: Boolean,
  CreatedAt?: Date,
  UpdatedAt?: Date,
  DeletedAt?: Date,
}

export { UserType, UserStatus, User }
