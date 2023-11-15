import { BikeSize, BikeStatus } from "@/types/BikeType";
import AvailabilityCard from "../molecules/AvailabilityCard";

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
    ShowDisabledBikes: true,
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
  //TODO get the number of bikes for each BikeStatus
  const bikeCountFree = 8;
  const bikeCountBooked = 5;
  const bikeCountInUse = 8;
  const bikeCountDisabled = 1;

  const { ShowFreeBikes, ShowBookedBikes, ShowInUseBikes, ShowDisabledBikes } =
    props.availabilitySelection;

  return (
    <>
      <div className="w-full flex flex-col items-center bg-white
      ">
        <div className="overflow-x-clip flex w-full gap-3">
          {ShowFreeBikes && (
            <AvailabilityCard
              selectedStatus={BikeStatus.FREE}
              bikeCount={bikeCountFree}
            />
          )}
          {ShowBookedBikes && (
            <AvailabilityCard
              selectedStatus={BikeStatus.BOOKED}
              bikeCount={bikeCountBooked}
            />
          )}
          {ShowInUseBikes && (
            <AvailabilityCard
              selectedStatus={BikeStatus.INUSE}
              bikeCount={bikeCountInUse}
            />
          )}
          {ShowDisabledBikes && (
            <AvailabilityCard
              selectedStatus={BikeStatus.DISABLED}
              bikeCount={bikeCountDisabled}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AvailabilityContainer;
