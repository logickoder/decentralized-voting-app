import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { VoteStatus } from '../types/VoteStatus.ts';
import { ResultStatus, ResultStatusState } from '../types/ResultStatus.ts';
import { Candidate } from '../types/Candidate.ts';
import { ResultStatistics } from '../types/ResultStatistics.ts';

type AppStoreState = {
  wallet: string | null;
  role: number;
  hasVoted: boolean;
  voteStatus: VoteStatus;
  resultStatus: ResultStatus;
  candidates: Candidate[];
  statistics: ResultStatistics;
};

type AppStoreActions = {
  connectWallet: (wallet: string) => void;
  isConnected: () => boolean;
  setRole: (role: number) => void;
  setHasVoted: (hasVoted: boolean) => void;
  setVoteStatus: (status: VoteStatus) => void;
  setResultStatus: (status: object) => void;
  setCandidates: (candidates: Candidate[]) => void;
  setStatistics: (statistics: ResultStatistics) => void;
  clear: () => void;
};

type AppStore = AppStoreState & AppStoreActions;

const initialState: AppStoreState = {
  wallet: null,
  role: 0,
  hasVoted: false,
  voteStatus: VoteStatus.Pending,
  resultStatus: {
    state: ResultStatusState.NotAnnounced
  },
  candidates: [],
  statistics: {
    totalVotes: 0,
    voterTurnout: 0,
    candidates: new Map(),
    lastUpdated: new Date()
  }
};

const useAppStore = create<AppStore>(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        connectWallet: (wallet) => set({ wallet }),
        setHasVoted: (hasVoted) => set({ hasVoted }),
        isConnected: () => get().wallet !== null,
        setRole: (role) => set({ role: Number(role) }),
        setVoteStatus: (status) => set({ voteStatus: Number(status) }),
        setResultStatus: (resultStatus) => set({ resultStatus }),
        setCandidates: (candidates) => set({ candidates }),
        setStatistics: (statistics) => set({ statistics }),
        clear: () => set(initialState)
      }),
      {
        name: 'store'
      }
    )
  )
);

export default useAppStore;
