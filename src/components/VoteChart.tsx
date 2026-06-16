import { motion } from 'framer-motion'
import { getTeamById } from '../data/teams'
import type { VoteStats } from '../services/types'
import { useLanguage } from '../i18n/LanguageContext'
import FlagImage from './FlagImage'

interface VoteChartProps {
  stats: VoteStats[];
  championId: string;
  runnerUpId: string;
  totalVotes: number;
}

export default function VoteChart({ stats, championId, runnerUpId, totalVotes }: VoteChartProps) {
  const { language, t } = useLanguage()
  const championStat = stats.find((stat) => stat.teamId === championId)
  const initialTop = stats.slice(0, 5)
  const topStats = championStat && !initialTop.some((stat) => stat.teamId === championId)
    ? [...initialTop.slice(0, 4), championStat]
    : initialTop
  const maxVotes = topStats.length > 0 ? Math.max(...topStats.map((stat) => stat.championVotes), 1) : 1

  return (
    <div className="w-full">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gold/72">{t.rankingEyebrow}</p>
          <h3 className="mt-1 text-2xl font-black text-white">{t.rankingTitle}</h3>
          <p className="mt-2 max-w-[520px] text-xs font-semibold leading-5 text-white/46">{t.rankingSource}</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/56">
          {t.totalVotesPrefix}{totalVotes}{t.totalVotesSuffix}
        </span>
      </div>

      {topStats.length === 0 ? (
        <div className="grid min-h-[220px] place-items-center rounded-[22px] border border-white/10 bg-white/[0.035] p-6 text-center text-sm font-bold leading-6 text-white/52">
          {t.noRankingData}
        </div>
      ) : (
        <div className="space-y-2.5">
          {topStats.map((stat, index) => {
            const team = getTeamById(stat.teamId)
            if (!team) return null

            const isChampion = stat.teamId === championId
            const isRunnerUp = stat.teamId === runnerUpId
            const barWidth = maxVotes > 0 ? (stat.championVotes / maxVotes) * 100 : 0

            return (
              <div
                key={stat.teamId}
                className={`ranking-row relative overflow-hidden rounded-[18px] border p-3 ${
                  isChampion
                    ? 'border-gold/60 bg-gold/14 shadow-[0_0_34px_rgba(231,185,87,0.17)]'
                    : isRunnerUp
                      ? 'border-white/18 bg-white/[0.075]'
                      : 'border-white/8 bg-white/[0.035]'
                }`}
              >
                <div className="relative z-[1] flex items-center gap-3">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-black ${
                    index === 0 ? 'bg-gold text-primary' : 'bg-white/8 text-white/60'
                  }`}>
                    {index + 1}
                  </span>
                  <FlagImage team={team} className="h-8 w-12" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`truncate text-sm font-black ${isChampion ? 'text-gold-light' : 'text-white/88'}`}>
                        {team.names[language]}
                      </span>
                      {isChampion && (
                        <span className="rounded-full bg-gold/18 px-2 py-0.5 text-[10px] font-black text-gold-light">
                          {t.myChampion}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/34">
                      <motion.div
                        className={isChampion ? 'h-full rounded-full bg-linear-to-r from-gold-dark via-gold to-gold-light' : 'h-full rounded-full bg-linear-to-r from-cyan-500/70 to-white/48'}
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.68, delay: index * 0.04, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <div className={`text-sm font-black ${isChampion ? 'text-gold-light' : 'text-white/70'}`}>{stat.percentage}%</div>
                    <div className="text-[10px] font-bold text-white/36">{stat.championVotes}{t.votesSuffix}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
