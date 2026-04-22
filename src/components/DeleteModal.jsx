import { useEffect, useRef } from 'react'
import '../styles/deleteModal.css'

function DeleteModal({ invoiceId, onConfirm, onCancel }) {
  const cancelBtnRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    cancelBtnRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return
    const focusable = modalRef.current.querySelectorAll('button')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleTabKey}
        ref={modalRef}
      >
        <h2 className="modal__title" id="modal-title">Confirm Deletion</h2>
        <p className="modal__text">
          Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
        </p>
        <div className="modal__actions">
          <button
            className="modal__btn modal__btn--cancel"
            onClick={onCancel}
            ref={cancelBtnRef}
            type="button"
          >
            Cancel
          </button>
          <button
            className="modal__btn modal__btn--delete"
            onClick={onConfirm}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal  