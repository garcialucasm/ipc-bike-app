import React from "react"
import PropTypes from "prop-types"

function InstructionLabel({ children }: { children: React.ReactNode }) {
  return <h1 className="instruction-label text-start">{children}</h1>
}

InstructionLabel.propTypes = {}

export default InstructionLabel
