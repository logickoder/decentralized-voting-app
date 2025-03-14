import { Link } from 'react-router-dom';

// Mock data - replace with actual state management later
const mockElectionStatus = 'Voting Not Started'; // or "Voting In Progress" or "Voting Ended"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-primary bg-opacity-10">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-primary">Decentralized Voting System</h1>
            <p className="py-6 text-xl">Welcome to the Decentralized Voting System on Base!</p>
            <p className="pb-8 text-lg opacity-80">Secure. Transparent. Immutable.</p>

            {/* Wallet Connection Button */}
            <button className="btn btn-primary btn-lg shadow-button gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H9a2.25 2.25 0 0 1-2.25-2.25V7.5a2.25 2.25 0 0 1 2.25-2.25h10.5A2.25 2.25 0 0 1 21.75 9v.75m0 0A2.25 2.25 0 0 1 24 12v.75m0 0A2.25 2.25 0 0 1 21.75 15v.75A2.25 2.25 0 0 1 19.5 18h-10.5A2.25 2.25 0 0 1 6.75 15v-3.75M21 12a2.25 2.25 0 0 0-2.25-2.25H9a2.25 2.25 0 0 1-2.25-2.25V7.5a2.25 2.25 0 0 1 2.25-2.25h10.5A2.25 2.25 0 0 1 21.75 9v.75" />
              </svg>
              Connect with MetaMask
            </button>

            {/* Election Status Badge */}
            <div className="mt-8">
              <div className={`badge badge-lg p-4 ${
                mockElectionStatus === 'Voting In Progress'
                  ? 'badge-secondary'
                  : mockElectionStatus === 'Voting Ended'
                    ? 'badge-accent'
                    : 'badge-neutral'
              }`}>
                <span className="text-lg font-medium">Status: {mockElectionStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-card hover:shadow-lg transition-shadow">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="card-title text-xl">Secure Blockchain Voting</h3>
              <p className="py-2">Your vote is securely recorded on the Base blockchain, ensuring immutability
                and transparency.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-card hover:shadow-lg transition-shadow">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-8 h-8 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="card-title text-xl">Live Analytics</h3>
              <p className="py-2">Track voter turnout and live vote counts in real-time as the election progresses.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-card hover:shadow-lg transition-shadow">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent bg-opacity-20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-8 h-8 text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="card-title text-xl">Token Rewards</h3>
              <p className="py-2">Receive token rewards for your participation, incentivizing community engagement.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="container mx-auto pb-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Navigate</h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link to="/vote" className="btn btn-outline btn-primary btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Vote Now
          </Link>

          <Link to="/results" className="btn btn-outline btn-secondary btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
            View Results
          </Link>

          <Link to="/admin" className="btn btn-outline btn-accent btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
            </svg>
            Admin Panel
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 0 1.242 4.136m6.758 1.364a7.5 7.5 0 1 1-7.5-7.5 7.5 7.5 0 0 1 7.5 7.5Z" />
          </svg>
          <p className="font-bold">
            Decentralized Voting System <br />Built on Base
          </p>
          <p>© 2025 - Running on the Blockchain</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a className="link link-hover" href="https://www.base.org/" target="_blank"
               rel="noopener noreferrer">Base</a>
            <a className="link link-hover" href="https://basescan.org/" target="_blank"
               rel="noopener noreferrer">Explorer</a>
            <a className="link link-hover" href="https://metamask.io/" target="_blank"
               rel="noopener noreferrer">MetaMask</a>
          </div>
        </div>
      </footer>
    </div>
  );
};