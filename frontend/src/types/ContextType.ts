import { AccountProps } from "./AccountType";
import { BikeAvailabilityCard, BikeSize } from "./BikeType";
import { SingleBookingProps, SingleBookingSections } from "./BookingType";
import { UserData } from "./UserType";

// TODO: Just for test
export type AuthContextProps = {
    accountData: AccountProps | null;
    useLogin: (accountData: AccountProps) => void;
    useLogout: () => void;
    settingIsAuthenticated: (isAuth: boolean | null) => void;
};


export type SingleBookingContextProps = {
    bookingData: SingleBookingProps;
    settingCurrentSection: (currentSection: SingleBookingSections) => void;
    settingBikeSize: (bikeSize: BikeSize) => void;
    settingUserData: (userData: UserData) => void;
    settingServerResult: (serverResult: number | null) => void;
}

export type BikeAvailabilityContextProps = {
    bikeAvailabilityData: BikeAvailabilityCard;
    updatingBikeAvailability: () => void
}