export function generateId() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomLetters =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)]
  const randomNumbers = Math.floor(1000 + Math.random() * 9000)
  return `${randomLetters}${randomNumbers}`
}

export function calculatePaymentDue(invoiceDate, paymentTerms) {
  const date = new Date(invoiceDate)
  const days = {
    'Net 1 Day': 1,
    'Net 7 Days': 7,
    'Net 14 Days': 14,
    'Net 30 Days': 30
  }
  date.setDate(date.getDate() + (days[paymentTerms] || 30))
  return date.toISOString().split('T')[0]
}

export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount)
}