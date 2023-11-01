import React from "react";
import Button from "../atoms/Button";
import InputLabel from "@/components/atoms/InputLabel";
import { UserData } from "@/types/UserType";
import { SingleBookingSection } from "@/types/NavigationSections";

function InputStudentData(props: {
  onNavigation: (navigationButton: {
    buttonValue: SingleBookingSection;
  }) => void;
  sendUserDataState: UserData;
  sendSetUserDataState: (
    userDataState: (prevValues: UserData) => {
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

  function handleClick(event: { target: any } | undefined) {
    const { value } = event?.target;
    const buttonClicked: SingleBookingSection = parseInt(value, 10);
    console.log(typeof buttonClicked);
    console.log(buttonClicked);
    props.onNavigation({ buttonValue: buttonClicked });
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
          onClick={handleClick}
          name="next"
          value={SingleBookingSection.PreBookingConfirmation}
        >
          Next
        </Button>
      </div>
      <div>
        <Button
          onClick={handleClick}
          name="return"
          value={SingleBookingSection.SelectBikeSize}
          className="button-return"
        >
          Return
        </Button>
      </div>
    </div>
  );
}

export default InputStudentData;
