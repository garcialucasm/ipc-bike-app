
export interface BikeStatusDTO {
  booked?: number,
  disabled?: number,
  inuse?: number,
  free?: number
}

export interface BikeDTO {
  id: number
  numbering: number
  currentStatus: string
  size: string
  isActive: boolean
}
