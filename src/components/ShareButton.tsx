import { useState } from 'react'
import { motion } from 'framer-motion'

interface ShareButtonProps {
  onDownload: () => Promise<void>;
  onShare: () => Promise<boolean>;
  canShare: boolean;
}

export default function ShareButton({ onDownload, onShare, canShare }: ShareButtonProps) {
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
        await onShare()
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText('我的 2026 世界杯冠军预测海报已生成。')
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
        className="glow-button flex items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-gold-dark via-gold to-gold-light px-4 py-3.5 text-sm font-black text-primary transition-opacity disabled:opacity-60"
        whileHover={{ scale: 1.018 }}
        whileTap={{ scale: 0.982 }}
      >
        {downloading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeLinecap="round" />
            </svg>
            生成中
          </>
        ) : downloadDone ? (
          '已保存'
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
            </svg>
            下载海报
          </>
        )}
      </motion.button>

      <motion.button
        type="button"
        onClick={handleShare}
        disabled={sharing}
        className="flex items-center justify-center gap-2 rounded-[16px] border border-gold/24 bg-white/[0.06] px-4 py-3.5 text-sm font-black text-gold-light transition-colors hover:bg-gold/10 disabled:opacity-60"
        whileHover={{ scale: 1.018 }}
        whileTap={{ scale: 0.982 }}
      >
        {sharing ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 9l8 6m0-6-8 6" />
          </svg>
        )}
        {canShare ? '分享' : copied ? '已复制' : '复制文案'}
      </motion.button>
    </div>
  )
}
