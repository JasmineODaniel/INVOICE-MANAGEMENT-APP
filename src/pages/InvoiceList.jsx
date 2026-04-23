import { useState } from 'react'
import { useInvoices } from '../context/InvoiceContext'
import InvoiceCard from '../components/InvoiceCard'
import FilterDropdown from '../components/FilterDropdown'
import EmptyState from '../components/EmptyState'
import InvoiceForm from '../components/InvoiceForm'
import '../styles/invoiceList.css'

function InvoiceList() {
  const { invoices } = useInvoices()
  const [filter, setFilter] = useState('')
  const [showForm, setShowForm] = useState(false)

  const filtered = !filter
    ? invoices
    : invoices.filter(inv => inv.status === filter)

  return (
    <>
      <div className="invoice-list__header">
        <div className="invoice-list__titles">
          <h1>Invoices</h1>
          <p>
            {filtered.length === 0
              ? 'No invoices'
              : `There are ${filtered.length} total invoices`}
          </p>
        </div>
        <div className="invoice-list__controls">
          <FilterDropdown selected={filter} onChange={setFilter} />
          <button
            className="btn-new-invoice"
            onClick={() => setShowForm(true)}
          >
            <span className="btn-new-invoice__icon">
              <svg width="11" height="11" viewBox="0 0 11 11">
                <path d="M6.313 10.023V6.313h3.71V4.688h-3.71V.977H4.688v3.71H.977v1.626h3.71v3.71z"
                  fill="#7C5DFA"/>
              </svg>
            </span>
            New <span style={{display: 'none'}} className="full-text">Invoice</span>
            Invoice
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="invoice-cards">
          {filtered.map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
 
      {showForm && (
        <InvoiceForm
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  )
}

export default InvoiceList
