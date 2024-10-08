import dotenv from 'dotenv'
dotenv.config()

require('events').defaultMaxListeners = 25;

import express from "express"
import cors from "cors"
import bookingController from "./controllers/booking.controllers"
import IBookingService from "./services/booking.service"
import BookingService from "./services/booking.service.impl"
import IUserRepository from "./repositories/user.repository"
import UserRepository from "./repositories/user.repository.impl"
import IAccountRepository from "./repositories/account.repository"
import AccountRepository from "./repositories/account.repository.impl"
import IBikeRepository from "./repositories/bike.repository"
import BikeRepository from "./repositories/bike.repository.impl"
import IBookingRepository from "./repositories/booking.repository"
import BookingRepository from "./repositories/booking.repository.impl"
import UserService from "./services/user.service.impl"
import AccountService from "./services/account.service.impl"
import IAccountService from "./services/account.service.impl"
import IBikeService from "./services/bike.service"
import BikeService from "./services/bike.service.impl"
import IBikeChooser from "./services/bike.chooser"
import RandomBikeChooser from "./services/random.bike.chooser"
import IUserService from "./services/user.service"
import getClient from "./db/index"
import bikeController from "./controllers/bike.controller"
import accountController from "./controllers/account.controller"
import { checkAuth } from "./utils/auth"
import { getLogger } from "./logger"

const logger = getLogger()

logger.info('connecting to db')
let db = getClient()
db.connect()

const currentTerm = 'spring 2023'

logger.info('intializing services')
const userRepository: IUserRepository = new UserRepository(db)
const accountRepository: IAccountRepository = new AccountRepository(db)
const bikeRepository: IBikeRepository = new BikeRepository(db)
const bookingRepository: IBookingRepository = new BookingRepository(db)

const userService: IUserService = new UserService(userRepository)
const bikeService: IBikeService = new BikeService(bikeRepository)
const bikeChooser: IBikeChooser = new RandomBikeChooser()
const bookingService: IBookingService = new BookingService(bookingRepository, bikeService,
  bikeChooser, userService, currentTerm)
const accountService: IAccountService = new AccountService(accountRepository)


const app = express()
app.use(cors())
//app.use(bodyParser.urlencoded({
//  extended: true
//}));
app.use(express.json())

app.use('/api/secure/*', checkAuth)

app.use('/api/', bookingController(bookingService))
app.use('/api/', bikeController(bikeService))
app.use('/api/auth/', accountController(accountService))

app.get("/", async (req, res) => {
  return res.status(200).send({ Response: "IPC - Alumni Bike" })
})

const server = app.listen(3000, () => {
  logger.info("Express server started on port 3000")
})

setInterval(async () => {
  try {
    logger.debug("running cancelExpiredBookings service")
    await bookingService.cancelExpiredBookings();
  } catch (error) {
    logger.error("Error running cancelExpiredBookings")
  }
}, process.env.BOOKING_EXPIRATION_CHECK_INTERVAL ? parseInt(process.env.BOOKING_EXPIRATION_CHECK_INTERVAL) : 5 * 60 * 1000);

export { app, server, db }
