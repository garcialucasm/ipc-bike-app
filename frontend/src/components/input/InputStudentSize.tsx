import Button from "../button/Button";

function InputStudentSize() {
  return (
    <div>
      <h2>Availability Container</h2>
      <h5>Select the size:</h5>
      <div>
        <Button type="submit" name="standard" textInside="Standard" />
        <Button type="submit" name="small" textInside="Small" />
      </div>
    </div>
  );
}

export default InputStudentSize;
