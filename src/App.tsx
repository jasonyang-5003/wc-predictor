import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SelectionPage from './pages/SelectionPage'
import ResultPage from './pages/ResultPage'
import LanguageSwitcher from './components/LanguageSwitcher'
import { LanguageProvider } from './i18n/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="stadium-shell stadium-lights relative min-h-screen overflow-hidden">
          <div className="particle-field fixed inset-0 z-0 pointer-events-none opacity-45" />
          <div className="pitch-lines fixed inset-x-0 bottom-0 z-0 h-[52vh] pointer-events-none" />
          <div className="stadium-vignette fixed inset-0 z-0 pointer-events-none" />
          <LanguageSwitcher />

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<SelectionPage />} />
              <Route path="/result" element={<ResultPage />} />
            </Routes>
          </AnimatePresence>
        </div>
      </HashRouter>
    </LanguageProvider>
  )
}

export default App
