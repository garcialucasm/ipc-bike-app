import { BikeSize } from "@/types/BikeType";
import Button from "../atoms/Button";
import Link from "next/link";
import { SingleBookingSection } from "@/types/NavigationSections";
import AvailabilityContainer from "../organisms/AvailabilityContainer";

function InputStudentBikeSize(props: {
  onSizeSelection: (bikeSizeButton: { selectedSize: BikeSize }) => void;
  onNavigation: (navigationButton: {
    buttonValue: SingleBookingSection;
  }) => void;
}) {
  function handleClick(event: { target: any } | undefined) {
    const { value } = event?.target;
    const bikeSizeClicked = value;
    console.log(SingleBookingSection.InputUserData);
    props.onSizeSelection({ selectedSize: bikeSizeClicked });
    props.onNavigation({ buttonValue: SingleBookingSection.InputUserData });
  }
  return (
    <>
      <div className="flex-col items-center ">
        <AvailabilityContainer />
        <div>Select the size:</div>
        <div>
          <Button
            onClick={handleClick}
            name="bikeSize"
            value={BikeSize.STANDARD}
          >
            <span>Standard</span>
          </Button>
        </div>
        <div>
          <Button onClick={handleClick} name="bikeSize" value={BikeSize.SMALL}>
            <span>Small</span>
          </Button>
        </div>
        <div>
          <Link href="/">
            <div className="button-return">Return</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default InputStudentBikeSize;
