import { BikeSize } from "@/types/BikeType";
import Button from "../atoms/Button";
import Link from "next/link";
import { SingleBookingSection } from "@/types/NavigationSections";
import AvailabilityContainer from "../organisms/AvailabilityContainer";
import { AvailabilityConfig } from "@/components/organisms/AvailabilityContainer";

const availabilityShowSelection = AvailabilityConfig.HomeSingleBooking;

function InputStudentBikeSize(props: {
  onSizeSelection: (bikeSizeButton: { selectedSize: BikeSize }) => void;
  onNavigation: (navigationButton: {
    buttonName: SingleBookingSection;
  }) => void;
}) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget;
    const bikeSizeClicked: BikeSize = name as BikeSize;
    props.onSizeSelection({ selectedSize: bikeSizeClicked });
    props.onNavigation({ buttonName: SingleBookingSection.goToInputUserData });
  }
  return (
    <>
      <div className="flex-col items-center ">
        <AvailabilityContainer
          availabilitySelection={availabilityShowSelection}
        />
        <div>Select the size:</div>
        <div>
          <Button onClick={handleClick} name={BikeSize.STANDARD}>
            <span>Standard</span>
          </Button>
        </div>
        <div>
          <Button onClick={handleClick} name={BikeSize.SMALL}>
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
