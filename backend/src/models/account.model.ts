enum AccountType {
  STUDENT = "STUDENT",
  PROFESSOR = "PROFESSOR",
  KEYKEEPER = "KEYKEEPER",
  ADMIN = "ADMIN",
}

interface Account {
    ID?: number,
    Type: AccountType,
    AccountName?: string,
    Email?: string,
    Hash?: string,
    IsActive?: boolean,
    CreatedAt?: Date,
    UpdatedAt?: Date,
    DeletedAt?: Date,
    Token?: string,
}

export { Account, AccountType }

