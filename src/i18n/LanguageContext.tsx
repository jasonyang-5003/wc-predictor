import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { translations } from './translations'
import type { LanguageCode } from './translations'

const STORAGE_KEY = 'wc2026_language'

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: typeof translations[LanguageCode];
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && stored in translations) return stored as LanguageCode
  } catch {
    // ignore storage errors
  }
  return 'pt-BR'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(readInitialLanguage)

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage)
    try {
      localStorage.setItem(STORAGE_KEY, nextLanguage)
    } catch {
      // ignore storage errors
    }
  }

  useEffect(() => {
    document.documentElement.lang = language
    document.title = translations[language].appTitle
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: translations[language],
  }), [language])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider')
  return value
}
