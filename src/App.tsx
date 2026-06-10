import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SelectionPage from './pages/SelectionPage'
import ResultPage from './pages/ResultPage'

function App() {
  return (
    <HashRouter>
      <div className="stadium-shell stadium-lights relative min-h-screen overflow-hidden">
        <div className="particle-field fixed inset-0 z-0 pointer-events-none opacity-45" />
        <div className="pitch-lines fixed inset-x-0 bottom-0 z-0 h-[52vh] pointer-events-none" />
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-[-18rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gold/14 blur-[110px]" />
          <div className="absolute bottom-[8%] left-[-12rem] h-[26rem] w-[26rem] rounded-full bg-cyan-500/12 blur-[120px]" />
          <div className="absolute right-[-10rem] top-[34%] h-[28rem] w-[28rem] rounded-full bg-red-500/10 blur-[130px]" />
        </div>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<SelectionPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </HashRouter>
  )
}

export default App
