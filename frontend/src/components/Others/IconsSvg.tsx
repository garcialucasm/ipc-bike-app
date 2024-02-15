import React from "react"

// Home
export function IconSvgHome(props: { height?: string; fillColor?: string }) {
  const { height, fillColor } = props
  const width = height
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path
          className="fill-current"
          d="M240-200h133.847v-237.692h212.306V-200H720v-360L480-740.769 240-560v360Zm-59.999 59.999v-449.998L480-815.767l299.999 225.768v449.998H526.154v-237.693h-92.308v237.693H180.001ZM480-470.385Z"
        />
      </svg>
    </>
  )
}

// Single booking
export function IconSvgSingleBooking(props: {
  height?: string
  fillColor?: string
}) {
  const { height, fillColor } = props
  const width = height
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path
          className="fill-current"
          d="M732.308-410.001v-127.307H605v-45.384h127.308v-127.307h45.383v127.307h127.308v45.384H777.691v127.307h-45.383ZM360-492.924q-57.749 0-95.22-37.471t-37.471-95.412q0-57.942 37.471-95.221 37.471-37.278 95.22-37.278t95.22 37.278q37.471 37.279 37.471 95.221 0 57.941-37.471 95.412-37.471 37.471-95.22 37.471ZM60.002-187.694v-75.922q0-30 15.96-55.038 15.962-25.038 45.501-37.884 68.845-30.308 125.044-43.423 56.2-13.115 113.308-13.115 57.108 0 113.185 13.115 56.076 13.115 124.922 43.423 29.538 13.846 45.807 38.384 16.27 24.538 16.27 54.538v75.922H60.001Zm45.383-45.384h509.23v-30.538q0-15.615-9.577-29.923-9.577-14.308-26.116-22.462-64.076-29.923-113.34-40.807Q416.318-367.693 360-367.693q-56.318 0-106.082 10.885-49.764 10.884-113.456 40.807-16.923 8.154-26 22.462-9.077 14.308-9.077 29.923v30.538ZM360-538.307q37.461 0 62.384-24.924 24.923-24.923 24.923-62.384t-24.923-62.384Q397.461-712.922 360-712.922t-62.384 24.923q-24.923 24.923-24.923 62.384t24.923 62.384q24.923 24.924 62.384 24.924Zm0-87.308Zm0 392.537Z"
        />
      </svg>
    </>
  )
}

// Group booking
export function IconSvgGroupBooking(props: {
  height?: string
  fillColor?: string
}) {
  const { height, fillColor } = props
  const width = height
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path
          className="fill-current"
          d="M503.846-494.309q25.539-27.769 37.769-63.768 12.231-36 12.231-74.23 0-38.23-12.231-74.23-12.23-36-37.769-63.769 52.692 6.077 87.5 45.5 34.807 39.422 34.807 92.499 0 53.076-34.807 92.499-34.808 39.423-87.5 45.499Zm210 306.615v-93.845q0-32.709-13.308-62.239-13.307-29.529-37.769-50.683 46 15.308 84.692 41.308 38.692 25.999 38.692 71.614v93.845h-72.307Zm72.307-262.307v-80h-80v-59.998h80v-80h59.998v80h80v59.998h-80v80h-59.998Zm-452.306-42.308q-57.749 0-98.874-41.124-41.124-41.125-41.124-98.874 0-57.75 41.124-98.874 41.125-41.125 98.874-41.125 57.75 0 98.874 41.125 41.125 41.124 41.125 98.874 0 57.749-41.125 98.874-41.124 41.124-98.874 41.124ZM33.849-187.694v-88.922q0-29.384 15.961-54.422 15.962-25.038 42.654-38.5 59.307-29.077 119.653-43.615 60.346-14.538 121.73-14.538 61.384 0 121.73 14.538 60.346 14.538 119.654 43.615 26.692 13.462 42.653 38.5 15.962 25.038 15.962 54.422v88.922H33.849Zm299.998-364.613q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm-240 304.614h480v-28.923q0-12.154-7.038-22.5-7.039-10.346-19.116-16.885-51.692-25.461-105.418-38.577-53.725-13.115-108.428-13.115-54.702 0-108.428 13.115-53.725 13.116-105.418 38.577-12.077 6.539-19.115 16.885-7.039 10.346-7.039 22.5v28.923Zm240-384.614Zm0 384.614Z"
        />
      </svg>
    </>
  )
}

