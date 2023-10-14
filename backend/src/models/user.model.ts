
enum UserType {
  STUDENT, PROFESSOR, KEYKEEPER
}

enum UserStatus {
  BOOKED, INUSE, FREE
}

interface User {
  ID?: number,
  // Type: UserType,
  Name: string,
  // Room: string,
  // Term: string,
  // Status: UserStatus,
  IsActive?: Boolean,
  CreatedAt?: Date,
  UpdatedAt?: Date,
  DeletedAt?: Date,
}

export {UserType, UserStatus, User}