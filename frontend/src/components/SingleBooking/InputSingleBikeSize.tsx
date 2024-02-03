import Link from "next/link"
import { useState } from "react"

import { BikeSize } from "@/types/BikeType"
import PrimaryButton from "../Buttons/PrimaryButton"
import { SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import BikeChooserContainer from "./BikeChooserContainer"

function InputStudentBikeSize() {
  const { bookingData, settingCurrentSection, settingBikeSize } =
    useSingleBookingContext()

  let defaultBikeSize = BikeSize.STANDARD

  if (bookingData.bookingBikeSize) {
    defaultBikeSize = bookingData.bookingBikeSize as BikeSize
  }

  const [radioBikeSizeValue, setRadioBikeSizeValue] =
    useState<BikeSize>(defaultBikeSize)

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedRadio = event.target.value as BikeSize
    // TODO create a validation for selecting the bike size according to availability
    setRadioBikeSizeValue(selectedRadio)
  }

  function handleClick() {
    settingBikeSize(radioBikeSizeValue)
    // TODO create a validation to not let go to next section if bikeCount selected = 0
    settingCurrentSection(SingleBookingSections.inputUserData)
  }

  return (
    <>
      <div className="flex w-11/12 flex-col items-center">
        <div className="instruction-label">Select the bike type</div>
        <ul className="mb-5 w-full rounded-xl border border-slate-200 shadow-lg">
          <div>
            <BikeChooserContainer bikeSize={radioBikeSizeValue as BikeSize} />
          </div>
          <div className="flex justify-around rounded-b-xl border-b-4 bg-gradient-to-b from-white from-40% via-slate-200 via-60% to-slate-200">
            <li className="w-full">
              <input
                type="radio"
                id="standard-bike-size"
                name="bike-size"
                value={BikeSize.STANDARD}
                className="peer hidden"
                checked={radioBikeSizeValue === BikeSize.STANDARD}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="standard-bike-size"
                className={`bike-type-chooser-item`}
              >
                <div
                  className={`w-full rounded-b-xl bg-inherit py-2 text-lg ${
                    radioBikeSizeValue == BikeSize.CLASSIC
                      ? "rounded-tr-xl"
                      : ""
                  }`}
                >
                  Standard
                </div>
              </label>
            </li>
            <li className="w-full">
              <input
                type="radio"
                id="classic-bike-size"
                name="bike-size"
                value={BikeSize.CLASSIC}
                className="peer hidden"
                checked={radioBikeSizeValue === BikeSize.CLASSIC}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="classic-bike-size"
                className="bike-type-chooser-item"
              >
                <div
                  className={`w-full rounded-b-xl bg-inherit py-2 text-lg ${
                    radioBikeSizeValue == BikeSize.STANDARD && "rounded-tl-xl"
                  } ${radioBikeSizeValue == BikeSize.SMALL && "rounded-tr-xl"}`}
                >
                  Classic
                </div>
              </label>
            </li>
            <li className="w-full">
              <input
                type="radio"
                id="small-bike-size"
                name="bike-size"
                value={BikeSize.SMALL}
                className="peer hidden"
                checked={radioBikeSizeValue === BikeSize.SMALL}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="small-bike-size"
                className="bike-type-chooser-item"
              >
                <div
                  className={`w-full rounded-b-xl bg-inherit py-2 text-lg ${
                    radioBikeSizeValue == BikeSize.CLASSIC && "rounded-tl-xl"
                  }`}
                >
                  Small
                </div>
              </label>
            </li>
          </div>
        </ul>
        <div className="w-full">
          <PrimaryButton
            onClick={handleClick}
            name="next"
            className="btn-primary"
          >
            <span>Next</span>
          </PrimaryButton>
        </div>
        <div className="w-full">
          <Link href="/home-app">
            <div className="btn-return">Return</div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default InputStudentBikeSize
