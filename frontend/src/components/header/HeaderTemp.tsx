import Image from "next/image";

type HeadingProps = {
  heading: string;
};

function HeaderTemp({ heading }: HeadingProps) {
  return (
    <div className="center-content">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/ipc-alumni-logo.png"
          width={587 / 2}
          height={162 / 2}
          alt="IPC Alumni Logo"
        />
      </div>
      <h1>{heading}</h1>
    </div>
  );
}

export default HeaderTemp;
