function InstructionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="w-full text-start font-semibold text-slate-700">
      {children}
    </h1>
  )
}

InstructionLabel.propTypes = {}

export default InstructionLabel
