import { forwardRef } from 'react'
import { getTeamById } from '../data/teams'
import type { Team } from '../data/teams'
import trophyStoryBackground from '../assets/poster/world-cup-trophy-story-bg.jpg'
import ugphoneLogo from '../assets/poster/ugphone-logo.png'

interface PosterCardProps {
  championId: string;
  runnerUpId: string;
  predictorName?: string;
  preview?: boolean;
}

function initials(team: Team): string {
  return team.nameEn
    .split(/\s|&/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

function PosterFlag({ team, size }: { team: Team; size: 'champion' | 'runner' }) {
  const boxStyle = size === 'champion'
    ? { width: 248, height: 164, borderRadius: 32, fontSize: 70 }
    : { width: 144, height: 96, borderRadius: 24, fontSize: 42 }

  return (
    <div style={{ position: 'relative', ...boxStyle, filter: 'drop-shadow(0 26px 44px rgba(0,0,0,0.42))' }}>
      <img
        src={team.flagImage}
        alt={`${team.name} flag`}
        crossOrigin="anonymous"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          borderRadius: boxStyle.borderRadius,
          border: '4px solid rgba(255,255,255,0.3)',
        }}
        onError={(event) => {
          const image = event.currentTarget
          const fallback = image.nextElementSibling
          image.style.display = 'none'
          if (fallback instanceof HTMLElement) fallback.style.display = 'grid'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'none',
          placeItems: 'center',
          borderRadius: boxStyle.borderRadius,
          border: '4px solid rgba(255,255,255,0.28)',
          background: 'rgba(255,255,255,0.12)',
          color: '#fff',
          fontSize: boxStyle.fontSize,
          fontWeight: 1000,
          letterSpacing: 4,
        }}
      >
        {initials(team)}
      </div>
    </div>
  )
}

