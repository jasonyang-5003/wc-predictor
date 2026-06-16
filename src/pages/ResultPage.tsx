import { useRef, useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PosterCard from '../components/PosterCard'
import VoteChart from '../components/VoteChart'
import ShareButton from '../components/ShareButton'
import { exportToPng, downloadBlob, sharePoster } from '../utils/exportImage'
import { mockVoteService } from '../services/mockVoteService'
import { useLanguage } from '../i18n/LanguageContext'
import type { VoteStats } from '../services/types'

export default function ResultPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const posterRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const championId = searchParams.get('champion') || ''
  const runnerUpId = searchParams.get('runnerUp') || ''

  const [stats, setStats] = useState<VoteStats[]>([])
  const [totalVotes, setTotalVotes] = useState(0)
  const [loading, setLoading] = useState(true)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    setCanShare('share' in navigator && 'canShare' in navigator)
  }, [])

  useEffect(() => {
    if (!championId || !runnerUpId) {
      navigate('/', { replace: true })
      return
    }

    const loadStats = async () => {
      setLoading(true)
      try {
        const [voteStats, total] = await Promise.all([
          mockVoteService.getVoteStats(),
          mockVoteService.getTotalVotes(),
        ])
        setStats(voteStats)
        setTotalVotes(total)
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [championId, runnerUpId, navigate])

  const handleDownload = useCallback(async () => {
    if (!posterRef.current) return
    const blob = await exportToPng(posterRef.current)
    if (blob) {
      downloadBlob(blob, 'wc2026-prediction-story.png')
    }
  }, [])

  const handleShare = useCallback(async (): Promise<boolean> => {
    if (!posterRef.current) return false
    const blob = await exportToPng(posterRef.current)
    return blob ? sharePoster(blob, t.shareTitle, t.shareFallbackText) : false
  }, [t.shareFallbackText, t.shareTitle])

  if (!championId || !runnerUpId) return null

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen pb-12"
    >
      <div className="sticky top-0 z-30 border-b border-white/8 bg-black/42 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 pr-[250px] sm:pr-[300px]">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex min-h-10 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/64 transition-colors hover:border-gold/35 hover:text-gold-light"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
            </svg>
            {t.predictAgain}
          </button>
          <div className="hidden text-[11px] font-black uppercase tracking-[0.24em] text-gold-light sm:block">{t.result}</div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-7 lg:grid-cols-[430px_1fr] lg:items-start">
        <section className="flex flex-col items-center">
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-5 text-center"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gold/72">{t.storyPoster}</p>
            <h1 className="gold-text mt-2 text-4xl font-black leading-tight">{t.posterGenerated}</h1>
            <p className="mt-2 text-sm font-medium text-white/56">{t.posterSubtitle}</p>
          </motion.div>

          <motion.div
            initial={{ rotateY: 20, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="poster-preview-frame h-[653px] w-[367px] max-w-[92vw] overflow-hidden rounded-[28px]"
          >
            <PosterCard championId={championId} runnerUpId={runnerUpId} preview />
          </motion.div>

          <div className="pointer-events-none fixed -left-[9999px] top-0">
            <PosterCard ref={posterRef} championId={championId} runnerUpId={runnerUpId} />
          </div>

          <div className="mt-5 w-full max-w-[367px]">
            <ShareButton onDownload={handleDownload} onShare={handleShare} canShare={canShare} />
          </div>
        </section>

        <section className="space-y-5">
          <div className="section-frame rounded-[28px] p-5">
            {loading ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center gap-3 text-white/52">
                <svg className="h-8 w-8 animate-spin text-gold/70" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-bold">{t.loadingVotes}</span>
              </div>
            ) : (
              <VoteChart stats={stats} championId={championId} runnerUpId={runnerUpId} totalVotes={totalVotes} />
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="min-h-12 w-full rounded-[18px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-black text-white/64 transition-colors hover:border-gold/35 hover:text-gold-light"
          >
            {t.predictAgain}
          </button>
        </section>
      </div>
    </motion.main>
  )
}
