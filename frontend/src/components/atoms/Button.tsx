import React from "react";

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit" | "reset" | undefined;
  name: string;
  value?: any;
  textInside: string;
  customClasses?: string;
}

const Button: React.FC<Props> = ({
  onClick,
  type,
  name,
  value,
  textInside,
  customClasses,
}) => {
  return (
    <button
      className={`button ${customClasses}`}
      onClick={onClick}
      type={type}
      name={name}
      value={value}
    >
      {textInside}
    </button>
  );
};

export default Button;
