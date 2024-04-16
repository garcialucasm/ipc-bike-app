function SubtitleLabelWeb({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="my-2 w-full text-xl font-bold text-slate-100">
      {children}
    </h2>
  )
}

SubtitleLabelWeb.propTypes = {}

export default SubtitleLabelWeb
