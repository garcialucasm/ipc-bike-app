
export default async function cleanupDb(client: any) {
    let cleanupUser = 'DELETE FROM "user"'
    let cleanupBooking = 'DELETE FROM "booking"'
    let cleanupBookingBike = 'DELETE FROM "booking_bike"'
    let cleanupBike = 'DELETE FROM "bike"'

    await client.query(cleanupBookingBike)
    await client.query(cleanupBooking)
    await client.query(cleanupUser)
    await client.query(cleanupBike)
}
