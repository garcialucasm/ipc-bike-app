import { Router, RouterOptions } from 'express'
import IBikeService from '../services/bike.service'
import { BikeStatus } from '../models/bike.model'
import BikeStatusDTO from '../dto/bike.dto'

function toStatusDTO(status: Map<BikeStatus, number>) : BikeStatusDTO { 
  return {
    free: status.get(BikeStatus.FREE),
    inuse: status.get(BikeStatus.INUSE),
    booked: status.get(BikeStatus.BOOKED),
    disabled: status.get(BikeStatus.DISABLED)
  }
}

export default function bikeController(bikeService: IBikeService, routerOptions?: RouterOptions) {

  const router: Router = Router(routerOptions)
 
  router.get('/status', (req, res) => {
    bikeService.countBikesByStatus().then(bikeStatus => {
      res.status(200).send({status: toStatusDTO(bikeStatus)})
    })
  })

  return router
}
