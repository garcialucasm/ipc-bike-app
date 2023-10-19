import Button from "../components/Button";
import Link from "next/link";

function InputStudentData(props: { onDataValidation: (arg0: any) => void }) {
  // Check if the data is valid and save it temporarily
  function handleBookingData(event: { target: any } | undefined) {
    const { name } = event?.target;
    const confirmationUserData = name;
    props.onDataValidation({ name: confirmationUserData });
  }

  return (
    <div>
      <h4>Name</h4>
      <input type="text" placeholder={"Name"} />
      <h4>Room Number</h4>
      <input type="text" placeholder={"Room Number"} />
      <div>
        <Button
          onClick={handleBookingData}
          type="submit"
          name="pre-booking-confirmation"
          textInside="Next"
        />
      </div>
      <div>
        <Button
          onClick={handleBookingData}
          type="submit"
          name="return-to-size-selection"
          textInside="Return"
          customClasses="button-return"
        />
      </div>
    </div>
  );
}

export default InputStudentData;
