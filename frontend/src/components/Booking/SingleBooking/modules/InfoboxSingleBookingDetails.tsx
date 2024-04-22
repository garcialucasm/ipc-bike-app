import { useSingleBookingContext } from "@/context/singleBooking"
import UserDetails from "./UserDetails"
import BikeDetails from "./BikeDetails"

function InfoboxSingleBookingDetails() {
  const { bookingData } = useSingleBookingContext()
  const { firstName, lastName, roomNumber } = bookingData.userData
  const bikeSize = bookingData.bikeSize
  const bikeType = bookingData.bikeType
  const bikeNumbering = bookingData.bikeNumbering
  const fullName = firstName + " " + lastName

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <UserDetails fullName={fullName} roomNumber={roomNumber} />
      <BikeDetails
        bikeNumbering={bikeNumbering}
        bikeType={bikeType}
        bikeSize={bikeSize}
      />
    </div>
  )
}

export default InfoboxSingleBookingDetails
