interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function ActionButton({ children, ...attributes }: Props) {
  return (
    <button
      type="button"
      {...attributes}
      className="rounded-full text-slate-500"
    >
      {children}
    </button>
  )
}
