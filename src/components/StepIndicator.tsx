import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

interface StepIndicatorProps {
  currentStep: 1 | 2;
  championName?: string;
}

export default function StepIndicator({ currentStep, championName }: StepIndicatorProps) {
  const { t } = useLanguage()

  return (
    <div className="mx-auto mb-7 flex max-w-[520px] items-center justify-center gap-2">
      <motion.div
        className={`flex min-w-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition-all ${
          currentStep === 1
            ? 'border-gold/65 bg-gold/18 text-gold-light shadow-[0_0_22px_rgba(231,185,87,0.14)]'
            : 'border-emerald-300/35 bg-emerald-300/10 text-emerald-100'
        }`}
        animate={currentStep === 1 ? { scale: [1, 1.015, 1] } : undefined}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-[11px] text-primary">
          {currentStep === 2 ? '✓' : '1'}
        </span>
        <span className="truncate">{t.stepChampion}</span>
        {currentStep === 2 && championName && (
          <span className="hidden truncate text-gold-light/90 sm:inline">/ {championName}</span>
        )}
      </motion.div>

      <div className={`h-px w-10 shrink-0 ${currentStep === 2 ? 'bg-gold/65' : 'bg-white/12'}`} />

      <motion.div
        className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition-all ${
          currentStep === 2
            ? 'border-gold/65 bg-gold/18 text-gold-light shadow-[0_0_22px_rgba(231,185,87,0.14)]'
            : 'border-white/10 bg-white/[0.04] text-white/42'
        }`}
        animate={currentStep === 2 ? { scale: [1, 1.015, 1] } : undefined}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <span className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${
          currentStep === 2 ? 'bg-gold text-primary' : 'bg-white/10 text-white/42'
        }`}>
          2
        </span>
        <span>{t.stepRunnerUp}</span>
      </motion.div>
    </div>
  )
}
