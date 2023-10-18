import { Bike } from "../models/bike.model";


export default interface IBikeChooser {
    chooseBike(bike: Bike[]) : Promise<Bike>
}