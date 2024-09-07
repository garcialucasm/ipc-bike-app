export enum AccountTypePermission {
  STUDENT = "STUDENT",
  PROFESSOR = "PROFESSOR",
  KEYKEEPER = "KEYKEEPER",
  ADMIN = "ADMIN",
}

export enum AccountStatus {
  IS_ACTIVE = "IS ACTIVE",
  INACTIVE = "DISABLED",
}

export type AccountProps = {
  id: number | null
  accountName: string | null
  isAuthenticated: boolean | null
  accountType: string | null
}

export type AccountRegisterType = {
  accountName: string
  email: string
  password: string
  passwordConfirmation?: string
}

export type AccountType = {
  ID: string
  Type: string
  Name: string
  Email: string
  IsActive: boolean
  CreatedAt?: Date
}
