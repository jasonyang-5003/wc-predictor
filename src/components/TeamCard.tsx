import { motion } from 'framer-motion'
import type { Team } from '../data/teams'
import FlagImage from './FlagImage'

interface TeamCardProps {
  team: Team;
  isSelected: boolean;
  isDisabled: boolean;
  selectionType?: 'champion' | 'runner-up';
  onClick: () => void;
}

export default function TeamCard({ team, isSelected, isDisabled, selectionType, onClick }: TeamCardProps) {
  const selectedTone = selectionType === 'champion' ? 'gold' : 'silver'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-pressed={isSelected}
      className={`group relative min-h-[132px] w-full overflow-hidden rounded-[18px] border p-3 text-left transition-all duration-300 ${
        isSelected
          ? selectedTone === 'gold'
            ? 'border-gold/80 bg-gold/14 shadow-[0_0_34px_rgba(231,185,87,0.28)]'
            : 'border-runner-up/70 bg-white/12 shadow-[0_0_30px_rgba(216,221,231,0.16)]'
          : isDisabled
            ? 'border-white/5 bg-white/[0.025] opacity-35'
            : 'border-white/12 bg-white/[0.055] hover:border-gold/45 hover:bg-white/[0.085]'
      }`}
      whileHover={!isDisabled ? { y: -3, scale: isSelected ? 1.015 : 1.025 } : undefined}
      whileTap={!isDisabled ? { scale: 0.985 } : undefined}
      layout
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,222,139,0.16),transparent_46%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full border border-white/10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-60" />

      {isSelected && (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-2 top-2 rounded-full border border-gold/50 bg-black/45 px-2 py-1 text-[10px] font-black tracking-[0.18em] text-gold"
        >
          LOCK
        </motion.div>
      )}

      {isDisabled && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/55">
          <span className="rounded-full border border-gold/30 bg-black/55 px-3 py-1 text-[11px] font-bold text-gold/80">
            已选为冠军
          </span>
        </div>
      )}

      <div className="relative z-[1] flex h-full flex-col justify-between gap-4">
        <FlagImage team={team} className="h-[46px] w-[68px]" />
        <div>
          <div className={`text-base font-black leading-tight ${isSelected ? 'text-gold-light' : 'text-white'}`}>
            {team.name}
          </div>
          <div className="mt-1 truncate text-[11px] font-bold uppercase tracking-[0.16em] text-white/42">
            {team.nameEn}
          </div>
        </div>
      </div>
    </motion.button>
  )
}
