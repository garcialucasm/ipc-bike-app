import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../atoms/Button";
import {
  MenuNavigation,
  SingleBookingSection,
} from "@/types/NavigationSections";
import { useRouter } from "next/router";
import { logout } from "@/auth/authUtils";

function NavbarWebApp() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  //TODO Close the menu when clicks outside
  function handleClick(buttonClicked: MenuNavigation) {
    switch (buttonClicked) {
      case MenuNavigation.logout:
        logout();
        router.push("/");
        return MenuNavigation.homePageWeb;
      default:
        // Handle the unknown section
        console.error(`Unknown section: ${buttonClicked}`);
        return MenuNavigation.homePageApp;
    }
  }

  return (
    <>
      <nav className="flex w-full items-center justify-between flex-wrap py-2">
        <span className="sr-only">IPC Alumni</span>
        <Link href="/">
          <Image
            src="/logo-ipc-white.png"
            className="h-6 w-auto"
            width={300}
            height={399}
            alt=""
          />
        </Link>
        <div className="block">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-grow items-center ps-3 py-2 rounded text-white hover:text-blue-300"
          >
            <svg
              className={`fill-current h-5 w-5 ${isOpen ? "hidden" : "block"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg
              className={`fill-current h-5 w-5 ${isOpen ? "block" : "hidden"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
        <div
          className={`flex justify-end w-full ${isOpen ? "block" : "hidden"}`}
        >
          <div className="absolute bg-white border border-slate-200 rounded-lg text-sm text-left shadow-lg">
            <Link href="" className="text-slate-500">
              <div className="block py-2 px-8 hover:bg-slate-100 hover:rounded-lg hover:text-blue-700">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path
                      className="fill-current"
                      d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z"
                    />
                  </svg>
                  <div className="px-2">Profile</div>
                </div>
              </div>
            </Link>
            <Link href="" className="text-slate-500">
              <div className="block py-2 px-8 hover:bg-slate-100 hover:rounded-lg hover:text-blue-700">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path
                      className="fill-current"
                      d="M194-160q-81 0-137.5-57T0-355q0-81 57.038-137.5Q114.075-549 195-549q71 0 124.5 45.5T384-388h51l-82-232h-73v-60h188v60h-52l26 71h222l-71-191H488v-60h99q24 0 40.5 11t24.5 33l76 207h38q80.51 0 137.255 56.234Q960-436.532 960-356.746 960-276 903.74-218 847.48-160 766-160q-71.602 0-125.801-48T574-328H384q-11 72-64.5 120T194-160Zm0-60q48 0 83.5-31t47.5-77H206v-60h119q-12-45-48-73t-82-28q-56 0-95.5 39T60-355q0 56.25 39 95.625T194-220Zm305-168h76q4-23 15.5-51t31.5-50H463l36 101Zm267 168q56 0 95-39.375T900-355q0-56-39-95t-95-39h-16l39 113-56 19-43-112q-29 17-43.5 48T632-355q0 56.25 39 95.625T766-220ZM193-355Zm573 0Z"
                    />
                  </svg>
                  <div className="px-2">Inventory</div>
                </div>
              </div>
            </Link>
            <Link href="" className="text-slate-500">
              <div className="block py-2 px-8 hover:bg-slate-100 hover:rounded-lg hover:text-blue-700">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path
                      className="fill-current"
                      d="M120-120v-76l60-60v136h-60Zm165 0v-236l60-60v296h-60Zm165 0v-296l60 61v235h-60Zm165 0v-235l60-60v295h-60Zm165 0v-396l60-60v456h-60ZM120-356v-85l280-278 160 160 280-281v85L560-474 400-634 120-356Z"
                    />
                  </svg>
                  <div className="px-2">Statistics</div>
                </div>
              </div>
            </Link>
            <Link href="" className="text-slate-500">
              <div className="block py-2 px-8 hover:bg-slate-200 hover:rounded-lg hover:text-blue-700">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path
                      className="fill-current"
                      d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm48-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z"
                    />
                  </svg>
                  <div className="px-2">Settings</div>
                </div>
              </div>
            </Link>
            <Button
              onClick={() => handleClick(MenuNavigation.logout)}
              name={MenuNavigation.logout}
              className="text-slate-500 w-full text-left"
            >
              <div className="block py-2 px-8 bg-slate-100 rounded-lg border-slate-200 border-t hover:bg-slate-200 hover:rounded-lg hover:text-blue-700">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path
                      className="fill-current"
                      d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
                    />
                  </svg>
                  <div className="px-2">Log out</div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavbarWebApp;
