

interface BookingStatusDTO {
  booked: number,
  inuse: number,
  canceled?: number,
  returned?: number
}

interface BookingDTO {
  id: number
  status: string
  user: string
  bikeType: string | string[]
  bike: string | string[]
  createdAt: Date | null
  confirmedAt: Date | null
  returnedAt: Date | null
  returnedCondition: string
  notes: string
}

export { BookingDTO, BookingStatusDTO }
