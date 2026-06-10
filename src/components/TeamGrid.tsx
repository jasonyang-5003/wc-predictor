import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { confederations, getTeamsByConfederation } from '../data/teams'
import type { Team, Confederation } from '../data/teams'
import TeamCard from './TeamCard'

interface TeamGridProps {
  selectedId: string | null;
  disabledId: string | null;
  selectionType: 'champion' | 'runner-up';
  onSelect: (team: Team) => void;
}

export default function TeamGrid({ selectedId, disabledId, selectionType, onSelect }: TeamGridProps) {
  const [search, setSearch] = useState('')
  const [activeConfed, setActiveConfed] = useState<Confederation>('全部')

  const filteredTeams = useMemo(() => {
    let result = getTeamsByConfederation(activeConfed)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter((team) => team.name.includes(q) || team.nameEn.toLowerCase().includes(q))
    }
    return result
  }, [activeConfed, search])

  return (
    <div className="space-y-5">
      <div className="glass rounded-[18px] p-3">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <svg className="h-4 w-4 text-gold/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35m1.1-5.15a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="搜索球队 / Search team"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-[14px] border border-white/10 bg-black/28 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/32 focus:border-gold/55 focus:bg-black/36"
          />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {confederations.map((confed) => (
            <button
              type="button"
              key={confed}
              onClick={() => setActiveConfed(confed)}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition-all ${
                activeConfed === confed
                  ? 'border-gold/60 bg-gold/18 text-gold-light shadow-[0_0_18px_rgba(231,185,87,0.15)]'
                  : 'border-white/8 bg-white/[0.04] text-white/52 hover:border-white/18 hover:text-white/76'
              }`}
            >
              {confed}
            </button>
          ))}
        </div>
      </div>

      <motion.div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4" layout>
        <AnimatePresence mode="popLayout">
          {filteredTeams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, delay: Math.min(index * 0.012, 0.18) }}
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
        <div className="glass rounded-[18px] py-12 text-center text-sm text-white/45">
          没有找到匹配的球队
        </div>
      )}
    </div>
  )
}