// Become a member
export function IconSvgBecomeMember(props: {
  height?: string
  fillColor?: string
}) {
  const { height, fillColor } = props
  const width = height
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path
          className="fill-current"
          d="M440-501Zm0 354.075-86.612-77.844Q271.771-299 215.656-354.616q-56.116-55.615-90.77-101.577-34.654-45.962-49.77-86.423Q60.003-583.078 60.003-626q0-85.154 57.422-142.269Q174.847-825.384 260-825.384q52.385 0 99 24.501 46.615 24.5 81 70.269 34.385-45.769 81-70.269 46.615-24.501 99-24.501 75.23 0 126.961 44.347 51.73 44.346 67.115 111.038H751Q737.231-714.615 700.693-740 664.154-765.385 620-765.385q-49.846 0-88.192 27.5-38.347 27.5-72.27 77.885h-39.076q-33.693-50.77-73.385-78.077-39.692-27.308-87.077-27.308-57.769 0-98.885 39.692Q120-686 120-626q0 33.384 14 67.769 14 34.385 50 79.269 36 44.885 98 105.154T440-228q28.308-25.308 60.615-53.769 32.308-28.462 54.462-49.616l6.692 6.692 14.692 14.692 14.692 14.692 6.692 6.693q-22.769 21.153-54.269 48.923-31.5 27.769-59.423 53.077L440-146.925Zm274.615-143.076v-120h-120v-59.998h120v-120h59.999v120h120v59.998h-120v120h-59.999Z"
        />
      </svg>{" "}
    </>
  )
}

// Person
export function IconSvgPersonCircle(props: {
  height?: string
  width?: string
  fillColor?: string
  bgColor?: string
}) {
  const { height, width, fillColor, bgColor } = props
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"} ${bgColor} rounded-full`}
      >
        <path
          fillRule="evenodd"
          d="M222-255q63-40 124.5-60.5T480-336q72 0 134 20.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm-.219 370q-83.146 0-156.275-31.5t-127.225-86Q142-252 111-324.841 80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.5q-54 54.5-127.129 86T479.595-80Z"
          clipRule="evenodd"
        />
      </svg>
    </>
  )
}

// email
export function IconSvgEmail(props: {
  height?: string
  width?: string
  fillColor?: string
}) {
  const { height, width, fillColor } = props
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302 340-223v-55L480-522 140-740v55l340 223Z" />
      </svg>
    </>
  )
}

// password
export function IconSvgPassword(props: {
  height?: string
  width?: string
  fillColor?: string
}) {
  const { height, width, fillColor } = props
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path
          fillRule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clipRule="evenodd"
        />
      </svg>
    </>
  )
}

// Fingerprint
export function IconSvgFingerprint(props: {
  height?: string
  width?: string
  fillColor?: string
}) {
  const { height, width, fillColor } = props
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
        />
      </svg>
    </>
  )
}

// Person
export function IconSvgPersonFilled(props: {
  height?: string
  width?: string
  fillColor?: string
}) {
  const { height, width, fillColor } = props
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    </>
  )
}

