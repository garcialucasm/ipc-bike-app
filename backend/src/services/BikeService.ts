import { BikesRequested } from "./../models/BikeModel";
import {
  bikeEmptyForTest,
  bikeSmall,
  bikeStandard,
} from "../models/dataTesting";

export class BikeService {
  static async bikeAvailability() {
    try {
      const smallBikesAvailable = bikeSmall; //correct me adding some code in mysql to query in bike database for size==="small" && status==="available"
      const standardBikesAvailable = bikeStandard; //correct me adding some code in mysql to query in bike database for size==="standard" && status==="available"
      return {
        smallBikesAvailable,
        standardBikesAvailable,
      };
    } catch (error) {
      //   console.error(error.message);
      return {
        smallBikesAvailable: 0,
        standardBikesAvailable: 0,
      };
    }
  }

  static async bikeChooser(
    numberSmallBikesRequested: number,
    numberStandardBikesRequested: number
  ) {
    try {
      const smallBikesRequested: BikesRequested[] = [
        { bikesRequested: [bikeSmall[2]] },
      ]; //some code in mysql to query in bike database for size==="small" && status==="available" && getSmallBikesOrderedByUsage(numberSmallBikesRequested)
      const standardBikesRequested: BikesRequested[] = [{ bikesRequested: [] }]; //some code in mysql to query in bike database for size==="small" && status==="available" && getSmallBikesOrderedByUsage(numberStandardBikesRequested)
      let bikesRequested: BikesRequested[] = [];
      if (Object.keys(smallBikesRequested).length > 1) {
        bikesRequested.push(...smallBikesRequested);
      } else if (Object.keys(standardBikesRequested).length > 1) {
        bikesRequested.push(...standardBikesRequested);
      }
      return bikesRequested;
    } catch (error) {
      //   console.error(error.message);
      return {
        smallBikesRequested: [],
        standardBikesRequested: [],
      };
    }
  }
}
