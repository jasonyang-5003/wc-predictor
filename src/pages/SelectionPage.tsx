import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Team } from '../data/teams'
import FlagImage from '../components/FlagImage'
import TeamGrid from '../components/TeamGrid'
import StepIndicator from '../components/StepIndicator'
import { mockVoteService } from '../services/mockVoteService'

export default function SelectionPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2>(1)
  const [champion, setChampion] = useState<Team | null>(null)
  const [runnerUp, setRunnerUp] = useState<Team | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSelectChampion = useCallback((team: Team) => {
    setChampion(team)
    setTimeout(() => setStep(2), 260)
  }, [])

  const handleSelectRunnerUp = useCallback((team: Team) => {
    if (champion && team.id === champion.id) return
    setRunnerUp(team)
  }, [champion])

  const handleSubmit = async () => {
    if (!champion || !runnerUp) return
    setSubmitting(true)
    try {
      await mockVoteService.submitVote(champion.id, runnerUp.id)
      navigate(`/result?champion=${champion.id}&runnerUp=${runnerUp.id}`)
    } catch (error) {
      console.error('Submit failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleBack = () => {
    setStep(1)
    setRunnerUp(null)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen pb-32"
    >
      <section className="relative overflow-hidden px-4 pb-9 pt-8 sm:pt-12">
        <div className="animate-slow-pan pointer-events-none absolute inset-x-0 top-[-18%] h-[72%] bg-[radial-gradient(ellipse_at_center,rgba(255,226,139,0.24),transparent_48%)]" />
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 rounded-full border border-gold/32 bg-black/30 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-gold-light shadow-[0_0_24px_rgba(231,185,87,0.12)]"
          >
            2026 World Cup Predictor
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="gold-text max-w-[760px] px-2 text-[clamp(34px,10vw,78px)] font-black leading-[1.02]"
          >
            <span className="block">预测你的</span>
            <span className="block">冠军之路</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-5 max-w-[330px] text-sm leading-7 text-white/68 sm:max-w-[560px] sm:text-base"
          >
            <span className="block sm:inline">选择你心中的 2026 世界杯冠军与亚军，</span>
            <span className="block sm:inline">生成一张可分享的竖版赛事海报。</span>
          </motion.p>

          <motion.button
            type="button"
            onClick={() => document.getElementById('team-selection')?.scrollIntoView({ behavior: 'smooth' })}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glow-button mt-7 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-7 py-3.5 text-sm font-black text-primary"
          >
            开始预测
          </motion.button>
        </div>
      </section>

      <section id="team-selection" className="mx-auto max-w-4xl px-4">
        <div className="glass-strong rounded-[26px] p-4 sm:p-6">
          <StepIndicator currentStep={step} championName={champion?.name} />

          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left"
          >
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-gold/70">
                {step === 1 ? 'Step 01 · Champion' : 'Step 02 · Runner-up'}
              </p>
              <h2 className="mt-1 text-xl font-black text-white">
                {step === 1 ? '选择你预测的冠军' : '选择你预测的亚军'}
              </h2>
            </div>
            {step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/58 transition-colors hover:border-gold/35 hover:text-gold-light"
              >
                重新选择冠军
              </button>
            )}
          </motion.div>

          {step === 1 ? (
            <TeamGrid
              selectedId={champion?.id ?? null}
              disabledId={null}
              selectionType="champion"
              onSelect={handleSelectChampion}
            />
          ) : (
            <TeamGrid
              selectedId={runnerUp?.id ?? null}
              disabledId={champion?.id ?? null}
              selectionType="runner-up"
              onSelect={handleSelectRunnerUp}
            />
          )}
        </div>
      </section>

      {step === 2 && runnerUp && champion && (
        <motion.div
          initial={{ y: 110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 110, opacity: 0 }}
          className="fixed inset-x-0 bottom-0 z-40 p-4"
        >
          <div className="glass-strong mx-auto max-w-3xl rounded-[24px] p-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="flex items-center gap-3 rounded-[16px] bg-gold/10 p-3">
                  <FlagImage team={champion} className="h-9 w-12" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-gold/70">Champion</div>
                    <div className="truncate text-sm font-black text-gold-light">{champion.name}</div>
                  </div>
                </div>
                <span className="text-xs font-black text-white/28">VS</span>
                <div className="flex items-center gap-3 rounded-[16px] bg-white/[0.06] p-3">
                  <FlagImage team={runnerUp} className="h-9 w-12" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/42">Runner-up</div>
                    <div className="truncate text-sm font-black text-white">{runnerUp.name}</div>
                  </div>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="glow-button rounded-[18px] bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 py-4 text-sm font-black text-primary transition-opacity disabled:opacity-60 sm:w-[180px]"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                {submitting ? '提交中...' : '生成海报'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.main>
  )
}
