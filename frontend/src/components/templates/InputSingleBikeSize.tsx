import Image from "next/image";
import { BikeSize, BikeStatus } from "@/types/BikeType";
import Button from "../atoms/Button";
import Link from "next/link";
import { SingleBookingSection } from "@/types/NavigationSections";

//TODO get the number of bikes for each BikeStatus
const bikeCountFreeStandardSize = 8;
const bikeCountFreeSmallSize = 3;
let radioBikeSizeValue: BikeSize;

function InputStudentBikeSize(props: {
  onSizeSelection: (bikeSizeButton: { selectedSize: BikeSize }) => void;
  onNavigation: (navigationButton: {
    buttonName: SingleBookingSection;
  }) => void;
}) {
  function handleClick() {
    const selectedRadio = document.querySelector<HTMLInputElement>(
      'input[name="bike-size"]:checked'
    );
    if (selectedRadio) {
      radioBikeSizeValue = selectedRadio.value as BikeSize;
      console.log("Selected Bike Size: ", radioBikeSizeValue);
    } else {
      console.log("No radio button selected.");
    }
    props.onSizeSelection({ selectedSize: radioBikeSizeValue });
    props.onNavigation({ buttonName: SingleBookingSection.inputUserData });
  }
  return (
    <>
      <div className="w-11/12 flex flex-col items-center">
        <h3 className="mb-5 text-lg font-medium text-gray-900">
          Choose the bike size
        </h3>
        <ul className="text-start mb-5">
          <li className="">
            <input
              type="radio"
              id="standard-bike-size"
              name="bike-size"
              value={BikeSize.STANDARD}
              className="hidden peer"
              defaultChecked={radioBikeSizeValue != BikeSize.SMALL}
            />
            <label
              htmlFor="standard-bike-size"
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-300 rounded-lg cursor-pointer  peer-checked:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-200"
            >
              <div className="block">
                <div className="text-xs text-gray-400">
                  <span
                    className={`relative inline-flex  rounded-full h-2 w-2 bg-green-500`}
                  ></span>
                  <span className="p-2">
                    {bikeCountFreeStandardSize} available
                  </span>
                </div>
                <div className="w-full text-lg font-bold">Standard</div>
                <div className="w-full text-xs text-gray-500">
                  Recommended for people 5&apos;4&quot; | 163 cm or taller.
                </div>
              </div>
              <svg
                className="w-24 h-auto ml-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path
                  fill="currentColor"
                  d="M200-160q-85 0-142.5-57.5T0-360q0-85 58.5-142.5T200-560q77 0 129.5 46T396-400h26l-72-200h-70v-80h200v80h-44l14 40h192l-58-160H480v-80h104q26 0 46.5 14t29.5 38l68 186h32q83 0 141.5 58.5T960-362q0 84-58 143t-142 59q-72 0-126.5-45T564-320H396q-14 69-68 114.5T200-160Zm0-80q41 0 70.5-22.5T312-320H200v-80h112q-12-36-41.5-58T200-480q-51 0-85.5 34.5T80-360q0 50 34.5 85t85.5 35Zm308-160h56q5-23 13.5-43t22.5-37H478l30 80Zm252 160q51 0 85.5-35t34.5-85q0-51-34.5-85.5T760-480h-4l40 106-76 28-38-106q-20 17-31 40t-11 52q0 50 34.5 85t85.5 35ZM196-360Zm564 0Z"
                />
              </svg>
            </label>
          </li>
          <li className="icon-container">
            <input
              type="radio"
              id="small-bike-size"
              name="bike-size"
              value={BikeSize.SMALL}
              className="hidden peer"
              defaultChecked={radioBikeSizeValue === BikeSize.SMALL}
            />
            <label
              htmlFor="small-bike-size"
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-300 rounded-lg cursor-pointer  peer-checked:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-200"
            >
              <div className="block">
                <div className="text-xs text-gray-400">
                  <span
                    className={`relative inline-flex  rounded-full h-2 w-2 bg-green-500`}
                  ></span>
                  <span className="p-2">
                    {bikeCountFreeSmallSize} available
                  </span>
                </div>
                <div className="w-full text-lg font-bold">Small</div>
                <div className="w-full text-xs text-gray-500 pr-3">
                  Recommended for people under 5&apos;3&quot; | 160 cm.
                </div>
              </div>
              <svg
                className="w-20 h-auto ml-3 my-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path
                  fill="currentColor"
                  d="M200-160q-85 0-142.5-57.5T0-360q0-85 58.5-142.5T200-560q77 0 129.5 46T396-400h26l-72-200h-70v-80h200v80h-44l14 40h192l-58-160H480v-80h104q26 0 46.5 14t29.5 38l68 186h32q83 0 141.5 58.5T960-362q0 84-58 143t-142 59q-72 0-126.5-45T564-320H396q-14 69-68 114.5T200-160Zm0-80q41 0 70.5-22.5T312-320H200v-80h112q-12-36-41.5-58T200-480q-51 0-85.5 34.5T80-360q0 50 34.5 85t85.5 35Zm308-160h56q5-23 13.5-43t22.5-37H478l30 80Zm252 160q51 0 85.5-35t34.5-85q0-51-34.5-85.5T760-480h-4l40 106-76 28-38-106q-20 17-31 40t-11 52q0 50 34.5 85t85.5 35ZM196-360Zm564 0Z"
                />
              </svg>
            </label>
          </li>
        </ul>
        <div className="w-full">
          <Button onClick={handleClick} name="next">
            <span>Next</span>
          </Button>
        </div>
        <div className="w-full">
          <Link href="/">
            <div className="btn-return">Return</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default InputStudentBikeSize;
