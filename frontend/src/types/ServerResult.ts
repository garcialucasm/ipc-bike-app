import { BikeStatus } from "./BikeType"

export type ServerResultBikeAvailability =
    | {
        data: {
            [BikeStatus.FREE]: number
            [BikeStatus.BOOKED]: number
            [BikeStatus.INUSE]: number
            [BikeStatus.DISABLED]: number
        }
        error: null
    }
    | {
        data: null
        error: string
    }