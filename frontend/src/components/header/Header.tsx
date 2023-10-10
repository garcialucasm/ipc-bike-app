import Image from "next/image";
import Navbar from "./Navbar";

function Header() {
  return (
    <div>
       {/* bootstrap link */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      ></link>
      <Navbar />
      <div className="flex justify-center">
        <Image
          src="/ipc-alumni-logo.png"
          width={587 / 2}
          height={162 / 2}
          alt="IPC Alumni Logo"
        />
      </div>
    </div>
  );
}
export default Header;
