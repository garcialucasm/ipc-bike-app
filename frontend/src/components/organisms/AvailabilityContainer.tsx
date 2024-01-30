import { BikeSize, BikeStatus } from "@/types/BikeType";
import AvailabilityCard from "../molecules/AvailabilityCard";
import { bikeStatusCounterFetchApi } from "@/services/bikeApi";
import { useEffect, useState } from "react";

export const AvailabilityConfig = {
  HomeSingleBooking: {
    ShowFreeBikes: true,
    ShowBookedBikes: false,
    ShowInUseBikes: false,
    ShowDisabledBikes: false,
  },
  HomeGroupBooking: {
    ShowFreeBikes: true,
    ShowBookedBikes: true,
    ShowInUseBikes: false,
    ShowDisabledBikes: false,
  },
  HomeKeyKeeper: {
    ShowFreeBikes: true,
    ShowBookedBikes: true,
    ShowInUseBikes: true,
    ShowDisabledBikes: false,
  },
  ManageBookings: {
    ShowFreeBikes: false,
    ShowBookedBikes: true,
    ShowInUseBikes: true,
    ShowDisabledBikes: false,
  },
  HomeAdmin: {
    ShowFreeBikes: true,
    ShowBookedBikes: true,
    ShowInUseBikes: true,
    ShowDisabledBikes: true,
  },
};

function AvailabilityContainer(props: {
  availabilitySelection: {
    ShowFreeBikes: boolean;
    ShowBookedBikes: boolean;
    ShowInUseBikes: boolean;
    ShowDisabledBikes: boolean;
  };
}) {
  const [bikeCounter, setBikeCounter] = useState({
    free: 0,
    booked: 0,
    inUse: 0,
    disabled: 0,
  });

  const { ShowFreeBikes, ShowBookedBikes, ShowInUseBikes, ShowDisabledBikes } =
    props.availabilitySelection;

  async function getBikeStatusCounter() {
    const response = await bikeStatusCounterFetchApi();

    if (!response.data) {
      console.error("Unable to fetch bike counter data");
      return setBikeCounter({
        free: 0,
        booked: 0,
        inUse: 0,
        disabled: 0,
      });
      // TODO: handle this error state.
      // display a message to the user
    }
    const data = response.data;
    return setBikeCounter({
      free: data.free | 0,
      booked: data.booked | 0,
      inUse: data.inUse | 0,
      disabled: data.disabled | 0,
    });
  }

  useEffect(() => {
    getBikeStatusCounter();
  }, []); // Empty dependency array means this effect runs once after the first render

  return (
    <>
      <div className="overflow-x-auto w-full flex flex-col items-center bg-white">
        <div className="overflow-x-clip flex w-full gap-3">
          {ShowFreeBikes && (
            <AvailabilityCard
              selectedStatus={BikeStatus.FREE}
              bikeCount={bikeCounter.free}
            />
          )}
          {ShowBookedBikes && (
            <AvailabilityCard
              selectedStatus={BikeStatus.BOOKED}
              bikeCount={bikeCounter.booked}
            />
          )}
          {ShowInUseBikes && (
            <AvailabilityCard
              selectedStatus={BikeStatus.INUSE}
              bikeCount={bikeCounter.inUse}
            />
          )}
          {ShowDisabledBikes && (
            <AvailabilityCard
              selectedStatus={BikeStatus.DISABLED}
              bikeCount={bikeCounter.disabled}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AvailabilityContainer;
