
import { Router, RouterOptions } from 'express'
import IBookingService from '../services/booking.service'
import { validateRoom, validateUserName, validateBikeSize } from '../models/validators'

export default function bookingController(bookingService: IBookingService, routerOptions?: RouterOptions) {

  const router: Router = Router(routerOptions)

  router.post("/create/single", async (req, res) => {
    let userName = req.body.userName
    let room = req.body.room
    let bikeSize = req.body.bikeSize

    try {
      validateUserName(userName) 
      validateRoom(room)
      validateBikeSize(bikeSize)

      bookingService.createSingleBooking(userName, room, bikeSize)
      .then(booking => {
        res.status(200)
          .send({booking: booking})
      }).catch(error => {
        console.log(error)
        res.status(401)
          .send({error: error.message})
      })
    } catch (error: any) {
      console.log(error)
      res.status(401)
        .send({error: error.message})
    }
  })

  router.post("/approve/:id", async (req, res) => {
    bookingService.approve(parseInt(req.params.id))
      .then(booking => {
        res.status(200)
          .send({booking: booking})
      }).catch (error => {
        console.log(error) 
        res.status(401)
          .send({error: error.message})
      })
  })

  router.post("/return/:id", (req, res) => {
    bookingService.returnBike(parseInt(req.params.id))
    .then(booking => {
      res.status(200)
        .send({booking: booking})
    }).catch(error => {
      console.log(error)
      res.status(401)
        .send({error: error.message})
    })
  })

  router.get("/all", (req, res) => {

    let showInactive: boolean = false 
    if (req.query.show_inactive && req.query.show_inactive === 'true') {
      showInactive = true
    }

    bookingService.findAll(showInactive)
      .then(bookings => {
        res.status(200)
          .send({bookings: bookings})
      }).catch(error => {
        console.log(error)
        res.status(401)
          .send({error: error.message})
      })
  })
  
  return router
}
