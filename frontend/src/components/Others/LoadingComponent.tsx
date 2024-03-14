import { IconSvgLoader } from "./IconsSvg"
import ContainerSingleComponent from "../Containers/ContainerSingleComponent"

function LoadingComponent() {
  return (
    <ContainerSingleComponent>
      {<IconSvgLoader height={"48"} fillColor="text-blue-800" />}
    </ContainerSingleComponent>
  )
}

export default LoadingComponent
