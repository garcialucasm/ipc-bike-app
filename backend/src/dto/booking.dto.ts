

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
  room: string
  term: string
  bikeType: string | string[]
  bike: string | string[]
  createdAt: Date
  confirmedAt: Date | null
  returnedAt: Date | null
  canceledAt: Date | null
  createdByAccount: number | null
  confirmedByAccount: number | null
  returnedByAccount: number | null
  canceledByAccount: number | null
  returnedCondition: string
  notes: string
}

export { BookingDTO, BookingStatusDTO }
