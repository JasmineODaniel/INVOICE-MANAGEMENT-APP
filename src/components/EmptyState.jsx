import '../styles/invoiceList.css'

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state__image">
    <img src="tration.png" alt="enevlope illustration image"/> 
      </div>
      <h2 className="empty-state__title">There is nothing here</h2>
      <p className="empty-state__text">
        Create an invoice by clicking the<br />
        <strong>New Invoice</strong> button and get started
      </p>
    </div>
  )
}

export default EmptyState
