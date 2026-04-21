import { useState, useEffect, useRef } from 'react'
import { useInvoices } from '../context/InvoiceContext'
import { generateId, calculatePaymentDue } from '../utils/generateId'
import '../styles/invoiceForm.css'

const emptyItem = { name: '', qty: 1, price: 0, total: 0 }

const defaultForm = {
  senderStreet: '',
  senderCity: '',
  senderPostCode: '',
  senderCountry: '',
  clientName: '',
  clientEmail: '',
  clientStreet: '',
  clientCity: '',
  clientPostCode: '',
  clientCountry: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  paymentTerms: 'Net 30 Days',
  description: '',
  items: [{ ...emptyItem }]
}

function InvoiceForm({ onClose, invoiceToEdit }) {
  const { addInvoice, updateInvoice } = useInvoices()
  const isEditing = !!invoiceToEdit
  const overlayRef = useRef(null)

  const [form, setForm] = useState(() => {
    if (invoiceToEdit) {
      return {
        senderStreet: invoiceToEdit.senderAddress.street,
        senderCity: invoiceToEdit.senderAddress.city,
        senderPostCode: invoiceToEdit.senderAddress.postCode,
        senderCountry: invoiceToEdit.senderAddress.country,
        clientName: invoiceToEdit.clientName,
        clientEmail: invoiceToEdit.clientEmail,
        clientStreet: invoiceToEdit.clientAddress.street,
        clientCity: invoiceToEdit.clientAddress.city,
        clientPostCode: invoiceToEdit.clientAddress.postCode,
        clientCountry: invoiceToEdit.clientAddress.country,
        invoiceDate: invoiceToEdit.invoiceDate,
        paymentTerms: invoiceToEdit.paymentTerms,
        description: invoiceToEdit.description,
        items: invoiceToEdit.items
      }
    }
    return defaultForm
  })

  const [errors, setErrors] = useState({})

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Prevent body scroll when form is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleItemChange = (index, field, value) => {
    const updated = form.items.map((item, i) => {
      if (i !== index) return item
      const newItem = { ...item, [field]: value }
      if (field === 'qty' || field === 'price') {
        newItem.total = Number(newItem.qty) * Number(newItem.price)
      }
      return newItem
    })
    setForm(prev => ({ ...prev, items: updated }))
  }

  const addItem = () => {
    setForm(prev => ({
      ...prev,
      items: [...prev.items, { ...emptyItem }]
    }))
  }

  const removeItem = (index) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.senderStreet) newErrors.senderStreet = 'Required'
    if (!form.senderCity) newErrors.senderCity = 'Required'
    if (!form.senderPostCode) newErrors.senderPostCode = 'Required'
    if (!form.senderCountry) newErrors.senderCountry = 'Required'
    if (!form.clientName) newErrors.clientName = "Can't be empty"
    if (!form.clientEmail) {
      newErrors.clientEmail = "Can't be empty"
    } else if (!/\S+@\S+\.\S+/.test(form.clientEmail)) {
      newErrors.clientEmail = 'Must be a valid email'
    }
    if (!form.clientStreet) newErrors.clientStreet = 'Required'
    if (!form.clientCity) newErrors.clientCity = 'Required'
    if (!form.clientPostCode) newErrors.clientPostCode = 'Required'
    if (!form.clientCountry) newErrors.clientCountry = 'Required'
    if (!form.description) newErrors.description = "Can't be empty"
    if (form.items.length === 0) newErrors.items = 'Add at least one item'
    form.items.forEach((item, i) => {
      if (!item.name) newErrors[`item_name_${i}`] = 'Required'
      if (item.qty <= 0) newErrors[`item_qty_${i}`] = 'Must be > 0'
      if (item.price <= 0) newErrors[`item_price_${i}`] = 'Must be > 0'
    })
    return newErrors
  }

  const buildInvoice = (status) => {
    const total = form.items.reduce((sum, item) => sum + item.total, 0)
    return {
      id: isEditing ? invoiceToEdit.id : generateId(),
      status,
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      invoiceDate: form.invoiceDate,
      paymentDue: calculatePaymentDue(form.invoiceDate, form.paymentTerms),
      paymentTerms: form.paymentTerms,
      description: form.description,
      senderAddress: {
        street: form.senderStreet,
        city: form.senderCity,
        postCode: form.senderPostCode,
        country: form.senderCountry
      },
      clientAddress: {
        street: form.clientStreet,
        city: form.clientCity,
        postCode: form.clientPostCode,
        country: form.clientCountry
      },
      items: form.items,
      total
    }
  }

  const handleSaveAsDraft = () => {
    const invoice = buildInvoice('draft')
    if (isEditing) {
      updateInvoice(invoiceToEdit.id, invoice)
    } else {
      addInvoice(invoice)
    }
    onClose()
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    const invoice = buildInvoice(isEditing ? invoiceToEdit.status : 'pending')
    if (isEditing) {
      updateInvoice(invoiceToEdit.id, invoice)
    } else {
      addInvoice(invoice)
    }
    onClose()
  }

  const grandTotal = form.items.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="form-overlay" ref={overlayRef}>
      <div className="form-panel" role="dialog" aria-label={isEditing ? 'Edit Invoice' : 'New Invoice'}>
        <div className="form-panel__inner">
          <h2 className="form-panel__title">
            {isEditing ? (
              <>Edit <span className="form-panel__id"># {invoiceToEdit.id}</span></>
            ) : 'New Invoice'}
          </h2>

          <div className="form-panel__scroll">
            {/* Bill From */}
            <fieldset className="form-section">
              <legend className="form-section__legend">Bill From</legend>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="senderStreet">
                  Street Address
                  {errors.senderStreet && (
                    <span className="form-error">{errors.senderStreet}</span>
                  )}
                </label>
                <input
                  id="senderStreet"
                  className={`form-input ${errors.senderStreet ? 'form-input--error' : ''}`}
                  value={form.senderStreet}
                  onChange={e => handleChange('senderStreet', e.target.value)}
                />
              </div>
              <div className="form-group form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="senderCity">
                    City
                    {errors.senderCity && (
                      <span className="form-error">{errors.senderCity}</span>
                    )}
                  </label>
                  <input
                    id="senderCity"
                    className={`form-input ${errors.senderCity ? 'form-input--error' : ''}`}
                    value={form.senderCity}
                    onChange={e => handleChange('senderCity', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="senderPostCode">
                    Post Code
                    {errors.senderPostCode && (
                      <span className="form-error">{errors.senderPostCode}</span>
                    )}
                  </label>
                  <input
                    id="senderPostCode"
                    className={`form-input ${errors.senderPostCode ? 'form-input--error' : ''}`}
                    value={form.senderPostCode}
                    onChange={e => handleChange('senderPostCode', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="senderCountry">
                    Country
                    {errors.senderCountry && (
                      <span className="form-error">{errors.senderCountry}</span>
                    )}
                  </label>
                  <input
                    id="senderCountry"
                    className={`form-input ${errors.senderCountry ? 'form-input--error' : ''}`}
                    value={form.senderCountry}
                    onChange={e => handleChange('senderCountry', e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            {/* Bill To */}
            <fieldset className="form-section">
              <legend className="form-section__legend">Bill To</legend>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="clientName">
                  Client's Name
                  {errors.clientName && (
                    <span className="form-error">{errors.clientName}</span>
                  )}
                </label>
                <input
                  id="clientName"
                  className={`form-input ${errors.clientName ? 'form-input--error' : ''}`}
                  value={form.clientName}
                  onChange={e => handleChange('clientName', e.target.value)}
                />
              </div>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="clientEmail">
                  Client's Email
                  {errors.clientEmail && (
                    <span className="form-error">{errors.clientEmail}</span>
                  )}
                </label>
                <input
                  id="clientEmail"
                  type="email"
                  className={`form-input ${errors.clientEmail ? 'form-input--error' : ''}`}
                  value={form.clientEmail}
                  onChange={e => handleChange('clientEmail', e.target.value)}
                />
              </div>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="clientStreet">
                  Street Address
                  {errors.clientStreet && (
                    <span className="form-error">{errors.clientStreet}</span>
                  )}
                </label>
                <input
                  id="clientStreet"
                  className={`form-input ${errors.clientStreet ? 'form-input--error' : ''}`}
                  value={form.clientStreet}
                  onChange={e => handleChange('clientStreet', e.target.value)}
                />
              </div>
              <div className="form-group form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="clientCity">
                    City
                    {errors.clientCity && (
                      <span className="form-error">{errors.clientCity}</span>
                    )}
                  </label>
                  <input
                    id="clientCity"
                    className={`form-input ${errors.clientCity ? 'form-input--error' : ''}`}
                    value={form.clientCity}
                    onChange={e => handleChange('clientCity', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="clientPostCode">
                    Post Code
                    {errors.clientPostCode && (
                      <span className="form-error">{errors.clientPostCode}</span>
                    )}
                  </label>
                  <input
                    id="clientPostCode"
                    className={`form-input ${errors.clientPostCode ? 'form-input--error' : ''}`}
                    value={form.clientPostCode}
                    onChange={e => handleChange('clientPostCode', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="clientCountry">
                    Country
                    {errors.clientCountry && (
                      <span className="form-error">{errors.clientCountry}</span>
                    )}
                  </label>
                  <input
                    id="clientCountry"
                    className={`form-input ${errors.clientCountry ? 'form-input--error' : ''}`}
                    value={form.clientCountry}
                    onChange={e => handleChange('clientCountry', e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            {/* Invoice Details */}
            <fieldset className="form-section">
              <legend className="form-section__legend" style={{opacity: 0, height: 0}}>Invoice Details</legend>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="invoiceDate">Invoice Date</label>
                  <input
                    id="invoiceDate"
                    type="date"
                    className="form-input"
                    value={form.invoiceDate}
                    onChange={e => handleChange('invoiceDate', e.target.value)}
                    disabled={isEditing}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="paymentTerms">Payment Terms</label>
                  <select
                    id="paymentTerms"
                    className="form-input form-select"
                    value={form.paymentTerms}
                    onChange={e => handleChange('paymentTerms', e.target.value)}
                  >
                    <option>Net 1 Day</option>
                    <option>Net 7 Days</option>
                    <option>Net 14 Days</option>
                    <option>Net 30 Days</option>
                  </select>
                </div>
              </div>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="description">
                  Project Description
                  {errors.description && (
                    <span className="form-error">{errors.description}</span>
                  )}
                </label>
                <input
                  id="description"
                  className={`form-input ${errors.description ? 'form-input--error' : ''}`}
                  value={form.description}
                  onChange={e => handleChange('description', e.target.value)}
                />
              </div>
            </fieldset>

            {/* Item List */}
            <div className="form-items">
              <h3 className="form-items__title">Item List</h3>
              {errors.items && (
                <p className="form-error form-error--block">{errors.items}</p>
              )}

              <div className="form-items__header">
                <span>Item Name</span>
                <span>Qty.</span>
                <span>Price</span>
                <span>Total</span>
                <span></span>
              </div>

              {form.items.map((item, index) => (
                <div key={index} className="form-item-row">
                  <div className="form-group">
                    <label className="form-label form-label--mobile-only" htmlFor={`item-name-${index}`}>Item Name</label>
                    <input
                      id={`item-name-${index}`}
                      className={`form-input ${errors[`item_name_${index}`] ? 'form-input--error' : ''}`}
                      value={item.name}
                      onChange={e => handleItemChange(index, 'name', e.target.value)}
                      placeholder="Item name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label form-label--mobile-only" htmlFor={`item-qty-${index}`}>Qty.</label>
                    <input
                      id={`item-qty-${index}`}
                      type="number"
                      min="1"
                      className={`form-input form-input--center ${errors[`item_qty_${index}`] ? 'form-input--error' : ''}`}
                      value={item.qty}
                      onChange={e => handleItemChange(index, 'qty', Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label form-label--mobile-only" htmlFor={`item-price-${index}`}>Price</label>
                    <input
                      id={`item-price-${index}`}
                      type="number"
                      min="0"
                      step="0.01"
                      className={`form-input ${errors[`item_price_${index}`] ? 'form-input--error' : ''}`}
                      value={item.price}
                      onChange={e => handleItemChange(index, 'price', Number(e.target.value))}
                    />
                  </div>
                  <div className="form-item-total">
                    <span className="form-label form-label--mobile-only">Total</span>
                    <span className="form-item-total__value">
                      £ {item.total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="form-item-delete"
                    onClick={() => removeItem(index)}
                    aria-label={`Remove ${item.name || 'item'}`}
                  >
                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M8.47 0l.975 1H13v2H0V1h3.53L4.5 0h3.97zM1 14a2 2 0 002 2h7a2 2 0 002-2V4H1v10z"
                        fill="#888EB0"/>
                    </svg>
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="form-add-item"
                onClick={addItem}
              >
                + Add New Item
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="form-panel__footer">
            {!isEditing && (
              <button
                type="button"
                className="form-btn form-btn--discard"
                onClick={onClose}
              >
                Discard
              </button>
            )}
            {isEditing && (
              <button
                type="button"
                className="form-btn form-btn--cancel"
                onClick={onClose}
              >
                Cancel
              </button>
            )}
            <div className="form-panel__footer-right">
              {!isEditing && (
                <button
                  type="button"
                  className="form-btn form-btn--draft"
                  onClick={handleSaveAsDraft}
                >
                  Save as Draft
                </button>
              )}
              <button
                type="button"
                className="form-btn form-btn--submit"
                onClick={handleSubmit}
              >
                {isEditing ? 'Save Changes' : 'Save & Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceForm