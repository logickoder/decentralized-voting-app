import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data - replace with actual state management later
const mockUserRole = 'Election Manager'; // or "Auditor" or null
const mockElectionStatus = 'Not Started'; // or "In Progress" or "Ended"
const mockResultStatus = 'Not Announced'; // or "Announced"

export default function AdminDashboard() {
  const [winnerName, setWinnerName] = useState('');
  const [managerFeedback, setManagerFeedback] = useState('');
  const [auditorFeedback, setAuditorFeedback] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(true); // Mock wallet connection status

  // Mock functions - replace with actual contract calls
  const handleStartVoting = () => {
    // Call startVoting() contract function
    setManagerFeedback('Voting started successfully!');
    setTimeout(() => setManagerFeedback(''), 3000);
  };

  const handleEndVoting = () => {
    // Call endVoting() contract function
    setManagerFeedback('Voting ended successfully!');
    setTimeout(() => setManagerFeedback(''), 3000);
  };

  const handleAnnounceResult = () => {
    if (!winnerName.trim()) {
      setAuditorFeedback('Please enter the winner name');
      setTimeout(() => setAuditorFeedback(''), 3000);
      return;
    }
    // Call announceResult() contract function
    setAuditorFeedback(`Result announced: ${winnerName} is the winner!`);
    setTimeout(() => setAuditorFeedback(''), 3000);
    setWinnerName('');
  };

  // If wallet is not connected
  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-card">
          <div className="card-body">
            <h2 className="card-title text-2xl justify-center mb-4">Admin Dashboard</h2>
            <div className="alert alert-warning mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Please connect your wallet to access admin features</span>
            </div>
            <button className="btn btn-primary w-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H9a2.25 2.25 0 0 1-2.25-2.25V7.5a2.25 2.25 0 0 1 2.25-2.25h10.5A2.25 2.25 0 0 1 21.75 9v.75m0 0A2.25 2.25 0 0 1 24 12v.75m0 0A2.25 2.25 0 0 1 21.75 15v.75A2.25 2.25 0 0 1 19.5 18h-10.5A2.25 2.25 0 0 1 6.75 15v-3.75M21 12a2.25 2.25 0 0 0-2.25-2.25H9a2.25 2.25 0 0 1-2.25-2.25V7.5a2.25 2.25 0 0 1 2.25-2.25h10.5A2.25 2.25 0 0 1 21.75 9v.75" />
              </svg>
              Connect Wallet
            </button>
            <Link to="/" className="btn btn-outline btn-accent mt-2">Return to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // If user is not an admin
  if (mockUserRole !== 'Election Manager' && mockUserRole !== 'Auditor') {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-card">
          <div className="card-body">
            <h2 className="card-title text-2xl justify-center mb-4">Admin Dashboard</h2>
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>You are not authorized to access this page.</span>
            </div>
            <Link to="/" className="btn btn-primary w-full">Return to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <div className="badge badge-lg badge-secondary mt-4 p-3">
            <span className="text-lg">Role: {mockUserRole}</span>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Election Status</div>
              <div className="stat-value text-primary">{mockElectionStatus}</div>
              <div className="stat-desc">Updated in real-time</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Result Status</div>
              <div className="stat-value text-secondary">{mockResultStatus}</div>
              <div className="stat-desc">Updated in real-time</div>
            </div>
          </div>
        </div>

        {/* Admin Controls */}
        <div className="grid grid-cols-1 gap-8">
          {/* Election Manager Section */}
          {mockUserRole === 'Election Manager' && (
            <div className="card bg-base-100 shadow-card">
              <div className="card-body">
                <h2 className="card-title text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                  </svg>
                  Election Manager Controls
                </h2>

                <div className="divider"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleStartVoting}
                    disabled={mockElectionStatus === 'In Progress' || mockElectionStatus === 'Ended'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                    Start Voting
                  </button>

                  <button
                    className="btn btn-error btn-lg"
                    onClick={handleEndVoting}
                    disabled={mockElectionStatus !== 'In Progress'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                    </svg>
                    End Voting
                  </button>
                </div>

                {managerFeedback && (
                  <div className="alert alert-success mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{managerFeedback}</span>
                  </div>
                )}

                <div className="card-actions justify-end mt-4">
                  <div className="badge badge-outline p-3">Contract Owner</div>
                </div>
              </div>
            </div>
          )}

          {/* Auditor Section */}
          {mockUserRole === 'Auditor' && (
            <div className="card bg-base-100 shadow-card">
              <div className="card-body">
                <h2 className="card-title text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6 text-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                  Auditor Controls
                </h2>

                <div className="divider"></div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Winner Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the winning candidate's name"
                    className="input input-bordered w-full"
                    value={winnerName}
                    onChange={(e) => setWinnerName(e.target.value)}
                    disabled={mockElectionStatus !== 'Ended' || mockResultStatus === 'Announced'}
                  />
                </div>

                <button
                  className="btn btn-secondary btn-lg mt-4"
                  onClick={handleAnnounceResult}
                  disabled={mockElectionStatus !== 'Ended' || mockResultStatus === 'Announced'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                  </svg>
                  Announce Result
                </button>

                {auditorFeedback && (
                  <div className="alert alert-success mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{auditorFeedback}</span>
                  </div>
                )}

                <div className="alert alert-info mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>
                  <span>The announce result function can only be called once and after voting has ended.</span>
                </div>

                <div className="card-actions justify-end mt-4">
                  <div className="badge badge-outline p-3">Official Auditor</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Link to="/" className="btn btn-outline mt-6">Return to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};