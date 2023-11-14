import React from "react";
import Button from "../atoms/Button";
import InputLabel from "@/components/atoms/InputLabel";
import { UserData } from "@/types/UserType";
import { SingleBookingSection } from "@/types/NavigationSections";

function InputStudentData(props: {
  onNavigation: (navigationButton: {
    buttonName: SingleBookingSection;
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

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget;
    const buttonClicked: SingleBookingSection = name as SingleBookingSection;
    props.onNavigation({ buttonName: buttonClicked });
  }

  return (
    <>
      <div className="w-11/12 flex flex-col text-start">
        <InputLabel text="First Name" />
        <input
          name="firstName"
          onChange={handleUserDataChange}
          type="text"
          placeholder={"Enter First Name"}
          value={props.sendUserDataState.firstName}
          className="input-text"
        />
        <InputLabel text="Last Name" />
        <input
          name="lastName"
          onChange={handleUserDataChange}
          type="text"
          placeholder={"Enter Last Name"}
          value={props.sendUserDataState.lastName}
          className="input-text"
        />
        <InputLabel text="Room Number" />
        <input
          name="roomNumber"
          onChange={handleUserDataChange}
          type="text"
          placeholder={"Enter Room Number"}
          value={props.sendUserDataState.roomNumber}
          className="input-text"
        />
        <div className="mt-5">
          <Button
            onClick={handleClick}
            name={SingleBookingSection.preBookingConfirmation}
            className="btn-primary"
          >
            Next
          </Button>
        </div>
        <div>
          <Button
            onClick={handleClick}
            name={SingleBookingSection.selectBikeSize}
            className="btn-return"
          >
            Return
          </Button>
        </div>
      </div>
    </>
  );
}

export default InputStudentData;
