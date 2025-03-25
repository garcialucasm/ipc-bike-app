import {
  ErrorMessageBookingUserData,
  ErrorMessageRegister,
} from "@/types/ErrorMessageTypes"
import { cleanUpSpaces } from "./strings"
import { AccountRegisterType } from "@/types/AccountType"
import { UserData } from "@/types/UserType"

export const errorMessagePasswordInvalid = "Invalid password"

/* -------------------------------------------------------------------------- */
/* --------------------------- variable validation -------------------------- */
/* -------------------------------------------------------------------------- */

export function isEmail(s: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(s)
}

export function joinFirstLastName(fName: string, lName: string) {
  const fullName = cleanUpSpaces(fName) + " " + cleanUpSpaces(lName)
  return fullName
}

export function isValidAccountName(s: string): boolean {
  // Allows letters, spaces, apostrophes, commas, periods, and hyphens in the name.
  const fullNameRegex = /^[a-zA-Z]{2,}(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  return fullNameRegex.test(s)
}

export function isPasswordValid(password: string): boolean {
  // Regular expression for validating a password:
  // - At least 8 characters long
  // - Contains at least one uppercase letter
  // - Contains at least one lowercase letter
  // - Contains at least one number
  // - Contains at least one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|[\]\\:;'"<>?,./]).{8,}$/
  return passwordRegex.test(password)
}

/* -------------------------------------------------------------------------- */
/* --------------------- error message: form validation --------------------- */
/* -------------------------------------------------------------------------- */

export function validateFormName(s: string): string {
  if (!s) {
    return "Name is required"
  } else if (s.length < 2 || s.length > 50) {
    return "Please enter a valid name"
  } else if (!/^[a-zA-Z\s]+$/.test(s)) {
    return "Please enter a name without special characters"
  } else {
    return ""
  }
}

export function validateFormRoomNumber(s: string): string {
  if (!s) {
    return "Room number is required"
  } else if (s.length < 1 || s.length > 20) {
    return "Please enter a valid room number"
  } else {
    return ""
  }
}

/* -------------------------------------------------------------------------- */
/* ----------------------------- form validation ---------------------------- */
/* -------------------------------------------------------------------------- */

export function formValidationRegister(formValues: AccountRegisterType) {
  let error: ErrorMessageRegister = {
    accountName: "",
    email: "",
    password: "",
  }
  if (!formValues.accountName) {
    error.accountName = "Name is required"
  } else if (!isValidAccountName(formValues.accountName)) {
    error.accountName = "Please enter a valid username"
  } else {
    error.accountName = ""
  }
  if (!formValues.email) {
    error.email = "User name or e-mail are required"
  } else if (!isEmail(formValues.email)) {
    error.email = "Please enter a valid email"
  } else {
    error.email = ""
  }
  if (formValues.password.length < 8) {
    error.password = "Password must have at least 8 characters"
  } else if (!isPasswordValid(formValues.password)) {
    error.password = errorMessagePasswordInvalid
  } else if (formValues.password !== formValues.passwordConfirmation) {
    error.password = "Password do not match"
  }
  return error
}

export function formValidationSingleBooking(formValues: UserData) {
  let error: ErrorMessageBookingUserData = {
    firstName: "",
    lastName: "",
    roomNumber: "",
  }
  //First name input validation
  error.firstName = validateFormName(formValues.firstName)

  //Last name input validation
  error.lastName = validateFormName(formValues.lastName)

  //Room number input validation
  error.roomNumber = validateFormRoomNumber(formValues.roomNumber)

  return error
}
