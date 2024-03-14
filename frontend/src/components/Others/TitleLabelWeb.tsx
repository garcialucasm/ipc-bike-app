function TitleLabelWeb({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="w-full text-center font-semibold text-slate-100">
      {children}
    </h1>
  )
}

TitleLabelWeb.propTypes = {}

export default TitleLabelWeb
