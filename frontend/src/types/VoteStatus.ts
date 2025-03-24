export enum VoteStatus {
  Pending,
  Active,
  Ended
}

export function getVoteStateText(state: VoteStatus, includeVoting: Boolean = true) {
  const status = state === VoteStatus.Active ? 'In Progress' : state === VoteStatus.Ended ? 'Ended' : 'Not Started';
  return includeVoting ? `Voting ${status}` : status;
}