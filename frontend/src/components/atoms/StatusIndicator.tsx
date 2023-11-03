import { BikeStatus } from "@/types/BikeType";
import { BookingStatus } from "@/types/BookingType";
import { UserStatus } from "@/types/UserType";
import React from "react";

enum StatusColorClass {
  GREEN = "bg-green-500",
  YELLOW = "bg-yellow-500",
  RED = "bg-red-500",
  GRAY = "bg-gray-300",
  WHITE = "bg-white-500",
}
enum AnimationStatusClass {
  NONE = "",
  FREE = "scale-125 opacity-20",
  INUSE = "animate-ping opacity-30",
  BOOKED = "animate-ping opacity-30",
}

function getStatusColor(status: BookingStatus | UserStatus | BikeStatus) {
  let statusColorClass: string;
  let animationStatusClass: string;

  if (
    status === BookingStatus.RETURNED ||
    status === BikeStatus.FREE ||
    status === UserStatus.FREE
  ) {
    statusColorClass = StatusColorClass.GREEN;
    animationStatusClass = AnimationStatusClass.FREE;
  } else if (
    status === BookingStatus.BOOKED ||
    status === BikeStatus.BOOKED ||
    status === UserStatus.BOOKED
  ) {
    statusColorClass = StatusColorClass.YELLOW;
    animationStatusClass = AnimationStatusClass.BOOKED;
  } else if (
    status === BookingStatus.HANDEDOVER ||
    status === BikeStatus.INUSE ||
    status === UserStatus.INUSE
  ) {
    statusColorClass = StatusColorClass.RED;
    animationStatusClass = AnimationStatusClass.INUSE;
  } else if (
    status === BookingStatus.CANCELED ||
    status === BikeStatus.DISABLED
  ) {
    statusColorClass = StatusColorClass.GRAY;
    animationStatusClass = AnimationStatusClass.NONE;
  } else {
    statusColorClass = StatusColorClass.GRAY;
    animationStatusClass = AnimationStatusClass.NONE;
  }

  return {
    statusColorClass,
    animationStatusClass,
  };
}

function StatusIndicator(props: {
  status: BookingStatus | UserStatus | BikeStatus;
}) {
  const statusColor = getStatusColor(props.status);
  const { statusColorClass, animationStatusClass } = statusColor;
  return (
    <>
      <span className="relative flex h-2.5 w-2.5 m-2 ">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-50  ${statusColorClass} ${animationStatusClass}`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusColorClass}`}
        ></span>
      </span>
    </>
  );
}

export default StatusIndicator;
