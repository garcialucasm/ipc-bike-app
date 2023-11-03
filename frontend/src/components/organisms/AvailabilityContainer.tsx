import { BikeStatus } from "@/types/BikeType";
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
  const bikeCountFree = 11;
  const bikeCountBooked = 5;
  const bikeCountInUse = 8;
  const bikeCountDisabled = 1;

  const { ShowFreeBikes, ShowBookedBikes, ShowInUseBikes, ShowDisabledBikes } =
    props.availabilitySelection;

  const statusList = [
    {
      show: ShowFreeBikes,
      bikeStatus: BikeStatus.FREE,
    },
    { show: ShowBookedBikes, bikeStatus: BikeStatus.BOOKED },
    { show: ShowInUseBikes, bikeStatus: BikeStatus.INUSE },
    { show: ShowDisabledBikes, bikeStatus: BikeStatus.DISABLED },
  ];
  return (
    <>
      <div className="infobox-container">
        {ShowFreeBikes && (
          <AvailabilityLabel
            selectedStatus={BikeStatus.FREE}
            bikeCount={bikeCountFree}
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
    </>
  );
}

export default AvailabilityContainer;
