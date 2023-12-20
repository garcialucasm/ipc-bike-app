
enum UserType {
  STUDENT = 'STUDENT', 
  PROFESSOR = 'PROFESSOR', 
  KEYKEEPER = 'KEYKEEPER'
}

enum UserStatus {
  BOOKED = 'BOOKED', 
  INUSE = 'INUSE', 
  FREE = 'FREE'
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
