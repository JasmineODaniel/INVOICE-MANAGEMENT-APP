import '../styles/invoiceList.css'

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state__image">
        {/* Replace this div with your illustrator image later */}
        <svg width="242" height="200" viewBox="0 0 242 200" fill="none">
          <ellipse cx="121" cy="100" rx="80" ry="80" fill="#F8F8FB"/>
          <rect x="60" y="60" width="122" height="80" rx="8" fill="#DFE3FA"/>
          <rect x="75" y="75" width="60" height="8" rx="4" fill="#7C5DFA"/>
          <rect x="75" y="93" width="90" height="6" rx="3" fill="#888EB0"/>
          <rect x="75" y="107" width="70" height="6" rx="3" fill="#888EB0"/>
        </svg>
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