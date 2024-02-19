import { Router, RouterOptions } from 'express'
import IBikeService from '../services/bike.service'
import { Bike, BikeStatus } from '../models/bike.model'
import { BikeDTO, BikeStatusDTO } from '../dto/bike.dto'

function toStatusDTO(status: Map<BikeStatus, number>): BikeStatusDTO {
  return {
    free: status.get(BikeStatus.FREE),
    inuse: status.get(BikeStatus.INUSE),
    booked: status.get(BikeStatus.BOOKED),
    disabled: status.get(BikeStatus.DISABLED)
  }
}

function toBikeDTO(bike: Bike): BikeDTO {
  return {
    id: bike.ID ?? 0,
    numbering: bike.Numbering,
    size: bike.Size,
    currentStatus: bike.CurrentStatus,
    isActive: bike.IsActive,
  }
}

export default function bikeController(bikeService: IBikeService, routerOptions?: RouterOptions) {

  const router: Router = Router(routerOptions)

  router.get('/status', (req, res) => {
    bikeService.countBikesByStatus().then(bikeStatus => {
      res.status(200).send({ status: toStatusDTO(bikeStatus) })
    })
  })

  router.get("/all/available", (req, res) => {
    bikeService.findAllAvailable().then(bikes =>
      bikes.map(bike => toBikeDTO(bike)))
      .then(bikes => {
        res.status(200)
          .send({ bikes: bikes })
      }).catch(error => {
        console.log(error)
        res.status(401)
          .send({ error: error.message })
      })
  })

  return router
}
