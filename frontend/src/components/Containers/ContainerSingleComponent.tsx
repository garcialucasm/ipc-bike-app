interface Props {
  children: React.ReactNode
  hasBgColor?: boolean
}

function ContainerSingleComponent({ children, hasBgColor }: Props) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center rounded-2xl p-8 gap-y-4 ${!hasBgColor && "bg-component-color"} `}
    >
      {children}
    </div>
  )
}

export default ContainerSingleComponent
