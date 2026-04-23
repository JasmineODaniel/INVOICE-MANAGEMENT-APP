import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useInvoices } from '../context/InvoiceContext'
import StatusBadge from '../components/StatusBadge'
import DeleteModal from '../components/DeleteModal'
import InvoiceForm from '../components/InvoiceForm'
import { formatDate, formatCurrency } from '../utils/generateId'
import '../styles/invoiceDetail.css'

function InvoiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { invoices, deleteInvoice, markAsPaid } = useInvoices()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const invoice = invoices.find(inv => inv.id === id)

  if (!invoice) {
    return (
      <div className="invoice-detail__not-found">
        <p>Invoice not found.</p>
        <button onClick={() => navigate('/')} className="detail-btn detail-btn--edit">
          Go Back
        </button>
      </div>
    )
  }

  const handleDelete = () => {
    deleteInvoice(invoice.id)
    navigate('/')
  }

  const handleMarkAsPaid = () => {
    markAsPaid(invoice.id)
  }

  return (
    <>
      <div className="invoice-detail">
        <button
          className="invoice-detail__back"
          onClick={() => navigate('/')}
        >
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
            <path d="M6.342 1L2.114 5.228 6.342 9.456"
              stroke="#7C5DFA" strokeWidth="2" fill="none"/>
          </svg>
          Go back
        </button>
        <div className="invoice-detail__status-bar">
          <div className="invoice-detail__status-left">
            <span className="invoice-detail__status-label">Status</span>
            <StatusBadge status={invoice.status} />
          </div>
          <div className="invoice-detail__actions">
            <button
              className="detail-btn detail-btn--edit"
              onClick={() => setShowEditForm(true)}
            >
              Edit
            </button>
            <button
              className="detail-btn detail-btn--delete"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
            {invoice.status === 'pending' && (
              <button
                className="detail-btn detail-btn--paid"
                onClick={handleMarkAsPaid}
              >
                Mark as Paid
              </button>
            )}
            {invoice.status === 'draft' && (
              <button
                className="detail-btn detail-btn--paid"
                onClick={() => markAsPaid(invoice.id)}
              >
                Mark as Pending
              </button>
            )}
          </div>
        </div>
        <div className="invoice-detail__body">
          <div className="invoice-detail__top">
            <div>
              <h2 className="invoice-detail__id">
                <span className="invoice-detail__hash">#</span>{invoice.id}
              </h2>
              <p className="invoice-detail__description">{invoice.description}</p>
            </div>
            <address className="invoice-detail__sender-address">
              <span>{invoice.senderAddress.street}</span>
              <span>{invoice.senderAddress.city}</span>
              <span>{invoice.senderAddress.postCode}</span>
              <span>{invoice.senderAddress.country}</span>
            </address>
          </div>
          <div className="invoice-detail__meta">
            <div className="invoice-detail__meta-group">
              <p className="invoice-detail__meta-label">Invoice Date</p>
              <p className="invoice-detail__meta-value">
                {formatDate(invoice.invoiceDate)}
              </p>
              <p className="invoice-detail__meta-label" style={{marginTop: '32px'}}>
                Payment Due
              </p>
              <p className="invoice-detail__meta-value">
                {formatDate(invoice.paymentDue)}
              </p>
            </div>
            <div className="invoice-detail__meta-group">
              <p className="invoice-detail__meta-label">Bill To</p>
              <p className="invoice-detail__meta-value">{invoice.clientName}</p>
              <address className="invoice-detail__client-address">
                <span>{invoice.clientAddress.street}</span>
                <span>{invoice.clientAddress.city}</span>
                <span>{invoice.clientAddress.postCode}</span>
                <span>{invoice.clientAddress.country}</span>
              </address>
            </div>
            <div className="invoice-detail__meta-group">
              <p className="invoice-detail__meta-label">Sent To</p>
              <p className="invoice-detail__meta-value">{invoice.clientEmail}</p>
            </div>
          </div>
          <div className="invoice-detail__items">
            <div className="invoice-detail__items-header">
              <span>Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>
            {invoice.items.map((item, index) => (
              <div key={index} className="invoice-detail__item-row">
                <span className="invoice-detail__item-name">{item.name}</span>
                <span className="invoice-detail__item-mobile-meta">
                  {item.qty} x {formatCurrency(item.price)}
                </span>
                <span className="invoice-detail__item-qty text-center">
                  {item.qty}
                </span>
                <span className="invoice-detail__item-price text-right">
                  {formatCurrency(item.price)}
                </span>
                <span className="invoice-detail__item-total text-right">
                  {formatCurrency(item.total)}
                </span>
              </div>
            ))}
          </div>
          <div className="invoice-detail__total">
            <span className="invoice-detail__total-label">Amount Due</span>
            <span className="invoice-detail__total-amount">
              {formatCurrency(invoice.total)}
            </span>
          </div>
        </div>
        <div className="invoice-detail__mobile-footer">
          <button
            className="detail-btn detail-btn--edit"
            onClick={() => setShowEditForm(true)}
          >
            Edit
          </button>
          <button
            className="detail-btn detail-btn--delete"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
          {invoice.status === 'pending' && (
            <button
              className="detail-btn detail-btn--paid"
              onClick={handleMarkAsPaid}
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModal
          invoiceId={invoice.id}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showEditForm && (
        <InvoiceForm
          invoiceToEdit={invoice}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  )
}

export default InvoiceDetail
