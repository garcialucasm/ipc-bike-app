interface AccountDTO {
  id: number
  type: string
  isActive: boolean
  email: string
  name: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  token?: string
}

export { AccountDTO }
