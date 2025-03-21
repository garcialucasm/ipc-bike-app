import { useState } from "react"
import Cookies from "js-cookie"

import { SingleBookingDTO, SingleBookingSections } from "@/types/BookingType"
import PrimaryButton from "../Buttons/PrimaryButton"
import SecondaryButton from "../Buttons/SecondaryButton"
import { useSingleBookingContext } from "@/context/singleBooking"
import { NavigationOptions, NavigationPaths } from "@/types/NavigationPaths"
import InfoboxSingleBookingDetails from "./SingleBooking/modules/InfoboxSingleBookingDetails"
import InstructionLabel from "../Others/InstructionLabel"
import { createSingleBookingFetchApi } from "@/services/bookingApi"
import { joinFirstLastName } from "@/utils/validators"
import { UserData } from "@/types/UserType"
import InformativeModal from "../Modal/InformativeModal"
import TermsOfServiceContent from "../TermsOfServiceContent/TermsOfServiceContent"
import Button from "../Buttons/Button"

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
  const [isTermsOfServiceChecked, setIsTermsOfServiceChecked] = useState(false)
  const [itemNeedsAttention, setItemNeedsAttention] = useState(false)
  const [isModalTermsOfServiceOpen, setIsModalTermsOfServiceOpen] =
    useState<boolean>(false)

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsTermsOfServiceChecked(event.target.checked)
    setItemNeedsAttention(false)
  }

  const handleOpenTermsOfServiceModal = () => {
    setIsModalTermsOfServiceOpen(true!)
  }

  const handleCloseTermsOfServiceModal = () => {
    setIsModalTermsOfServiceOpen(false!)
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget
    const buttonClicked: NavigationOptions = name as NavigationOptions

    if (buttonClicked === NavigationOptions.return) {
      settingCurrentSection(SingleBookingSections.inputUserData)
    }

    if (buttonClicked === NavigationOptions.next) {
      if (isTermsOfServiceChecked) {
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

      handleServerResponse(response)

      const publicBookingToken = response.data.publicBookingToken
      Cookies.set("ipcBikeApp_previousBookings", publicBookingToken, {
        expires: 180,
        secure: true,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      settingCurrentSection(SingleBookingSections.bookingConfirmation)
    }
  }

  function handleServerResponse(response: any) {
    if (response.data) {
      // If the request is successful, proceed with the desired actions
      settingServerResult({
        isConfirmed: true,
        resultMessage: "Action Confirmed!",
      })
    } else if (response.error) {
      settingServerResult({
        isConfirmed: false,
        resultMessage: response.error,
      })
    } else {
      // Handle unexpected errors or errors when trying to fetch data
      settingServerResult({
        isConfirmed: false,
        resultMessage: "Something unexpected happened.",
      })
    }
  }

  return (
    <>
      <InstructionLabel>Booking Details</InstructionLabel>
      <InfoboxSingleBookingDetails />
      <div className="flex w-full items-center justify-center px-4 sm:justify-start">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={isTermsOfServiceChecked}
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
          <Button
            onClick={handleOpenTermsOfServiceModal}
            name="modalTermsOfService"
          >
            <span className="text-blue-700">terms of service</span>.
          </Button>
        </label>
      </div>
      <PrimaryButton onClick={handleClick} name={NavigationOptions.next}>
        <span>Confirm Booking</span>
      </PrimaryButton>
      <SecondaryButton onClick={handleClick} name={NavigationOptions.return}>
        <span>Return</span>
      </SecondaryButton>
      <InformativeModal
        modalTitle="Terms of Service"
        isOpen={isModalTermsOfServiceOpen}
        onClose={handleCloseTermsOfServiceModal}
      >
        <TermsOfServiceContent />
      </InformativeModal>
    </>
  )
}

export default PreBookingConfirmation
