import { AccountProps } from "./AccountType";
import { BikeSize } from "./BikeType";
import { SingleBookingProps } from "./BookingType";
import { UserData } from "./UserType";

// TODO: Just for test
export type AuthContextProps = {
    account: AccountProps | null;
    login: (account: AccountProps) => void;
    logout: () => void;
};


export type SingleBookingContextProps = {
    bookingData: SingleBookingProps;
    settingBikeSize: (bikeSize: BikeSize) => void;
    settingUserData: (userData: UserData) => void;
    settingServerResult: (serverResult: any) => void;
}