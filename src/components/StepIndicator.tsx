import { motion } from 'framer-motion'

interface StepIndicatorProps {
  currentStep: 1 | 2;
  championName?: string;
}

export default function StepIndicator({ currentStep, championName }: StepIndicatorProps) {
  return (
    <div className="mx-auto mb-6 flex max-w-[420px] items-center justify-center gap-2">
      <motion.div
        className={`flex min-w-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition-all ${
          currentStep === 1
            ? 'border-gold/60 bg-gold/18 text-gold-light'
            : 'border-emerald-400/35 bg-emerald-400/10 text-emerald-200'
        }`}
        animate={currentStep === 1 ? { scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-[11px] text-primary">
          {currentStep === 2 ? '✓' : '1'}
        </span>
        <span className="truncate">冠军</span>
        {currentStep === 2 && championName && (
          <span className="truncate text-gold-light/90">· {championName}</span>
        )}
      </motion.div>

      <div className={`h-px w-8 shrink-0 ${currentStep === 2 ? 'bg-gold/65' : 'bg-white/12'}`} />

      <motion.div
        className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition-all ${
          currentStep === 2
            ? 'border-gold/60 bg-gold/18 text-gold-light'
            : 'border-white/10 bg-white/[0.04] text-white/36'
        }`}
        animate={currentStep === 2 ? { scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <span className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${
          currentStep === 2 ? 'bg-gold text-primary' : 'bg-white/10 text-white/36'
        }`}>
          2
        </span>
        <span>亚军</span>
      </motion.div>
    </div>
  )
}
