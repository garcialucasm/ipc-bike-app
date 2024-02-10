import React, { useEffect, useState } from "react"

import { useSingleBookingContext } from "@/context/singleBooking"
import { SingleBookingSections } from "@/types/BookingType"
import {
  validateFirstName,
  validateLastName,
  validateRoomNumber,
} from "@/utils/validators"
import PrimaryButton from "../../Buttons/PrimaryButton"
import SecondaryButton from "@/components/Buttons/SecondaryButton"
import {
  IconSvgPersonFilled,
  IconSvgRoomDoor,
} from "@/components/Others/IconsSvg"
import { NavigationOptions } from "@/types/NavigationPaths"

interface ErrorMessage {
  showErrorMessages: boolean
  firstName: string
  lastName: string
  roomNumber: string
}

function InputStudentData() {
  const { bookingData, settingCurrentSection, settingUserData } =
    useSingleBookingContext()

  const bookingUserData = bookingData.userData

  const [errorMessages, setErrorMessages] = useState({
    showErrorMessages: false,
    firstName: "",
    lastName: "",
    roomNumber: "",
  })

  useEffect(() => {
    // Run the validation when sendUserDataState changes
    setErrorMessages(validateForm(bookingUserData))
  }, [bookingData])

  // Update the context bookingUserData (first name, last name, room number) when input is changed
  function handleUserDataChange(event: {
    target: { value: any; name: string }
  }) {
    const { value, name } = event.target
    settingUserData({
      ...bookingUserData,
      [name]: value,
    })
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget
    const buttonClicked: NavigationOptions = name as NavigationOptions

    // Run validation and update error messages
    setErrorMessages(validateForm(bookingUserData))

    // Check conditions for navigation
    if (
      bookingUserData &&
      buttonClicked === NavigationOptions.next &&
      bookingUserData.firstName &&
      bookingUserData.lastName &&
      bookingUserData.roomNumber &&
      !errorMessages.firstName &&
      !errorMessages.lastName &&
      !errorMessages.roomNumber
    ) {
      // Navigate if all conditions are met
      settingCurrentSection(SingleBookingSections.preBookingConfirmation)
    } else {
      // Show error messages
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        showErrorMessages: true,
      }))
    }
    if (buttonClicked === NavigationOptions.return) {
      settingCurrentSection(SingleBookingSections.selectBikeSize)
    }
  }

  const validateForm = (formValues: any) => {
    let error: ErrorMessage = {
      showErrorMessages: false,
      firstName: "",
      lastName: "",
      roomNumber: "",
    }
    //First name input validation
    error.firstName = validateFirstName(formValues.firstName)

    //Last name input validation
    error.lastName = validateLastName(formValues.lastName)

    //Room number input validation
    error.roomNumber = validateRoomNumber(formValues.roomNumber)
    return error
  }

  return (
    <>
      <div className="instruction-label text-start">
        Please, enter cyclist details:
      </div>
      <div className="flex w-full flex-col">
        <div className="flex gap-2">
          <div
            className={`input-text  ${
              errorMessages.firstName != "" &&
              errorMessages.showErrorMessages === true
                ? "ring-1 ring-red-500"
                : ""
            }`}
          >
            <IconSvgPersonFilled
              fillColor="text-gray-400"
              width="24"
              height="24"
            />
            <input
              placeholder="First name"
              name="firstName"
              onChange={handleUserDataChange}
              type="text"
              value={bookingUserData.firstName}
              className={`w-full border-none pl-2 outline-none`}
            />
          </div>
          <div
            className={`input-text  ${
              errorMessages.lastName != "" &&
              errorMessages.showErrorMessages === true
                ? "ring-1 ring-red-500"
                : ""
            }`}
          >
            <input
              name="lastName"
              onChange={handleUserDataChange}
              type="text"
              value={bookingUserData.lastName}
              placeholder="Last name"
              className="w-full border-none pl-2 outline-none"
            />
          </div>
        </div>
        <div
          className={`input-text  ${
            errorMessages.roomNumber != "" &&
            errorMessages.showErrorMessages === true
              ? "ring-1 ring-red-500"
              : ""
          }`}
        >
          <IconSvgRoomDoor fillColor="text-gray-400" width="24" height="24" />
          <input
            name="roomNumber"
            onChange={handleUserDataChange}
            type="text"
            placeholder="Room Number"
            value={bookingUserData.roomNumber}
            className="w-full border-none pl-2 outline-none"
          />
        </div>
      </div>
      <span className="text-wrap px-1 text-xs text-red-600">
        {errorMessages.showErrorMessages && errorMessages.firstName}
      </span>
      <span className="text-wrap px-1 text-xs text-red-600">
        {errorMessages.showErrorMessages && errorMessages.lastName}
      </span>
      <span className="text-wrap px-1 text-xs text-red-600">
        {errorMessages.showErrorMessages && errorMessages.roomNumber}
      </span>
      <>
        <PrimaryButton onClick={handleClick} name={NavigationOptions.next}>
          Next
        </PrimaryButton>
      </>
      <>
        <SecondaryButton onClick={handleClick} name={NavigationOptions.return}>
          Return
        </SecondaryButton>
      </>
    </>
  )
}

export default InputStudentData
