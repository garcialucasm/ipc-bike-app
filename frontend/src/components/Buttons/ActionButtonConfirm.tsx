import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import ActionButton from "./modules/ActionButton"

export default function ActionButtonConfirm({
  disabled = false,
  ...attributes
}) {
  return (
    <ActionButton {...attributes} disabled={disabled}>
      <CheckCircle
        size={32}
        className={`rounded-full ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-2 hover:bg-emerald-600 hover:text-white"}`}
      />
    </ActionButton>
  )
}
