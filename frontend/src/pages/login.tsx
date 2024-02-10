import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button";
import { MenuNavigation } from "@/types/NavigationSections";
import Image from "next/image";
import { login } from "@/services/bookingApi";
import { setCookie } from "@/utils/cookieUtils";
import { validateLogin } from "@/utils/validators";

export interface ErrorMessageLogin {
  email: string;
  password: string;
}

const errorMessage: ErrorMessageLogin = {
  email: "",
  password: "",
};

function Login() {
  const router = useRouter();
  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState(errorMessage);

  const handleBlur = () => {
    // TODO: turn on the login validation by removing the comment below
    // setErrorMessages(validateLogin(formLoginData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formLoginData.email !== "" &&
      formLoginData.password !== "" &&
      errorMessages.email === "" &&
      errorMessages.password === ""
    ) {
      try {
        const response = await login(
          formLoginData.email,
          formLoginData.password
        );

        if (response.data) {
          await setCookie("ipcBikeApp_authToken", response.data.token);
          window.location.href = "/home-app";
        }
      } catch (error) {
        console.error("Authentication error: ", error);
        // TODO: Handle incorrect credentials
        // Handle authentication error
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormLoginData({
      ...formLoginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = () => {
    setErrorMessages({
      email: "",
      password: "",
    });
  };

  function handleReturnButton() {
    router.replace("/");
  }

  return (
    <>
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex md:flex-col w-1/2 bg-gradient-to-tr from-blue-950 via-blue-800 to-blue-600 i justify-center items-center hidden">
          <Image
            src="/logo-ipc-alumni-bike-white.png"
            className="h-56 w-auto"
            width={300}
            height={399}
            alt=""
          />
          <p className="text-white mt-1">Book, Ride, Explore: All for Free</p>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form onSubmit={handleSubmit} className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello! 👋</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome Back
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={formLoginData.email}
                className="pl-2 outline-none border-none"
                type="text"
                name="email"
                id="email"
                required={true}
                placeholder="User name or e-mail"
              />
            </div>
            <span className="text-xs text-red-600 text-wrap px-1">
              {errorMessages.email}
            </span>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={formLoginData.password}
                className="pl-2 outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required={true}
              />
            </div>
            <span className="text-xs text-red-600 text-wrap px-1">
              {errorMessages.password}
            </span>
            <div className="block w-full mt-4 py-2">
              <Button
                type="submit"
                name={MenuNavigation.homePageApp}
                className="btn-primary"
              >
                <span>Log in</span>
              </Button>
              <Button
                onClick={handleReturnButton}
                name={MenuNavigation.homePageWeb}
                className="btn-return"
              >
                <span>Return</span>
              </Button>
            </div>
            <span className="text-xs ml-2 text ps-1-slate-500 hover:text-blue-500 cursor-pointer">
              Forgot Password ?
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
