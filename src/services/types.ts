export interface VoteRecord {
  champion: string;
  runnerUp: string;
  predictorName: string;
  timestamp: number;
}

export interface VoteStats {
  teamId: string;
  championVotes: number;
  percentage: number;
}

export interface VoteService {
  submitVote(champion: string, runnerUp: string, predictorName: string): Promise<void>;
  getVoteStats(): Promise<VoteStats[]>;
  getTotalVotes(): Promise<number>;
}