// Person
export function IconSvgPersonThin(props: {
  height?: string
  width?: string
  fillColor?: string
}) {
  const { height, width, fillColor } = props
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path d="M480-504.615q-49.5 0-84.75-35.25T360-624.615q0-49.501 35.25-84.751 35.25-35.25 84.75-35.25t84.75 35.25Q600-674.116 600-624.615q0 49.5-35.25 84.75T480-504.615ZM200-215.384v-65.847q0-24.769 14.423-46.346 14.423-21.577 38.808-33.5 56.615-27.154 113.307-40.731Q423.231-415.385 480-415.385q56.769 0 113.462 13.577 56.692 13.577 113.307 40.731 24.385 11.923 38.808 33.5Q760-306 760-281.231v65.847H200Zm40-40.001h480v-25.846q0-13.307-8.577-25-8.577-11.692-23.731-19.769-49.384-23.923-101.836-36.654Q533.405-375.385 480-375.385q-53.405 0-105.856 12.731Q321.692-349.923 272.308-326q-15.154 8.077-23.731 19.769-8.577 11.693-8.577 25v25.846Zm240-289.23q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.23Z" />
      </svg>
    </>
  )
}

// Person
export function IconSvgPerson(props: {
  height?: string
  width?: string
  fillColor?: string
}) {
  const { height, width, fillColor } = props
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path d="M480-492.309q-57.749 0-98.874-41.124-41.125-41.125-41.125-98.874 0-57.75 41.125-98.874 41.125-41.125 98.874-41.125 57.749 0 98.874 41.125 41.125 41.124 41.125 98.874 0 57.749-41.125 98.874-41.125 41.124-98.874 41.124ZM180.001-187.694v-88.922q0-29.384 15.962-54.422 15.961-25.038 42.653-38.5 59.308-29.077 119.654-43.615T480-427.691q61.384 0 121.73 14.538 60.346 14.538 119.654 43.615 26.692 13.462 42.653 38.5 15.962 25.038 15.962 54.422v88.922H180.001ZM240-247.693h480v-28.923q0-12.154-7.039-22.5-7.038-10.346-19.115-16.885-51.692-25.461-105.418-38.577Q534.702-367.693 480-367.693t-108.428 13.115q-53.726 13.116-105.418 38.577-12.077 6.539-19.115 16.885Q240-288.77 240-276.616v28.923Zm240-304.614q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 384.614Z" />
      </svg>
    </>
  )
}

// Room door
export function IconSvgRoomDoor(props: {
  height?: string
  width?: string
  fillColor?: string
}) {
  const { height, width, fillColor } = props
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path d="M120-120v-80h80v-640h400v40h160v600h80v80H680v-600h-80v600H120Zm320-320q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440Z" />
      </svg>
    </>
  )
}

// loading animation
export function IconSvgLoader(props: { height?: string; fillColor?: string }) {
  const { height, fillColor } = props
  const width = height
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <g stroke="currentColor">
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill="none"
            strokeLinecap="round"
            strokeWidth="3"
          >
            <animate
              attributeName="stroke-dasharray"
              calcMode="spline"
              dur="1.5s"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
              keyTimes="0;0.475;0.95;1"
              repeatCount="indefinite"
              values="0 150;42 150;42 150;42 150"
            />
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="1.5s"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
              keyTimes="0;0.475;0.95;1"
              repeatCount="indefinite"
              values="0;-16;-59;-59"
            />
          </circle>
          <animateTransform
            attributeName="transform"
            dur="2s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </g>
      </svg>
    </>
  )
}

// confirmation icon
export function IconSvgProcessConfirmed(props: {
  height?: string
  width?: string
  fillColor?: string
}) {
  const { height, width, fillColor } = props
  return (
    <>
      <div className="rounded-full border-2 border-green-500 p-1">
        <svg
          height={height}
          width={width}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 12"
        >
          <path
            className={fillColor ?? "fill-current"}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5.917 5.724 10.5 15 1.5"
          />
        </svg>
      </div>
    </>
  )
}

