import { useTheme } from '../context/ThemeContext'
import '../styles/sidebar.css'

function Sidebar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <svg width="28" height="26" viewBox="0 0 28 26" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M20.513 0C24.965 2.309 28 6.933 28 12.277C28 17.619 24.965 22.243 20.513 24.553L14 12.277L20.513 0Z"
              fill="white" fillOpacity="0.5"/>
            <path fillRule="evenodd" clipRule="evenodd"
              d="M7.487 24.552C3.035 22.243 0 17.619 0 12.276C0 6.933 3.035 2.309 7.487 0L14 12.276L7.487 24.552Z"
              fill="white"/>
          </svg>
        </div>
      </div>

      <div className="sidebar__bottom">
        <button
          className="sidebar__theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z"
                fill="#858BB2"/>
              <path d="M10 0v2M10 18v2M0 10h2M18 10h2M2.93 2.93l1.41 1.41M15.66 15.66l1.41 1.41M2.93 17.07l1.41-1.41M15.66 4.34l1.41-1.41"
                stroke="#858BB2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                fill="#858BB2"/>
            </svg>
          )}
        </button>

        <div className="sidebar__divider" />

        <div className="sidebar__avatar">
          <img src="jjgirl.jpg" alt="User avatar" />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
