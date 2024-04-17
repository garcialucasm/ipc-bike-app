import { Nut } from "@phosphor-icons/react/dist/ssr/Nut"
import ActionButton from "./modules/ActionButton"

export default function ActionButtonReturnMaintenance({ ...atributes }) {
  return (
    <ActionButton {...atributes}>
      <div className="hover:border-3 border-3 group flex h-7 w-7 items-center justify-center rounded-full border-slate-500 p-1 hover:border-white hover:bg-blue-600 hover:text-white hover:outline hover:outline-blue-600">
        <Nut
          weight="fill"
          size={26}
          className="animate-spin group-hover:animate-none"
        />
      </div>
    </ActionButton>
  )
}
