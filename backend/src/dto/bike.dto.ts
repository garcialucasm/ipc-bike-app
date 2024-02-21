
export interface BikeStatusDTO {
  booked?: number,
  disabled?: number,
  inuse?: number,
  free?: number
}

export interface BikeDTO {
  id: number
  numbering: number
  bikeType: string
  size: string
  currentStatus: string
  isActive: boolean
}
