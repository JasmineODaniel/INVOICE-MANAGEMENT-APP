# Invoice Management App

A fully functional invoice management application built with React + Vite. Create, view, edit, and delete invoices with a clean and responsive UI that supports both light and dark mode.

---

## Features

- Create, read, update and delete invoices (full CRUD)
- Save invoices as draft or send as pending
- Mark pending invoices as paid
- Filter invoices by status (draft, pending, paid)
- Light and dark mode toggle with localStorage persistence
- Form validation with error states on all required fields
- Delete confirmation modal with focus trap and ESC key support
- Custom date picker and payment terms dropdown
- Fully responsive layout for desktop, tablet and mobile
- Data persisted in localStorage — survives page refresh

---

## Tech Stack

- **React** — UI framework
- **Vite** — build tool and dev server
- **React Router DOM** — client-side routing
- **CSS Custom Properties** — theming and design tokens
- **LocalStorage** — data persistence
- **Google Fonts** — League Spartan typeface
```
src/
├── components/
│   ├── Sidebar.jsx          # Navigation sidebar with theme toggle
│   ├── InvoiceCard.jsx      # Single invoice list item
│   ├── StatusBadge.jsx      # Paid / Pending / Draft badge
│   ├── InvoiceForm.jsx      # Create and edit invoice form
│   ├── DeleteModal.jsx      # Delete confirmation modal
│   ├── FilterDropdown.jsx   # Status filter with checkboxes
│   └── EmptyState.jsx       # Empty list illustration
├── pages/
│   ├── InvoiceList.jsx      # Home page — invoice list
│   └── InvoiceDetail.jsx    # Invoice detail view
├── context/
│   ├── ThemeContext.jsx     # Light/dark mode global state
│   └── InvoiceContext.jsx   # Invoice CRUD global state
├── styles/
│   ├── global.css           # CSS variables and base styles
│   ├── sidebar.css          # Sidebar styles
│   ├── invoiceList.css      # Invoice list page styles
│   ├── invoiceDetail.css    # Invoice detail page styles
│   ├── invoiceForm.css      # Form panel and input styles
│   ├── statusBadge.css      # Badge color styles
│   ├── deleteModal.css      # Modal overlay styles
│   └── filterDropdown.css   # Filter checkbox styles
├── utils/
│   └── generateId.js        # ID generator, date and currency formatters
├── data/
│   └── sampleInvoices.js    # 7 seed invoices for first load
├── App.jsx                  # Root component with routing
└── main.jsx                 # React entry point

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/JasmineODaniel/INVOICE-MANAGEMENT-APP.git

# Navigate into the project
cd INVOICE-MANAGEMENT-APP/invoice-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## Architecture

### State Management
The app uses React Context API for global state — no external state library needed at this scale.

- **InvoiceContext** handles all invoice data and CRUD operations
- **ThemeContext** handles light/dark mode toggling

Both contexts persist their state to **localStorage** so data and theme preference survive page refreshes.

### Routing
React Router DOM handles navigation between two pages:
- `/` — Invoice list page
- `/invoice/:id` — Invoice detail page

The invoice form and delete modal are rendered as overlays on top of the current page rather than separate routes.

### Theming
All colors are defined as CSS custom properties on `:root` for light mode and overridden under `[data-theme="dark"]` for dark mode. Switching themes is a single attribute change on the `<html>` element.

### Responsive Design
Three breakpoints:
- **Desktop** — 1024px and above — vertical sidebar, wide invoice cards
- **Tablet** — 768px — sidebar becomes top navigation bar
- **Mobile** — 480px — single column layout, stacked cards, fixed action footer

---

## Accessibility

- Semantic HTML throughout — `<aside>`, `<main>`, `<fieldset>`, `<legend>`, `<address>`
- All form fields have associated `<label>` elements
- Delete modal traps focus and closes on ESC key press
- All interactive elements are keyboard navigable
- Status badges use both color and text to convey meaning
- WCAG AA color contrast maintained in both light and dark mode

---

## Trade-offs and Decisions

| Decision | Reason |
|---|---|
| Context API over Redux | App state is simple enough — no need for added complexity |
| LocalStorage over backend | Zero setup, works offline, sufficient for this scale |
| CSS Modules not used | Single CSS files per component kept things simple and readable |
| Custom date picker | Browser native date inputs don't match the Figma design |
| Custom terms dropdown | Styled select elements are hard to customize cross-browser |

---

## Improvements Beyond Requirements

- Custom calendar date picker matching the Figma design exactly
- Custom payment terms dropdown with card styling
- Click-outside detection closes all dropdowns automatically
- Smooth CSS transitions on all interactive states
- Scrollbar styled to match the design system
- Sample data seeds 7 invoices on first load covering all statuses

---

## Design Reference

Built to match the Frontend Mentor Invoice App Figma design system including:
- League Spartan typeface
- Full color palette for light and dark mode
- All button, input, dropdown and badge states
- Pixel-accurate spacing and layout at all three breakpoints

---

## Author

**Jasmine O'Daniel**

---

## Project Structure
