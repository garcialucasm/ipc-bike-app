import React from "react"
import { IconSvgLoader } from "./IconsSvg"

interface Props {
  bgColor?: string
}

function LoadingComponent({ bgColor }: Props) {
  return (
    <div className={`container-page-webapp my-8 ${bgColor}`}>
      <div className={`container-subpage-webapp`}>
        {/* ------------------------- render when is loading ------------------------- */}
        {<IconSvgLoader height={"48"} fillColor="text-blue-800" />}
      </div>
    </div>
  )
}

export default LoadingComponent
