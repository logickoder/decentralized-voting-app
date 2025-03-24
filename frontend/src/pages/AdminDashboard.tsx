import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAppStore from '../domain/store.ts';
import walletUsecase from '../domain/walletUsecase.ts';
import { getVoteStateText, VoteStatus } from '../types/VoteStatus.ts';
import { getResultStatusStateText, ResultStatusState } from '../types/ResultStatus.ts';
import votingUsecase from '../domain/votingUsecase.ts';
import { CiCircleInfo, CiPlay1, CiStop1 } from 'react-icons/ci';
import { HiOutlineClipboardDocumentCheck, HiOutlineTrophy } from 'react-icons/hi2';
import { GrPowerReset } from 'react-icons/gr';
import { IS_AUDITOR, IS_ELECTION_MANAGER } from '../types/Role.ts';

export default function AdminDashboard() {
  const [winnerName, setWinnerName] = useState('');
  const [managerFeedback, setManagerFeedback] = useState('');
  const [auditorFeedback, setAuditorFeedback] = useState('');
  const isConnected = useAppStore(state => state.isConnected());
  const voteStatus = useAppStore(state => state.voteStatus);
  const resultStatus = useAppStore(state => state.resultStatus);
  const role = useAppStore(state => state.role);

  // Mock functions - replace with actual contract calls
  const handleStartVoting = async () => {
    await votingUsecase.startVoting();
    setManagerFeedback('Voting started successfully!');
    setTimeout(() => setManagerFeedback(''), 3000);
  };

  const handleEndVoting = async () => {
    await votingUsecase.endVoting();
    setManagerFeedback('Voting ended successfully!');
    setTimeout(() => setManagerFeedback(''), 3000);
  };

  const handleReset = async () => {
    await votingUsecase.reset();
    setManagerFeedback('Voting reset successfully!');
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
  if (!isConnected) {
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
            <button className="btn btn-primary w-full" onClick={walletUsecase.connect}>
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
  if (role === 0) {
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
            <span className="text-lg">
              Role: {role === 3 ? 'Super Admin' : role && IS_ELECTION_MANAGER !== 0 ? 'Election Manager' : role && IS_AUDITOR !== 0 ? 'Auditor' : ''}
            </span>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Election Status</div>
              <div className="stat-value text-primary">{getVoteStateText(voteStatus, false)}</div>
              <div className="stat-desc">Updated in real-time</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Result Status</div>
              <div className="stat-value text-secondary">{getResultStatusStateText(resultStatus.state)}</div>
              <div className="stat-desc">Updated in real-time</div>
            </div>
          </div>
        </div>

        {/* Admin Controls */}
        <div className="grid grid-cols-1 gap-8">
          {/* Election Manager Section */}
          {role & IS_ELECTION_MANAGER !== 0 && (
            <div className="card bg-base-100 shadow-card">
              <div className="card-body">
                <h2 className="card-title text-2xl">
                  <HiOutlineClipboardDocumentCheck className="w-6 h-6 text-primary" />
                  Election Manager Controls
                </h2>

                <div className="divider"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleStartVoting}
                    disabled={voteStatus === VoteStatus.Active || voteStatus === VoteStatus.Ended}
                  >
                    <CiPlay1 />
                    Start Voting
                  </button>

                  <button
                    className="btn btn-error btn-lg"
                    onClick={handleEndVoting}
                    disabled={voteStatus !== VoteStatus.Active}
                  >
                    <CiStop1 />
                    End Voting
                  </button>


                  <button
                    className="btn btn-error btn-lg"
                    onClick={handleReset}
                    disabled={voteStatus !== VoteStatus.Ended}
                  >
                    <GrPowerReset />
                    Reset
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
          {role & IS_AUDITOR !== 0 && (
            <div className="card bg-base-100 shadow-card">
              <div className="card-body">
                <h2 className="card-title text-2xl">
                  <HiOutlineTrophy className="w-6 h-6 text-secondary" />
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
                    disabled={voteStatus !== VoteStatus.Ended || resultStatus.state === ResultStatusState.Announced}
                  />
                </div>

                <button
                  className="btn btn-secondary btn-lg mt-4"
                  onClick={handleAnnounceResult}
                  disabled={voteStatus !== VoteStatus.Ended || resultStatus.state === ResultStatusState.Announced}
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
                  <CiCircleInfo />
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