import { isAlpha, isAlphaNumerical, isEmail, isNumber, isNumericString } from "../utils/strings"

function validateUserName(name: string) {
  if (!name.length)
    throw new Error("Name cannot be empty")

  if (!isAlpha(name))
    throw new Error("User's name is not valid")
}

function validateBikeNumbering(bikeNumbering: string) {
  if (!bikeNumbering)
    throw new Error("Bike numbering cannot be empty")

  if (!isNumericString(bikeNumbering))
    throw new Error("Bike numbering is not valid")
}

function validateRoom(room: string) {
  if (!isAlphaNumerical(room))
    throw new Error("Room is not valid")

}

function validateEmail(email: string) {
  if (!email.length) {
    throw new Error("Email cannot be empty")
  }

  if (!isEmail(email))
    throw new Error("User's email is not valid")
}

function validatePassword(password: string, requireSpecialChar: boolean = true) {
  if (!password.length) {
    throw new Error("Password cannot be empty");
  }

  // Check if the password has at least 8 characters
  if (password.length < 8) {
    throw new Error("Password should be at least 8 characters long");
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    throw new Error("Password should contain at least one uppercase letter");
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    throw new Error("Password should contain at least one lowercase letter");
  }

  // Check if the password contains at least one number
  if (!/\d/.test(password)) {
    throw new Error("Password should contain at least one number");
  }

  // Check if the password contains at least one special character if required
  if (requireSpecialChar && !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    throw new Error("Password should contain at least one special character");
  }

  // If all checks pass, the password is considered valid
}

export { validateBikeNumbering, validateUserName, validateRoom, validateEmail, validatePassword }
