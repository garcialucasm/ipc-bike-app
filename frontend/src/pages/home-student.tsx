import React, { useState, useEffect } from "react";
import Button from "@/components/button/Button";
import InputStudentData from "@/components/input/InputStudentData";
import HeaderTemp from "@/components/header/HeaderTemp";
// import InputStudentSize from "@/components/input/InputStudentSize";

function HomeStudent() {
  const [bikeSizeSelected, setBikeSize] = useState("");

  const setStandardSize = () => {
    setBikeSize("standard");
  };

  const setSmallSize = () => {
    setBikeSize("small");
  };

  useEffect(() => {
    console.log("bikeSizeSelected changed:", bikeSizeSelected);
  }, [bikeSizeSelected]);

  return (
    <div className="container">
      <HeaderTemp heading="Booking" />
      {/*Ternary Operator*/}
      {bikeSizeSelected == "" ? (
        <div className="container">
          <div className="border ">
            <h2>Availability Container</h2>
          </div>
            <h5>Select the size:</h5>
          <div>
            <Button
              type="submit"
              name="standard"
              textInside="Standard"
              onClick={() => setStandardSize()}
            />
            <Button
              type="submit"
              name="small"
              textInside="Small"
              onClick={() => setSmallSize()}
            />
          </div>
        </div>
      ) : (
        <InputStudentData />
      )}
    </div>
  );
}

export default HomeStudent;
