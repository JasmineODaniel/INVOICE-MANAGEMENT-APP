import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { InvoiceProvider } from './context/InvoiceContext'
import Sidebar from './components/Sidebar'
import InvoiceList from './pages/InvoiceList'
import InvoiceDetail from './pages/InvoiceDetail'

function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <BrowserRouter>
          <div className="app-layout">
            <Sidebar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<InvoiceList />} />
                <Route path="/invoice/:id" element={<InvoiceDetail />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </InvoiceProvider>
    </ThemeProvider>
  )
}

export default App