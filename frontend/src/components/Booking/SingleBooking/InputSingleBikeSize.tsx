import Link from "next/link"
import { useEffect, useState } from "react"

import { BikeDTO, BikeType, BikeSize } from "@/types/BikeType"
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

  const [listOfFilteredBikes, setListOfFilteredBikes] =
    useState<BikeDTO[]>(allBikesAvailable)

  const [radioBikeTypeValue, setRadioBikeTypeValue] = useState<any>(
    BikeType.ALL
  )
  const [radioBikeSizeValue, setRadioBikeSizeValue] = useState<any>(
    BikeSize.STANDARD
  )

  const [isImageSliding, setIsImageSliding] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(true)
  const [reloadData, setReloadData] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  function handleDropdownToggle() {
    setIsDropdownOpen(!isDropdownOpen)
  }

  function handleBikeNumberSelection(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    settingBikeNumbering(event.target.value)
    setIsDropdownOpen(false)
  }

  function handleClickNextStep() {
    settingBikeNumbering(bookingData.bikeNumbering)
    settingCurrentSection(SingleBookingSections.inputUserData)
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange("size", event.target.value as BikeSize | BikeType)
  }

  const handleBikeTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as BikeType
    setIsLoad(true)
    handleFilterChange("bikeType", value)
    setIsImageSliding(true)
    setTimeout(() => {
      setIsImageSliding(false)
    }, 500)
  }

  function handleFilterChange(
    selectedOption: string,
    value: BikeSize | BikeType
  ) {
    let filteredBikes: BikeDTO[] = []

    switch (selectedOption) {
      case "size":
        filteredBikes = allBikesAvailable.filter((bike) => bike.Size === value)
        setRadioBikeSizeValue(value)
        break
      case "bikeType":
        if (value === BikeType.ALL) {
          filteredBikes = allBikesAvailable
          setRadioBikeTypeValue(value)
          break
        }
        filteredBikes = allBikesAvailable.filter(
          (bike) => bike.BikeType === value
        )
        setRadioBikeTypeValue(value)
        break
      default:
        break
    }

    /* ------------------------------ Sorting bikes ----------------------------- */
    filteredBikes.sort((a, b) => {
      const bikeA = a.Numbering
      const bikeB = b.Numbering
      if (bikeA < bikeB) return -1
      if (bikeA > bikeB) return 1
      return 0
    })

    setListOfFilteredBikes(filteredBikes)
  }

  function handleIsLoad() {
    if (!isLoad) {
      setReloadData(!reloadData)
      setIsLoad(true)
    }
  }

  useEffect(() => {
    updatingAllBikesAvailable()
    setListOfFilteredBikes(allBikesAvailable)
  }, [radioBikeSizeValue, radioBikeSizeValue, reloadData, isLoad])

  return (
    <>
      <InstructionLabel>Select bike type</InstructionLabel>
      <ul className="mb-5 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <BikeChooserContainer
          bikeType={radioBikeTypeValue as BikeType}
          isImageSliding={isImageSliding}
          bikeCount={listOfFilteredBikes?.length}
        />
        <div className="flex justify-around rounded-b-2xl border-b bg-gradient-to-b from-white from-40% via-slate-200 via-60% to-slate-200">
          {[
            BikeType.ALL,
            BikeType.CLASSIC,
            BikeType.CITY,
            BikeType.FOLDING,
          ].map((bikeType, index, array) => (
            <li className={`w-full`} key={bikeType}>
              <input
                type="radio"
                id={`${bikeType.toLowerCase()}-bike-size`}
                name="bike-size"
                value={bikeType}
                className="peer hidden"
                checked={radioBikeTypeValue === bikeType}
                onChange={handleBikeTypeChange}
              />
              <label
                htmlFor={`${bikeType.toLowerCase()}-bike-size`}
                className={`bike-type-chooser-item rounded-2xl`}
              >
                <p
                  className={`w-full rounded-b-2xl bg-inherit py-2 ${array.indexOf(radioBikeTypeValue) - index === -1 && "rounded-tl-xl"} ${array.indexOf(radioBikeTypeValue) - index === 1 && "rounded-tr-xl"}`}
                >
                  <span className="text-sm">{toPascalCase(bikeType)}</span>
                </p>
              </label>
            </li>
          ))}
        </div>
      </ul>
      <InstructionLabel>Select bike number</InstructionLabel>
      <Button
        className={`${isLoad ? "hidden" : "flex min-h-10 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 text-sm"}`}
        type="button"
        onClick={handleIsLoad}
      >
        <p> Select bike</p>{" "}
        <svg
          className={`} h-2.5 w-2.5
          transition-transform`}
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
      <Button
        id="dropdownRadioBgHoverButton"
        data-dropdown-toggle="dropdownRadioBgHover"
        className={`${bookingData.bikeNumbering ? "flex min-h-10 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white pe-5 text-sm" : "hidden"}`}
        type="button"
        onClick={handleDropdownToggle}
      >
        <div className="flex h-full items-center font-semibold text-slate-700">
          <p className="flex min-h-10 items-center rounded-l-2xl bg-slate-200 px-3">
            Bike Selected
          </p>
          <div className="flex items-center px-5">
            <span className="font-extrabold text-blue-800">
              {bookingData.bikeNumbering && bookingData.bikeNumbering}
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
      {listOfFilteredBikes && isLoad && (
        <div
          id="dropdownRadioBgHover"
          className={`${isDropdownOpen ? "z-10 mt-5 block w-full divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow" : "hidden"}`}
        >
          <ul
            className={`${isDropdownOpen ? "max-h-52 space-y-1 overflow-y-auto p-3 text-sm text-gray-700" : "hidden"}`}
            aria-labelledby="dropdownRadioBgHoverButton"
          >
            {listOfFilteredBikes &&
              listOfFilteredBikes.map((bike) => (
                <li key={bike.Numbering}>
                  <div
                    className={`flex items-center rounded-lg p-2 hover:bg-gray-100 ${bookingData.bikeNumbering && bike.Numbering && bookingData.bikeNumbering === bike.Numbering.toString() && "bg-slate-200 text-blue-700"}`}
                  >
                    <input
                      id={`default-radio-${bike.Numbering}`}
                      type="radio"
                      value={bike.Numbering && bike.Numbering.toString()}
                      name="default-radio"
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-1 focus:ring-blue-500"
                      checked={
                        bookingData.bikeNumbering &&
                        bike.Numbering &&
                        bookingData.bikeNumbering === bike.Numbering.toString()
                          ? true
                          : undefined
                      }
                      onChange={handleBikeNumberSelection}
                    />
                    <label
                      htmlFor={`default-radio-${bike.Numbering}`}
                      className="ms-2 w-full rounded text-sm font-medium"
                    >
                      <div className="flex items-center">
                        <p className="ps-5">Bike</p>
                        <p className="px-2">{bike.Numbering}</p>
                      </div>
                    </label>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
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
