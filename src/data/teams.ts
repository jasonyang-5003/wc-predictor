export interface Team {
  id: string;
  name: string;
  nameEn: string;
  flagImage: string;
  confederation: string;
}

export const confederations = [
  '全部',
  '欧洲',
  '南美洲',
  '中北美',
  '亚洲',
  '非洲',
  '大洋洲',
] as const;

export type Confederation = (typeof confederations)[number];

const flagImages = import.meta.glob<string>('../assets/flags/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

function flagImageFor(id: string): string {
  return flagImages[`../assets/flags/${id}.svg`] ?? '';
}

const teamSeed = [
  ['germany', '德国', 'Germany', '欧洲'],
  ['spain', '西班牙', 'Spain', '欧洲'],
  ['france', '法国', 'France', '欧洲'],
  ['england', '英格兰', 'England', '欧洲'],
  ['portugal', '葡萄牙', 'Portugal', '欧洲'],
  ['netherlands', '荷兰', 'Netherlands', '欧洲'],
  ['italy', '意大利', 'Italy', '欧洲'],
  ['croatia', '克罗地亚', 'Croatia', '欧洲'],
  ['belgium', '比利时', 'Belgium', '欧洲'],
  ['switzerland', '瑞士', 'Switzerland', '欧洲'],
  ['denmark', '丹麦', 'Denmark', '欧洲'],
  ['austria', '奥地利', 'Austria', '欧洲'],
  ['serbia', '塞尔维亚', 'Serbia', '欧洲'],
  ['poland', '波兰', 'Poland', '欧洲'],
  ['turkey', '土耳其', 'Turkey', '欧洲'],
  ['ukraine', '乌克兰', 'Ukraine', '欧洲'],
  ['argentina', '阿根廷', 'Argentina', '南美洲'],
  ['brazil', '巴西', 'Brazil', '南美洲'],
  ['uruguay', '乌拉圭', 'Uruguay', '南美洲'],
  ['colombia', '哥伦比亚', 'Colombia', '南美洲'],
  ['ecuador', '厄瓜多尔', 'Ecuador', '南美洲'],
  ['paraguay', '巴拉圭', 'Paraguay', '南美洲'],
  ['usa', '美国', 'United States', '中北美'],
  ['mexico', '墨西哥', 'Mexico', '中北美'],
  ['canada', '加拿大', 'Canada', '中北美'],
  ['jamaica', '牙买加', 'Jamaica', '中北美'],
  ['honduras', '洪都拉斯', 'Honduras', '中北美'],
  ['panama', '巴拿马', 'Panama', '中北美'],
  ['japan', '日本', 'Japan', '亚洲'],
  ['south_korea', '韩国', 'South Korea', '亚洲'],
  ['iran', '伊朗', 'Iran', '亚洲'],
  ['australia', '澳大利亚', 'Australia', '亚洲'],
  ['saudi_arabia', '沙特阿拉伯', 'Saudi Arabia', '亚洲'],
  ['qatar', '卡塔尔', 'Qatar', '亚洲'],
  ['iraq', '伊拉克', 'Iraq', '亚洲'],
  ['uzbekistan', '乌兹别克斯坦', 'Uzbekistan', '亚洲'],
  ['morocco', '摩洛哥', 'Morocco', '非洲'],
  ['senegal', '塞内加尔', 'Senegal', '非洲'],
  ['nigeria', '尼日利亚', 'Nigeria', '非洲'],
  ['cameroon', '喀麦隆', 'Cameroon', '非洲'],
  ['egypt', '埃及', 'Egypt', '非洲'],
  ['south_africa', '南非', 'South Africa', '非洲'],
  ['tunisia', '突尼斯', 'Tunisia', '非洲'],
  ['algeria', '阿尔及利亚', 'Algeria', '非洲'],
  ['dr_congo', '刚果（金）', 'DR Congo', '非洲'],
  ['new_zealand', '新西兰', 'New Zealand', '大洋洲'],
  ['indonesia', '印度尼西亚', 'Indonesia', '亚洲'],
  ['trinidad', '特立尼达和多巴哥', 'Trinidad & Tobago', '中北美'],
] as const;

export const teams: Team[] = teamSeed.map(([id, name, nameEn, confederation]) => ({
  id,
  name,
  nameEn,
  confederation,
  flagImage: flagImageFor(id),
}));

export function getTeamById(id: string): Team | undefined {
  return teams.find((team) => team.id === id);
}

export function getTeamsByConfederation(confederation: string): Team[] {
  if (confederation === '全部') return teams;
  return teams.filter((team) => team.confederation === confederation);
}
