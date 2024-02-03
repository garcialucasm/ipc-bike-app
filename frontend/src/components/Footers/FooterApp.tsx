"use client"

import { useSingleBookingContext } from "@/context/singleBooking"

function FooterApp() {
  const { bookingData } = useSingleBookingContext()
  return (
    <>
      <footer className="mt-auto">
        <div className="text-center text-xs">Copyright</div>

        {/* temp status test */}
        <div className="fixed bottom-0 left-0 z-50 bg-gray-800 p-4 text-white">
          <div className="text-center text-xs">Booking Context:</div>
          <div className="text-xs">
            Current Section: {bookingData.currentSection}
          </div>
          <div className="text-xs">
            Bike Size: {bookingData.bookingBikeSize}
          </div>
          <div className="text-xs">Status: {bookingData.bookingStatus}</div>
          <div className="text-xs">
            First name: {bookingData.bookingUserData.firstName}
          </div>
          <div className="text-xs">
            Last name: {bookingData.bookingUserData.lastName}
          </div>
          <div className="text-xs">
            Room number: {bookingData.bookingUserData.roomNumber}
          </div>
        </div>
      </footer>
    </>
  )
}

export default FooterApp
