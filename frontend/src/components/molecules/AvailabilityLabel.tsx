import { BikeSize, BikeStatus } from "@/types/BikeType";
import StatusIndicator from "../atoms/StatusIndicator";

function AvailabilityLabel(props: {
  selectedStatus: BikeStatus;
  bikeSize?: BikeSize;
  bikeCount: number;
}) {
  const selectedStatus = props.selectedStatus;
  const bikeSize = props.bikeSize;
  const bikeCount = props.bikeCount;
  let textLabel: string;
  if (selectedStatus === BikeStatus.FREE && bikeSize === BikeSize.STANDARD) {
    textLabel = "standard available";
  } else if (
    selectedStatus === BikeStatus.FREE &&
    bikeSize === BikeSize.SMALL
  ) {
    textLabel = "small available";
  } else if (selectedStatus === BikeStatus.BOOKED) {
    textLabel = "to confirm";
  } else if (selectedStatus === BikeStatus.INUSE) {
    textLabel = "in use";
  } else if (selectedStatus === BikeStatus.DISABLED) {
    textLabel = "disabled";
  } else {
    textLabel = "";
  }
  return (
    <>
      <div className="flex flex-col self-center">
        <div className="flex items-center font-semibold">
          <StatusIndicator status={selectedStatus} />
          <div className="w-10 text-xl">{bikeCount}</div>
          <div className="w-auto">{textLabel}</div>
        </div>
      </div>
    </>
  );
}

export default AvailabilityLabel;
