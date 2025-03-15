import { useState } from 'react';

// Mocked data - to be replaced with actual data later
const mockCandidates = [
  { id: 1, name: 'Candidate 1' },
  { id: 2, name: 'Candidate 2' },
  { id: 3, name: 'Candidate 3' }
];

const mockVotingStatus = 'Voting In Progress'; // "Voting Not Started", "Voting In Progress", "Voting Ended"
const mockIsWalletConnected = true; // Set to false to simulate disconnected wallet

export default function VotingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [votingStatus, setVotingStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [rewardEarned, setRewardEarned] = useState(false);

  const handleVote = () => {
    if (!selectedCandidate) {
      setVotingStatus('Please select a candidate');
      return;
    }

    setIsLoading(true);

    // Simulate blockchain transaction
    setTimeout(() => {
      setIsLoading(false);
      setHasVoted(true);
      setVotingStatus('Vote recorded successfully!');
      setRewardEarned(true);
    }, 2000);
  };

  const isVotingEnabled = mockIsWalletConnected && mockVotingStatus === 'Voting In Progress' && !hasVoted;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Voting Header */}
      <div className="hero bg-primary bg-opacity-10 py-12">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-4xl font-bold text-primary">Cast Your Vote</h1>
            <p className="py-4 text-lg">Select a candidate and submit your vote securely on the blockchain</p>

            {/* Voting Status Badge */}
            <div className="badge badge-lg p-3 mt-2 mb-4 font-medium">
              Status: {mockVotingStatus}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Wallet Connection Warning */}
        {!mockIsWalletConnected && (
          <div className="alert alert-warning shadow-lg mb-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Please connect your wallet to vote</span>
            </div>
          </div>
        )}

        {/* Voting Disabled Alert */}
        {mockIsWalletConnected && mockVotingStatus !== 'Voting In Progress' && (
          <div className="alert alert-info shadow-lg mb-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   className="stroke-current flex-shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{mockVotingStatus === 'Voting Not Started' ? 'Voting has not started yet' : 'Voting has ended'}</span>
            </div>
          </div>
        )}

        {/* Vote Success Message */}
        {hasVoted && (
          <div className="alert alert-success shadow-lg mb-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{votingStatus}</span>
            </div>
          </div>
        )}

        {/* Vote Error Message */}
        {votingStatus && !hasVoted && (
          <div className="alert alert-error shadow-lg mb-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{votingStatus}</span>
            </div>
          </div>
        )}

        {/* Reward Notification */}
        {rewardEarned && (
          <div className="alert bg-accent text-accent-content shadow-lg mb-8 animate-pulse-slow">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
              <span className="text-lg font-medium ml-2">Congratulations! You earned 1 token for voting!</span>
            </div>
          </div>
        )}

        {/* Voting Card */}
        <div className="card bg-base-100 shadow-card">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Select a Candidate</h2>

            <div className="space-y-4 mb-8">
              {mockCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                    selectedCandidate === candidate.id
                      ? 'border-primary bg-primary bg-opacity-10'
                      : 'border-base-300 hover:border-primary'
                  }`}
                  onClick={() => isVotingEnabled && setSelectedCandidate(candidate.id)}
                >
                  <input
                    type="radio"
                    name="candidate"
                    className="radio radio-primary"
                    checked={selectedCandidate === candidate.id}
                    onChange={() => setSelectedCandidate(candidate.id)}
                    disabled={!isVotingEnabled}
                  />
                  <label className="label cursor-pointer w-full ml-2">
                    <span className="label-text text-lg">{candidate.name}</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="card-actions justify-center">
              {hasVoted ? (
                <div className="text-center">
                  <p className="text-lg mb-4">Your vote has been recorded on the blockchain.</p>
                  <div className="inline-flex items-center justify-center bg-base-300 rounded-xl px-6 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    <span className="text-base-content opacity-70">Transaction Hash: 0x71c...3e4f</span>
                  </div>
                </div>
              ) : (
                <button
                  className={`btn btn-primary btn-lg shadow-button ${isLoading ? 'loading' : ''}`}
                  onClick={handleVote}
                  disabled={!isVotingEnabled || !selectedCandidate}
                >
                  {isLoading ? 'Processing...' : 'Cast Vote'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Voting Information */}
        <div className="mt-12 p-6 bg-base-100 rounded-box shadow-lg">
          <h3 className="text-lg font-bold mb-4">How voting works</h3>
          <ul className="list-disc list-inside space-y-2 text-base-content opacity-80">
            <li>Your vote is recorded directly on the Base blockchain</li>
            <li>Each wallet address can only vote once per election</li>
            <li>Voting is anonymous - your identity is not linked to your choice</li>
            <li>Earn token rewards for participating in the voting process</li>
            <li>Results are tallied automatically once voting has ended</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
;