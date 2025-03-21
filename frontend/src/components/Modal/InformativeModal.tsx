import Modal from "../Modal/Modal"

interface InformativeModalProps {
  modalTitle: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const InformativeModal = ({
  modalTitle,
  isOpen,
  onClose,
  children,
}: InformativeModalProps) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <Modal
      modalTitle={modalTitle}
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className="text-start">{children}</div>
    </Modal>
  )
}

export default InformativeModal
