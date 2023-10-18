import Input from "./Input";
import Button from "../button/Button";
import Link from "next/link";

function InputStudentData() {
  return (
    <div>
      <form className="form">
        <h4>Student Name</h4>
        <Input type="text" placeholder="Name" />
        <h4>Room Number</h4>
        <Input type="text" placeholder="Room number" />
        <div>
          <Link href="/booking-confirmation">
            <Button type="submit" name="next" textInside="Next" />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default InputStudentData;
