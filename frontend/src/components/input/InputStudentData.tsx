import Input from "./Input";
import Button from "../button/Button";
import Link from "next/link";

function InputStudentData() {
  return (
    <div>
      <form className="form">
        <h2>Student Name</h2>
        <Input type="text" placeholder="Name" />
        <h2>Room Number</h2>
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
