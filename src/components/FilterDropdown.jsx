import { useState, useRef, useEffect } from 'react'
import '../styles/filterDropdown.css'

function FilterDropdown({ selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const statuses = ['draft', 'pending', 'paid']

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleToggle = (status) => {
    onChange(selected === status ? '' : status)
  }

  return (
    <div className="filter" ref={ref}>
      <button
        className="filter__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="filter__label">
          Filter <span className="filter__label--desktop">by status</span>
        </span>
        <svg
          className={`filter__chevron ${isOpen ? 'filter__chevron--open' : ''}`}
          width="11" height="7" viewBox="0 0 11 7"
        >
          <path
            d="M1 1l4.228 4.228L9.456 1"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="filter__dropdown" role="listbox" aria-multiselectable="false">
          {statuses.map(status => {
            const isChecked = selected === status
            return (
              <label
                key={status}
                className="filter__option"
                role="option"
                aria-selected={isChecked}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggle(status)}
                  className="filter__checkbox"
                />
                <span className={`filter__checkmark ${isChecked ? 'filter__checkmark--checked' : ''}`}>
                  {isChecked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4l2.667 2.667L9 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="filter__status-label">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
