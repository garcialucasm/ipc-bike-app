enum AccountType {
  STUDENT = "STUDENT",
  PROFESSOR = "PROFESSOR",
  KEYKEEPER = "KEYKEEPER",
  ADMIN = "ADMIN",
}

interface Account {
    ID?: number,
    Type: AccountType,
    IsActive: boolean,
    Email: string,
    Name?: string,
    Hash?: string,
    CreatedAt?: Date,
    UpdatedAt?: Date,
    DeletedAt?: Date,
    Token?: string,
}

export { Account, AccountType }