// feedback error icon
export function IconSvgFeedbackError(props: {
  height?: string
  width?: string
  fillColor?: string
}) {
  const { height, width, fillColor } = props
  return (
    <>
      <div className="">
        <svg
          height={height}
          width={width}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-2 -2 28 28"
        >
          <path
            className={fillColor ?? "fill-current"}
            fill={fillColor ?? "currentColor"}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="m15.828,6.854l-3.146,3.146,3.146,3.146c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-3.146-3.146-3.146,3.146c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l3.146-3.146-3.146-3.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l3.146,3.146,3.146-3.146c.195-.195.512-.195.707,0s.195.512,0,.707Zm8.172-3.354v13c0,1.93-1.57,3.5-3.5,3.5h-3.532l-3.985,3.295c-.275.245-.626.368-.979.368-.356,0-.715-.126-1.001-.379l-3.897-3.284h-3.606c-1.93,0-3.5-1.57-3.5-3.5V3.5C0,1.57,1.57,0,3.5,0h17c1.93,0,3.5,1.57,3.5,3.5Zm-1,0c0-1.378-1.122-2.5-2.5-2.5H3.5c-1.378,0-2.5,1.122-2.5,2.5v13c0,1.378,1.122,2.5,2.5,2.5h3.789c.118,0,.232.042.322.118l4.047,3.41c.198.176.485.178.675.008l4.137-3.421c.09-.074.203-.115.319-.115h3.711c1.378,0,2.5-1.122,2.5-2.5V3.5Z"
          />
        </svg>
      </div>
    </>
  )
}

// bike standard icon
export function IconSvgBikeStandard(props: {
  height?: string
  width?: string
  fillColor?: string
}) {
  const { height, width, fillColor } = props
  return (
    <>
      <div>
        <svg
          height={height}
          width={width}
          viewBox="0 0 513 513"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <path
            className={fillColor ?? "fill-current"}
            d="m416.667 224.936c-7.701 0-15.189.924-22.365 2.656l-37.915-90.996 32.891-10.963c7.859-2.62 12.106-11.115 9.486-18.974-2.62-7.858-11.11-12.109-18.974-9.486l-49.225 16.451c-7.647 3.187-11.263 11.968-8.077 19.615l9.425 22.619-131.473 34.182-13.504-31.504h20.864c8.284 0 15-6.716 15-15s-6.716-15-15-15h-64.267c-8.284 0-15 6.716-15 15s6.716 15 15 15h10.763l19.972 46.594-29.072 33.918c-14.516-8.944-31.596-14.112-49.862-14.112-52.567 0-95.334 42.766-95.334 95.333s42.767 95.333 95.333 95.333c47.464 0 86.933-34.868 94.149-80.333h50.45c4.792 0 9.296-2.29 12.12-6.163l96.756-132.695 17.812 42.75c-27.158 16.818-45.289 46.883-45.289 81.107 0 52.567 42.766 95.333 95.333 95.333s95.336-42.765 95.336-95.332-42.767-95.333-95.333-95.333zm-321.334 160.667c-36.024 0-65.333-29.309-65.333-65.334s29.309-65.333 65.333-65.333c10.802 0 20.991 2.651 29.976 7.313l-41.365 48.259c-3.813 4.448-4.687 10.708-2.239 16.03s7.77 8.732 13.628 8.732h63.575c-6.798 28.815-32.712 50.333-63.575 50.333zm32.614-80.334 59.492-69.408 29.746 69.408zm115.392-15.131-30.946-72.209 103.155-26.821zm173.328 95.465c-36.025 0-65.333-29.309-65.333-65.333 0-21.731 10.675-41.006 27.045-52.89l24.441 58.659c3.186 7.647 11.969 11.263 19.615 8.077 7.647-3.187 11.263-11.968 8.077-19.615l-24.454-58.69c3.455-.567 6.995-.875 10.608-.875 36.025 0 65.333 29.309 65.333 65.333s-29.308 65.334-65.332 65.334z"
          />
        </svg>
      </div>
    </>
  )
}

