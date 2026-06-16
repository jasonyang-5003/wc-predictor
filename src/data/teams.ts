import type { LanguageCode } from '../i18n/translations'

export type ConfederationCode = 'all' | 'uefa' | 'conmebol' | 'concacaf' | 'afc' | 'caf' | 'ofc'

export interface Team {
  id: string;
  name: string;
  nameEn: string;
  names: Record<LanguageCode, string>;
  flagImage: string;
  confederation: Exclude<ConfederationCode, 'all'>;
}

export const confederations: ConfederationCode[] = [
  'all',
  'uefa',
  'conmebol',
  'concacaf',
  'afc',
  'caf',
  'ofc',
]

const flagImages = import.meta.glob<string>('../assets/flags/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

function flagImageFor(id: string): string {
  return flagImages[`../assets/flags/${id}.svg`] ?? ''
}

const teamSeed = [
  ['germany', 'Germany', '德国', 'Alemanha', 'Alemania', 'uefa'],
  ['spain', 'Spain', '西班牙', 'Espanha', 'España', 'uefa'],
  ['france', 'France', '法国', 'França', 'Francia', 'uefa'],
  ['england', 'England', '英格兰', 'Inglaterra', 'Inglaterra', 'uefa'],
  ['portugal', 'Portugal', '葡萄牙', 'Portugal', 'Portugal', 'uefa'],
  ['netherlands', 'Netherlands', '荷兰', 'Países Baixos', 'Países Bajos', 'uefa'],
  ['italy', 'Italy', '意大利', 'Itália', 'Italia', 'uefa'],
  ['croatia', 'Croatia', '克罗地亚', 'Croácia', 'Croacia', 'uefa'],
  ['belgium', 'Belgium', '比利时', 'Bélgica', 'Bélgica', 'uefa'],
  ['switzerland', 'Switzerland', '瑞士', 'Suíça', 'Suiza', 'uefa'],
  ['denmark', 'Denmark', '丹麦', 'Dinamarca', 'Dinamarca', 'uefa'],
  ['austria', 'Austria', '奥地利', 'Áustria', 'Austria', 'uefa'],
  ['serbia', 'Serbia', '塞尔维亚', 'Sérvia', 'Serbia', 'uefa'],
  ['poland', 'Poland', '波兰', 'Polônia', 'Polonia', 'uefa'],
  ['turkey', 'Turkey', '土耳其', 'Turquia', 'Turquía', 'uefa'],
  ['ukraine', 'Ukraine', '乌克兰', 'Ucrânia', 'Ucrania', 'uefa'],
  ['argentina', 'Argentina', '阿根廷', 'Argentina', 'Argentina', 'conmebol'],
  ['brazil', 'Brazil', '巴西', 'Brasil', 'Brasil', 'conmebol'],
  ['uruguay', 'Uruguay', '乌拉圭', 'Uruguai', 'Uruguay', 'conmebol'],
  ['colombia', 'Colombia', '哥伦比亚', 'Colômbia', 'Colombia', 'conmebol'],
  ['ecuador', 'Ecuador', '厄瓜多尔', 'Equador', 'Ecuador', 'conmebol'],
  ['paraguay', 'Paraguay', '巴拉圭', 'Paraguai', 'Paraguay', 'conmebol'],
  ['usa', 'United States', '美国', 'Estados Unidos', 'Estados Unidos', 'concacaf'],
  ['mexico', 'Mexico', '墨西哥', 'México', 'México', 'concacaf'],
  ['canada', 'Canada', '加拿大', 'Canadá', 'Canadá', 'concacaf'],
  ['jamaica', 'Jamaica', '牙买加', 'Jamaica', 'Jamaica', 'concacaf'],
  ['honduras', 'Honduras', '洪都拉斯', 'Honduras', 'Honduras', 'concacaf'],
  ['panama', 'Panama', '巴拿马', 'Panamá', 'Panamá', 'concacaf'],
  ['trinidad', 'Trinidad & Tobago', '特立尼达和多巴哥', 'Trinidad e Tobago', 'Trinidad y Tobago', 'concacaf'],
  ['japan', 'Japan', '日本', 'Japão', 'Japón', 'afc'],
  ['south_korea', 'South Korea', '韩国', 'Coreia do Sul', 'Corea del Sur', 'afc'],
  ['iran', 'Iran', '伊朗', 'Irã', 'Irán', 'afc'],
  ['australia', 'Australia', '澳大利亚', 'Austrália', 'Australia', 'afc'],
  ['saudi_arabia', 'Saudi Arabia', '沙特阿拉伯', 'Arábia Saudita', 'Arabia Saudita', 'afc'],
  ['qatar', 'Qatar', '卡塔尔', 'Catar', 'Catar', 'afc'],
  ['iraq', 'Iraq', '伊拉克', 'Iraque', 'Irak', 'afc'],
  ['uzbekistan', 'Uzbekistan', '乌兹别克斯坦', 'Uzbequistão', 'Uzbekistán', 'afc'],
  ['indonesia', 'Indonesia', '印度尼西亚', 'Indonésia', 'Indonesia', 'afc'],
  ['morocco', 'Morocco', '摩洛哥', 'Marrocos', 'Marruecos', 'caf'],
  ['senegal', 'Senegal', '塞内加尔', 'Senegal', 'Senegal', 'caf'],
  ['nigeria', 'Nigeria', '尼日利亚', 'Nigéria', 'Nigeria', 'caf'],
  ['cameroon', 'Cameroon', '喀麦隆', 'Camarões', 'Camerún', 'caf'],
  ['egypt', 'Egypt', '埃及', 'Egito', 'Egipto', 'caf'],
  ['south_africa', 'South Africa', '南非', 'África do Sul', 'Sudáfrica', 'caf'],
  ['tunisia', 'Tunisia', '突尼斯', 'Tunísia', 'Túnez', 'caf'],
  ['algeria', 'Algeria', '阿尔及利亚', 'Argélia', 'Argelia', 'caf'],
  ['dr_congo', 'DR Congo', '刚果（金）', 'RD Congo', 'RD Congo', 'caf'],
  ['new_zealand', 'New Zealand', '新西兰', 'Nova Zelândia', 'Nueva Zelanda', 'ofc'],
] as const

export const teams: Team[] = teamSeed.map(([id, nameEn, nameZh, namePt, nameEs, confederation]) => ({
  id,
  name: nameZh,
  nameEn,
  names: {
    'pt-BR': namePt,
    es: nameEs,
    en: nameEn,
    zh: nameZh,
  },
  confederation,
  flagImage: flagImageFor(id),
}))

export function getTeamName(team: Team, language: LanguageCode): string {
  return team.names[language] ?? team.nameEn
}

export function getTeamById(id: string): Team | undefined {
  return teams.find((team) => team.id === id)
}

export function getTeamsByConfederation(confederation: ConfederationCode): Team[] {
  if (confederation === 'all') return teams
  return teams.filter((team) => team.confederation === confederation)
}
