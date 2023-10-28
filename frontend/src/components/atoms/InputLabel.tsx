import React from "react";

// Define the type for the 'InputLabelProps' component props
type InputLabelProps = {
  text: string;
};

function InputLabel({ text }: InputLabelProps) {
  return (
    <div>
      <h3>{text}</h3>
    </div>
  );
}

export default InputLabel;
