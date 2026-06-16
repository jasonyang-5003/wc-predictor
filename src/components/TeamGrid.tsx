import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { confederations, getTeamsByConfederation } from '../data/teams'
import type { Team, ConfederationCode } from '../data/teams'
import TeamCard from './TeamCard'
import { useLanguage } from '../i18n/LanguageContext'

interface TeamGridProps {
  selectedId: string | null;
  disabledId: string | null;
  selectionType: 'champion' | 'runner-up';
  onSelect: (team: Team) => void;
}

export default function TeamGrid({ selectedId, disabledId, selectionType, onSelect }: TeamGridProps) {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [activeConfed, setActiveConfed] = useState<ConfederationCode>('all')

  const filteredTeams = useMemo(() => {
    let result = getTeamsByConfederation(activeConfed)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter((team) => {
        const names = Object.values(team.names).join(' ').toLowerCase()
        return names.includes(q) || team.nameEn.toLowerCase().includes(q)
      })
    }
    return result
  }, [activeConfed, search])

  return (
    <div className="space-y-5">
      <div className="control-panel rounded-[20px] p-3">
        <label className="sr-only" htmlFor={`team-search-${selectionType}`}>{t.searchTeam}</label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <svg className="h-4 w-4 text-gold/75" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35m1.1-5.15a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z" />
            </svg>
          </div>
          <input
            id={`team-search-${selectionType}`}
            type="text"
            placeholder={t.searchTeam}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-h-12 w-full rounded-[16px] border border-white/10 bg-black/30 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/34 focus:border-gold/60 focus:bg-black/42 focus:shadow-[0_0_0_3px_rgba(231,185,87,0.12)]"
          />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label={t.filterByConfederation}>
          {confederations.map((confed) => (
            <button
              type="button"
              key={confed}
              onClick={() => setActiveConfed(confed)}
              className={`min-h-10 shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition-all ${
                activeConfed === confed
                  ? 'border-gold/65 bg-gold/18 text-gold-light shadow-[0_0_20px_rgba(231,185,87,0.16)]'
                  : 'border-white/8 bg-white/[0.04] text-white/58 hover:border-white/20 hover:text-white/82'
              }`}
            >
              {t.confederations[confed]}
            </button>
          ))}
        </div>
      </div>

      <motion.div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" layout>
        <AnimatePresence mode="popLayout">
          {filteredTeams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, delay: Math.min(index * 0.01, 0.14) }}
              layout
            >
              <TeamCard
                team={team}
                isSelected={selectedId === team.id}
                isDisabled={disabledId === team.id}
                selectionType={selectionType}
                onClick={() => onSelect(team)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredTeams.length === 0 && (
        <div className="control-panel rounded-[20px] py-12 text-center text-sm text-white/58">
          {t.noTeamsFound}
        </div>
      )}
    </div>
  )
}
