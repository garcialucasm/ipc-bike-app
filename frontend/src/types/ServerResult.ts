import { BikeDTO, BikeStatus } from "./BikeType"

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

export type ServerResultAllBikesAvailable =
    | {
        data: BikeDTO[]
        error: null
    }
    | {
        data: null
        error: string
    }

export enum ServerResult {
    CONFIRMED = 'CONFIRMED',
    ERROR = 'ERROR'
}