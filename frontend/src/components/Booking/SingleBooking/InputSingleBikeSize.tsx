import Link from "next/link"
import { useEffect, useState } from "react"

import { Bike, BikeSize } from "@/types/BikeType"
import PrimaryButton from "../../Buttons/PrimaryButton"
import { SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import BikeChooserContainer from "./modules/BikeChooserContainer"
import { NavigationPaths } from "@/types/NavigationPaths"
import InstructionLabel from "@/components/Others/InstructionLabel"
import { toPascalCase } from "@/utils/strings"
import Button from "@/components/Buttons/Button"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"

function InputStudentBikeSize() {
  const { bookingData, settingCurrentSection, settingBikeNumbering } =
    useSingleBookingContext()

  const { allBikesAvailable, updatingAllBikesAvailable } =
    useBikeAvailabilityContext()

  const [listOfAvailableBikes, setListOfAvailableBikes] = useState<Bike[]>()

  const [radioBikeSizeValue, setRadioBikeSizeValue] = useState<BikeSize>(
    BikeSize.ALL
  )

  const [isImageSliding, setIsImageSliding] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  function handleDropdownToggle() {
    setIsDropdownOpen(!isDropdownOpen)
  }

  function handleBikeNumberSelection(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    settingBikeNumbering(event.target.value)
    setIsDropdownOpen(false)
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsImageSliding(true)
    setTimeout(() => {
      setIsImageSliding(false)
    }, 500) // Adjust the delay to match the transition duration

    const selectedRadio = event.target.value as BikeSize
    setRadioBikeSizeValue(selectedRadio)
    settingBikeList(selectedRadio)
  }

  function handleClickNextStep() {
    settingBikeNumbering(bookingData.bikeNumbering)
    // TODO create a validation to not let go to next section if bikeCount selected = 0
    settingCurrentSection(SingleBookingSections.inputUserData)
  }

  function settingBikeList(selectedRadio: BikeSize) {
    let sortedBikes
    if (selectedRadio === BikeSize.ALL) {
      sortedBikes = allBikesAvailable.allBikes
    } else if (selectedRadio === BikeSize.LARGE) {
      sortedBikes = allBikesAvailable.largeBikes
    } else if (selectedRadio === BikeSize.STANDARD) {
      sortedBikes = allBikesAvailable.standardBikes
    } else if (selectedRadio === BikeSize.SMALL) {
      sortedBikes = allBikesAvailable.smallBikes
    }

    /* -------------------- // TODO: Sort the bikes by numbering ------------------- */

    setListOfAvailableBikes(sortedBikes)
  }

  useEffect(() => {
    ;async () => updatingAllBikesAvailable()
    settingBikeList(radioBikeSizeValue)
  }, [radioBikeSizeValue, allBikesAvailable])

  return (
    <>
      <InstructionLabel>Select bike type</InstructionLabel>
      <ul className="mb-5 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <BikeChooserContainer
          bikeSize={radioBikeSizeValue as BikeSize}
          isImageSliding={isImageSliding}
          bikeCount={listOfAvailableBikes?.length}
        />
        <div className="flex justify-around rounded-b-2xl border-b bg-gradient-to-b from-white from-40% via-slate-200 via-60% to-slate-200">
          {[
            BikeSize.ALL,
            BikeSize.STANDARD,
            BikeSize.LARGE,
            BikeSize.SMALL,
          ].map((size, index, array) => (
            <li className={`w-full`} key={size}>
              <input
                type="radio"
                id={`${size.toLowerCase()}-bike-size`}
                name="bike-size"
                value={size}
                className="peer hidden"
                checked={radioBikeSizeValue === size}
                onChange={handleRadioChange}
              />
              <label
                htmlFor={`${size.toLowerCase()}-bike-size`}
                className={`bike-type-chooser-item rounded-2xl`}
              >
                <p
                  className={`w-full rounded-b-2xl bg-inherit py-2 ${array.indexOf(radioBikeSizeValue) - index === -1 && "rounded-tl-xl"} ${array.indexOf(radioBikeSizeValue) - index === 1 && "rounded-tr-xl"}`}
                >
                  <span className="text-sm">{toPascalCase(size)}</span>
                </p>
              </label>
            </li>
          ))}
        </div>
      </ul>
      <InstructionLabel>Select bike number</InstructionLabel>
      <Button
        id="dropdownRadioBgHoverButton"
        data-dropdown-toggle="dropdownRadioBgHover"
        className="flex min-h-10 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white pe-5 text-sm"
        type="button"
        onClick={handleDropdownToggle}
      >
        <div className="flex h-full items-center font-semibold text-slate-700">
          <p className="flex min-h-10 items-center rounded-l-2xl bg-slate-200 px-3">
            Bike Selected
          </p>
          <div className="flex items-center px-5">
            <span className="font-extrabold text-blue-800">
              {bookingData.bikeNumbering}
            </span>
          </div>
        </div>
        <svg
          className={`h-2.5 w-2.5 transition-transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </Button>

      {/* --------------------- Dropdown select bike numbering --------------------- */}
      <div
        id="dropdownRadioBgHover"
        className={`z-10 ${isDropdownOpen ? "block" : "hidden"} mt-5 w-full divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow`}
      >
        <ul
          className="max-h-52 space-y-1 overflow-y-auto p-3 text-sm text-gray-700"
          aria-labelledby="dropdownRadioBgHoverButton"
        >
          {listOfAvailableBikes &&
            listOfAvailableBikes.map((bike) => (
              <li key={bike.numbering}>
                <div
                  className={`flex items-center rounded-lg p-2 hover:bg-gray-100 ${bookingData.bikeNumbering === bike.numbering.toString() && "bg-slate-200 text-blue-700"}`}
                >
                  <input
                    id={`default-radio-${bike.numbering}`}
                    type="radio"
                    value={bike.numbering.toString()}
                    name="default-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-1 focus:ring-blue-500"
                    checked={
                      bookingData.bikeNumbering === bike.numbering.toString()
                    }
                    onChange={handleBikeNumberSelection}
                  />
                  <label
                    htmlFor={`default-radio-${bike.numbering}`}
                    className="ms-2 w-full rounded text-sm font-medium"
                  >
                    <div className="flex items-center">
                      <p className="ps-5">Bike</p>
                      <p className="px-2">{bike.numbering}</p>
                    </div>
                  </label>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="mt-5 w-full">
        <>
          <PrimaryButton onClick={handleClickNextStep}>Next</PrimaryButton>
        </>
      </div>
      <div className="link-secondary w-full">
        <Link href={NavigationPaths.homeApp}>
          <span className="block px-4 py-2">Return</span>
        </Link>
      </div>
    </>
  )
}

export default InputStudentBikeSize
