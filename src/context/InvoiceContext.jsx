// src/context/InvoiceContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { sampleInvoices } from '../data/sampleInvoices'

const InvoiceContext = createContext()

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState(() => {
    // Load from localStorage if it exists, otherwise use sample data
    const saved = localStorage.getItem('invoices')
    return saved ? JSON.parse(saved) : sampleInvoices
  })

  // Save to localStorage every time invoices change
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices))
  }, [invoices])

  const addInvoice = (invoice) => {
    setInvoices(prev => [invoice, ...prev])
  }

  const updateInvoice = (id, updatedInvoice) => {
    setInvoices(prev =>
      prev.map(inv => inv.id === id ? { ...inv, ...updatedInvoice } : inv)
    )
  }

  const deleteInvoice = (id) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id))
  }

  const markAsPaid = (id) => {
    setInvoices(prev =>
      prev.map(inv => inv.id === id ? { ...inv, status: 'paid' } : inv)
    )
  }

  return (
    <InvoiceContext.Provider value={{
      invoices,
      addInvoice,
      updateInvoice,
      deleteInvoice,
      markAsPaid
    }}>
      {children}
    </InvoiceContext.Provider>
  )
}

export function useInvoices() {
  return useContext(InvoiceContext)
}