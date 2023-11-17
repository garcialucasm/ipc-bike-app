import React from "react";
import { BikeSize, BikeStatus } from "@/types/BikeType";
import StatusIndicator from "../atoms/StatusIndicator";
import {
  IconSvgBikeStandard,
  IconSvgBikeBooked,
  IconSvgBikeInUse,
  IconSvgBikeDisabled,
} from "../atoms/IconsSvg";

function AvailabilityCard(props: {
  selectedStatus: BikeStatus;
  bikeSize?: BikeSize;
  bikeCount: number;
}) {
  const selectedStatus = props.selectedStatus;
  const bikeSize = props.bikeSize;
  const bikeCount = props.bikeCount;
  let cardTextColorByStatus = "bg-slate-200 text-slate-600";
  let cardColorByStatus = "border border-s-2";
  let textLabel: string;
  if (selectedStatus === BikeStatus.FREE) {
    textLabel = "available";
  } else if (selectedStatus === BikeStatus.BOOKED) {
    textLabel = "to confirm";
  } else if (selectedStatus === BikeStatus.INUSE) {
    textLabel = "in use";
  } else if (selectedStatus === BikeStatus.DISABLED) {
    textLabel = "disabled";
  } else {
    textLabel = "";
  }

  switch (selectedStatus) {
    case BikeStatus.FREE:
      cardTextColorByStatus = "text-emerald-600 border-slate-200";
      cardColorByStatus = "bg-emerald-600";
      break;
    case BikeStatus.BOOKED:
      cardTextColorByStatus = "text-amber-600 border-slate-200";
      cardColorByStatus = "bg-amber-600";
      break;
    case BikeStatus.INUSE:
      cardTextColorByStatus = "text-rose-600 border-slate-200";
      cardColorByStatus = "bg-rose-600";
      break;
    case BikeStatus.DISABLED:
      cardTextColorByStatus = "text-slate-600 border-slate-200";
      cardColorByStatus = "bg-slate-600";
      break;

    default:
      console.error(`Unknown bike status: ${selectedStatus}`);
      break;
  }

  return (
    <>
      <div
        className={`overflow-hidden w-full flex flex-col rounded-lg font-semibold bg-gradient-to-tr from-slate-100 via-slate-100 to-slate-50 shadow-md m-1 pb-1 ${cardTextColorByStatus}`}
      >
        <span className={`h-1.5 ${cardColorByStatus}`}></span>

        <div className="w-full flex justify-center items-center py-2">
          <div className="">
            <span className="text-center text-3xl drop-shadow-md">
              {bikeCount}
            </span>
            {/* {selectedStatus === BikeStatus.FREE && (
              <IconSvgBikeStandard
                height="90"
                width="90"
                fillColor="fill-emerald-600"
              />
            )}
            {selectedStatus === BikeStatus.BOOKED && (
              <IconSvgBikeBooked
                height="80"
                width="80"
                fillColor1="fill-amber-600"
                fillColor2="fill-amber-600"
                fillColor3="fill-slate-400"
                fillColor4="fill-slate-400"
              />
            )}
            {selectedStatus === BikeStatus.INUSE && (
              <IconSvgBikeInUse
                height="80"
                width="80"
                fillColor1="fill-rose-600"
                fillColor2="fill-slate-400"
              />
            )}
            {selectedStatus === BikeStatus.DISABLED && (
              <IconSvgBikeDisabled
                height="80"
                width="80"
                fillColor1="fill-slate-500"
                fillColor2="fill-slate-600"
              />
            )} */}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <span>
            <StatusIndicator status={selectedStatus} isStatic={true} />
          </span>

          <span className="text-slate-400 text-xs">{textLabel}</span>
        </div>
        {/* <div
          className={`{flex w-full pb-1 items-center justify-center rounded-b-xl text-slate-100 ${cardColorByStatus}`}
        ></div> */}
      </div>
    </>
  );
}

export default AvailabilityCard;
