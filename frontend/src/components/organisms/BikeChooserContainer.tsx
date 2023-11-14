import React from "react";
import { BikeAvailability, BikeSize } from "@/types/BikeType";
import Image from "next/image";

function BikeChooserContainer(props: { bikeCountFree: BikeAvailability }) {
  const { bikeSize: bikeType, countFree } = props.bikeCountFree;
  let bikeSelectedImage: string;
  let bikeSelectedCountFree: number;
  let bikeSelectedRecomendation: string;

  switch (bikeType) {
    case BikeSize.STANDARD:
      bikeSelectedImage = "/bike-type-standard.jpg";
      bikeSelectedCountFree = countFree.standardType;
      bikeSelectedRecomendation =
        "Recommended for people 5'4\" | 163 cm or taller. TODO Standard";
      break;
    case BikeSize.CLASSIC:
      bikeSelectedImage = "/bike-type-classic.jpg";
      bikeSelectedCountFree = countFree.classicType;
      bikeSelectedRecomendation =
        "Todo Recommended for people 5'4\" | 163 cm or taller. TODO Classic";
      break;
    case BikeSize.SMALL:
      bikeSelectedImage = "/bike-type-folding.jpg";
      bikeSelectedCountFree = countFree.smallType;
      bikeSelectedRecomendation =
        "Todo Recommended for people 5'4\" | 163 cm or taller. TODO Small";
      break;
    default:
      // Log an error or handle the unknown section
      console.error(`Unknown bike type: ${bikeType}`);
      // Return a default step or handle as appropriate
      return;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full text-xs text-gray-400 px-3 py-2">
        <span
          className={`relative inline-flex rounded-full h-2 w-2 bg-green-500`}
        ></span>
        <span className="px-2">{bikeSelectedCountFree} available</span>
      </div>
      <Image
        src={bikeSelectedImage}
        className="w-auto max-h-36"
        width={300}
        height={399}
        alt=""
      />
      <div className="w-full pb-4 text-xs text-gray-500">
        {bikeSelectedRecomendation}
      </div>
    </div>
  );
}

export default BikeChooserContainer;
