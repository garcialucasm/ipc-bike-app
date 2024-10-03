import React, { useState, useEffect } from "react"

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    // Set the initial countdown duration (e.g., 1 minute = 60 seconds)
    const countdownDuration = 7200
    setTimeLeft(countdownDuration)

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId)
          return 0 // Ensure time doesn't go below 0
        }
        return prevTime - 1
      })
    }, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  // Calculate hours, minutes, and seconds
  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0")
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")

  return (
    <div className="count-down-main flex w-full items-center justify-center gap-6">
      <div className="timer">
        <div className="before:contents-[''] relative w-max pl-2 pr-1.5 before:absolute before:left-1/2 before:top-0 before:z-10 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-white">
          <h3 className="countdown-element hours font-manrope relative z-20 max-w-[44px] text-center text-2xl font-semibold tracking-[15.36px] text-indigo-600">
            {hours}
          </h3>
        </div>
        <p className="mt-1 w-full text-center text-sm font-normal text-gray-900">
          hours
        </p>
      </div>
      <div className="timer">
        <div className="before:contents-[''] relative w-max pl-2 pr-1.5 before:absolute before:left-1/2 before:top-0 before:z-10 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-white">
          <h3 className="countdown-element minutes font-manrope relative z-20 max-w-[44px] text-center text-2xl font-semibold tracking-[15.36px] text-indigo-600">
            {minutes}
          </h3>
        </div>
        <p className="mt-1 w-full text-center text-sm font-normal text-gray-900">
          minutes
        </p>
      </div>
      <div className="timer">
        <div className="before:contents-[''] relative w-max pl-2 pr-1.5 before:absolute before:left-1/2 before:top-0 before:z-10 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-white">
          <h3 className="countdown-element seconds font-manrope relative z-20 max-w-[44px] text-center text-2xl font-semibold tracking-[15.36px] text-indigo-600">
            {seconds}
          </h3>
        </div>
        <p className="mt-1 w-full text-center text-sm font-normal text-gray-900">
          seconds
        </p>
      </div>
    </div>
  )
}

export default Countdown
