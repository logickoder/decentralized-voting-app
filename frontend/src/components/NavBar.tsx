import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAppStore from '../domain/store.ts';
import walletUsecase from '../domain/walletUsecase.ts';
import { CiWallet } from 'react-icons/ci';

export default function NavBar() {
  const walletAddress = useAppStore((state) => state.wallet);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const address = useMemo(() => {
    if (!walletAddress) return '';
    return `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;
  }, [walletAddress]);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sm:px-6">
      {/* Logo and brand */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6 text-primary mr-2">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 0 1.242 4.136m6.758 1.364a7.5 7.5 0 1 1-7.5-7.5 7.5 7.5 0 0 1 7.5 7.5Z" />
          </svg>
          <span className="text-lg font-bold hidden sm:inline">Decentralized Voting</span>
          <span className="text-lg font-bold sm:hidden">DVS</span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <DesktopLink title="Home" path="/" />
          <DesktopLink title="Vote" path="/vote" />
          <DesktopLink title="Candidates" path="/candidates" />
          <DesktopLink title="Results" path="/results" />
          <DesktopLink title="Logs" path="/logs" />
          <DesktopLink title="Admin" path="/admin" />
        </ul>
      </div>

      {/* Wallet Connection */}
      <div className="navbar-end">
        {walletAddress ? (
          <div className="flex items-center">
            <div className="hidden md:flex items-center mr-2">
              <div className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse"></div>
              <span className="text-sm font-mono">{address}</span>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-sm btn-primary">
                <CiWallet className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Connected</span>
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li className="md:hidden">
                  <a className="text-sm font-mono">{address}</a>
                </li>
                <li><a>Copy Address</a></li>
                <li><a>View on Explorer</a></li>
                <li>
                  <button className="text-error" onClick={walletUsecase.disconnect}>Disconnect</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-sm btn-primary"
            onClick={walletUsecase.connect}
          >
            <CiWallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </button>
        )}

        {/* Mobile menu button */}
        <div className="lg:hidden ml-2">
          <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMenu}>
          <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
            <div className="bg-base-100 w-64 h-screen overflow-y-auto shadow-xl">
              <div className="flex justify-between items-center p-4 border-b">
                <span className="font-bold">Menu</span>
                <button className="btn btn-sm btn-ghost" onClick={toggleMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ul className="menu p-4">
                <MobileLink title="Home" path="/" onClick={toggleMenu} />
                <MobileLink title="Vote" path="/vote" onClick={toggleMenu} />
                <MobileLink title="Candidates" path="/candidates" onClick={toggleMenu} />
                <MobileLink title="Results" path="/results" onClick={toggleMenu} />
                <MobileLink title="Logs" path="/logs" onClick={toggleMenu} />
                <MobileLink title="Admin" path="/admin" onClick={toggleMenu} />
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


function DesktopLink({ title, path }: { title: string; path: string; }) {
  const location = useLocation();
  return (
    <li>
      <Link
        to={path}
        className={`${location.pathname === path ? 'bg-primary bg-opacity-10 text-primary' : ''}`}
      >
        {title}
      </Link>
    </li>
  );
}

function MobileLink({ title, path, onClick }: { title: string; path: string; onClick: () => void }) {
  const location = useLocation();
  return (
    <li>
      <Link to={path} onClick={onClick} className={location.pathname === path ? 'active' : ''}>
        {title}
      </Link>
    </li>
  );
}