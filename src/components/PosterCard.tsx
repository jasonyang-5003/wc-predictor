import { forwardRef } from 'react'
import { getTeamById } from '../data/teams'
import type { Team } from '../data/teams'
import trophyStoryBackground from '../assets/poster/world-cup-trophy-story-bg.jpg'

interface PosterCardProps {
  championId: string;
  runnerUpId: string;
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
    ? { width: 260, height: 174, borderRadius: 34, fontSize: 70 }
    : { width: 150, height: 100, borderRadius: 24, fontSize: 42 }

  return (
    <div style={{ position: 'relative', ...boxStyle, filter: 'drop-shadow(0 28px 46px rgba(0,0,0,0.38))' }}>
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
          border: '4px solid rgba(255,255,255,0.28)',
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
  ({ championId, runnerUpId, preview = false }, ref) => {
    const champion = getTeamById(championId)
    const runnerUp = getTeamById(runnerUpId)

    if (!champion || !runnerUp) return null

    const scale = preview ? 0.34 : 1

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
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.2) 35%, rgba(3,6,9,0.76) 68%, rgba(2,3,5,0.94) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center bottom, rgba(20,120,76,0.34), transparent 44%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.58, backgroundImage: 'radial-gradient(circle, rgba(255,225,145,0.95) 0 2px, transparent 2.8px), radial-gradient(circle, rgba(255,255,255,0.42) 0 1.5px, transparent 2.2px)', backgroundSize: '92px 92px, 148px 148px' }} />
        <div style={{ position: 'absolute', left: -130, top: -160, width: 560, height: 1180, transform: 'rotate(18deg)', background: 'linear-gradient(180deg, rgba(255,230,160,0.38), rgba(255,213,106,0.08) 55%, transparent)', filter: 'blur(16px)' }} />
        <div style={{ position: 'absolute', right: -130, top: -160, width: 560, height: 1180, transform: 'rotate(-18deg)', background: 'linear-gradient(180deg, rgba(255,230,160,0.34), rgba(255,213,106,0.07) 55%, transparent)', filter: 'blur(16px)' }} />
        <div style={{ position: 'absolute', left: 150, top: 210, width: 780, height: 780, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.055)' }} />
        <div style={{ position: 'absolute', left: 245, top: 305, width: 590, height: 590, borderRadius: '50%', border: '1px solid rgba(231,185,87,0.16)' }} />

        <div style={{ position: 'absolute', left: -120, right: -120, bottom: 0, height: 480, background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0 2px, transparent 2px 104px), linear-gradient(180deg, transparent, rgba(4,8,6,0.88))', transform: 'perspective(680px) rotateX(58deg)', transformOrigin: 'bottom center' }} />

        <div style={{ position: 'relative', zIndex: 2, height: '100%', padding: '112px 86px 78px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 8, color: 'rgba(255,255,255,0.62)' }}>
            2026 WORLD CUP PREDICTION
          </div>
          <div style={{ width: 260, height: 4, marginTop: 28, background: 'linear-gradient(90deg, transparent, #ffd978, transparent)' }} />

          <div style={{ marginTop: 72, fontSize: 76, lineHeight: 1.05, fontWeight: 1000, color: '#ffe39a', textShadow: '0 0 44px rgba(231,185,87,0.36)' }}>
            我的冠军预测
          </div>

          <div style={{ marginTop: 112, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: 9, color: '#e7b957' }}>CHAMPION</div>
            <div style={{ marginTop: 26 }}>
              <PosterFlag team={champion} size="champion" />
            </div>
            <div style={{ marginTop: 28, fontSize: 104, lineHeight: 1.05, fontWeight: 1000, color: '#fff2bb', textShadow: '0 0 46px rgba(231,185,87,0.44)' }}>
              {champion.name}
            </div>
            <div style={{ marginTop: 18, fontSize: 34, fontWeight: 900, letterSpacing: 6, color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase' }}>
              {champion.nameEn}
            </div>
          </div>

          <div style={{ marginTop: 72, width: '100%', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 30 }}>
            <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(231,185,87,0.52))' }} />
            <div style={{ fontSize: 30, fontWeight: 1000, letterSpacing: 10, color: 'rgba(255,255,255,0.28)' }}>FINAL</div>
            <div style={{ height: 2, background: 'linear-gradient(90deg, rgba(231,185,87,0.52), transparent)' }} />
          </div>

          <div style={{ marginTop: 52, width: '100%', padding: '36px 46px', borderRadius: 42, border: '2px solid rgba(255,255,255,0.12)', background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.045))', display: 'grid', gridTemplateColumns: '160px 1fr', alignItems: 'center', gap: 34 }}>
            <PosterFlag team={runnerUp} size="runner" />
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 7, color: 'rgba(255,255,255,0.46)' }}>RUNNER-UP</div>
              <div style={{ marginTop: 12, fontSize: 58, lineHeight: 1.08, fontWeight: 1000, color: '#ffffff' }}>{runnerUp.name}</div>
              <div style={{ marginTop: 10, fontSize: 25, fontWeight: 800, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{runnerUp.nameEn}</div>
            </div>
          </div>

          <div style={{ marginTop: 64, width: '100%', borderRadius: 36, border: '1px solid rgba(231,185,87,0.28)', background: 'rgba(5,7,10,0.54)', padding: '34px 42px', textAlign: 'center', boxShadow: '0 24px 80px rgba(0,0,0,0.26)' }}>
            <div style={{ fontSize: 36, lineHeight: 1.55, fontWeight: 800, color: 'rgba(255,255,255,0.82)' }}>
              我预测的2026世界杯冠军和亚军为：
              <span style={{ color: '#ffe39a' }}>{champion.name}</span>
              {' 和 '}
              <span style={{ color: '#ffffff' }}>{runnerUp.name}</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 1000, letterSpacing: 4, color: '#ffe39a' }}>WC2026 PREDICTOR</div>
              <div style={{ marginTop: 10, fontSize: 20, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.36)' }}>worldcup2026.predict</div>
            </div>
            <div style={{ width: 132, height: 132, borderRadius: 18, background: '#f5f1df', padding: 14, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
              {Array.from({ length: 25 }).map((_, index) => (
                <div key={index} style={{ background: index % 2 === 0 || index === 7 || index === 17 ? '#091018' : 'transparent', borderRadius: 2 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

PosterCard.displayName = 'PosterCard'

export default PosterCard
