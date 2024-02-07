import Link from "next/link"
import { useState } from "react"

import { BikeSize } from "@/types/BikeType"
import PrimaryButton from "../../Buttons/PrimaryButton"
import { SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import BikeChooserContainer from "./modules/BikeChooserContainer"
import { NavigationPaths } from "@/types/NavigationPaths"
import { toPascalCase } from "@/app/utils/validators"

function InputStudentBikeSize() {
  let defaultBikeSize = BikeSize.STANDARD

  const { bookingData, settingCurrentSection, settingBikeSize } =
    useSingleBookingContext()

  const [radioBikeSizeValue, setRadioBikeSizeValue] =
    useState<BikeSize>(defaultBikeSize)

  if (bookingData.bikeSize) {
    defaultBikeSize = bookingData.bikeSize as BikeSize
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedRadio = event.target.value as BikeSize
    setRadioBikeSizeValue(selectedRadio)
  }

  function handleClickNextStep() {
    settingBikeSize(radioBikeSizeValue)
    // TODO create a validation to not let go to next section if bikeCount selected = 0
    settingCurrentSection(SingleBookingSections.inputUserData)
  }

  return (
    <>
      <h1 className="instruction-label">Select the bike type</h1>
      <ul className="mb-5 w-full rounded-xl border border-slate-200 bg-white">
        <BikeChooserContainer bikeSize={radioBikeSizeValue as BikeSize} />
        <div className="flex justify-around rounded-b-xl border-b bg-gradient-to-b from-white from-40% via-slate-200 via-60% to-slate-200">
          {[BikeSize.STANDARD, BikeSize.CLASSIC, BikeSize.SMALL].map(
            // TODO: Fix curve selection using index and array
            (size, index, array) => (
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
                  className={`bike-type-chooser-item rounded-xl`}
                >
                  <p
                    className={`w-full rounded-b-xl bg-inherit py-2 ${radioBikeSizeValue === size && "rounded-tl-xl"}`}
                  >
                    {toPascalCase(size)}
                  </p>
                </label>
              </li>
            )
          )}
        </div>
      </ul>
      <div className="w-full">
        <PrimaryButton onClick={handleClickNextStep}>
          <span>Next</span>
        </PrimaryButton>
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
