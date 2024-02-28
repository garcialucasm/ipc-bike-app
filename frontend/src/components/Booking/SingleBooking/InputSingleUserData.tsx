import React, { useState } from "react"
import Image from "next/image"

import { useSingleBookingContext } from "@/context/singleBooking"
import { SingleBookingSections } from "@/types/BookingType"
import { formValidationSingleBooking } from "@/utils/validators"
import PrimaryButton from "../../Buttons/PrimaryButton"
import SecondaryButton from "@/components/Buttons/SecondaryButton"
import {
  IconSvgPersonFilled,
  IconSvgRoomDoor,
} from "@/components/Others/IconsSvg"
import { NavigationOptions } from "@/types/NavigationPaths"
import InstructionLabel from "@/components/Others/InstructionLabel"
import InputText from "@/components/Forms/Inputs/InputText"

function InputStudentData() {
  const { bookingData, settingCurrentSection, settingUserData } =
    useSingleBookingContext()

  const userData = bookingData.userData

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    roomNumber: "",
  })

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const { name } = e.currentTarget
    const buttonClicked: NavigationOptions = name as NavigationOptions

    if (buttonClicked === NavigationOptions.next) {
      handleNextButtonClick()
    }

    if (buttonClicked === NavigationOptions.return) {
      handleReturnButtonClick()
    }
  }

  function handleNextButtonClick() {
    const validationErrors = formValidationSingleBooking(userData)
    setErrorMessages(validationErrors)

    if (isFormValid()) {
      settingCurrentSection(SingleBookingSections.preBookingConfirmation)
    }
  }

  function handleReturnButtonClick() {
    settingCurrentSection(SingleBookingSections.selectBikeSize)
  }

  /* -------- Update the context bookingUserData when input is changed -------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    settingUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFocus = () => {
    setErrorMessages({
      firstName: "",
      lastName: "",
      roomNumber: "",
    })
  }

  const handleBlur = () => {
    setErrorMessages(formValidationSingleBooking(userData))
  }

  const isFormValid = () => {
    if (
      userData &&
      userData.firstName &&
      userData.lastName &&
      userData.roomNumber &&
      !errorMessages.firstName &&
      !errorMessages.lastName &&
      !errorMessages.roomNumber
    ) {
      return true
    }
    return false
  }

  return (
    <>
      <InstructionLabel>Please, enter cyclist information:</InstructionLabel>
      <div className="flex w-full items-center justify-center rounded-2xl bg-white p-2">
        <Image
          src="/flat-illustration-people-cycling.jpg"
          className="rouded-2xl w-auto"
          width={720}
          height={423}
          alt=""
        />
      </div>
      <div className="flex w-full flex-col gap-y-4 sm:flex-row sm:gap-2">
        <InputText
          placeholder={"First name"}
          name={"firstName"}
          value={userData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          errorMessage={errorMessages.firstName}
        >
          <IconSvgPersonFilled
            fillColor="text-gray-400"
            width="24"
            height="24"
          />{" "}
        </InputText>
        <InputText
          placeholder={"Last Name"}
          name={"lastName"}
          value={userData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          errorMessage={errorMessages.lastName}
        >
          <span className="sm:hidden">
            <IconSvgPersonFilled
              fillColor="text-gray-400"
              width="24"
              height="24"
            />
          </span>
        </InputText>
      </div>

      <InputText
        placeholder={"Room number"}
        name={"roomNumber"}
        value={userData.roomNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        errorMessage={errorMessages.roomNumber}
      >
        <IconSvgRoomDoor fillColor="text-gray-400" width="24" height="24" />
      </InputText>
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