// bike booked icon
export function IconSvgBikeBooked(props: {
  height?: string
  width?: string
  customClass?: string
  fillColor1?: string
  fillColor2?: string
  fillColor3?: string
  fillColor4?: string
}) {
  const {
    height,
    width,
    fillColor1,
    fillColor2,
    fillColor3,
    fillColor4,
    customClass,
  } = props
  return (
    <>
      <svg
        height={height}
        width={width}
        className={customClass}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            className={fillColor1 ?? "fill-current"}
            d="m465.181 34.002h-198.356c-25.818 0-46.822 21.004-46.822 46.822v114.186l-70.085.034 13.291-39.225c1.552-4.579.801-9.625-2.016-13.554s-7.356-6.259-12.19-6.259h-60.5c-19.881.738-19.866 29.269 0 30h39.579l-27.119 80.035c-52.306-8.56-101.436 33.387-100.96 86.465 4.396 115.914 170.616 115.897 175-.001 0-33.091-18.467-61.949-45.635-76.815l8.274-24.42 82.36 94.086v105.824c0 25.818 21.004 46.822 46.822 46.822h198.356c25.818 0 46.822-21.004 46.822-46.822v-350.356c.001-25.818-21.003-46.822-46.821-46.822zm-320.178 298.504c-2.892 76.177-112.12 76.158-115.001-.001-.123-32.957 28.219-59.586 61.104-57.375l-17.81 52.562c-2.659 7.846 1.547 16.362 9.393 19.021 7.635 2.65 16.377-1.473 19.021-9.393l17.807-52.554c15.36 10.334 25.486 27.876 25.486 47.74zm274.191-268.504-10.75 30h-84.894l-10.742-30zm-247.139 161.031 47.948-.023v54.798zm309.948 206.146c0 9.276-7.546 16.822-16.822 16.822h-198.356c-9.276 0-16.822-7.546-16.822-16.822v-350.355c0-9.275 7.546-16.822 16.822-16.822h14.118l17.924 50.057c2.136 5.963 7.788 9.943 14.122 9.943h106.013c6.333 0 11.984-3.978 14.121-9.94l17.939-50.06h14.119c9.276 0 16.822 7.546 16.822 16.822z"
          />
          <path
            className={`animate-pulse ${fillColor2 ?? "fill-current"}`}
            d="m407.503 318.001h-83c-59.632 2.27-59.587 87.752 0 90h83c59.632-2.269 59.586-87.752 0-90zm0 60h-83c-19.878-.757-19.862-29.251 0-30h83c19.877.756 19.862 29.251 0 30z"
          />
          <path
            className={`${fillColor3 ?? "fill-current"}`}
            d="m295.368 206.001h141.27c19.881-.738 19.866-29.269 0-30h-141.27c-19.881.738-19.866 29.269 0 30z"
          />
          <path
            className={`${fillColor4 ?? "fill-current"}`}
            d="m317.493 236.002c-19.881.738-19.866 29.269 0 30h97.02c19.881-.738 19.866-29.269 0-30z"
          />
        </g>
      </svg>
    </>
  )
}

