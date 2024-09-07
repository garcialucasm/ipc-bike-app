export type AccountProps = {
  id: number | null
  accountName: string | null
  isAuthenticated: boolean | null
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

export enum AccountStatus {
  IS_ACTIVE = "IS ACTIVE",
  INACTIVE = "DISABLED",
}
