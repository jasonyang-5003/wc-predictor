import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Team } from '../data/teams'
import { getTeamName } from '../data/teams'
import FlagImage from '../components/FlagImage'
import TeamGrid from '../components/TeamGrid'
import StepIndicator from '../components/StepIndicator'
import { mockVoteService } from '../services/mockVoteService'
import { useLanguage } from '../i18n/LanguageContext'
import trophyBackground from '../assets/poster/world-cup-trophy-story-bg.jpg'

export default function SelectionPage() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const [step, setStep] = useState<1 | 2>(1)
  const [champion, setChampion] = useState<Team | null>(null)
  const [runnerUp, setRunnerUp] = useState<Team | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSelectChampion = useCallback((team: Team) => {
    setChampion(team)
    setTimeout(() => setStep(2), 240)
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
      className="relative z-10 min-h-screen pb-36"
    >
      <section className="relative overflow-hidden px-4 pb-6 pt-20 sm:pb-14 sm:pt-24">
        <div className="hero-beams pointer-events-none absolute inset-0" />
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:min-h-[620px] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-black/35 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-gold-light shadow-[0_0_28px_rgba(231,185,87,0.14)] lg:mx-0"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_14px_rgba(255,227,154,0.9)]" />
              {t.heroEyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="gold-text mx-auto max-w-[780px] text-[clamp(38px,10.5vw,96px)] font-black leading-[0.98] lg:mx-0"
            >
              <span className="block sm:inline">{t.heroTitleLine1}</span>
              <span className="block sm:inline">{t.heroTitleLine2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mx-auto mt-4 max-w-[620px] text-sm font-medium leading-7 text-white/76 sm:text-base sm:leading-8 lg:mx-0"
            >
              {t.heroDescription}
            </motion.p>

            <div className="relative z-20 mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => document.getElementById('team-selection')?.scrollIntoView({ behavior: 'smooth' })}
                className="primary-cta min-h-12 rounded-full px-8 py-3.5 text-sm font-black transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {t.startPrediction}
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.18, duration: 0.55, ease: 'easeOut' }}
            className="hero-poster-panel mx-auto hidden w-full max-w-[320px] rounded-[24px] border border-white/12 bg-black/38 p-3 shadow-[0_34px_120px_rgba(0,0,0,0.52)] sm:block sm:max-w-[390px] sm:rounded-[28px] sm:p-5"
          >
            <div
              className="relative aspect-[9/12] overflow-hidden rounded-[20px] border border-gold/20 bg-cover bg-center sm:aspect-[9/14] sm:rounded-[22px]"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(255,220,135,0.16), rgba(4,8,13,0.92)), url(${trophyBackground})`,
              }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.56)_68%,rgba(0,0,0,0.82))]" />
              <div className="absolute left-5 right-5 top-6 text-center">
                <div className="text-[10px] font-black uppercase tracking-[0.32em] text-white/60">{t.predictionPoster}</div>
                <div className="gold-text mt-3 text-3xl font-black">{t.myChampionPrediction}</div>
              </div>
              <div className="absolute inset-x-5 bottom-6 rounded-[20px] border border-white/12 bg-black/46 p-4 backdrop-blur-md">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-gold/80">{t.championPick}</div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="grid h-12 w-16 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-sm font-black tracking-[0.18em] text-gold-light">WC</div>
                  <div>
                    <div className="text-xl font-black text-white">{t.chooseTeam}</div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">{t.shareYourStory}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="team-selection" className="mx-auto max-w-5xl px-4">
        <div className="section-frame rounded-[28px] p-4 sm:p-6">
          <StepIndicator currentStep={step} championName={champion ? getTeamName(champion, language) : undefined} />

          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
          >
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gold/72">
                {step === 1 ? `Step 01 / ${t.champion}` : `Step 02 / ${t.runnerUp}`}
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                {step === 1 ? t.chooseChampionTitle : t.chooseRunnerUpTitle}
              </h2>
            </div>
            {step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                className="min-h-11 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/64 transition-colors hover:border-gold/40 hover:text-gold-light"
              >
                {t.chooseChampionAgain}
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
          className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4"
        >
          <div className="confirm-dock mx-auto max-w-4xl rounded-[24px] p-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="flex min-w-0 items-center gap-3 rounded-[16px] bg-gold/12 p-3">
                  <FlagImage team={champion} className="h-9 w-12" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-gold/70">{t.champion}</div>
                    <div className="truncate text-sm font-black text-gold-light">{getTeamName(champion, language)}</div>
                  </div>
                </div>
                <span className="text-xs font-black text-white/32">VS</span>
                <div className="flex min-w-0 items-center gap-3 rounded-[16px] bg-white/[0.06] p-3">
                  <FlagImage team={runnerUp} className="h-9 w-12" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/46">{t.runnerUp}</div>
                    <div className="truncate text-sm font-black text-white">{getTeamName(runnerUp, language)}</div>
                  </div>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="primary-cta min-h-14 rounded-[18px] px-6 py-4 text-sm font-black transition-opacity disabled:opacity-60 sm:w-[190px]"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                {submitting ? t.generating : t.generatePoster}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.main>
  )
}
