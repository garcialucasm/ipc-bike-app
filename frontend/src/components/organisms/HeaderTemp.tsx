import Image from "next/image";
import Navbar from "./Navbar";

type HeadingProps = {
  heading: string;
};

function HeaderTemp({ heading }: HeadingProps) {
  return (
    <div className="center-content py-5">
      {/* <Navbar /> */}
      <div className="py-5">
        <Image
          src="/ipc-alumni-logo.png"
          width={587 / 2}
          height={162 / 2}
          alt="IPC Alumni Logo"
        />
      </div>
      <div className="text-2xl font-bold">{heading}</div>
    </div>
  );
}

export default HeaderTemp;
