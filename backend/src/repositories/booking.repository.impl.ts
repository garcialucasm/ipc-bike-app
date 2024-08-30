import { Client } from "pg"
import { Booking, BookingStatus, BookingType } from "../models/booking.model"
import IBookingRepository from "./booking.repository"
import { bikeFromRow, bookingFromRow, filterPropertiesWithPrefix } from "./mappings"
import { getLogger } from "../logger"

function toObj(properties: string[], values: any[]) {
    let zipped = properties.map((property, i) => [property, values[i]])
    return Object.fromEntries(zipped)
}

function populateBookingFromRows(rows: any[], offset: number): Booking {
    logger.silly("populateBookingFromRows")
    let booking: Booking = bookingFromRow(rows[offset])

    booking.CreatedAt = rows[offset]['bk.created_at'] ? new Date(rows[offset]['bk.created_at']) : undefined
    booking.ConfirmedAt = rows[offset]['bk.confirmed_at'] ? new Date(rows[offset]['bk.confirmed_at']) : undefined
    booking.ReturnedAt = rows[offset]['bk.returned_at'] ? new Date(rows[offset]['bk.returned_at']) : undefined
    booking.CanceledAt = rows[offset]['bk.canceled_at'] ? new Date(rows[offset]['bk.canceled_at']) : undefined
    booking.ConfirmedByAccount = rows[offset]['bk.confirmed_by_account_id'] ?? booking.ConfirmedByAccount;
    booking.ReturnedByAccount = rows[offset]['bk.returned_by_account_id'] ?? booking.ReturnedByAccount;
    booking.CanceledByAccount = rows[offset]['bk.canceled_by_account_id'] ?? booking.CanceledByAccount;

    switch (booking.Type) {
        case BookingType.SINGLE:
            booking.Bike.push(bikeFromRow(filterPropertiesWithPrefix(rows[offset], 'b')))
            break;

        case BookingType.GROUP:
            for (let i = offset; i < offset + booking.BikeCount && i < rows.length; ++i) {
                booking.Bike.push(bikeFromRow(filterPropertiesWithPrefix(rows[i], 'b')))
            }
    }

    return booking
}
function toBookingArray(rows: any[]): Booking[] {
    logger.silly("toBookingArray")
    let bookings = []
    let i = 0

    while (i < rows.length) {
        let booking = populateBookingFromRows(rows, i)
        i += booking.BikeCount
        bookings.push(booking)
    }

    return bookings
}

const logger = getLogger('BookingRepository')

export default class BookingRepository implements IBookingRepository {

    client: Client

    insertStmt: string = `
        INSERT INTO "booking" ("user_id", "status", "type", "bike_count", "created_at", "created_by_account_id") 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `

    insertBookingBikesStmt: string = `
        INSERT INTO booking_bike(booking_id, bike_id) 
        VALUES ($1, $2)
    `

    updateStmt: string = `
        UPDATE booking 
        SET status=$1, returned_condition=$2, notes=$3, confirmed_at=$4, returned_at=$5, canceled_at=$6, 
            confirmed_by_account_id=$7, returned_by_account_id=$8, canceled_by_account_id=$9 
        WHERE id=$10 RETURNING *
    `

