import { BikeSize } from "@/types/BikeSize";
import Button from "../components/Button";

function InputStudentSize(props: { onSizeSelection: (arg0: any) => void }) {
  function handleClick(event: { target: any } | undefined) {
    const { value } = event?.target;
    const bikeSizeClicked = value;
    props.onSizeSelection({ size: bikeSizeClicked });
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
      </div>
    </>
  );
}

export default InputStudentSize;
