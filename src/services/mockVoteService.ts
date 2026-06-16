import { teams } from '../data/teams'
import type { VoteRecord, VoteService, VoteStats } from './types'

const STORAGE_KEY = 'wc2026_votes'
const MY_VOTE_KEY = 'wc2026_my_vote'

function getStoredVotes(): VoteRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed.filter((vote) => vote?.champion && vote?.runnerUp) : []
  } catch {
    return []
  }
}

function saveVotes(votes: VoteRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes))
}

export const mockVoteService: VoteService = {
  async submitVote(champion: string, runnerUp: string, predictorName: string): Promise<void> {
    const votes = getStoredVotes()
    const newVote: VoteRecord = {
      champion,
      runnerUp,
      predictorName: predictorName.trim(),
      timestamp: Date.now(),
    }

    votes.push(newVote)
    saveVotes(votes)
    localStorage.setItem(MY_VOTE_KEY, JSON.stringify(newVote))
  },

  async getVoteStats(): Promise<VoteStats[]> {
    const votes = getStoredVotes()
    const total = votes.length
    const countMap = new Map<string, number>()

    for (const vote of votes) {
      countMap.set(vote.champion, (countMap.get(vote.champion) || 0) + 1)
    }

    const stats: VoteStats[] = teams
      .map((team) => {
        const championVotes = countMap.get(team.id) || 0
        return {
          teamId: team.id,
          championVotes,
          percentage: total > 0 ? Math.round((championVotes / total) * 1000) / 10 : 0,
        }
      })
      .filter((stat) => stat.championVotes > 0)
      .sort((a, b) => b.championVotes - a.championVotes)

    return stats
  },

  async getTotalVotes(): Promise<number> {
    return getStoredVotes().length
  },
}
