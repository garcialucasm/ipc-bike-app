import { BikeDTO, BikeSize } from '@/types/BikeType';
import { BikeStatus } from '@/types/BikeType';
import { ApiHeader, apiUrls } from "./api";
import { ServerResultAllBikesAvailable, ServerResultBikeAvailability as ServerResultBikeCounter } from '@/types/ServerResult';

/* --------------------------- Bike Status Counter -------------------------- */
export async function bikeStatusCounterFetchApi() {
    let bikeCountFree: number;
    let bikeCountBooked: number;
    let bikeCountInUse: number;
    let bikeCountDisabled: number;

    try {
        const response = await ApiHeader.get(apiUrls.bikeStatusCounterUrl);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        const data = response.data
        bikeCountFree = data.status.free
        bikeCountBooked = data.status.booked
        bikeCountInUse = data.status.inuse
        bikeCountDisabled = data.status.disabled

        return {
            data: {
                [BikeStatus.FREE]: bikeCountFree,
                [BikeStatus.BOOKED]: bikeCountBooked,
                [BikeStatus.INUSE]: bikeCountInUse,
                [BikeStatus.DISABLED]: bikeCountDisabled
            }, error: null
        };
    } catch (error: any) {
        console.error('Error getting status counter:', error.message);
        return {
            data: null, error: `${error.message}`
        }
    }
}

/* --------------------------- All Bikes Available -------------------------- */
export async function allBikesAvailableFetchApi() {

    try {
        const response = await ApiHeader.get(apiUrls.allBikesUrl);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        const data = response.data

        return {
            data: data, error: null
        };
    } catch (error: any) {
        console.error('Error getting status counter:', error.message);
        return {
            data: null, error: `${error.message}`
        }
    }
}



export async function getBikeStatusCount() {
    const serverResult: ServerResultBikeCounter = await bikeStatusCounterFetchApi()
    return serverResult
}

export async function getAllBikesAvailable() {
    const serverResult: ServerResultAllBikesAvailable = await allBikesAvailableFetchApi()
    return serverResult
}