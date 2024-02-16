export interface ErrorMessageLogin {
  email: string
  password: string
}

export interface ErrorMessageRegister {
  accountName: string
  email: string
  password: string
}

export interface ErrorMessageBookingUserData {
  firstName: string,
  lastName: string,
  roomNumber: string,
}
