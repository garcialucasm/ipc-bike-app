import { useRef, useEffect } from "react"
import TitleLabel from "../Others/TitleLabel"
import { X } from "@phosphor-icons/react/dist/ssr/X"

interface ModalProps {
  modalTitle: string
  isOpen: boolean
  hasCloseBtn?: boolean
  onClose?: () => void
  children: React.ReactNode
}

const Modal = ({
  modalTitle,
  isOpen,
  onClose,
  hasCloseBtn = true,
  children,
}: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const handleCloseModal = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal()
    }
  }

  useEffect(() => {
    const modalElement = modalRef.current
    if (!modalElement) return

    // Open modal when 'isOpen' changes to true
    if (isOpen) {
      modalElement.showModal()
    } else {
      modalElement.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={modalRef}
      className="modal-blur fixed left-1/2 top-1/2 z-50 m-1 h-full w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 transform space-y-8 divide-y divide-solid divide-slate-300 overflow-hidden rounded-lg border-0 bg-white p-8 pb-12"
      onKeyDown={handleKeyDown}
    >
      {hasCloseBtn && (
        <div className="flex text-left">
          <TitleLabel>{modalTitle}</TitleLabel>
          <button onClick={handleCloseModal} aria-label="Close modal">
            <X size={32} />
          </button>
        </div>
      )}
      <div className="h-full overflow-y-scroll px-2 pb-16">{children}</div>
    </dialog>
  )
}

export default Modal
