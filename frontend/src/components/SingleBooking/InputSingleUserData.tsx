import React, { useEffect, useState } from "react"

import { BookingType, SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import { validateName, validateRoomNumber } from "@/app/utils/validators"
import { UserData } from "@/types/UserType"
import PrimaryButton from "../Buttons/PrimaryButton"

interface ErrorMessage {
  showErrorMessages: boolean
  firstName: string
  lastName: string
  roomNumber: string
}

function InputStudentData() {
  const { bookingData, settingCurrentSection, settingUserData } =
    useSingleBookingContext()

  const bookingUserData = bookingData.bookingUserData

  const [errorMessages, setErrorMessages] = useState({
    showErrorMessages: false,
    firstName: "",
    lastName: "",
    roomNumber: "",
  })

  useEffect(() => {
    // Run the validation when sendUserDataState changes
    setErrorMessages(staticValidate(bookingUserData))
  }, [bookingData])

  // Get user's data entry (first name, last name, room number) when input is changed
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
    const buttonClicked: SingleBookingSections = name as SingleBookingSections

    // Run validation and update error messages
    setErrorMessages(staticValidate(bookingUserData))

    // Check conditions for navigation
    if (
      bookingUserData &&
      buttonClicked === SingleBookingSections.preBookingConfirmation &&
      bookingUserData.firstName &&
      bookingUserData.lastName &&
      bookingUserData.roomNumber &&
      !errorMessages.firstName &&
      !errorMessages.lastName &&
      !errorMessages.roomNumber
    ) {
      // Navigate if all conditions are met
      settingCurrentSection(SingleBookingSections.preBookingConfirmation)
    } else if (buttonClicked === SingleBookingSections.selectBikeSize) {
      settingCurrentSection(SingleBookingSections.selectBikeSize)
      // Navigate for the other button
    } else {
      // Show error messages
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        showErrorMessages: true,
      }))
    }
  }

  const staticValidate = (formValues: any) => {
    let error: ErrorMessage = {
      showErrorMessages: false,
      firstName: "",
      lastName: "",
      roomNumber: "",
    }
    //First name input validation
    error.firstName = validateName(formValues.firstName)

    //Last name input validation
    error.lastName = validateName(formValues.lastName)

    //Room number input validation
    error.roomNumber = validateRoomNumber(formValues.roomNumber)
    return error
  }

  return (
    <>
      <div className="flex w-11/12 flex-col text-start">
        <div className="instruction-label">Please, enter user data:</div>
        <div>
          <div className="flex gap-2">
            <div
              className={`input-text  ${
                errorMessages.firstName != "" &&
                errorMessages.showErrorMessages === true
                  ? "ring-1 ring-red-500"
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
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
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M120-120v-80h80v-640h400v40h160v600h80v80H680v-600h-80v600H120Zm320-320q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440Z" />
            </svg>
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
          {errorMessages.showErrorMessages ? errorMessages.firstName : ""}
        </span>
        <span className="text-wrap px-1 text-xs text-red-600">
          {errorMessages.showErrorMessages ? errorMessages.lastName : ""}
        </span>
        <span className="text-wrap px-1 text-xs text-red-600">
          {errorMessages.showErrorMessages ? errorMessages.roomNumber : ""}
        </span>
        <div>
          <PrimaryButton
            onClick={handleClick}
            name={SingleBookingSections.preBookingConfirmation}
            className="btn-primary"
          >
            Next
          </PrimaryButton>
        </div>
        <div>
          <PrimaryButton
            onClick={handleClick}
            name={SingleBookingSections.selectBikeSize}
            className="btn-return"
          >
            Return
          </PrimaryButton>
        </div>
      </div>
    </>
  )
}

export default InputStudentData
