import { Wrench } from "@phosphor-icons/react/dist/ssr/Wrench"
import ActionButton from "./modules/ActionButton"

export default function ActionButtonSendMaintenance({ ...atributes }) {
  return (
    <ActionButton {...atributes}>
      <Wrench
      weight="fill"
        size={26}
        className="rounded-full hover:border-3 hover:bg-amber-600 hover:text-white border-3 border-slate-500 p-1 hover:outline hover:outline-amber-600 hover:border-white"
      />
    </ActionButton>
  )
}
