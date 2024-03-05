import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle"

import ActionButton from "./modules/ActionButton"

export default function ActionButtonConfirm({ ...atributes }) {
  return (
    <ActionButton {...atributes}>
      <CheckCircle
        size={28}
        className="rounded-full hover:border-2 hover:bg-emerald-600 hover:text-white"
      />
    </ActionButton>
  )
}
