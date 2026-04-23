import { createContext, useContext, useEffect, useState } from 'react'
import { sampleInvoices } from '../data/sampleInvoices'

const InvoiceContext = createContext()
const INVOICES_STORAGE_KEY = 'invoices'
const INVOICES_VERSION_KEY = 'invoices_version'
const DESIGN_DATA_VERSION = 'design-2021-v2'

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState(() => {
    const savedVersion = localStorage.getItem(INVOICES_VERSION_KEY)
    const saved = localStorage.getItem(INVOICES_STORAGE_KEY)
    if (savedVersion === DESIGN_DATA_VERSION && saved) {
      return JSON.parse(saved)
    }
    localStorage.setItem(INVOICES_VERSION_KEY, DESIGN_DATA_VERSION)
    localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(sampleInvoices))
    return sampleInvoices
  })

  useEffect(() => {
    localStorage.setItem(INVOICES_VERSION_KEY, DESIGN_DATA_VERSION)
    localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(invoices))
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

