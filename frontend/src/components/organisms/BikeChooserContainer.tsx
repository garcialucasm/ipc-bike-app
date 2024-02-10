import React from "react";
import { BikeAvailability, BikeSize, BikeStatus } from "@/types/BikeType";
import Image from "next/image";
import StatusIndicator from "../atoms/StatusIndicator";

function BikeChooserContainer(props: { bikeChooserInfo: BikeAvailability }) {
  const { bikeType,  bikeFreeCount } = props.bikeChooserInfo;
  let bikeSelectedImage: string;
  let bikeSelectedFreeCount: number;
  let bikeSelectedRecomendation: string;
  let bikeSelectedStatusIndicator: BikeStatus;

  switch (bikeType) {
    case BikeSize.STANDARD:
      bikeSelectedImage = "/bike-type-standard.jpg";
      bikeSelectedFreeCount = bikeFreeCount.standardType;
      bikeSelectedRecomendation =
        "Recommended for people 5'4\" | 163 cm or taller. TODO Standard";
      break;
    case BikeSize.CLASSIC:
      bikeSelectedImage = "/bike-type-classic.jpg";
      bikeSelectedFreeCount = bikeFreeCount.classicType;
      bikeSelectedRecomendation =
        "Recommended for people 5'4\" | 163 cm or taller. TODO Classic";
      break;
    case BikeSize.SMALL:
      bikeSelectedImage = "/bike-type-folding.jpg";
      bikeSelectedFreeCount = bikeFreeCount.smallType;
      bikeSelectedRecomendation =
        "Recommended for people 5'4\" | 163 cm or taller. TODO Small";
      break;
    default:
      // Log an error or handle the unknown section
      console.error(`Unknown bike type: ${bikeType}`);
      // Return a default step or handle as appropriate
      return;
  }

  if (bikeSelectedFreeCount > 0) {
    bikeSelectedStatusIndicator = BikeStatus.FREE;
  } else {
    bikeSelectedStatusIndicator = BikeStatus.DISABLED;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center text-xs text-slate-400 px-3 py-2">
        <StatusIndicator currentStatus={bikeSelectedStatusIndicator} isStatic={true} />
        <span className="font-medium px-1">{bikeSelectedFreeCount}</span>{" "}
        available
      </div>
      <Image
        src={bikeSelectedImage}
        className="w-auto max-h-36 py-2 my-2"
        width={300}
        height={399}
        alt=""
      />
      <div className="w-full pb-4 text-xs text-slate-500">
        {bikeSelectedRecomendation}
      </div>
    </div>
  );
}

export default BikeChooserContainer;
