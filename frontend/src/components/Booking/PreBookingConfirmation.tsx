import React, { useState } from "react"
import { SingleBookingDTO, SingleBookingSections } from "@/types/BookingType"
import PrimaryButton from "../Buttons/PrimaryButton"
import SecondaryButton from "../Buttons/SecondaryButton"
import { useSingleBookingContext } from "@/context/singleBooking"
import { NavigationOptions } from "@/types/NavigationPaths"
import InfoboxSingleBookingDetails from "./SingleBooking/modules/InfoboxSingleBookingDetails"
import InstructionLabel from "../Others/InstructionLabel"
import { createSingleBookingFetchApi } from "@/services/bookingApi"
import { joinFirstLastName } from "@/utils/validators"
import { UserData } from "@/types/UserType"

function singleBookingDTO(userData: UserData, bikeNumbering: string) {
  const userName: string = joinFirstLastName(
    userData.firstName,
    userData.lastName
  )
  const room: string = userData.roomNumber
  const singleBookingData: SingleBookingDTO = {
    userName: userName,
    room: room,
    bikeNumbering: bikeNumbering,
  }
  return singleBookingData
}

const PreBookingConfirmation = () => {
  const { bookingData, settingCurrentSection, settingServerResult } =
    useSingleBookingContext()
  const { userData, bikeNumbering } = bookingData
  const [isTermsAndConditionsChecked, setIsTermsAndConditionsChecked] =
    useState(false)
  const [itemNeedsAttention, setItemNeedsAttention] = useState(false)

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsTermsAndConditionsChecked(event.target.checked)
    setItemNeedsAttention(false)
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget
    const buttonClicked: NavigationOptions = name as NavigationOptions

    if (buttonClicked === NavigationOptions.return) {
      settingCurrentSection(SingleBookingSections.inputUserData)
    }

    if (buttonClicked === NavigationOptions.next) {
      if (isTermsAndConditionsChecked) {
        handleSubmitForm()
      } else {
        setItemNeedsAttention(true) // Trigger attention when Confirm Booking is clicked without checking the checkbox
      }
    }
  }

  function handleSubmitForm() {
    settingCurrentSection(SingleBookingSections.bookingConfirmation)
    createSingleBooking()
  }

  async function createSingleBooking() {
    const bookingFormData: SingleBookingDTO = singleBookingDTO(
      userData,
      bikeNumbering
    )
    try {
      settingCurrentSection(SingleBookingSections.isLoading)
      const response = await createSingleBookingFetchApi(bookingFormData)
      const data = response.data
      settingServerResult(data?.status)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      settingCurrentSection(SingleBookingSections.bookingConfirmation)
    }
  }

  return (
    <div className="flex w-full flex-col">
      <InstructionLabel>Booking Details</InstructionLabel>
      <InfoboxSingleBookingDetails />
      <div className="m-4 flex w-full items-center justify-start">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={isTermsAndConditionsChecked}
          onChange={handleCheckboxChange}
          className={`h-4 w-4 rounded-2xl border-gray-300 bg-gray-100 text-blue-600 ${
            itemNeedsAttention ? "ring-1 ring-red-400" : ""
          }`}
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm text-gray-700"
        >
          I agree to the{" "}
          <a href="/" target="_blank">
            <span className="text-blue-700">terms and conditions</span>.
          </a>
        </label>
      </div>
      <PrimaryButton onClick={handleClick} name={NavigationOptions.next}>
        <span>Confirm Booking</span>
      </PrimaryButton>
      <SecondaryButton onClick={handleClick} name={NavigationOptions.return}>
        <span>Return</span>
      </SecondaryButton>
    </div>
  )
}

export default PreBookingConfirmation
