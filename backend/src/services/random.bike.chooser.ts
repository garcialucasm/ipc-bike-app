import { Bike } from "../models/bike.model";
import IBikeChooser from "./bike.chooser";

export default class RandomBikeChooser implements IBikeChooser {
  async chooseBike(bikes: Bike[]): Promise<Bike> {
    
    if (bikes.length == 0)
      throw new Error("No bikes to choose")

    return bikes[Math.floor(Math.random() * bikes.length)]
  }
}