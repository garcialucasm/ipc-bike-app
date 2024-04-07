import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export default function ReturnButton({ children, ...attributes }: Props) {
  return (
    <button
      type="button"
      className="horver:border-slate-200 flex items-center rounded-xl border border-slate-100 bg-slate-100 p-2 text-sm text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-blue-600"
      {...attributes}
    >
      <span className="inline-block">
        <CaretLeft size={16} />
      </span>{" "}
      {children}
    </button>
  )
}
