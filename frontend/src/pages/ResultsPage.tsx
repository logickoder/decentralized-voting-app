import { useEffect, useState } from 'react';

// Mock data - replace with actual blockchain data later
const mockCandidates = [
  { id: 1, name: 'Candidate 1', votes: 35 },
  { id: 2, name: 'Candidate 2', votes: 42 },
  { id: 3, name: 'Candidate 3', votes: 23 }
];

const mockTotalVotes = 100; // Total votes cast
const mockTotalVoters = 1000; // Total eligible voters
const mockWinner = null; // null if not announced, or candidate object if announced
const mockVotingStatus = 'Voting In Progress'; // "Voting Not Started", "Voting In Progress", "Voting Ended"

export default function ResultsPage() {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [totalVotes, setTotalVotes] = useState(mockTotalVotes);
  const [totalVoters, setTotalVoters] = useState(mockTotalVoters);
  const [winner, setWinner] = useState(mockWinner);
  const [votingStatus, setVotingStatus] = useState(mockVotingStatus);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Function to calculate turnout percentage
  const getTurnoutPercentage = () => {
    return ((totalVotes / totalVoters) * 100).toFixed(1);
  };

  // Function to get the candidate with most votes
  const getLeadingCandidate = () => {
    return [...candidates].sort((a, b) => b.votes - a.votes)[0];
  };

  // Function to refresh data
  const refreshData = () => {
    setIsRefreshing(true);

    // Simulate fetching data from blockchain
    setTimeout(() => {
      // In a real implementation, you would fetch the latest data from the blockchain here
      // For now, we'll just update the mock data slightly
      const updatedCandidates = candidates.map(candidate => ({
        ...candidate,
        votes: candidate.votes + Math.floor(Math.random() * 3) // Add 0-2 votes randomly
      }));

      const newTotalVotes = updatedCandidates.reduce((sum, candidate) => sum + candidate.votes, 0);

      setCandidates(updatedCandidates);
      setTotalVotes(newTotalVotes);
      setLastUpdated(new Date());
      setIsRefreshing(false);

      // Simulate result announcement if voting has ended
      if (votingStatus === 'Voting Ended' && !winner) {
        const leadingCandidate = updatedCandidates.sort((a, b) => b.votes - a.votes)[0];
        if (Math.random() > 0.7) { // 30% chance of result being announced
          setWinner(leadingCandidate);
        }
      }
    }, 1500);
  };

  // Auto-refresh every 30 seconds if voting is in progress
  useEffect(() => {
    let interval;
    if (votingStatus === 'Voting In Progress') {
      interval = setInterval(() => {
        refreshData();
      }, 30000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [votingStatus, candidates]);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Results Header */}
      <div className="hero bg-primary bg-opacity-10 py-12">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-4xl font-bold text-primary">Election Results</h1>
            <p className="py-4 text-lg">Live voting data and results from the blockchain</p>

            {/* Voting Status Badge */}
            <div className={`badge badge-lg p-3 mt-2 mb-4 font-medium ${
              votingStatus === 'Voting In Progress'
                ? 'badge-secondary'
                : votingStatus === 'Voting Ended'
                  ? 'badge-accent'
                  : 'badge-neutral'
            }`}>
              Status: {votingStatus}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Winner Announcement */}
        {winner && (
          <div className="alert bg-accent text-accent-content shadow-lg mb-8">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
              </svg>
              <div className="ml-4">
                <h3 className="text-xl font-bold">Winner Announced!</h3>
                <p className="text-2xl font-bold mt-2">{winner.name} has won with {winner.votes} votes!</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Voting Statistics */}
          <div className="flex-1">
            <div className="card bg-base-100 shadow-card h-full">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Voting Statistics</h2>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {/* Total Votes Card */}
                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Total Votes</div>
                      <div className="stat-value text-primary">{totalVotes}</div>
                      <div className="stat-desc">Out of {totalVoters} eligible voters</div>
                    </div>
                  </div>

                  {/* Turnout Card */}
                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Voter Turnout</div>
                      <div className="stat-value text-secondary">{getTurnoutPercentage()}%</div>
                      <div className="stat-desc">Based on eligible voter pool</div>
                    </div>
                  </div>

                  {/* Leading Candidate Card */}
                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Currently Leading</div>
                      <div className="stat-value text-accent">{getLeadingCandidate().name}</div>
                      <div className="stat-desc">With {getLeadingCandidate().votes} votes</div>
                    </div>
                  </div>
                </div>

                {/* Refresh Button */}
                <div className="card-actions justify-center">
                  <button
                    className={`btn btn-primary gap-2 ${isRefreshing ? 'loading' : ''}`}
                    onClick={refreshData}
                    disabled={isRefreshing}
                  >
                    {!isRefreshing && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    )}
                    Refresh Data
                  </button>
                  <p className="text-sm opacity-70 mt-2">Last updated: {lastUpdated.toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vote Distribution */}
          <div className="flex-1">
            <div className="card bg-base-100 shadow-card h-full">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Vote Distribution</h2>

                {/* Progress Bars */}
                <div className="space-y-6">
                  {candidates.map(candidate => {
                    const percentage = totalVotes > 0 ? (candidate.votes / totalVotes * 100).toFixed(1) : 0;

                    return (
                      <div key={candidate.id} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-lg font-medium">{candidate.name}</span>
                          <span className="text-lg font-medium">{candidate.votes} votes ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-neutral rounded-full h-6">
                          <div
                            className={`h-6 rounded-full ${
                              candidate.id === 1 ? 'bg-primary' :
                                candidate.id === 2 ? 'bg-secondary' :
                                  'bg-accent'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Auto-refresh notice */}
                {votingStatus === 'Voting In Progress' && (
                  <div className="mt-8 text-center opacity-70">
                    <p>Data automatically refreshes every 30 seconds during active voting</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Blockchain Information */}
        <div className="mt-12 p-6 bg-base-100 rounded-box shadow-lg">
          <h3 className="text-lg font-bold mb-4">Blockchain Transparency</h3>
          <p className="mb-4">All voting data is recorded on the Base blockchain, ensuring complete
            transparency and verifiability.</p>

          <div className="flex items-center justify-center mt-6">
            <a
              href="https://basescan.org"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-accent gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              View on Blockchain Explorer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}