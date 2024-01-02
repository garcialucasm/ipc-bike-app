import { isAlpha, isAlphaNumerical } from "../utils/strings"


function validateUserName(name: string) {
  if (!name.length)
    throw new Error("Name cannot be empty")

  if (!isAlpha(name)) 
    throw new Error("User's name is not valid")
}

function validateBikeSize(bikeSize: string) {
  if (!bikeSize.length)
    throw new Error("Bike size cannot be empty")

  if (!isAlpha(bikeSize))
    throw new Error("Bike size is not valid")
}

function validateRoom(room: string) {
  if (!isAlphaNumerical(room))
    throw new Error("Room is not valid")

}

export {validateBikeSize, validateUserName, validateRoom}
