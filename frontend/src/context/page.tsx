import { AuthProvider } from "./auth"
import { BikeAvailabilityProvider } from "./bikeAvailability"
import { SingleBookingProvider } from "./singleBooking"

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <BikeAvailabilityProvider>
        <SingleBookingProvider>{children}</SingleBookingProvider>
      </BikeAvailabilityProvider>
    </AuthProvider>
  )
}