// bike booked icon 2
export function IconSvgBikeBooked2(props: {
  height?: string
  width?: string
  fillColor1?: string
  fillColor2?: string
  fillColor3?: string
}) {
  const { height, width, fillColor1, fillColor2, fillColor3 } = props
  return (
    <>
      <svg
        height={height}
        width={width}
        viewBox="0 0 511.985 511.985"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            className={fillColor1 ?? "fill-current"}
            d="m409.545 328.985c-6.183 0-12.223.62-18.066 1.795l-27.682-72.794h38.748c19.881-.738 19.866-29.269 0-30h-60.5c-4.932 0-9.549 2.424-12.349 6.485-2.8 4.06-3.425 9.237-1.672 13.847l14.732 38.739c-.256-.013-144.22-.068-144.22-.068l-9.141-17.844c-2.566-5.01-7.721-8.161-13.35-8.161h-32.501c-19.881.738-19.866 29.269 0 30h23.332l6.738 13.153-27.438 35.672c-59.262-32.905-135.564 12.532-134.63 80.678 3.057 112.273 160.874 124.393 181.763 14.999h63.736c4.835 0 9.373-2.33 12.19-6.259l83.37-116.27 10.844 28.516c-79.518 46.581-47.362 169.901 46.097 170.513 121.216-4.599 121.189-178.419-.001-183.001zm-184.012 76.5h-32.224c-3.003-18.131-11.353-34.478-23.373-47.362l18.808-24.452zm-74.262-23.096c5.314 6.713 9.265 14.548 11.416 23.096h-29.181zm-48.226 99.596c-33.911 0-61.5-27.589-61.5-61.5-.723-43.487 46.546-74.365 85.966-56.41l-36.356 47.265c-7.594 9.661-.394 24.275 11.89 24.145h59.642c-6.714 26.684-30.904 46.5-59.642 46.5zm152.071-84.551-41.209-80.443 98.87.029zm154.429 84.551c-60.163-.213-83.892-77.981-35.207-111.881l21.187 55.713c2.938 7.822 11.81 11.616 19.353 8.689 7.743-2.945 11.633-11.609 8.688-19.352l-21.196-55.737c36.153-4.508 68.924 24.618 68.675 61.068 0 33.911-27.589 61.5-61.5 61.5z"
          />
          <path
            className={fillColor2 ?? "fill-current"}
            d="m256.294 227.985c60.496 1.213 114.084-51.4 113.98-111.907.152-8.283-6.438-15.121-14.722-15.273-8.249-.127-15.12 6.439-15.272 14.722-6.345 110.069-163.858 108.828-167.986-1.543-.581-67.509 78.172-108.002 132.644-68.489-4.411 1.798-7.898 5.657-9.002 10.661-1.783 8.09 3.329 16.094 11.42 17.877l28.308 6.24c4.249.942 8.763-.027 12.267-2.677 3.501-2.643 5.669-6.686 5.935-11.064l1.784-29.445c.501-8.269-5.796-15.378-14.065-15.88-4.875-.288-9.331 1.787-12.282 5.222-72.716-61.789-187.753-8.139-187.006 87.557-.003 62.859 51.137 113.999 113.997 113.999z"
          />
          <path
            className={fillColor3 ?? "fill-current"}
            d="m256.231 61.986c-8.284 0-15 6.716-15 15v37c0 3.978 1.581 7.793 4.393 10.606l14.5 14.5c2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.393c5.858-5.858 5.858-15.355 0-21.213l-10.106-10.107v-30.787c.001-8.285-6.715-15-14.999-15z"
          />
        </g>
      </svg>
    </>
  )
}

