
import { Router, RouterOptions } from 'express'
import IBookingService from '../services/booking.service'
import { validateRoom, validateUserName, validateBikeNumbering } from '../models/validators'
import { BookingDTO, BookingStatusDTO } from '../dto/booking.dto'
import { Booking, BookingStatus, BookingType } from '../models/booking.model'
import { getLogger } from '../logger'


function toBookingDTO(booking: Booking): BookingDTO {
  return {
    id: booking.ID ?? 0,
    status: BookingStatus[booking.Status as keyof typeof BookingStatus].toLowerCase(),
    user: booking.User.Name,
    bikeType: booking.Type == BookingType.SINGLE ?
      booking.Bike[0].Size.toLowerCase() : booking.Bike.map(bike => bike.Size.toLowerCase()),
    bike: booking.Type == BookingType.SINGLE ?
      booking.Bike[0].Numbering.toString() : booking.Bike.map(bike => bike.Numbering.toString())
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

  router.get("/status", async (req, res) => {
    logger.info("GET /status")
    bookingService.countBookingsByStatus()
      .then(statusResult => toBookingStatusDTO(statusResult))
      .then(statusResult => {
        res.status(200)
          .send({ status: statusResult })
      })
  })


  router.post("/create/single", async (req, res) => {
    logger.info("POST /create/single")
    const userName = req.body.userName
    const room = req.body.room
    const bikeNumbering = req.body.bikeNumbering

    try {
      validateUserName(userName)
      validateRoom(room)
      validateBikeNumbering(bikeNumbering)
      bookingService.createSingleBooking(userName, room, bikeNumbering)
        .then(booking => {
          logger.debug("createSingleBooking for user", booking.User.ID)
          res.status(200)
            .send({ booking: toBookingDTO(booking) })
        }).catch(error => {
          logger.error(error)
          res.status(401)
            .send({ error: error.message })
        })
    } catch (error: any) {
      logger.error(error)
      console.log(error)
      res.status(401)
        .send({ error: error.message })
    }
  })

  router.post("/approve/:id", async (req, res) => {
    logger.info("POST /approve/", req.params.id)
    bookingService.approve(parseInt(req.params.id))
      .then(booking => {
        logger.debug("approve for user ", booking.User.ID)
        res.status(200)
          .send({ booking: toBookingDTO(booking) })
      }).catch(error => {
        logger.error(error)
        res.status(401)
          .send({ error: error.message })
      })
  })

  router.post("/return/:id", (req, res) => {
    logger.info("POST /return/", req.params.id)
    bookingService.returnBike(parseInt(req.params.id))
      .then(booking => {
        logger.debug("returnBike successfully")
        res.status(200)
          .send({ booking: toBookingDTO(booking) })
      }).catch(error => {
        logger.error(error)
        res.status(401)
          .send({ error: error.message })
      })
  })

  router.post("/cancel/:id", (req, res) => {
    logger.info("POST /cancel/", req.params.id)
    bookingService.cancel(parseInt(req.params.id))
      .then(booking => {
        logger.debug("cancel successfully")
        res.status(200)
          .send({ booking: toBookingDTO(booking) })
      }).catch(error => {
        logger.error(error)
        res.status(401)
          .send({ error: error.message })
      })
  })

  router.get("/all", (req, res) => {
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

  return router
}
