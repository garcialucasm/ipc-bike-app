import { AccountProps } from "./AccountType";
import { AllBikesAvailable, BikeStatusCard as BikeStatusCard } from "./BikeType";
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
    settingBikeNumbering: (bikeNumbering: string | null) => void;
    settingUserData: (userData: UserData) => void;
    settingServerResult: (serverResult: number | undefined | null) => void;
}

export type BikeAvailabilityContextProps = {
    bikeStatusCount: BikeStatusCard;
    allBikesAvailable: AllBikesAvailable;
    updatingBikeAvailability: () => void;
    updatingAllBikesAvailable: () => void;
}