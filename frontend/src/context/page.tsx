import { AuthProvider } from "./auth"
import { SingleBookingProvider } from "./singleBooking"

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <SingleBookingProvider>{children}</SingleBookingProvider>
    </AuthProvider>
  )
}
