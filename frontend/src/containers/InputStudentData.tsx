import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import InputLabel from "@/components/InputLabel";

function InputStudentData(props: {
  onDataValidation: (arg0: any) => void;
  onNavigation: (buttonValue: string) => void;
}) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    roomNumber: "",
  });

  // Get user's data entry (first name, last name, room number) when input is changed
  function handleUserDataChange(event: { target: any }) {
    const { value, name } = event.target;
    setUserData((prevValue): any => {
      return { ...prevValue, [name]: value };
    });
    props.onDataValidation({
      value: { userDataTyped: userData },
    });
  }

  useEffect(() => {
    console.log("userData changed:", userData);
  }, [userData]);

  return (
    <div>
      <InputLabel text="First Name" />
      <input
        name="firstName"
        onChange={handleUserDataChange}
        type="text"
        placeholder={"First Name"}
        value={userData.firstName}
      />
      <InputLabel text="Last Name" />
      <input
        name="lastName"
        onChange={handleUserDataChange}
        type="text"
        placeholder={"Last Name"}
        value={userData.lastName}
      />
      <InputLabel text="Room Number" />
      <input
        name="roomNumber"
        onChange={handleUserDataChange}
        type="text"
        placeholder={"Room Number"}
        value={userData.roomNumber}
      />
      <div>
        <Button
          onClick={() => props.onNavigation("go-to-pre-booking-confirmation")}
          type="submit"
          name="submit-button"
          value="go-to-pre-booking-confirmation"
          textInside="Next"
        />
      </div>
      <div>
        <Button
          onClick={() => props.onNavigation("return-to-size-selection")}
          type="submit"
          name="return"
          value="return-to-size-selection"
          textInside="Return"
          customClasses="button-return"
        />
      </div>
    </div>
  );
}

export default InputStudentData;
