import { BikeSize, BikeStatus } from "@/types/BikeType";
import AvailabilityLabel from "../molecules/AvailabilityLabel";

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
  //TODO get the number of bikes for each BikeStatus
  const bikeCountFreeStandardSize = 8;
  const bikeCountFreeSmallSize = 3;
  const bikeCountBooked = 5;
  const bikeCountInUse = 8;
  const bikeCountDisabled = 1;

  const { ShowFreeBikes, ShowBookedBikes, ShowInUseBikes, ShowDisabledBikes } =
    props.availabilitySelection;

  return (
    <>
      <div className="flex flex-col items-center container-webapp-availability">
        <div>
          {ShowFreeBikes && (
            <AvailabilityLabel
              selectedStatus={BikeStatus.FREE}
              bikeSize={BikeSize.STANDARD}
              bikeCount={bikeCountFreeStandardSize}
            />
          )}
          {ShowFreeBikes && (
            <AvailabilityLabel
              selectedStatus={BikeStatus.FREE}
              bikeSize={BikeSize.SMALL}
              bikeCount={bikeCountFreeSmallSize}
            />
          )}
          {ShowBookedBikes && (
            <AvailabilityLabel
              selectedStatus={BikeStatus.BOOKED}
              bikeCount={bikeCountBooked}
            />
          )}
          {ShowInUseBikes && (
            <AvailabilityLabel
              selectedStatus={BikeStatus.INUSE}
              bikeCount={bikeCountInUse}
            />
          )}
          {ShowDisabledBikes && (
            <AvailabilityLabel
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
