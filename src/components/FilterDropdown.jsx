import { useState } from 'react'
import '../styles/filterDropdown.css'

function FilterDropdown({ selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const statuses = ['draft', 'pending', 'paid']

  const handleToggle = (status) => {
    if (selected.includes(status)) {
      onChange(selected.filter(s => s !== status))
    } else {
      onChange([...selected, status])
    }
  }

  return (
    <div className="filter">
      <button
        className="filter__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="filter__label">
          Filter <span className="filter__label--desktop">by status</span>
        </span>
        <svg
          className={`filter__chevron ${isOpen ? 'filter__chevron--open' : ''}`}
          width="11" height="7" viewBox="0 0 11 7"
        >
          <path d="M1 1l4.228 4.228L9.456 1"
            stroke="#7C5DFA" strokeWidth="2" fill="none"/>
        </svg>
      </button>

      {isOpen && (
        <div className="filter__dropdown">
          {statuses.map(status => (
            <label key={status} className="filter__option">
              <input
                type="checkbox"
                checked={selected.includes(status)}
                onChange={() => handleToggle(status)}
                className="filter__checkbox"
              />
              <span className="filter__checkmark" />
              <span className="filter__status-label">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown