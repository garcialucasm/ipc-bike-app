import React from "react";
import Button from "../components/Button";
import InputLabel from "@/components/InputLabel";
import { UserData } from "@/types/UserType";

function InputStudentData(props: {
  onNavigation: (buttonValue: string) => void;
  sendUserDataState: UserData;
  sendSetUserDataState: (
    arg0: (prevValues: UserData) => {
      firstName: string;
      lastName: string;
      roomNumber: string;
    }
  ) => void;
}) {
  // Get user's data entry (first name, last name, room number) when input is changed
  function handleUserDataChange(event: {
    target: { value: any; name: string };
  }) {
    const { value, name } = event.target;
    props.sendSetUserDataState((prevValues: UserData) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(event.target);
  }
  return (
    <div>
      <InputLabel text="First Name" />
      <input
        name="firstName"
        onChange={handleUserDataChange}
        type="text"
        placeholder={"First Name"}
        value={props.sendUserDataState.firstName}
      />
      <InputLabel text="Last Name" />
      <input
        name="lastName"
        onChange={handleUserDataChange}
        type="text"
        placeholder={"Last Name"}
        value={props.sendUserDataState.lastName}
      />
      <InputLabel text="Room Number" />
      <input
        name="roomNumber"
        onChange={handleUserDataChange}
        type="text"
        placeholder={"Room Number"}
        value={props.sendUserDataState.roomNumber}
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
