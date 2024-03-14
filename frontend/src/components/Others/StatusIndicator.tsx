import { BikeStatus } from "@/types/BikeType"
import { BookingStatus } from "@/types/BookingType"
import { UserStatus } from "@/types/UserType"

enum StatusColorClass {
  GREEN = "bg-emerald-500",
  YELLOW = "bg-amber-500",
  RED = "bg-rose-500",
  GRAY = "bg-slate-300",
  WHITE = "bg-slate-100",
}
enum AnimationStatusClass {
  NONE = "",
  FREE = "scale-150 opacity-[.1]",
  INUSE = "animate-ping opacity-25",
  BOOKED = "animate-ping",
}

function getStatusColor(status: BookingStatus | UserStatus | BikeStatus) {
  let statusColorClass: string
  let animationStatusClass: string
  let currentStatus = status.toUpperCase()

  if (currentStatus === BikeStatus.FREE || currentStatus === UserStatus.FREE) {
    statusColorClass = StatusColorClass.GREEN
    animationStatusClass = AnimationStatusClass.FREE
  } else if (
    currentStatus === BookingStatus.BOOKED ||
    currentStatus === BikeStatus.BOOKED ||
    currentStatus === UserStatus.BOOKED
  ) {
    statusColorClass = StatusColorClass.YELLOW
    animationStatusClass = AnimationStatusClass.BOOKED
  } else if (
    currentStatus === BookingStatus.DELIVERED ||
    currentStatus === BikeStatus.INUSE ||
    currentStatus === UserStatus.INUSE
  ) {
    statusColorClass = StatusColorClass.RED
    animationStatusClass = AnimationStatusClass.INUSE
  } else if (
    currentStatus === BookingStatus.CANCELED ||
    currentStatus === BookingStatus.RETURNED ||
    currentStatus === BikeStatus.DISABLED
  ) {
    statusColorClass = StatusColorClass.GRAY
    animationStatusClass = AnimationStatusClass.NONE
  } else {
    statusColorClass = StatusColorClass.WHITE
    animationStatusClass = AnimationStatusClass.NONE
  }

  return {
    statusColorClass,
    animationStatusClass,
  }
}

function StatusIndicator(props: {
  currentStatus: BookingStatus | UserStatus | BikeStatus
  isStatic?: boolean
  height?: string
  width?: string
}) {
  const statusColor = getStatusColor(props.currentStatus)
  const { isStatic } = props
  const { height, width } = props
  const { statusColorClass, animationStatusClass } = statusColor
  return (
    <>
      <span
        className={`relative flex items-center justify-center text-center ${height ?? "h-2.5"} ${
          width ?? "w-2.5 "
        } m-2`}
      >
        <span
          className={`absolute inline-flex h-full w-full items-center justify-center rounded-full opacity-50 text-center ${statusColorClass} ${
            isStatic ? "" : animationStatusClass
          }`}
        ></span>
        <span
          className={`relative inline-flex items-center justify-center rounded-full text-center ${height ?? "h-2.5"} ${
            width ?? "w-2.5"
          } ${statusColorClass}`}
        ></span>
      </span>
    </>
  )
}

export default StatusIndicator
