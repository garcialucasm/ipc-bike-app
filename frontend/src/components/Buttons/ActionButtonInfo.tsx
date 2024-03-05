import { Info } from "@phosphor-icons/react/dist/ssr/Info"

import ActionButton from "./modules/ActionButton"

export default function ActionButtonInfo({ ...atributes }) {
  return (
    <ActionButton {...atributes}>
      <Info
        size={28}
        className="rounded-full hover:border-2 hover:bg-blue-600 hover:text-white"
      />
    </ActionButton>
  )
}
