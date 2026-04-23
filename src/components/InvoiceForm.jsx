import { useState, useEffect, useRef } from 'react'
import { useInvoices } from '../context/InvoiceContext'
import { generateId, calculatePaymentDue } from '../utils/generateId'
import '../styles/invoiceForm.css'

const emptyItem = { name: '', qty: 1, price: 0, total: 0 }

const defaultForm = {
  senderStreet: '19 Union Terrace',
  senderCity: 'London',
  senderPostCode: 'E1 3EZ',
  senderCountry: 'United Kingdom',
  clientName: 'Alex Grim',
  clientEmail: 'alexgrim@mail.com',
  clientStreet: '84 Church Way',
  clientCity: 'Bradford',
  clientPostCode: 'BD1 9PB',
  clientCountry: 'United Kingdom',
  invoiceDate: '2021-08-21',
  paymentTerms: 'Net 30 Days',
  description: 'Graphic Design',
  items: [
    { name: 'Banner Design', qty: 1, price: 156.00, total: 156.00 },
    { name: 'Email Design', qty: 2, price: 200.00, total: 400.00 }
  ]
}

const PAYMENT_TERMS = ['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days']

function CalendarPicker({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => value ? new Date(value) : new Date())
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa']

  const selectedDate = value ? new Date(value) : null

  const handleDayClick = (day) => {
    const picked = new Date(year, month, day)
    onChange(picked.toISOString().split('T')[0])
    setOpen(false)
  }

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const days = daysInMonth(year, month)
  const firstDay = firstDayOfMonth(year, month)

  const displayValue = value
    ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : ''

  return (
    <div className="cal-wrapper" ref={ref}>
      <button
        type="button"
        className={`form-input cal-trigger ${disabled ? 'form-input--disabled' : ''}`}
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
      >
        <span>{displayValue}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="2" width="14" height="13" rx="2" stroke="#7C5DFA" strokeWidth="1.5"/>
          <path d="M1 6h14" stroke="#7C5DFA" strokeWidth="1.5"/>
          <path d="M5 1v2M11 1v2" stroke="#7C5DFA" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className="cal-card">
          <div className="cal-header">
            <button type="button" className="cal-nav" onClick={prevMonth}>
              <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
                <path d="M6 1L2 5l4 4" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <span className="cal-month">{monthNames[month]} {year}</span>
            <button type="button" className="cal-nav" onClick={nextMonth}>
              <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
                <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="cal-grid">
            {dayNames.map(d => (
              <span key={d} className="cal-dayname">{d}</span>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}
            {Array.from({ length: days }).map((_, i) => {
              const day = i + 1
              const isSelected = selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year
              const isToday = new Date().getDate() === day &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year
              return (
                <button
                  key={day}
                  type="button"
                  className={`cal-day ${isSelected ? 'cal-day--selected' : ''} ${isToday && !isSelected ? 'cal-day--today' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function TermsDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="terms-wrapper" ref={ref}>
      <button
        type="button"
        className="form-input terms-trigger"
        onClick={() => setOpen(!open)}
      >
        <span>{value}</span>
        <svg
          className={`terms-chevron ${open ? 'terms-chevron--open' : ''}`}
          width="11" height="7" viewBox="0 0 11 7"
        >
          <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none"/>
        </svg>
      </button>

      {open && (
        <div className="terms-card">
          {PAYMENT_TERMS.map((term, i) => (
            <button
              key={term}
              type="button"
              className={`terms-option ${value === term ? 'terms-option--selected' : ''} ${i < PAYMENT_TERMS.length - 1 ? 'terms-option--bordered' : ''}`}
              onClick={() => { onChange(term); setOpen(false) }}
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function InvoiceForm({ onClose, invoiceToEdit }) {
  const { addInvoice, updateInvoice } = useInvoices()
  const isEditing = !!invoiceToEdit
  const modalRef = useRef(null)

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

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

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
    setForm(prev => ({ ...prev, items: [...prev.items, { ...emptyItem }] }))
  }

  const removeItem = (index) => {
    setForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }))
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
    if (form.items.length === 0) newErrors.items = 'An item must be added'
    form.items.forEach((item, i) => {
      if (!item.name) newErrors[`item_name_${i}`] = 'Required'
      if (item.qty <= 0) newErrors[`item_qty_${i}`] = 'Invalid'
      if (item.price <= 0) newErrors[`item_price_${i}`] = 'Invalid'
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
    if (isEditing) { updateInvoice(invoiceToEdit.id, invoice) } else { addInvoice(invoice) }
    onClose()
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    const invoice = buildInvoice(isEditing ? invoiceToEdit.status : 'pending')
    if (isEditing) { updateInvoice(invoiceToEdit.id, invoice) } else { addInvoice(invoice) }
    onClose()
  }

  return (
    <div className="form-overlay">
      <div className="form-overlay__backdrop" onClick={onClose} />
      <div
        className="form-panel"
        role="dialog"
        aria-label={isEditing ? `Edit #${invoiceToEdit.id}` : 'New Invoice'}
        ref={modalRef}
      >
        <div className="form-panel__inner">
          <h2 className="form-panel__title">
            {isEditing
              ? <>Edit <span className="form-panel__title-hash">#</span>{invoiceToEdit.id}</>
              : 'New Invoice'
            }
          </h2>

          <div className="form-panel__scroll">
            <div className="form-panel__content">
            <fieldset className="form-section">
              <legend className="form-section__legend">Bill From</legend>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="senderStreet">
                  Street Address
                  {errors.senderStreet && <span className="form-error">{errors.senderStreet}</span>}
                </label>
                <input id="senderStreet" className={`form-input ${errors.senderStreet ? 'form-input--error' : ''}`} value={form.senderStreet} onChange={e => handleChange('senderStreet', e.target.value)} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="senderCity">City {errors.senderCity && <span className="form-error">{errors.senderCity}</span>}</label>
                  <input id="senderCity" className={`form-input ${errors.senderCity ? 'form-input--error' : ''}`} value={form.senderCity} onChange={e => handleChange('senderCity', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="senderPostCode">Post Code {errors.senderPostCode && <span className="form-error">{errors.senderPostCode}</span>}</label>
                  <input id="senderPostCode" className={`form-input ${errors.senderPostCode ? 'form-input--error' : ''}`} value={form.senderPostCode} onChange={e => handleChange('senderPostCode', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="senderCountry">Country {errors.senderCountry && <span className="form-error">{errors.senderCountry}</span>}</label>
                  <input id="senderCountry" className={`form-input ${errors.senderCountry ? 'form-input--error' : ''}`} value={form.senderCountry} onChange={e => handleChange('senderCountry', e.target.value)} />
                </div>
              </div>
            </fieldset>
            <fieldset className="form-section">
              <legend className="form-section__legend">Bill To</legend>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="clientName">Client's Name {errors.clientName && <span className="form-error">{errors.clientName}</span>}</label>
                <input id="clientName" className={`form-input ${errors.clientName ? 'form-input--error' : ''}`} value={form.clientName} onChange={e => handleChange('clientName', e.target.value)} placeholder="e.g. Alex Grim" />
              </div>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="clientEmail">Client's Email {errors.clientEmail && <span className="form-error">{errors.clientEmail}</span>}</label>
                <input id="clientEmail" type="email" className={`form-input ${errors.clientEmail ? 'form-input--error' : ''}`} value={form.clientEmail} onChange={e => handleChange('clientEmail', e.target.value)} placeholder="e.g. alexgrim@mail.com" />
              </div>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="clientStreet">Street Address {errors.clientStreet && <span className="form-error">{errors.clientStreet}</span>}</label>
                <input id="clientStreet" className={`form-input ${errors.clientStreet ? 'form-input--error' : ''}`} value={form.clientStreet} onChange={e => handleChange('clientStreet', e.target.value)} placeholder="e.g. 84 Church Way" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="clientCity">City {errors.clientCity && <span className="form-error">{errors.clientCity}</span>}</label>
                  <input id="clientCity" className={`form-input ${errors.clientCity ? 'form-input--error' : ''}`} value={form.clientCity} onChange={e => handleChange('clientCity', e.target.value)} placeholder="e.g. Bradford" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="clientPostCode">Post Code {errors.clientPostCode && <span className="form-error">{errors.clientPostCode}</span>}</label>
                  <input id="clientPostCode" className={`form-input ${errors.clientPostCode ? 'form-input--error' : ''}`} value={form.clientPostCode} onChange={e => handleChange('clientPostCode', e.target.value)} placeholder="e.g. BD1 9PB" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="clientCountry">Country {errors.clientCountry && <span className="form-error">{errors.clientCountry}</span>}</label>
                  <input id="clientCountry" className={`form-input ${errors.clientCountry ? 'form-input--error' : ''}`} value={form.clientCountry} onChange={e => handleChange('clientCountry', e.target.value)} placeholder="e.g. United Kingdom" />
                </div>
              </div>
            </fieldset>
            <fieldset className="form-section">
              <legend className="form-section__legend" style={{opacity:0,height:0,margin:0,padding:0,float:'none'}}>Invoice Details</legend>
              <div className="form-row form-row--two">
                <div className="form-group">
                  <label className="form-label" htmlFor="invoiceDate">Invoice Date</label>
                  <CalendarPicker
                    value={form.invoiceDate}
                    onChange={val => handleChange('invoiceDate', val)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="paymentTerms">Payment Terms</label>
                  <TermsDropdown
                    value={form.paymentTerms}
                    onChange={val => handleChange('paymentTerms', val)}
                  />
                </div>
              </div>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="description">
                  Project Description
                  {errors.description && <span className="form-error">{errors.description}</span>}
                </label>
                <input
                  id="description"
                  className={`form-input ${errors.description ? 'form-input--error' : ''}`}
                  value={form.description}
                  onChange={e => handleChange('description', e.target.value)}
                  placeholder="e.g. Graphic Design"
                />
              </div>
            </fieldset>
            <div className="form-items">
              <h3 className="form-items__title">Item List</h3>
              {errors.items && <p className="form-error form-error--block">{errors.items}</p>}

              {form.items.length > 0 && (
                <div className="form-items__header">
                  <span>Item Name</span>
                  <span>Qty.</span>
                  <span>Price</span>
                  <span>Total</span>
                  <span></span>
                </div>
              )}

              {form.items.map((item, index) => (
                <div key={index} className="form-item-row">
                  <div className="form-group">
                    <label className="form-label form-label--mobile-only">Item Name</label>
                    <input
                      className={`form-input ${errors[`item_name_${index}`] ? 'form-input--error' : ''}`}
                      value={item.name}
                      onChange={e => handleItemChange(index, 'name', e.target.value)}
                      placeholder="Item name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label form-label--mobile-only">Qty.</label>
                    <input
                      type="number"
                      min="1"
                      className={`form-input form-input--center ${errors[`item_qty_${index}`] ? 'form-input--error' : ''}`}
                      value={item.qty}
                      onChange={e => handleItemChange(index, 'qty', Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label form-label--mobile-only">Price</label>
                    <input
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
                    <span className="form-item-total__value">£ {item.total.toFixed(2)}</span>
                  </div>
                  <button type="button" className="form-item-delete" onClick={() => removeItem(index)} aria-label="Remove item">
                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.47 0l.975 1H13v2H0V1h3.53L4.5 0h3.97zM1 14a2 2 0 002 2h7a2 2 0 002-2V4H1v10z" fill="#888EB0"/>
                    </svg>
                  </button>
                </div>
              ))}

              <button type="button" className="form-add-item" onClick={addItem}>
                + Add New Item
              </button>
            </div>
            </div>

          </div>
          <div className="form-panel__footer">
            {!isEditing && (
              <button type="button" className="form-btn form-btn--discard" onClick={onClose}>Discard</button>
            )}
            {isEditing && (
              <button type="button" className="form-btn form-btn--cancel" onClick={onClose}>Cancel</button>
            )}
            <div className="form-panel__footer-right">
              {!isEditing && (
                <button type="button" className="form-btn form-btn--draft" onClick={handleSaveAsDraft}>Save as Draft</button>
              )}
              <button type="button" className="form-btn form-btn--submit" onClick={handleSubmit}>
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