// bike in use icon
export function IconSvgBikeInUse(props: {
  height?: string
  width?: string
  fillColor1?: string
  fillColor2?: string
}) {
  const { height, width, fillColor1, fillColor2 } = props
  return (
    <>
      <svg
        height={height}
        width={width}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
          <path
            className={fillColor1 ?? "fill-current "}
            d="M3117 4490 c-118 -37 -210 -119 -264 -236 -25 -53 -28 -70 -28 -169 0 -93 3 -118 23 -159 l22 -49 -49 46 c-115 107 -272 141 -426 90 -71 -23 -1020 -658 -1069 -714 -150 -176 -136 -435 33 -592 65 -59 55 -55 601 -280 l275 -114 5 -439 c6 -490 5 -483 77 -543 101 -83 254 -56 320 57 l28 47 3 504 c3 587 3 591 -67 660 -41 40 -73 57 -254 130 -114 47 -204 88 -200 91 12 10 604 390 608 390 2 0 57 -93 121 -207 152 -271 157 -278 217 -308 88 -44 176 -29 248 41 l37 36 32 -97 c18 -53 28 -100 24 -104 -5 -4 -132 -31 -281 -60 l-273 -53 0 -110 c0 -109 0 -110 23 -105 78 19 289 58 296 55 5 -2 -65 -68 -155 -148 l-164 -145 0 -144 0 -145 33 31 c96 91 611 543 618 543 7 0 52 -132 46 -135 -166 -93 -257 -173 -342 -300 -93 -141 -136 -285 -137 -460 -2 -241 80 -443 247 -610 226 -227 557 -307 863 -210 160 51 331 175 427 310 56 78 117 208 139 295 27 104 31 250 11 355 -35 187 -115 335 -253 467 -178 170 -395 249 -644 234 l-107 -6 -132 402 c-154 471 -147 458 -257 458 -44 0 -73 5 -80 13 -5 6 -89 154 -187 327 -97 173 -187 331 -198 350 l-21 35 49 -44 c118 -103 270 -136 417 -91 122 38 233 144 275 263 25 72 25 215 -1 282 -83 219 -313 334 -529 265z m983 -2482 c25 -6 83 -28 129 -50 144 -69 273 -216 325 -372 79 -236 3 -513 -186 -681 -63 -55 -188 -119 -277 -141 -88 -22 -252 -15 -341 14 -185 61 -337 209 -408 400 -33 90 -42 257 -18 352 29 115 90 225 170 304 39 39 90 81 113 94 l42 23 101 -308 c69 -209 109 -315 124 -331 14 -14 40 -26 64 -29 37 -5 45 -2 77 30 26 26 35 43 35 69 0 18 -45 168 -99 333 l-99 300 31 7 c39 8 155 1 217 -14z"
          />
          <path
            className={fillColor1 ?? "fill-current"}
            d="M1125 2225 c-468 -89 -775 -546 -679 -1013 64 -313 310 -568 629 -653 112 -30 298 -30 410 0 302 80 533 306 615 602 l19 70 -30 47 c-51 80 -59 126 -59 331 l0 186 -35 52 c-19 29 -35 56 -35 61 0 4 16 23 35 42 l35 34 0 92 0 92 -42 17 -41 16 -71 -70 -71 -69 -86 52 c-180 109 -392 149 -594 111z m319 -221 c57 -15 134 -49 184 -82 23 -15 22 -17 -207 -246 -126 -127 -235 -244 -241 -260 -15 -41 4 -93 44 -117 29 -18 53 -19 359 -19 l327 0 -6 -27 c-47 -216 -214 -402 -424 -474 -89 -30 -249 -37 -345 -15 -180 43 -344 172 -424 336 -69 141 -87 280 -55 423 58 258 269 456 529 496 73 12 179 5 259 -15z m390 -298 c24 -41 76 -182 76 -205 0 -8 -61 -11 -187 -11 l-188 0 130 130 c71 72 133 130 136 130 4 0 19 -20 33 -44z"
          />
          <path
            className={`animate-pulse ${fillColor2 ?? "fill-current"}`}
            d="M478 4463 c-56 -35 -66 -117 -19 -164 l29 -29 792 0 792 0 29 29 c48 49 34 142 -26 169 -19 9 -220 12 -798 12 -701 -1 -774 -2 -799 -17z"
          />
          <path
            className={`animate-pulse ${fillColor2 ?? "fill-current"}`}
            d="M478 3823 c-56 -35 -66 -117 -19 -164 l29 -29 415 0 c400 0 415 1 440 20 38 30 52 80 33 123 -27 67 -29 67 -473 67 -353 -1 -401 -2 -425 -17z"
          />
          <path
            className={`animate-pulse ${fillColor2 ?? "fill-current"}`}
            d="M478 3183 c-56 -36 -66 -117 -19 -164 l29 -29 196 0 c122 0 204 4 220 11 60 28 71 122 20 170 -25 23 -30 24 -222 27 -171 2 -201 0 -224 -15z"
          />
        </g>
      </svg>
    </>
  )
}
// bike maintenance icon
export function IconSvgBikeDisabled(props: {
  height?: string
  width?: string
  fillColor1?: string
  fillColor2?: string
}) {
  const { height, width, fillColor1, fillColor2 } = props
  return (
    <>
      <svg
        height={height}
        width={width}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={fillColor1 ?? "fill-current"}
          d="M40,47a7.953,7.953,0,0,0-3.74.933l-6.222-7.259L30.811,37H34V35H26v2h2.768l-.632,3H14.544l1.2-4H22V34H15a1,1,0,0,0-.958.713L10.32,47.118a7.987,7.987,0,1,0,1.917.572l1.37-4.566,9.031,9.725a3.97,3.97,0,0,0,1.191,5.5L23.279,60H21v2h6V60H25.388l.342-1.027c.091.006.178.027.27.027a4,4,0,0,0,3.858-3h2.211A8,8,0,1,0,40,47ZM25.816,51.019a3.941,3.941,0,0,0-1.7.477L15.294,42H27.715ZM32.069,54H29.858a3.994,3.994,0,0,0-2.085-2.567l1.745-8.292,5.1,5.954A7.981,7.981,0,0,0,32.069,54Z"
        />
        <path
          className={fillColor2 ?? "fill-current"}
          d="M46,3A15,15,0,0,0,34.4,27.5a1,1,0,0,1,.175.95l-.989,2.967,3.207-1.068A.987.987,0,0,1,37.1,30.3a1,1,0,0,1,.557.17A14.92,14.92,0,0,0,43,32.691v-8.2A8.666,8.666,0,0,1,43,8v8.082L46,19l3-2.918V8a8.666,8.666,0,0,1,0,16.491V32.7A15,15,0,0,0,46,3Z"
        />
      </svg>
    </>
  )
}

