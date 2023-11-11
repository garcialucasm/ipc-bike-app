import { Booking } from "../models/booking.model"
import IBookingRepository from "./booking.repository"
import { bookingFromRow } from "./mappings"
import { createWhereClausule } from "./sql.util"

export default class BookingRepository implements IBookingRepository {

    client: Client

    insertStmt: string = `insert into booking(user_id, status, type, created_at) 
            values ($1, $2, $3, $4) returning *`

    insertBookingBikesStmt: string = `insert into booking_bike(booking_id, bike_id)
            values ($1, $2)`

    updateStmt: string = `update booking set status=$1, returned_condition=$2, 
            notes=$3, confirmed_at=$4, returned_at=$5 where id=$6 returning *`

    findByIdStmt: string = `select * from booking bk inner join user u on bk.user_id = u.id 
                inner join booking_bike bb on bk.id = bb.booking_id 
                inner join bike b on b.id = bb.bike_id
                where bk.id = $1`

    findAllByUserStmt: string = `select * from booking bk inner join user u on bk.user_id = u.id 
                inner join booking_bike bb on bk.id = bb.booking_id 
                inner join bike b on b.id = bb.bike_id
                where u.id = $1`

    findAllStmt: string = `select * from booking bk inner join user u on bk.user_id = u.id 
                inner join booking_bike bb on bk.id = bb.booking_id 
                inner join bike b on b.id = bb.bike_id `

    constructor(client: Client) {
        this.client = client
    }

    async save(booking: Booking): Promise<Booking> {
        let result = await this.client.query(this.insertStmt,
            [booking.User.ID, booking.Status, booking.Type, booking.CreatedAt])

        if (!result.rowCount)
            throw new Error("Couldn't save booking")

        let [id] = result.rows

        booking.ID = id

        for (let bike in booking.Bike) {
            this.client.query(this.insertBookingBikesStmt, [booking.ID, bike.ID])
        }

        return booking
    }

    async update(booking: Booking): Promise<Booking> {
        if (booking.ID === undefined) 
            throw new Error("Can't update unsaved booking")
        
        let result = await this.client.query(this.updateStmt,
            [booking.Status,
            booking.ReturnedCondition,
            booking.Notes,
            booking.ConfirmedAt,
            booking.ReturnedAt,
            booking.ID])

        if (!result.rowCount)
            throw new Error("Couldn't update booking") 

        let [row] = result.rows

        return bookingFromRow(row)
    }

    async findById(bookingId: number): Promise<Booking> {
        let result = await this.client.query(this.findByIdStmt, [bookingId])

        if (!result.rowCount)
            throw new Error(`Couldn't find booking with id ${bookingId}`)
        
        let [row] = result.rows

        return bookingFromRow(row)
    }

    async findByUser(userId: number): Promise<Booking[]> {
        let result = await this.client.query(this.findAllByUserStmt, [userId])

        if (!result.rowCount) 
            throw new Error(`Couldn't find bookings for userId ${userId}`)

        let bookings = []

        for (let row in result.rows)
            bookings.push(bookingFromRow(row))

        return bookings
    }

    async findAll(searchCriteria: { userId?: number, bikeId?: number, status?: BookingStatus }): Promise<Booking[]> {
        let stmt = this.findAllStmt 

        stmt += createWhereClausule(searchCriteria)

        let result = this.client.query(stmt, Object.values(searchCriteria))
        
        let bookings = []

        for (let row in result.rows) {
            bookings.push(bookingFromRow(row))
        }

        return bookings
    }
}
