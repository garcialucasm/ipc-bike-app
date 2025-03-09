import { NavigationPaths } from "@/types/NavigationPaths"
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight"
import { House } from "@phosphor-icons/react/dist/ssr/House"
import Link from "next/link"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

function ComponentTitle({ children, ...attributes }: Props) {
  return (
    <>
      <div className="flex w-full items-center space-x-2 align-middle text-xl text-slate-600 font-semibold">
        <Link href={NavigationPaths.homeAppAdmin}>
          <button
            type="button"
            className="horver:border-slate-200 flex items-center rounded-xl border border-slate-200 p-2 text-sm hover:border-slate-200 hover:bg-slate-50 hover:text-blue-600"
            {...attributes}
          >
            <span className="inline-block">
              <House size={20} weight="bold" />
            </span>{" "}
          </button>
        </Link>
        <CaretRight size={16} />
        <h1>{children}</h1>
      </div>
    </>
  )
}

ComponentTitle.propTypes = {}

export default ComponentTitle
