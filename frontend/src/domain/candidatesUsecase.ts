import useAppStore from './store.ts';
import walletUsecase from './walletUsecase.ts';
import { toast } from 'react-toastify';
import { Candidate } from '../types/Candidate.ts';

interface CandidatesUsecase {
  getCandidates: () => Promise<void>;
  addCandidate: (candidate: Partial<Candidate>) => Promise<void>;
  updateCandidate: (candidate: Candidate) => Promise<void>;
  removeCandidate: (id: number) => Promise<void>;
}

const candidatesUsecase: CandidatesUsecase = {
  getCandidates: async () => {
    try {
      const contract = await walletUsecase.getContract();
      if (!contract) {
        return;
      }

      const store = useAppStore.getState();
      const loadCandidates = async () => {
        // @ts-ignore
        const ids = await contract.getCandidates().then(Object.values);
        if (!ids.length) {
          store.setCandidates([]);
          return;
        }
        await fetch(`${import.meta.env.VITE_API_URL}/candidates?ids=${ids}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then(store.setCandidates);
      };

      await loadCandidates();

      await Promise.all([
        contract.on('CandidateAdded', loadCandidates),
        contract.on('CandidateRemoved', loadCandidates)
      ]);
    } catch (error) {
      console.error('Error getting vote status:', error);
      toast(error.message ?? 'Error getting vote status', { type: 'error' });
    }
  },
  addCandidate: async (candidate) => {
    try {
      const contract = await walletUsecase.getContract(true);
      if (!contract) {
        return;
      }

      // @ts-ignore
      const id = await contract.getNextCandidateId().then(Number);
      await fetch(`${import.meta.env.VITE_API_URL}/candidates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...candidate, id })
      });
      // @ts-ignore
      await contract.addCandidate(id);
    } catch (error) {
      console.error('Error adding candidate:', error);
      toast(error.message ?? 'Error adding candidate', { type: 'error' });
    }
  },
  updateCandidate: async (candidate) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/candidates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...candidate })
      });

      const store = useAppStore.getState();
      store.setCandidates(store.candidates.map(c => c.id === candidate.id ? candidate : c));
    } catch (error) {
      console.error('Error updating candidate:', error);
      toast(error.message ?? 'Error updating candidate', { type: 'error' });
    }
  },
  removeCandidate: async (id) => {
    try {
      const contract = await walletUsecase.getContract(true);
      if (!contract) {
        return;
      }

      // @ts-ignore
      await contract.removeCandidate(id);
      await fetch(`${import.meta.env.VITE_API_URL}/candidates/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error removing candidate:', error);
      toast(error.message ?? 'Error removing candidate', { type: 'error' });
    }
  }
};

export default candidatesUsecase;