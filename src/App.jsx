import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ConverterPage from './pages/ConverterPage'
import HistoryPage from './pages/HistoryPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-dark font-urbanist">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"        element={<ConverterPage />} />
            <Route path="/history" element={<HistoryPage />}   />
            <Route path="/about"   element={<AboutPage />}     />
            <Route path="*"        element={<NotFoundPage />}  />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App
