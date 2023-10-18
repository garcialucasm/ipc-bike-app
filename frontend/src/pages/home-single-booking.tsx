import React, { useState, useEffect } from "react";
import Button from "@/components/button/Button";
import InputStudentData from "@/components/input/InputStudentData";
import HeaderTemp from "@/components/header/HeaderTemp";
import AvailabilityContainer from "@/components/availability/AvailabilityContainer";
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
    <div className="container center-content">
      <HeaderTemp heading="Home - Single Booking" />
      <AvailabilityContainer />
      {/*Ternary Operator*/}
      {bikeSizeSelected == "" ? (
        <div className="container">
          <h2>Select the size:</h2>
          <div>
            <Button
              type="submit"
              name="standard"
              textInside="Standard"
              onClick={() => setStandardSize()}
            />
          </div>
          <div>
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
