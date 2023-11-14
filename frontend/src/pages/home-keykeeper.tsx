import Head from "@/components/atoms/Head";
import Link from "next/link";
import Login from "./login";
import HeaderWebApp from "@/components/organisms/HeaderWebApp";
import AvailabilityContainer, {
  AvailabilityConfig,
} from "@/components/organisms/AvailabilityContainer";
import { MenuNavigation } from "@/types/NavigationSections";
import BookingsOverview from "@/components/organisms/BookingsOverview";

let isLoggedIn: boolean = true;

const availabilityShowSelection = AvailabilityConfig.HomeKeyKeeper;

export default function HomeKeyKeeper() {
  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col items-center text-center min-h-screen">
          <div className="container-webapp flex flex-col items-center">
            <HeaderWebApp
              headingTitle={"Welcome, Lorem Ipsum"}
              headingSubTitle="Lorem ipsum is placeholder text commonly used"
              currentPage={MenuNavigation.homePage}
            />
            <div className="w-11/12 flex flex-col">
              <div className="flex flex-col items-center">
                <Head title="IPC Alumni Bike" />
                <AvailabilityContainer
                  availabilitySelection={availabilityShowSelection}
                />
                <BookingsOverview />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
