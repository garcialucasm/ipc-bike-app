import Link from "next/link"
import { useState } from "react"

import { BikeSize } from "@/types/BikeType"
import PrimaryButton from "../../Buttons/PrimaryButton"
import { SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import BikeChooserContainer from "./modules/BikeChooserContainer"
import { NavigationPaths } from "@/types/NavigationPaths"
import InstructionLabel from "@/components/Others/InstructionLabel"
import { toPascalCase } from "@/utils/strings"

function InputStudentBikeSize() {
  let defaultBikeSize = BikeSize.STANDARD

  const { bookingData, settingCurrentSection, settingBikeSize } =
    useSingleBookingContext()

  const [radioBikeSizeValue, setRadioBikeSizeValue] =
    useState<BikeSize>(defaultBikeSize)

  const [isImageSliding, setIsImageSliding] = useState(false)

  if (bookingData.bikeSize) {
    defaultBikeSize = bookingData.bikeSize as BikeSize
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsImageSliding(true)
    setTimeout(() => {
      setIsImageSliding(false)
    }, 500) // Adjust the delay to match the transition duration

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
      <InstructionLabel>Select the bike type</InstructionLabel>
      <ul className="mb-5 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <BikeChooserContainer
          bikeSize={radioBikeSizeValue as BikeSize}
          isImageSliding={isImageSliding}
        />
        <div className="flex justify-around rounded-b-2xl border-b bg-gradient-to-b from-white from-40% via-slate-200 via-60% to-slate-200">
          {["All", BikeSize.STANDARD, BikeSize.CLASSIC, BikeSize.SMALL].map(
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
                  className={`bike-type-chooser-item rounded-2xl`}
                >
                  <p
                    className={`w-full rounded-b-2xl bg-inherit py-2 ${array.indexOf(radioBikeSizeValue) - index === -1 && "rounded-tl-xl"} ${array.indexOf(radioBikeSizeValue) - index === 1 && "rounded-tr-xl"}`}
                  >
                    <span className="text-sm">{toPascalCase(size)}</span>
                  </p>
                </label>
              </li>
            )
          )}
        </div>
      </ul>
      <>
        <PrimaryButton onClick={handleClickNextStep}>Next</PrimaryButton>
      </>
      <div className="link-secondary w-full">
        <Link href={NavigationPaths.homeApp}>
          <span className="block px-4 py-2">Return</span>
        </Link>
      </div>
    </>
  )
}

export default InputStudentBikeSize
