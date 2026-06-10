import { teams } from '../data/teams';
import type { VoteRecord, VoteService, VoteStats } from './types';

const STORAGE_KEY = 'wc2026_votes';
const MY_VOTE_KEY = 'wc2026_my_vote';

// Generate some realistic-looking seed data
function generateSeedVotes(): VoteRecord[] {
  const popularTeams = [
    { id: 'argentina', weight: 22 },
    { id: 'france', weight: 18 },
    { id: 'brazil', weight: 16 },
    { id: 'spain', weight: 15 },
    { id: 'england', weight: 14 },
    { id: 'germany', weight: 12 },
    { id: 'portugal', weight: 10 },
    { id: 'netherlands', weight: 7 },
    { id: 'italy', weight: 6 },
    { id: 'croatia', weight: 4 },
    { id: 'belgium', weight: 4 },
    { id: 'morocco', weight: 3 },
    { id: 'usa', weight: 3 },
    { id: 'japan', weight: 2 },
    { id: 'uruguay', weight: 2 },
    { id: 'senegal', weight: 1 },
    { id: 'south_korea', weight: 1 },
    { id: 'mexico', weight: 1 },
  ];

  const votes: VoteRecord[] = [];
  const now = Date.now();

  for (const team of popularTeams) {
    for (let i = 0; i < team.weight; i++) {
      // Pick a random runner-up that's not the champion
      const otherTeams = teams.filter((t) => t.id !== team.id);
      const runnerUp = otherTeams[Math.floor(Math.random() * otherTeams.length)];
      votes.push({
        champion: team.id,
        runnerUp: runnerUp.id,
        timestamp: now - Math.floor(Math.random() * 86400000 * 7),
      });
    }
  }

  return votes;
}

function getStoredVotes(): VoteRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  // Initialize with seed data
  const seed = generateSeedVotes();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

export const mockVoteService: VoteService = {
  async submitVote(champion: string, runnerUp: string): Promise<void> {
    const votes = getStoredVotes();
    const newVote: VoteRecord = {
      champion,
      runnerUp,
      timestamp: Date.now(),
    };
    votes.push(newVote);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
    localStorage.setItem(MY_VOTE_KEY, JSON.stringify(newVote));
  },

  async getVoteStats(): Promise<VoteStats[]> {
    const votes = getStoredVotes();
    const total = votes.length;

    // Count champion votes per team
    const countMap = new Map<string, number>();
    for (const vote of votes) {
      countMap.set(vote.champion, (countMap.get(vote.champion) || 0) + 1);
    }

    // Convert to sorted stats array
    const stats: VoteStats[] = [];
    for (const team of teams) {
      const championVotes = countMap.get(team.id) || 0;
      if (championVotes > 0) {
        stats.push({
          teamId: team.id,
          championVotes,
          percentage: total > 0 ? Math.round((championVotes / total) * 1000) / 10 : 0,
        });
      }
    }

    stats.sort((a, b) => b.championVotes - a.championVotes);
    return stats;
  },

  async getTotalVotes(): Promise<number> {
    const votes = getStoredVotes();
    return votes.length;
  },
};