// Delete with Circle
export function IconSvgDeleteCircle(props: {
  height?: string
  fillColor?: string
}) {
  const { height, fillColor } = props
  const width = height
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path
          className="fill-current"
          d="M256-213.847 213.847-256l224-224-224-224L256-746.153l224 224 224-224L746.153-704l-224 224 224 224L704-213.847l-224-224-224 224Z"
        />
      </svg>{" "}
    </>
  )
}

// Ellipsis with Circle
export function IconSvgEllipsisCircle(props: {
  height?: string
  fillColor?: string
}) {
  const { height, fillColor } = props
  const width = height
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path
          className="fill-current"
          d="M249.231-420.001q-24.749 0-42.374-17.625-17.624-17.625-17.624-42.374 0-24.749 17.624-42.374 17.625-17.625 42.374-17.625 24.75 0 42.374 17.625Q309.23-504.749 309.23-480q0 24.749-17.625 42.374-17.624 17.625-42.374 17.625Zm230.769 0q-24.749 0-42.374-17.625-17.625-17.625-17.625-42.374 0-24.749 17.625-42.374 17.625-17.625 42.374-17.625 24.749 0 42.374 17.625 17.625 17.625 17.625 42.374 0 24.749-17.625 42.374-17.625 17.625-42.374 17.625Zm230.769 0q-24.75 0-42.374-17.625Q650.77-455.251 650.77-480q0-24.749 17.625-42.374 17.624-17.625 42.374-17.625 24.749 0 42.374 17.625 17.624 17.625 17.624 42.374 0 24.749-17.624 42.374-17.625 17.625-42.374 17.625Z"
        />
      </svg>{" "}
    </>
  )
}

// Approval with Circle
export function IconSvgApprovalCircle(props: {
  height?: string
  fillColor?: string
}) {
  const { height, fillColor } = props
  const width = height
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        height={height}
        width={width}
        className={`${fillColor ?? "fill-current"}`}
      >
        <path
          className="fill-current"
          d="M382-253.847 168.616-467.231l42.769-42.768L382-339.384l366.615-366.615 42.769 42.768L382-253.847Z"
        />
      </svg>{" "}
    </>
  )
}
