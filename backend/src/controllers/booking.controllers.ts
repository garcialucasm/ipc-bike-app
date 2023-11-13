
import { Router, RouterOptions } from 'express'
import IBookingService from '../services/booking.service'
import { validateRoom, validateUserName, validateBikeSize } from '../models/validators'

export default function bookingController(bookingService: IBookingService, routerOptions?: RouterOptions) {

  const router: Router = Router(routerOptions)

  router.post("/createSingle", async (req, res) => {
    let userName = req.body.userName
    let room = req.body.room
    let bikeSize = req.body.bikeSize

    try {
      validateUserName(userName) 
      validateRoom(room)
      validateBikeSize(bikeSize)

      bookingService.createStudentBooking(userName, room, bikeSize)
      .then(booking => {
        res.status(200)
          .send({Response: booking})
      }).catch(error => {
        res.status(401)
          .send({Response: error.message})
      })
    } catch (error) {
      res.status(401)
        .send({Response: error.message})
    }
  })

  router.post("/approve/:id", async (req, res) => {
    bookingService.approve(parseInt(req.params.id))
      .then(booking => {
        res.status(200)
          .send({Response: booking})
      }).catch (error => {
        res.status(401)
          .send({Response: error.message})
      })
  })

  router.post("/return/:id", (req, res) => {
    bookingService.returnBike(parseInt(req.params.id))
    .then(booking => {
      res.status(200)
        .send({Response: booking})
    }).catch(error => {
      res.status(401)
        .send({Response: error.message})
    })
  })

  router.get("/all", (req, res) => {
    bookingService.listAllOpened()
      .then(bookings => {
        res.status(200)
          .send({Response: bookings})
      }).catch(error => {
        res.status(401)
          .send({Response: error.message})
      })
  })
  
  return router
}
