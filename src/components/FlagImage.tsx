import { useState } from 'react'
import type { Team } from '../data/teams'

interface FlagImageProps {
  team: Team;
  className?: string;
  fallbackClassName?: string;
  rounded?: 'md' | 'lg' | 'full';
}

function initials(team: Team): string {
  return team.nameEn
    .split(/\s|&/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

export default function FlagImage({
  team,
  className = 'h-10 w-14',
  fallbackClassName = '',
  rounded = 'lg',
}: FlagImageProps) {
  const [failed, setFailed] = useState(false)
  const radiusClass = rounded === 'full' ? 'rounded-full' : rounded === 'md' ? 'rounded-md' : 'rounded-lg'

  if (!team.flagImage || failed) {
    return (
      <span
        className={`${className} ${radiusClass} ${fallbackClassName} grid place-items-center border border-white/15 bg-white/10 text-xs font-black uppercase tracking-wider text-white`}
        aria-label={`${team.name} flag fallback`}
      >
        {initials(team)}
      </span>
    )
  }

  return (
    <img
      src={team.flagImage}
      alt={`${team.name} flag`}
      className={`${className} ${radiusClass} block object-cover shadow-[0_8px_18px_rgba(0,0,0,0.28)]`}
      loading="eager"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  )
}
