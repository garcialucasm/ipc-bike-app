import { AuthProvider } from "./auth"
import { BikeAvailabilityProvider } from "./bikeAvailability"
import { FramerMotionProvider } from "./framerMotion"
import { SingleBookingProvider } from "./singleBooking"

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <BikeAvailabilityProvider>
        <SingleBookingProvider>
          <FramerMotionProvider>{children}</FramerMotionProvider>
        </SingleBookingProvider>
      </BikeAvailabilityProvider>
    </AuthProvider>
  )
}
