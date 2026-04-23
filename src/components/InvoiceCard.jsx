import { useNavigate } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { formatDate, formatCurrency } from '../utils/generateId'
import '../styles/invoiceList.css'

function InvoiceCard({ invoice }) {
  const navigate = useNavigate()

  return (
    <div
      className="invoice-card"
      onClick={() => navigate(`/invoice/${invoice.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/invoice/${invoice.id}`)}
    >
      <span className="invoice-card__id">
        <span className="invoice-card__hash">#</span>{invoice.id}
      </span>
      <span className="invoice-card__due">
        <span className="invoice-card__due-label">Due </span>
        <span className="invoice-card__due-date">{formatDate(invoice.paymentDue)}</span>
      </span>
      <span className="invoice-card__client">{invoice.clientName}</span>
      <span className="invoice-card__amount">
        {formatCurrency(invoice.total)}
      </span>
      <StatusBadge status={invoice.status} />
      <svg className="invoice-card__arrow" width="7" height="10" viewBox="0 0 7 10">
        <path d="M1 1l4.228 4.228L1 9.456"
          stroke="#7C5DFA" strokeWidth="2" fill="none"/>
      </svg>
    </div>
  )
}

export default InvoiceCard
