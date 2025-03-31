import { BrowserRouter } from 'react-router-dom';
import Routes from './routes.tsx';
import { ToastContainer } from 'react-toastify';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import useAppStore from './domain/store.ts';
import { useEffect } from 'react';
import votingUsecase from './domain/votingUsecase.ts';
import candidatesUsecase from './domain/candidatesUsecase.ts';

export default function App() {
  const wallet = useAppStore(state => state.wallet);

  useEffect(() => {
    if (wallet) {
      void votingUsecase.getVoteStatus();
      void votingUsecase.getResultStatus();
      void votingUsecase.getRole();
      void votingUsecase.hasVoted();
      void candidatesUsecase.getCandidates();
    }
  }, [wallet]);

  return (
    <NuqsAdapter>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </NuqsAdapter>
  );
}
