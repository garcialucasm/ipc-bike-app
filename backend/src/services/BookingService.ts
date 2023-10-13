import { User } from "./../models/UserModel";
import { BikeService } from "./BikeService";

export class BookingService {
  //Main booking process for a single request
  static async bookingRequestSingle(bikeSizeSelected: string, user: User) {
    console.log(bikeSizeSelected);
    try {
      let numberSmallBikesRequested = 0;
      let numberStandardBikesRequested = 0;
      //Check bike availability by the quantity of each bike size and return a boolean for isBikeAvailable
      const isBikeAvailable = async () => {
        try {
          const availability = await BikeService.bikeAvailability();
          const smallBikesAvailableQuantity = Object.keys(
            availability.smallBikesAvailable
          ).length;
          const standardBikesAvailableQuantity = Object.keys(
            availability.standardBikesAvailable
          ).length;
          console.log(
            "smallBikesAvailableQuantity : " + smallBikesAvailableQuantity
          );
          console.log(
            "standardBikesAvailableQuantity : " + standardBikesAvailableQuantity
          );
          if (
            (bikeSizeSelected === "small" &&
              smallBikesAvailableQuantity >= 1) ||
            (bikeSizeSelected === "standard" && standardBikesAvailableQuantity)
          ) {
            const isAvailable: boolean = true;
            numberSmallBikesRequested = bikeSizeSelected === "small" ? 1 : 0;
            numberStandardBikesRequested =
              bikeSizeSelected === "standard" ? 1 : 0;
            console.log(
              "numberSmallBikesRequested : " + numberSmallBikesRequested
            );
            console.log(
              "numberStandardBikesRequested : " + numberStandardBikesRequested
            );
            return {
              isAvailable, //correct me
            };
          } else {
            console.log("Request invalid");
            return false;
          }
        } catch (error) {
          //   console.error(error.message);
          return false;
        }
      };
      console.log("isBikeAvailable : " + isBikeAvailable());

      if (await isBikeAvailable()) {
        try {
          //Call bikeChooser to get chosen bikes
          const bikesChosen = await BikeService.bikeChooser(
            numberSmallBikesRequested,
            numberStandardBikesRequested
          );

          //Check if there isn't user overbooking
          const userAuthorized = await BookingService.checkOverbooking(
            user.name
          );
          const isBookingConfirmed = await BookingService.requestBooking(
            true, // correct me isBikeAvailable
            userAuthorized,
            bikesChosen,
            user
          );

          if (isBookingConfirmed) {
            console.log("Booking confirmed");
            console.log("User: " + user.name);
            console.log("Bike number: " + bikesChosen);
            return true;
          } else {
            console.log("Booking error");
            return false;
          }
        } catch (error) {
          //   console.error(error.message);
          return false;
        }
      } else {
        console.log("Request invalid");
        return false;
      }
    } catch (error) {
      //   console.error(error.message);
      return false;
    }
  }

  static async checkOverbooking(User: string) {
    try {
      const userAuthorized = await true; //correct me checkIfUserIsOverbooked(user) some code to check if user has an opened book and then return true or false
      return userAuthorized;
    } catch (error) {
      //  console.error(error.message);
      return false;
    }
  }

  static async requestBooking(
    isBikeAvailable: boolean,
    userAuthorized: boolean,
    bikesChosen: any, //correct me
    user: any //correct me
  ) {
    try {
      if (isBikeAvailable && userAuthorized) {
        const isBookingConfirmed = await BookingService.createBooking(
          isBikeAvailable,
          userAuthorized,
          bikesChosen,
          user
        );
        console.log("Booking requested");
        return isBookingConfirmed;
      } else if (!userAuthorized) {
        console.log("Check if there isn't overbooking");
        return false;
      } else if (!isBikeAvailable) {
        console.log(
          "There are no bikes available now. Please check again later."
        );
        return false;
      } else {
        console.log("Error");
        return false;
      }
    } catch (error) {
      //   console.error(error.message);
      return false;
    }
  }

  static async createBooking(
    isBikeAvailable: boolean,
    userAuthorized: boolean,
    bikesChosen: any[],
    user: any
  ) {
    try {
      console.log(
        "some code in mysql to updateBookingInDatabase(bikesChosen, user)"
      );
      console.log(
        "some code in mysql to updateBikeStatusInDatabase(bikesChosen)"
      );
      console.log("some code in mysql to updateUserInDatabase(user)");
      const dbBookingUpdated = true; //some code in mysql to updateBookingInDatabase(bikesChosen, user)
      const dbBikeUpdated = true; // some code in mysql to updateBikeStatusInDatabase(bikesChosen)
      const dbUserUpdated = true; // some code in mysql to updateUserInDatabase(user)

      const bookingCreated = dbBookingUpdated && dbBikeUpdated && dbUserUpdated;
      return bookingCreated;
    } catch (error) {
      //   console.error(error.message);
      return false;
    }
  }
}
