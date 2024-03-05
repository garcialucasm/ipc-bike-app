import { XCircle } from "@phosphor-icons/react/dist/ssr/XCircle"

import ActionButton from "./modules/ActionButton"

export default function ActionButtonCancel({ ...atributes }) {
  return (
    <ActionButton {...atributes}>
      <XCircle
        size={28}
        className="rounded-full hover:border-2 hover:bg-rose-600 hover:text-white"
      />
    </ActionButton>
  )
}
