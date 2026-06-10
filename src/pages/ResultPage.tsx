import { useRef, useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PosterCard from '../components/PosterCard'
import VoteChart from '../components/VoteChart'
import ShareButton from '../components/ShareButton'
import { exportToPng, downloadBlob, sharePoster } from '../utils/exportImage'
import { mockVoteService } from '../services/mockVoteService'
import type { VoteStats } from '../services/types'

export default function ResultPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const posterRef = useRef<HTMLDivElement>(null)

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
    return blob ? sharePoster(blob) : false
  }, [])

  if (!championId || !runnerUpId) return null

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen pb-10"
    >
      <div className="sticky top-0 z-30 border-b border-white/8 bg-black/36 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/58 transition-colors hover:border-gold/35 hover:text-gold-light"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
            </svg>
            重新预测
          </button>
          <div className="text-[11px] font-black uppercase tracking-[0.22em] text-gold-light">Prediction Result</div>
          <div className="w-[86px]" />
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-7 lg:grid-cols-[420px_1fr] lg:items-start">
        <section className="flex flex-col items-center">
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-5 text-center"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gold/70">Your Story Poster</p>
            <h1 className="gold-text mt-2 text-3xl font-black">你的预测海报已生成</h1>
          </motion.div>

          <motion.div
            initial={{ rotateY: 24, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="h-[653px] w-[367px] max-w-[92vw] overflow-hidden rounded-[26px] shadow-[0_30px_110px_rgba(0,0,0,0.58),0_0_44px_rgba(231,185,87,0.24)]"
          >
            <PosterCard championId={championId} runnerUpId={runnerUpId} preview />
          </motion.div>

          <div className="pointer-events-none fixed -left-[9999px] top-0">
            <PosterCard ref={posterRef} championId={championId} runnerUpId={runnerUpId} />
          </div>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-5 w-full max-w-[367px]"
          >
            <ShareButton onDownload={handleDownload} onShare={handleShare} canShare={canShare} />
          </motion.div>
        </section>

        <section className="space-y-5">
          <div className="glass-strong rounded-[26px] p-5">
            {loading ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center gap-3 text-white/45">
                <svg className="h-8 w-8 animate-spin text-gold/60" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-bold">加载投票数据...</span>
              </div>
            ) : (
              <VoteChart stats={stats} championId={championId} runnerUpId={runnerUpId} totalVotes={totalVotes} />
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full rounded-[18px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-black text-white/58 transition-colors hover:border-gold/35 hover:text-gold-light"
          >
            再预测一次
          </button>
        </section>
      </div>
    </motion.main>
  )
}
