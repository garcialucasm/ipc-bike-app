import { AccountProps } from "./AccountType";
import { BikeDTO, BikeSize, BikeStatusCard as BikeStatusCard } from "./BikeType";
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
    settingBikeSize: (bikeSize: string) => void;
    settingBikeNumbering: (bikeNumbering: string) => void;
    settingUserData: (userData: UserData) => void;
    settingServerResult: (serverResult: number | undefined | null) => void;
}

export type BikeAvailabilityContextProps = {
    bikeStatusCount: BikeStatusCard;
    allBikesAvailable: BikeDTO[];
    updatingBikeAvailability: () => void;
    updatingAllBikesAvailable: () => void;
}