const PosterCard = forwardRef<HTMLDivElement, PosterCardProps>(
  ({ championId, runnerUpId, predictorName = '', preview = false }, ref) => {
    const champion = getTeamById(championId)
    const runnerUp = getTeamById(runnerUpId)

    if (!champion || !runnerUp) return null

    const scale = preview ? 0.34 : 1
    const displayName = predictorName.trim() || 'World Cup Fan'

    return (
      <div
        ref={ref}
        className="poster-bg relative overflow-hidden"
        style={{
          width: 1080,
          height: 1920,
          transform: preview ? `scale(${scale})` : undefined,
          transformOrigin: 'top left',
          borderRadius: preview ? 72 : 0,
          fontFamily: "Inter, 'Microsoft YaHei', 'PingFang SC', system-ui, sans-serif",
          color: '#fff',
        }}
      >
        <img
          src={trophyStoryBackground}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'saturate(1.08) contrast(1.02)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 30%, rgba(3,6,10,0.72) 58%, rgba(2,3,5,0.96) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 23%, rgba(255,218,116,0.32), transparent 30%), radial-gradient(circle at 12% 42%, rgba(0,184,255,0.15), transparent 24%), radial-gradient(circle at 92% 48%, rgba(255,81,81,0.12), transparent 24%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.48, backgroundImage: 'radial-gradient(circle, rgba(255,225,145,0.95) 0 2px, transparent 2.8px), radial-gradient(circle, rgba(255,255,255,0.42) 0 1.5px, transparent 2.2px)', backgroundSize: '92px 92px, 148px 148px' }} />
        <div style={{ position: 'absolute', left: -120, top: -150, width: 540, height: 1120, transform: 'rotate(18deg)', background: 'linear-gradient(180deg, rgba(255,230,160,0.34), rgba(255,213,106,0.07) 55%, transparent)', filter: 'blur(16px)' }} />
        <div style={{ position: 'absolute', right: -120, top: -150, width: 540, height: 1120, transform: 'rotate(-18deg)', background: 'linear-gradient(180deg, rgba(255,230,160,0.3), rgba(255,213,106,0.06) 55%, transparent)', filter: 'blur(16px)' }} />
        <div style={{ position: 'absolute', left: -120, right: -120, bottom: 0, height: 470, background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 104px), linear-gradient(180deg, transparent, rgba(4,8,6,0.9))', transform: 'perspective(680px) rotateX(58deg)', transformOrigin: 'bottom center' }} />

        <div style={{ position: 'relative', zIndex: 2, height: '100%', padding: '104px 84px 74px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 8, color: 'rgba(255,255,255,0.68)' }}>
            2026 WORLD CUP PREDICTION
          </div>
          <div style={{ width: 260, height: 4, marginTop: 28, background: 'linear-gradient(90deg, transparent, #ffd978, transparent)' }} />

          <div style={{ marginTop: 58, fontSize: 76, lineHeight: 1.05, fontWeight: 1000, color: '#ffe39a', textShadow: '0 0 44px rgba(231,185,87,0.42)' }}>
            我的冠军预测
          </div>
          <div style={{ marginTop: 22, borderRadius: 999, border: '2px solid rgba(255,227,154,0.28)', background: 'rgba(0,0,0,0.34)', padding: '14px 28px', fontSize: 28, fontWeight: 900, color: 'rgba(255,255,255,0.84)', boxShadow: '0 20px 60px rgba(0,0,0,0.24)' }}>
            预测大师：{displayName}
          </div>

          <div style={{ marginTop: 86, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: 9, color: '#e7b957' }}>CHAMPION</div>
            <div style={{ marginTop: 24 }}>
              <PosterFlag team={champion} size="champion" />
            </div>
            <div style={{ marginTop: 28, fontSize: 104, lineHeight: 1.05, fontWeight: 1000, color: '#fff2bb', textShadow: '0 0 46px rgba(231,185,87,0.48)' }}>
              {champion.name}
            </div>
            <div style={{ marginTop: 16, fontSize: 34, fontWeight: 900, letterSpacing: 6, color: 'rgba(255,255,255,0.46)', textTransform: 'uppercase' }}>
              {champion.nameEn}
            </div>
          </div>

          <div style={{ marginTop: 66, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 30 }}>
            <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(231,185,87,0.56))' }} />
            <div style={{ fontSize: 30, fontWeight: 1000, letterSpacing: 10, color: 'rgba(255,255,255,0.32)' }}>FINAL</div>
            <div style={{ height: 2, background: 'linear-gradient(90deg, rgba(231,185,87,0.56), transparent)' }} />
          </div>

          <div style={{ marginTop: 50, width: '100%', padding: '34px 44px', borderRadius: 42, border: '2px solid rgba(255,255,255,0.14)', background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.052))', display: 'grid', gridTemplateColumns: '154px 1fr', alignItems: 'center', gap: 34, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 28px 90px rgba(0,0,0,0.28)' }}>
            <PosterFlag team={runnerUp} size="runner" />
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 7, color: 'rgba(255,255,255,0.52)' }}>RUNNER-UP</div>
              <div style={{ marginTop: 12, fontSize: 58, lineHeight: 1.08, fontWeight: 1000, color: '#ffffff' }}>{runnerUp.name}</div>
              <div style={{ marginTop: 10, fontSize: 25, fontWeight: 800, letterSpacing: 4, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase' }}>{runnerUp.nameEn}</div>
            </div>
          </div>

          <div style={{ marginTop: 56, width: '100%', borderRadius: 36, border: '1px solid rgba(231,185,87,0.32)', background: 'rgba(5,7,10,0.62)', padding: '32px 40px', textAlign: 'center', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: 35, lineHeight: 1.55, fontWeight: 800, color: 'rgba(255,255,255,0.84)' }}>
              我预测的2026世界杯冠军和亚军为：
              <span style={{ color: '#ffe39a' }}>{champion.name}</span>
              {' 和 '}
              <span style={{ color: '#ffffff' }}>{runnerUp.name}</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 34 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 1000, letterSpacing: 4, color: '#ffe39a' }}>WC2026 PREDICTOR</div>
              <div style={{ marginTop: 10, fontSize: 20, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.42)' }}>UgPhone World Cup Event</div>
            </div>
            <div style={{ width: 250, borderRadius: 28, border: '2px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.9)', padding: '12px 16px', boxShadow: '0 24px 80px rgba(0,0,0,0.34), 0 0 36px rgba(255,227,154,0.2)' }}>
              <img src={ugphoneLogo} alt="UgPhone logo" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 18 }} />
            </div>
          </div>
        </div>
      </div>
    )
  },
)

PosterCard.displayName = 'PosterCard'

export default PosterCard
