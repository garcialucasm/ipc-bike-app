import jwt, { JwtPayload } from 'jsonwebtoken';

import * as fs from 'fs';
import { Router, RouterOptions } from 'express'
import IBookingService from '../services/booking.service'
import { validateRoom, validateUserName, validateBikeNumbering } from '../models/validators'
import { BookingDTO, BookingStatusDTO } from '../dto/booking.dto'
import { Booking, BookingStatus, BookingType } from '../models/booking.model'
import { getLogger } from '../logger'
import { generatePublicAsyncToken, getDecodedToken, validateAccountPermission } from '../utils/auth';
import { AccountType } from '../models/account.model'

let publicJwtKey: string = ""

if (process.env.PUBLIC_JWT_KEY_FILE) {
  publicJwtKey = fs.readFileSync(process.env.PUBLIC_JWT_KEY_FILE, 'utf8')
} else if (process.env.PUBLIC_JWT_KEY) {
  publicJwtKey = process.env.PUBLIC_JWT_KEY;
}

function toBookingDTO(booking: Booking): BookingDTO {
  return {
    id: booking.ID ?? 0,
    status: BookingStatus[booking.Status as keyof typeof BookingStatus].toLowerCase(),
    user: booking.User.Name,
    term: booking.User.Term,
    room: booking.User.Room,
    bikeType: booking.Type == BookingType.SINGLE ?
      booking.Bike[0].Size.toLowerCase() : booking.Bike.map(bike => bike.Size.toLowerCase()),
    bike: booking.Type == BookingType.SINGLE ?
      booking.Bike[0].Numbering.toString() : booking.Bike.map(bike => bike.Numbering.toString()),
    createdAt: booking.CreatedAt,
    confirmedAt: booking.ConfirmedAt ?? null,
    returnedAt: booking.ReturnedAt ?? null,
    canceledAt: booking.CanceledAt ?? null,
    createdByAccount: booking.CreatedByAccount ?? null,
    confirmedByAccount: booking.ConfirmedByAccount ?? null,
    returnedByAccount: booking.ReturnedByAccount ?? null,
    canceledByAccount: booking.CanceledByAccount ?? null,
    returnedCondition: booking.ReturnedCondition ?? "",
    notes: booking.Notes ?? ""
  }
}

function toBookingStatusDTO(status: Map<BookingStatus, number>): BookingStatusDTO {
  return {
    inuse: status.get(BookingStatus.DELIVERED) ?? 0,
    booked: status.get(BookingStatus.BOOKED) ?? 0,
    canceled: status.get(BookingStatus.CANCELED) ?? 0,
    returned: status.get(BookingStatus.RETURNED) ?? 0
  }
}

