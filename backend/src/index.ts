import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import bookingController from "./controllers/booking.controllers"
import IBookingService from "./services/booking.service"
import BookingService from "./services/booking.service.impl"
import IUserRepository from "./repositories/user.repository"
import UserRepository from "./repositories/user.repository.impl"
import IBikeRepository from "./repositories/bike.repository"
import BikeRepository from "./repositories/bike.repository.impl"
import IBookingRepository from "./repositories/booking.repository"
import BookingRepository from "./repositories/booking.repository.impl"
import UserService from "./services/user.service.impl"
import IBikeService from "./services/bike.service"
import BikeService from "./services/bike.service.impl"
import IBikeChooser from "./services/bike.chooser"
import RandomBikeChooser from "./services/random.bike.chooser"
import IUserService from "./services/user.service"

import db from "./db/index"

db.connect()

const currentTerm = 'spring 2023'

const userRepository: IUserRepository = new UserRepository(db)
const bikeRepository: IBikeRepository = new BikeRepository(db)
const bookingRepository: IBookingRepository = new BookingRepository(db)

const userService: IUserService = new UserService(userRepository)
const bikeService: IBikeService = new BikeService(bikeRepository)
const bikeChooser: IBikeChooser = new RandomBikeChooser()
const bookingService: IBookingService = new BookingService(bookingRepository, bikeService, 
                                                          bikeChooser, userService, currentTerm)

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/booking/', bookingController(bookingService))

app.get("/", async (req, res) => {
  return res.status(200).send({ Response: "IPC - Alumni Bike" })
})

const server = app.listen(3000, () => {
  console.log("Express server started on port 3000")
})

export {app, server, db}
