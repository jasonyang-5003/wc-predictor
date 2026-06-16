import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

interface ShareButtonProps {
  onDownload: () => Promise<void>;
  onShare: () => Promise<boolean>;
  canShare: boolean;
}

export default function ShareButton({ onDownload, onShare, canShare }: ShareButtonProps) {
  const { t } = useLanguage()
  const [downloading, setDownloading] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [downloadDone, setDownloadDone] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await onDownload()
      setDownloadDone(true)
      setTimeout(() => setDownloadDone(false), 1800)
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    setSharing(true)
    try {
      if (canShare) {
        const shared = await onShare()
        if (shared) return
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(t.shareFallbackText)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } finally {
      setSharing(false)
    }
  }

  return (
    <div className="grid w-full grid-cols-2 gap-3">
      <motion.button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="primary-cta flex min-h-12 items-center justify-center gap-2 rounded-[16px] px-4 py-3.5 text-sm font-black transition-opacity disabled:opacity-60"
        whileHover={{ scale: 1.018 }}
        whileTap={{ scale: 0.982 }}
      >
        {downloading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeLinecap="round" />
            </svg>
            {t.generating}
          </>
        ) : downloadDone ? (
          t.saved
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
            </svg>
            {t.downloadPoster}
          </>
        )}
      </motion.button>

      <motion.button
        type="button"
        onClick={handleShare}
        disabled={sharing}
        className="flex min-h-12 items-center justify-center gap-2 rounded-[16px] border border-gold/28 bg-white/[0.06] px-4 py-3.5 text-sm font-black text-gold-light transition-colors hover:bg-gold/10 disabled:opacity-60"
        whileHover={{ scale: 1.018 }}
        whileTap={{ scale: 0.982 }}
      >
        {sharing ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 9l8 6m0-6-8 6" />
          </svg>
        )}
        {canShare ? t.share : copied ? t.copied : t.copyText}
      </motion.button>
    </div>
  )
}
