import { Route, Routes as ReactRoutes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.tsx';
import HomePage from './pages/HomePage.tsx';
import VotingPage from './pages/VotingPage.tsx';
import ResultsPage from './pages/ResultsPage.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';

export default function Routes() {
  return (
    <>
      <ScrollToTop />
      <ReactRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vote" element={<VotingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </ReactRoutes>
    </>
  );
}