export default function bookingController(bookingService: IBookingService, routerOptions?: RouterOptions) {

  const router: Router = Router(routerOptions)
  const logger = getLogger('BookingController')

  router.get("/secure/booking/status", async (req, res) => {
    logger.info("GET /status")
    bookingService.countBookingsByStatus()
      .then(statusResult => toBookingStatusDTO(statusResult))
      .then(statusResult => {
        res.status(200)
          .send({ status: statusResult })
      })
  })


  router.post("/booking/create/single", async (req, res) => {
    logger.info("POST /create/single")
    const decodedToken = await getDecodedToken(req)
    const accountId = decodedToken ? decodedToken.accountId : null
    const userName = req.body.userName
    const room = req.body.room
    const bikeNumbering = req.body.bikeNumbering

    try {
      validateUserName(userName)
      validateRoom(room)
      validateBikeNumbering(bikeNumbering)
      bookingService.createSingleBooking(accountId, userName, room, bikeNumbering)
        .then(async booking => {
          const publicBookingToken = await generatePublicAsyncToken({userId: booking.User.ID})
          logger.debug("createSingleBooking for user", booking.User.ID)
          res.status(200)
            .send({ booking: toBookingDTO(booking), publicBookingToken })
        }).catch(error => {
          logger.error(error)
          res.status(401)
            .send({ error: error.message })
        })
    } catch (error: any) {
      logger.error(error)
      res.status(401)
        .send({ error: error.message })
    }
  })

  router.post("/secure/booking/approve/:id", async (req, res) => {
    logger.info("POST /approve/", req.params.id)

    try {
      await validateAccountPermission(req, [
        AccountType.KEYKEEPER,
        AccountType.ADMIN,
      ])
      const decodedToken = await getDecodedToken(req)
      const accountId: number = decodedToken && decodedToken.accountId
      bookingService
        .approve(accountId, parseInt(req.params.id))
        .then((booking) => {
          logger.debug("approve for user ", booking.User.ID)
          res.status(200).send({ booking: toBookingDTO(booking) })
        })
        .catch((error) => {
          logger.error(error)
          res.status(401).send({ error: error.message })
        })
    } catch (error: any) {
      logger.error(error)
      res.status(401).send({ error: error.message })
    }
  })

  router.post("/secure/booking/return/:id", async (req, res) => {
    logger.info("POST /return/", req.params.id)

    try {
      await validateAccountPermission(req, [
        AccountType.KEYKEEPER,
        AccountType.ADMIN,
      ])
      const decodedToken = await getDecodedToken(req)
      const accountId: number = decodedToken && decodedToken.accountId

      bookingService
        .returnBike(accountId, parseInt(req.params.id))
        .then((booking) => {
          logger.debug("returnBike successfully")
          res.status(200).send({ booking: toBookingDTO(booking) })
        })
        .catch((error) => {
          logger.error(error)
          res.status(401).send({ error: error.message })
        })
    } catch (error: any) {
      logger.error(error)
      res.status(401).send({ error: error.message })
    }
  })

  router.post("/secure/booking/cancel/:id", async (req, res) => {
    logger.info("POST /cancel/", req.params.id)

    try {
      await validateAccountPermission(req, [
        AccountType.KEYKEEPER,
        AccountType.ADMIN,
      ])
      const decodedToken = await getDecodedToken(req)
      const accountId: number = decodedToken && decodedToken.accountId

      bookingService
        .cancel(accountId, parseInt(req.params.id))
        .then((booking) => {
          logger.debug("cancel successfully")
          res.status(200).send({ booking: toBookingDTO(booking) })
        })
        .catch((error) => {
          logger.error(error)
          res.status(401).send({ error: error.message })
        })
    } catch (error: any) {
      logger.error(error)
      res.status(401).send({ error: error.message })
    }
  })

  router.get("/secure/booking/all", (req, res) => {
    logger.info("GET /all")
    let showInactive: boolean = false
    if (req.query.show_inactive && req.query.show_inactive === 'true') {
      showInactive = true
    }

    bookingService.findAll(showInactive)
      .then(bookings =>
        bookings.map(booking => toBookingDTO(booking))
      )
      .then(bookings => {
        logger.debug(`findAll successfully`)
        res.status(200)
          .send({ bookings: bookings })
      }).catch(error => {
        logger.error(error)
        res.status(401)
          .send({ error: error.message })
      })
  })

  router.get("/booking/previous/:publicToken", async (req, res) => {
    logger.info("GET /booking/previous/:publicToken/", req.params.publicToken)
    let hideInactive: boolean = true
    if (req.query.hide_inactive && req.query.hide_inactive === "false") {
      hideInactive = false
    }

    const publicToken = req.params.publicToken
    const decoded = jwt.verify(publicToken, publicJwtKey) as JwtPayload
    const userId = decoded.userId

    try {
      bookingService
        .findByUserId(parseInt(userId), hideInactive)
        .then((bookings) => bookings.map((booking) => toBookingDTO(booking)))
        .then((bookings) => {
          logger.debug("findByUserId successfully")
          res.status(200).send({ bookings: bookings })
        })
        .catch((error) => {
          logger.error(error)
          res.status(401).send({ error: error.message })
        })
    } catch (error: any) {
      logger.error(error)
      res.status(401).send({ error: error.message })
    }
  })
  return router
}
