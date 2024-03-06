import { Router, RouterOptions } from 'express'
import IBikeService from '../services/bike.service'
import { Bike, BikeStatus } from '../models/bike.model'
import { BikeDTO, BikeStatusDTO } from '../dto/bike.dto'
import { logger } from '../logger'

function toStatusDTO(status: Map<BikeStatus, number>): BikeStatusDTO {
  return {
    free: status.get(BikeStatus.FREE),
    inuse: status.get(BikeStatus.INUSE),
    booked: status.get(BikeStatus.BOOKED),
    disabled: status.get(BikeStatus.DISABLED)
  }
}

export function toBikeDTO(bike: Bike): BikeDTO {
  return {
    id: bike.ID ?? 0,
    numbering: bike.Numbering,
    bikeType: bike.BikeType,
    size: bike.Size,
    currentStatus: bike.CurrentStatus,
    isActive: bike.IsActive,
  }
}

export default function bikeController(bikeService: IBikeService, routerOptions?: RouterOptions) {

  const router: Router = Router(routerOptions)

  router.get('/status', (req, res) => {
    logger.info("Bike Controller called: GET /status")
    bikeService.countBikesByStatus().then(bikeStatus => {
      res.status(200).send({ status: toStatusDTO(bikeStatus) })
    })
  })

  router.get("/all/available", (req, res) => {
    logger.info("Bike Controller called: GET /all/available")
    bikeService.findAllAvailable()
      .then((allBikes) => {
        logger.debug(`Bike Controller called: GET /all/available successfully`)
        res.status(200).send(allBikes);
      })
      .catch(error => {
        logger.error(`Bike Controller called: GET /all/available error | ${error}`)
        console.log(error);
        res.status(401).send({ error: error.message });
      });
  });

  return router
}
