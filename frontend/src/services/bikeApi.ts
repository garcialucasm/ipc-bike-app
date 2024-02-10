import { ApiHeader } from "./api";

const apiUrls = {
    bikeStatusCounterUrl: "/secure/bike/status",
}

// Bike Status Counter
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
                free: bikeCountFree,
                booked: bikeCountBooked,
                inUse: bikeCountInUse,
                disabled: bikeCountDisabled
            }, error: null
        };
    } catch (error: any) {
        console.error('Error getting status counter:', error.message);
        return {
            data: null, error: `${error.message}`
        }
    }
}