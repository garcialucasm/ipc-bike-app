function TextWithBgLabelWeb({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-1 text-pretty rounded-2xl bg-slate-500 bg-opacity-10 p-4">
      {children}
    </div>
  )
}

TextWithBgLabelWeb.propTypes = {}

export default TextWithBgLabelWeb
