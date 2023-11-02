import { BikeSize } from "@/types/BikeType";
import Button from "../atoms/Button";
import Link from "next/link";
import { SingleBookingSection } from "@/types/NavigationSections";
import AvailabilityContainer from "../organisms/AvailabilityContainer";

function InputStudentBikeSize(props: {
  onSizeSelection: (bikeSizeButton: { selectedSize: BikeSize }) => void;
  onNavigation: (navigationButton: {
    buttonName: SingleBookingSection;
  }) => void;
}) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget;
    const bikeSizeClicked: BikeSize = BikeSize[name as BikeSize];
    props.onSizeSelection({ selectedSize: bikeSizeClicked });
    props.onNavigation({ buttonName: SingleBookingSection.goToInputUserData });
  }
  return (
    <>
      <div className="flex-col items-center ">
        <AvailabilityContainer />
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
