import { Client } from "pg"
import { Booking, BookingType } from "../models/booking.model"
import IBookingRepository from "./booking.repository"
import { bikeFromRow, bookingFromRow } from "./mappings"
import { createWhereClausule } from "./sql.util"


function toObj(properties: string[], values: any[]) {
    let zipped = properties.map((property, i) => [property, values[i]])
    return Object.fromEntries(zipped)
}

function populateBookingFromRows(rows: any[], offset: number) : Booking {
    let booking: Booking = bookingFromRow(rows[offset])

    switch (booking.Type) {
        case BookingType.SINGLE:
            booking.Bike.push(bikeFromRow(rows[offset]))
        break;

        case BookingType.GROUP:
            for (let i = offset; i < offset + booking.BikeCount && i < rows.length; ++i) {
            booking.Bike.push(bikeFromRow(rows[i]))
        }
    }
    
    return booking
}
function toBookingArray(rows: any[]) : Booking[] {
    let bookings = []
    let i = 0

    while (i < rows.length) {
        let booking = populateBookingFromRows(rows, i)
        i += booking.BikeCount
        bookings.push(booking)
    }

    return bookings
}

export default class BookingRepository implements IBookingRepository {

    client: Client

    insertStmt: string = 'INSERT INTO "booking" ("user_id", "status", "type", "bike_count", "created_at")' +  
            ' VALUES ($1, $2, $3, $4, $5) RETURNING id' 

    insertBookingBikesStmt: string = `insert into booking_bike(booking_id, bike_id)
            values ($1, $2)`

    updateStmt: string = `update booking set status=$1, returned_condition=$2, 
            notes=$3, confirmed_at=$4, returned_at=$5 where id=$6 returning *`

    findSelectFields: string[] = [
        'bk.id', 'bk.status', 'bk.bike_count', 'bk.type', 'bk.returned_condition', 
        'bk.notes', 'bk.created_at', 'bk.confirmed_at', 'bk.returned_at',
        'u.id', 'u.name', 'u.type', 'u.room', 'u.term', 'u.status', 
        'u.is_active', 'u.created_at', 'u.updated_at', 'u.deleted_at',
        'b.id', 'b.numbering', 'b.size', 'b.current_status', 'b.is_active',
        'b.created_at', 'b.updated_at', 'b.deleted_at'
    ]

    findByIdStmt: string = `select ${this.findSelectFields.join(', ')} 
                from booking bk inner join "user" u on bk.user_id = u.id 
                inner join booking_bike bb on bk.id = bb.booking_id 
                inner join bike b on b.id = bb.bike_id
                where bk.id = $1
                order by bk.id`

    findAllByUserStmt: string = `select ${this.findSelectFields.join(', ')} 
                from booking bk inner join "user" u on bk.user_id = u.id 
                inner join booking_bike bb on bk.id = bb.booking_id 
                inner join bike b on b.id = bb.bike_id
                where u.id = $1
                order by bk.id`

    findAllStmt: string = `select ${this.findSelectFields.join(', ')} 
                from booking bk inner join "user" u on bk.user_id = u.id 
                inner join booking_bike bb on bk.id = bb.booking_id 
                inner join bike b on b.id = bb.bike_id
                _WHERE_ order by bk.id`

    constructor(client: Client) {
        this.client = client
    }

    async save(booking: Booking): Promise<Booking> {

        if (!booking.User.ID)
            throw new Error('Invalid user ID')

        let result = await this.client.query(this.insertStmt,
            [booking.User.ID, booking.Status, booking.Type, booking.BikeCount, booking.CreatedAt])

        if (!result.rowCount)
            throw new Error("Couldn't save booking")

        let [row] = result.rows

        booking.ID = row.id
        booking.Bike.forEach(async (bike) => {
            await this.client.query(this.insertBookingBikesStmt, [booking.ID, bike.ID])
        })

        return Object.assign({}, booking) 
    }

    async update(booking: Booking): Promise<Booking> {
        if (booking.ID === undefined) 
            throw new Error("Can't update unsaved booking")

        let query = {
            text: this.updateStmt,
            values: [booking.Status,
                booking.ReturnedCondition,
                booking.Notes,
                booking.ConfirmedAt,
                booking.ReturnedAt,
                booking.ID],
        }

        let result = await this.client.query(query)

        if (!result.rowCount)
            throw new Error("Couldn't update booking") 

        return Object.assign({}, booking) 
    }

    async findById(bookingId: number): Promise<Booking> {
        let query = {
            text: this.findByIdStmt, 
            values: [bookingId],
            rowMode: 'array'
        }
        let result = await this.client.query(query)
        
        if (!result.rowCount)
            throw new Error(`Couldn't find booking with id ${bookingId}`)
        
        let objectRows = result.rows.map(row => toObj(this.findSelectFields, row))

        return populateBookingFromRows(objectRows, 0)
    }

    async findByUser(userId: number): Promise<Booking[]> {
        let query = {
            text: this.findAllByUserStmt, 
            values: [userId],
            rowMode: 'array'
        }

        let result = await this.client.query(query)

        if (!result.rowCount) 
            throw new Error(`Couldn't find bookings for userId ${userId}`)

        let objectRows = result.rows.map(row => toObj(this.findSelectFields, row))

        return toBookingArray(objectRows)
    }

    async findAll(searchCriteria: { userId?: number, bikeId?: number, status?: BookingStatus }): Promise<Booking[]> {
        let stmt = this.findAllStmt 

        stmt = stmt.replace("_WHERE_", createWhereClausule(searchCriteria))

        let query = {
            text: stmt, 
            values: Object.values(searchCriteria),
            rowMode: 'array'
        }

        let result = await this.client.query(query)
        let objectRows = result.rows.map(row => toObj(this.findSelectFields, row))

        return toBookingArray(objectRows)
   }

}
