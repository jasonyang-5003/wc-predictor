import { languageOptions } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="fixed right-3 top-3 z-50 rounded-full border border-white/12 bg-black/48 p-1 shadow-[0_16px_48px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:right-4 sm:top-4">
      <div className="sr-only">{t.language}</div>
      <div className="flex items-center gap-1" role="group" aria-label={t.language}>
        {languageOptions.map((option) => (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={language === option.code}
            title={option.name}
            className={`min-h-9 rounded-full px-3 text-[11px] font-black tracking-[0.12em] transition-colors ${
              language === option.code
                ? 'bg-gold text-primary shadow-[0_0_18px_rgba(231,185,87,0.22)]'
                : 'text-white/58 hover:bg-white/8 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
