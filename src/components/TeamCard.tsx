import { motion } from 'framer-motion'
import type { Team } from '../data/teams'
import { getTeamName } from '../data/teams'
import FlagImage from './FlagImage'
import { useLanguage } from '../i18n/LanguageContext'

interface TeamCardProps {
  team: Team;
  isSelected: boolean;
  isDisabled: boolean;
  selectionType?: 'champion' | 'runner-up';
  onClick: () => void;
}

export default function TeamCard({ team, isSelected, isDisabled, selectionType, onClick }: TeamCardProps) {
  const { language, t } = useLanguage()
  const selectedTone = selectionType === 'champion' ? 'gold' : 'silver'
  const teamName = getTeamName(team, language)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-pressed={isSelected}
      className={`team-card group relative min-h-[146px] w-full overflow-hidden rounded-[20px] border p-3.5 text-left transition-all duration-300 ${
        isSelected
          ? selectedTone === 'gold'
            ? 'border-gold/85 bg-gold/16 shadow-[0_0_0_1px_rgba(255,227,154,0.2),0_0_42px_rgba(231,185,87,0.28)]'
            : 'border-runner-up/70 bg-white/12 shadow-[0_0_34px_rgba(216,221,231,0.16)]'
          : isDisabled
            ? 'border-white/5 bg-white/[0.025] opacity-36'
            : 'border-white/12 bg-white/[0.055] hover:border-gold/45 hover:bg-white/[0.085]'
      }`}
      whileHover={!isDisabled ? { y: -3, scale: isSelected ? 1.012 : 1.025 } : undefined}
      whileTap={!isDisabled ? { scale: 0.985 } : undefined}
      layout
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,222,139,0.2),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-3 top-0 h-px bg-linear-to-r from-transparent via-white/38 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/55 to-transparent opacity-70" />
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-white/10 opacity-60" />

      {isSelected && (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-2 top-2 rounded-full border border-gold/50 bg-black/48 px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-gold"
        >
          {t.selected}
        </motion.div>
      )}

      {isDisabled && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/58">
          <span className="rounded-full border border-gold/30 bg-black/60 px-3 py-1 text-[11px] font-bold text-gold/86">
            {t.alreadyChampion}
          </span>
        </div>
      )}

      <div className="relative z-[1] flex h-full flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <FlagImage team={team} className="h-[48px] w-[72px]" />
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/28">{t.confederations[team.confederation]}</span>
        </div>
        <div>
          <div className={`text-lg font-black leading-tight ${isSelected ? 'text-gold-light' : 'text-white'}`}>
            {teamName}
          </div>
          <div className="mt-1 truncate text-[11px] font-bold uppercase tracking-[0.16em] text-white/46">
            {team.nameEn}
          </div>
        </div>
      </div>
    </motion.button>
  )
}
