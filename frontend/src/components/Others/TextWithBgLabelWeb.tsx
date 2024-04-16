function TextWithBgLabelWeb({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-slate-900 p-4 rounded-2xl gap-y-1">
      {children}
    </div>
  )
}

TextWithBgLabelWeb.propTypes = {}

export default TextWithBgLabelWeb
