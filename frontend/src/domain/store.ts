import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { VoteStatus } from '../types/VoteStatus.ts';
import { ResultStatus, ResultStatusState } from '../types/ResultStatus.ts';
import { Candidate } from '../types/Candidate.ts';

type AppStoreState = {
  wallet: string | null;
  role: number;
  voteStatus: VoteStatus;
  resultStatus: ResultStatus;
  candidates: Candidate[];
};

type AppStoreActions = {
  connectWallet: (wallet: string) => void;
  isConnected: () => boolean;
  setRole: (role: number) => void;
  setVoteStatus: (status: VoteStatus) => void;
  setResultStatus: (status: object) => void;
  setCandidates: (candidates: Candidate[]) => void;
  clear: () => void;
};

type AppStore = AppStoreState & AppStoreActions;

const initialState: AppStoreState = {
  wallet: null,
  role: 0,
  voteStatus: VoteStatus.Pending,
  resultStatus: {
    state: ResultStatusState.NotAnnounced
  },
  candidates: []
};

const useAppStore = create<AppStore>(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        connectWallet: (wallet) => set({ wallet }),
        isConnected: () => get().wallet !== null,
        setRole: (role) => set({ role: Number(role) }),
        setVoteStatus: (status) => set({ voteStatus: Number(status) }),
        setResultStatus: (resultStatus) => set({ resultStatus }),
        setCandidates: (candidates) => set({ candidates }),
        clear: () => set(initialState)
      }),
      {
        name: 'store'
      }
    )
  )
);

export default useAppStore;
