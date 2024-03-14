import { NavigationPaths } from "@/types/NavigationPaths"
import ContainerSingleComponent from "../Containers/ContainerSingleComponent"

function UnderConstruction() {
  return (
    <ContainerSingleComponent> 
    <div className="flex flex-col gap-y-8 text-left text-slate-800">
      <p className="text-center text-6xl">🏗️</p>
      <p className="border-b border-slate-400 text-xl font-bold">
        Under Construction
      </p>
      <p className="">
        We're working hard to bring you something amazing. Stay tuned!
      </p>
      <p>
        If you have any suggestions, feedback, or encounter any difficulties,
        please feel free to use the link below. 😊
      </p>
      <a
        className="text-sm font-medium text-blue-800 underline hover:text-blue-900"
        href={NavigationPaths.homeWeb}
        target="_blank"
      >
        Link to Feedback Forms
      </a>
    </div>
    </ContainerSingleComponent> 
  )
}

export default UnderConstruction
