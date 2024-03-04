import React from "react"
import { CheckCircle } from "@phosphor-icons/react"

import ActionButton from "./modules/ActionButton"

export default function ActionButtonConfirm({ ...atributes }) {
  return (
    <ActionButton {...atributes}>
      <CheckCircle
        size={32}
        className="rounded-full hover:border-2 hover:bg-emerald-600 hover:text-white"
      />
    </ActionButton>
  )
}