    findSelectFields: string[] = [
        'bk.id', 'bk.status', 'bk.bike_count', 'bk.type', 'bk.returned_condition',
        'bk.notes', 'bk.created_at', 'bk.confirmed_at', 'bk.returned_at',
        'bk.created_by_account_id', 'bk.confirmed_by_account_id', 'bk.returned_by_account_id', 'bk.canceled_by_account_id',
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

    findByStatusStmt: string = `select ${this.findSelectFields.join(', ')} 
                from booking bk inner join "user" u on bk.user_id = u.id 
                inner join booking_bike bb on bk.id = bb.booking_id 
                inner join bike b on b.id = bb.bike_id
                where bk.status = $1
                order by bk.id`

    findByBikeStmt: string = `select ${this.findSelectFields.join(', ')} 
                from booking bk inner join "user" u on bk.user_id = u.id 
                inner join booking_bike bb on bk.id = bb.booking_id 
                inner join bike b on b.id = bb.bike_id
                where b.id = $1
                order by bk.id`

    findAllStmt: string = `select ${this.findSelectFields.join(', ')} 
                from booking bk inner join "user" u on bk.user_id = u.id 
                inner join booking_bike bb on bk.id = bb.booking_id 
                inner join bike b on b.id = bb.bike_id
                order by bk.id`


    countBookingsByStatusStmt: string = `select bk.status, count(bk.status)
                from booking bk group by bk.status`

    constructor(client: Client) {
        this.client = client
    }

    async save(booking: Booking): Promise<Booking> {
        logger.silly("save")

        if (!booking.User.ID) {
            logger.error("Invalid user ID")
            throw new Error('Invalid user ID')
        }

        let result = await this.client.query(this.insertStmt,
            [booking.User.ID, booking.Status, booking.Type, booking.BikeCount, booking.CreatedAt, booking.CreatedByAccount])

        if (!result.rowCount) {
            logger.error("Couldn't save booking")
            throw new Error("Couldn't save booking")
        }

        let [row] = result.rows

        booking.ID = row.id
        booking.Bike.forEach(async (bike) => {
            await this.client.query(this.insertBookingBikesStmt, [booking.ID, bike.ID])
        })

        return Object.assign({}, booking)
    }

    async update(booking: Booking): Promise<Booking> {
        logger.silly("update")
        if (booking.ID === undefined) {
            logger.error("Can't update unsaved booking")
            throw new Error("Can't update unsaved booking")
        }

        let query = {
            text: this.updateStmt,
            values: [
                booking.Status,
                booking.ReturnedCondition,
                booking.Notes,
                booking.ConfirmedAt,
                booking.ReturnedAt,
                booking.CanceledAt,
                booking.ConfirmedByAccount,
                booking.ReturnedByAccount,
                booking.CanceledByAccount,
                booking.ID
            ],
        }

        let result = await this.client.query(query)

        if (!result.rowCount) {
            logger.error("Couldn't update booking")
            throw new Error("Couldn't update booking")
        }

        return Object.assign({}, booking)
    }

    async findById(bookingId: number): Promise<Booking> {
        logger.silly("findById")
        let query = {
            text: this.findByIdStmt,
            values: [bookingId],
            rowMode: 'array'
        }
        let result = await this.client.query(query)

        if (!result.rowCount) {
            logger.silly("Couldn't find booking with id", bookingId)
            throw new Error(`Couldn't find booking with id ${bookingId}`)
        }

        let objectRows = result.rows.map(row => toObj(this.findSelectFields, row))

        return populateBookingFromRows(objectRows, 0)
    }

    async findByUser(userId: number): Promise<Booking[]> {
        logger.silly("findByUser")
        let query = {
            text: this.findAllByUserStmt,
            values: [userId],
            rowMode: 'array'
        }

        let result = await this.client.query(query)

        if (!result.rowCount) {
            logger.silly("Couldn't find bookings for ",  userId)
            throw new Error(`Couldn't find bookings for userId ${userId}`)
        }

        let objectRows = result.rows.map(row => toObj(this.findSelectFields, row))

        return toBookingArray(objectRows)
    }

    async findByBike(bikeId: number): Promise<Booking[]> {
        logger.silly("findByBike")
        let query = {
            text: this.findByBikeStmt,
            values: [bikeId],
            rowMode: 'array'
        }

        let result = await this.client.query(query)

        let objectRows = result.rows.map(row => toObj(this.findSelectFields, row))

        return toBookingArray(objectRows)
    }

    async findByStatus(status: BookingStatus): Promise<Booking[]> {
        logger.silly("findByStatus")
        let query = {
            text: this.findByStatusStmt,
            values: [status],
            rowMode: 'array'
        }

        let result = await this.client.query(query)

        let objectRows = result.rows.map(row => toObj(this.findSelectFields, row))

        return toBookingArray(objectRows)
    }

    async findAll(): Promise<Booking[]> {
        logger.silly("findAll")
        let query = {
            text: this.findAllStmt,
            rowMode: 'array'
        }
        let result = await this.client.query(query)
        let objectRows = result.rows.map(row => toObj(this.findSelectFields, row))

        return toBookingArray(objectRows)
    }

    async countBookingsByStatus(): Promise<Map<BookingStatus, number>> {
        logger.silly("countBookingsByStatus")
        let query = {
            text: this.countBookingsByStatusStmt
        }

        let result = await this.client.query(query)
        let ans: Map<BookingStatus, number> = new Map<BookingStatus, number>()

        result.rows.forEach(row => {
            ans.set(BookingStatus[row.status as keyof typeof BookingStatus], Number.parseInt(row.count))
        })

        return ans
    }
}
