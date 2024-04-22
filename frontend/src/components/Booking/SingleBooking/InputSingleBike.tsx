import Link from "next/link"
import { useEffect, useState } from "react"

import { BikeDTO, BikeType, BikeSize, BikeStatus } from "@/types/BikeType"
import PrimaryButton from "../../Buttons/PrimaryButton"
import { SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import BikeChooserContainer from "./modules/BikeChooserContainer"
import { NavigationPaths } from "@/types/NavigationPaths"
import InstructionLabel from "@/components/Others/InstructionLabel"
import { toPascalCase } from "@/utils/strings"
import Button from "@/components/Buttons/Button"
import { useBikeContext } from "@/context/bikeAvailability"

function InputSingleBike() {
  const {
    bookingData,
    settingCurrentSection,
    settingBikeNumbering,
    settingBikeType,
    settingBikeSize,
  } = useSingleBookingContext()

  const { allBikes, updatingAllBikes } = useBikeContext()

  const allBikesAvailable = allBikes.filter(
    (bike) => bike.CurrentStatus === BikeStatus.FREE
  )

  const [listOfAvailableBikes, setListOfAvailableBikes] =
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
    const combinedValue = event.target.value
    const [bikeNumbering, bikeSize, bikeType] = combinedValue.split(",")
    settingBikeNumbering(bikeNumbering)
    settingBikeType(bikeType)
    settingBikeSize(bikeSize)
    setIsDropdownOpen(false)
  }

  function handleClickNextStep() {
    if (bookingData.bikeNumbering) {
      settingBikeNumbering(bookingData.bikeNumbering)
      settingCurrentSection(SingleBookingSections.inputUserData)
    }
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

  function sortBikeList(bikeList: BikeDTO[]) {
    let sortedBikeList = bikeList.sort((a, b) => {
      const bikeA = a.Numbering
      const bikeB = b.Numbering
      if (bikeA < bikeB) return -1
      if (bikeA > bikeB) return 1
      return 0
    })

    setListOfAvailableBikes(sortedBikeList)

    return
  }

  function handleFilterChange(
    selectedOption: string,
    value: BikeSize | BikeType
  ) {
    let filteredBikes: BikeDTO[] = []

    settingBikeNumbering("")
    setIsDropdownOpen(true)

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
    sortBikeList(filteredBikes)
  }

  function handleIsLoad() {
    if (!isLoad) {
      setReloadData(!reloadData)
      setIsLoad(true)
    }
  }

  useEffect(() => {
    updatingAllBikes()
    sortBikeList(allBikesAvailable)
  }, [radioBikeSizeValue, radioBikeSizeValue, reloadData, isLoad])

  return (
    <>
      <InstructionLabel>Select bike type</InstructionLabel>
      <ul className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <BikeChooserContainer
          bikeType={radioBikeTypeValue as BikeType}
          isImageSliding={isImageSliding}
          bikeCount={listOfAvailableBikes?.length}
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
                className={`cursor-pointer rounded-2xl bg-slate-200 font-bold text-slate-500 hover:bg-slate-50 hover:text-blue-500 peer-checked:rounded-b-2xl peer-checked:border-blue-600 peer-checked:bg-white peer-checked:font-black peer-checked:text-blue-600`}
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
        className={`${!isLoad && !bookingData.bikeNumbering ? "flex min-h-10 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 text-sm" : "hidden"}`}
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
        className={`${bookingData.bikeNumbering ? "flex min-h-10 w-full items-center justify-between rounded-2xl border-2 border-blue-700 bg-white pe-5 text-sm" : "hidden"}`}
        type="button"
        onClick={handleDropdownToggle}
      >
        <div className="flex h-full items-center font-semibold text-slate-700">
          <p className="flex min-h-10 items-center rounded-l-2xl bg-slate-200 px-3">
            Selected
          </p>
          <div className="flex items-center gap-2 divide-x divide-slate-400 px-2 text-left text-xs font-normal text-slate-600 sm:px-4">
            <span className="text-sm font-extrabold text-blue-800">
              Bike {bookingData.bikeNumbering && bookingData.bikeNumbering}
            </span>
            <p className="hidden ps-2 sm:inline-block">
              Type: {bookingData.bikeType && toPascalCase(bookingData.bikeType)}
            </p>
            <p className="ps-2">
              Size: {bookingData.bikeSize && toPascalCase(bookingData.bikeSize)}
            </p>
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
      {listOfAvailableBikes && isLoad && (
        <div
          id="dropdownRadioBgHover"
          className={`${isDropdownOpen ? "z-10 mt-1 block w-full divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow" : "hidden"}`}
        >
          <ul
            className={`${isDropdownOpen ? "max-h-52 space-y-1 overflow-y-auto p-3 text-sm text-gray-700" : "hidden"}`}
            aria-labelledby="dropdownRadioBgHoverButton"
          >
            {listOfAvailableBikes &&
              listOfAvailableBikes.map((bike) => (
                <li key={bike.Numbering}>
                  <div
                    className={`flex items-center rounded-lg p-2 hover:bg-gray-100 ${bookingData.bikeNumbering && bike.Numbering && bookingData.bikeNumbering === bike.Numbering.toString() && "bg-slate-200 text-blue-700"}`}
                  >
                    <div className="flex items-center px-4 sm:px-5">
                      <input
                        id={`default-radio-${bike.Numbering}`}
                        type="radio"
                        value={
                          bike.Numbering &&
                          bike.Size &&
                          BikeType &&
                          `${bike.Numbering},${bike.Size},${bike.BikeType}`
                        }
                        name="default-radio"
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-1"
                        checked={
                          bookingData.bikeNumbering &&
                          bike.Numbering &&
                          bookingData.bikeNumbering ===
                            bike.Numbering.toString()
                            ? true
                            : undefined
                        }
                        onChange={handleBikeNumberSelection}
                      />
                    </div>
                    <label
                      htmlFor={`default-radio-${bike.Numbering}`}
                      className="ms-2 w-full rounded text-sm"
                    >
                      <div className="flex items-center gap-2 divide-x divide-slate-400 px-4 text-left text-xs font-normal text-slate-600">
                        <p className="min-w-14 text-sm font-bold text-slate-900">
                          Bike
                          <span className="ps-2">{bike.Numbering}</span>
                        </p>
                        <p className="hidden ps-2 sm:inline-block">
                          Type: {bike.BikeType && toPascalCase(bike.BikeType)}
                        </p>
                        <p className="ps-2">
                          Size: {bike.Size && toPascalCase(bike.Size)}
                        </p>
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

export default InputSingleBike
