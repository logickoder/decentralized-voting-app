export interface ResultStatistics {
  totalVotes: number;
  voterTurnout: number;
  leadingCandidate?: number;
  candidates: Map<number, number>;
  lastUpdated: Date;
}