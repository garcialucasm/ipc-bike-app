import React from "react";

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit" | "reset" | undefined;
  name: string;
  textInside: string;
}

const Button: React.FC<Props> = ({ onClick, type, name, textInside }) => {
  return (
    // bootstrap classes
    <button
      className="button"
      onClick={onClick}
      type={type}
      name={name}
    >
      {textInside}
    </button>
  );
};

export default Button;
