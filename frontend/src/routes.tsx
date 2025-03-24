import { Route, Routes as ReactRoutes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.tsx';
import HomePage from './pages/HomePage.tsx';
import VotingPage from './pages/VotingPage.tsx';
import ResultsPage from './pages/ResultsPage.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import LogsPage from './pages/LogsPage.tsx';
import NavBar from './components/NavBar.tsx';
import CandidatesPage from './pages/CandidatesPage.tsx';

export default function Routes() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <ReactRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vote" element={<VotingPage />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/logs" element={<LogsPage />} />
      </ReactRoutes>
    </>
  );
}
