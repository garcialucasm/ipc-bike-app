import BookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/BookingsOverview"
import AvailabilityContainer from "@/components/Cards/AvailabilityContainer"
import withAuth from "@/app/auth/withAuth"
import { ServerResultActiveBookings } from "@/types/ServerResult"
import { getTokenFromCookiesSS } from "@/app/auth/authUtilsServerSide"
import { baseURL, apiUrls } from "@/services/api"

// Show all active bookings
export async function bookingFetchApiServer(): Promise<ServerResultActiveBookings> {
  const token = getTokenFromCookiesSS("ipcBikeApp_authToken")?.value
  try {
    const url = baseURL + apiUrls.activeBookingsUrl
    const response = await fetch(url, {
      next: { revalidate: 1 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return { activeBookings: data.bookings, error: null }
  } catch (error: any) {
    console.error("Error getting active bookings:", error.message)
    return { activeBookings: null, error: `${error.message}` }
  }
}

const HomeAdminPage = async () => {
  const componentName = HomeAdminPage.name

  const res = await bookingFetchApiServer()

  const isAuth = withAuth(componentName)
  if (isAuth) {
    return (
      <>
        <AvailabilityContainer />
        <BookingsOverview data={res} />
      </>
    )
  }
}

export default HomeAdminPage
