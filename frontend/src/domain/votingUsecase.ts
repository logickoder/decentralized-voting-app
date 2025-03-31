import walletUsecase from './walletUsecase.ts';
import useAppStore from './store.ts';
import { toast } from 'react-toastify';

interface VotingUsecase {
  getVoteStatus: () => Promise<void>;
  getResultStatus: () => Promise<void>;
  getRole: () => Promise<void>;
  startVoting: () => Promise<void>;
  vote: (candidateId: number) => Promise<boolean>;
  endVoting: () => Promise<void>;
  hasVoted: () => Promise<void>;
  announceWinner: (id: number) => Promise<void>;
  getResultStatistics: () => Promise<void>;
  reset: () => Promise<void>;
}

const votingUsecase: VotingUsecase = {
  getVoteStatus: async () => {
    try {
      const contract = await walletUsecase.getContract();
      if (!contract) {
        return;
      }

      const store = await useAppStore.getState();
      // @ts-ignore
      await contract.getVoteStatus().then(store.setVoteStatus);
      await contract.on('VoteStatusChanged', store.setVoteStatus);
    } catch (error) {
      console.error('Error getting vote status:', error);
      toast(error.message ?? 'Error getting vote status', { type: 'error' });
    }
  },
  getResultStatus: async () => {
    try {
      const contract = await walletUsecase.getContract();
      if (!contract) {
        return;
      }

      const store = await useAppStore.getState();

      const updateState = (data: object) => {
        const winner = Number(data[1]);
        store.setResultStatus(
          {
            state: Number(data[0]),
            winner: winner == 0 ? undefined : winner
          }
        );
      };

      // @ts-ignore
      await contract.getResultStatus().then(updateState);
      await contract.on('ResultStatusChanged', updateState);
    } catch (error) {
      console.error('Error getting result status:', error);
      toast(error.message ?? 'Error getting result status', { type: 'error' });
    }
  },
  getRole: async () => {
    try {
      const contract = await walletUsecase.getContract();
      if (!contract) {
        return;
      }

      const store = await useAppStore.getState();
      // @ts-ignore
      await contract.getRole(store.wallet).then(store.setRole);
    } catch (error) {
      console.error('Error getting role:', error);
      toast(error.message ?? 'Error getting role', { type: 'error' });
    }
  },
  startVoting: async () => {
    try {
      const contract = await walletUsecase.getContract(true);
      if (!contract) {
        return;
      }

      // @ts-ignore
      await contract.startVoting();
    } catch (error) {
      console.error('Error starting voting:', error);
      toast(error.message ?? 'Error starting voting', { type: 'error' });
    }
  },
  vote: async (candidateId) => {
    try {
      const contract = await walletUsecase.getContract(true);
      if (!contract) {
        return;
      }

      // @ts-ignore
      await contract.vote(candidateId);
      await votingUsecase.hasVoted();
      return true;
    } catch (error) {
      console.error('Error voting:', error);
      toast(error.message ?? 'Error voting', { type: 'error' });
      return false;
    }
  },
  endVoting: async () => {
    try {
      const contract = await walletUsecase.getContract(true);
      if (!contract) {
        return;
      }

      // @ts-ignore
      await contract.endVoting();
    } catch (error) {
      console.error('Error ending voting:', error);
      toast(error.message ?? 'Error ending voting', { type: 'error' });
    }
  },
  hasVoted: async () => {
    try {
      const contract = await walletUsecase.getContract();
      const store = useAppStore.getState();
      if (!contract || !store.wallet) {
        return;
      }

      // @ts-ignore
      contract.hasAddressVoted(store.wallet).then(store.setHasVoted);
    } catch (error) {
      console.error('Error ending voting:', error);
      toast(error.message ?? 'Error ending voting', { type: 'error' });
    }
  },
  announceWinner: async (id) => {
    try {
      const contract = await walletUsecase.getContract(true);
      if (!contract) {
        return;
      }

      // @ts-ignore
      await contract.announceResult(id);
    } catch (error) {
      console.error('Error announcing result:', error);
      toast(error.message ?? 'Error announcing result', { type: 'error' });
    }
  },
  getResultStatistics: async () => {
    try {
      const contract = await walletUsecase.getContract();
      if (!contract) {
        return;
      }

      const store = await useAppStore.getState();
      // @ts-ignore
      const response = await contract.getResultStatistics();

      const candidateIds = response[3] as object;
      const voteCounts = response[4] as object;

      const leadingCandidate = Number(response[1]);

      const candidates = new Map<number, number>();
      for (let i = 0; i < candidateIds.length; ++i) {
        candidates[candidateIds[i]] = Number(voteCounts[i]);
      }

      store.setStatistics({
        totalVotes: Number(response[0]),
        leadingCandidate: leadingCandidate === 0 ? undefined : leadingCandidate,
        voterTurnout: Number(response[2]),
        lastUpdated: new Date(),
        candidates
      });
    } catch (error) {
      console.error('Error announcing result:', error);
      toast(error.message ?? 'Error announcing result', { type: 'error' });
    }
  },
  reset: async () => {
    try {
      const contract = await walletUsecase.getContract(true);
      if (!contract) {
        return;
      }

      // @ts-ignore
      await contract.reset();
    } catch (error) {
      console.error('Error resetting voting:', error);
      toast(error.message ?? 'Error resetting voting', { type: 'error' });
    }
  }
};

export default votingUsecase;