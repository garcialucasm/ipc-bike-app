import { BikeSize } from "@/types/BikeType";
import Button from "../components/Button";
import Link from "next/link";
import { SingleBookingSection } from "@/types/NavigationSections";

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
      <div className="container">
        <h2>Select the size:</h2>
        <div>
          <Button
            onClick={handleClick}
            type="submit"
            name="bikeSize"
            textInside="Standard"
            value={BikeSize.STANDARD}
          />
        </div>
        <div>
          <Button
            onClick={handleClick}
            type="submit"
            name="bikeSize"
            textInside="Small"
            value={BikeSize.SMALL}
          />
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
