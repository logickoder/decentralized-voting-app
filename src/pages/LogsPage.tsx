import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data - replace with actual event logs from blockchain later
const mockVoteLogs = [
  {
    address: '0x7c32af02Ffb304C0EE69c18D01c8d28C58E0eEFd',
    timestamp: '2025-03-14 09:23:16 UTC',
    txHash: '0xf7b8d9e3c25a76f4f8dbd064878f0a9d8f90346c9a90cc8944f7f71721d08619'
  },
  {
    address: '0x3aBc5A867b2e922EF76dd9400E4AE5bDb32d4EE7',
    timestamp: '2025-03-14 09:15:42 UTC',
    txHash: '0x18d064878f0a9d8f903f7b8d9e3c25a76f4f846c9a90cc8944f7f71721d08619'
  },
  {
    address: '0xFe37c89E068Bb4b06Ce2b059cB6C914a2C09a5Ba',
    timestamp: '2025-03-14 08:56:21 UTC',
    txHash: '0x90cc8944f7f71721d08619f7b8d9e3c25a76f4f8dbd064878f0a9d8f90346c9a'
  },
  {
    address: '0x15c6D0F50f76E9c8E9C116d5488E398F59F4F62d',
    timestamp: '2025-03-14 08:42:09 UTC',
    txHash: '0x78f0a9d8f90346c9a90cc8944f7f71721d08619f7b8d9e3c25a76f4f8dbd0648'
  },
  {
    address: '0x9aB847e2F95Cef5a4F12d722B1b52B1872975e4D',
    timestamp: '2025-03-14 08:24:57 UTC',
    txHash: '0x064878f0a9d8f90346c9a90cc8944f7f71721d08619f7b8d9e3c25a76f4f8dbd'
  },
  {
    address: '0x64878f0a9d8f90346c9a90cc8944f7f71721d086',
    timestamp: '2025-03-14 08:12:33 UTC',
    txHash: '0x8944f7f71721d08619f7b8d9e3c25a76f4f8dbd064878f0a9d8f90346c9a90cc'
  },
  {
    address: '0x21d08619f7b8d9e3c25a76f4f8dbd064878f0a9d',
    timestamp: '2025-03-14 08:01:15 UTC',
    txHash: '0xd9e3c25a76f4f8dbd064878f0a9d8f90346c9a90cc8944f7f71721d08619f7b8'
  },
  {
    address: '0x4f8dbd064878f0a9d8f90346c9a90cc8944f7f71',
    timestamp: '2025-03-14 07:45:28 UTC',
    txHash: '0x76f4f8dbd064878f0a9d8f90346c9a90cc8944f7f71721d08619f7b8d9e3c25a'
  },
  {
    address: '0x878f0a9d8f90346c9a90cc8944f7f71721d08619',
    timestamp: '2025-03-14 07:32:09 UTC',
    txHash: '0xc9a90cc8944f7f71721d08619f7b8d9e3c25a76f4f8dbd064878f0a9d8f90346'
  },
  {
    address: '0xcc8944f7f71721d08619f7b8d9e3c25a76f4f8db',
    timestamp: '2025-03-14 07:23:51 UTC',
    txHash: '0xf71721d08619f7b8d9e3c25a76f4f8dbd064878f0a9d8f90346c9a90cc8944f'
  },
  {
    address: '0x1721d08619f7b8d9e3c25a76f4f8dbd064878f0a',
    timestamp: '2025-03-14 07:12:42 UTC',
    txHash: '0xc25a76f4f8dbd064878f0a9d8f90346c9a90cc8944f7f71721d08619f7b8d9e3'
  },
  {
    address: '0x25a76f4f8dbd064878f0a9d8f90346c9a90cc894',
    timestamp: '2025-03-14 07:02:19 UTC',
    txHash: '0xdbd064878f0a9d8f90346c9a90cc8944f7f71721d08619f7b8d9e3c25a76f4f8'
  }
];

export default function LogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(5);
  const [searchAddress, setSearchAddress] = useState('');

  // Filter logs based on search
  const filteredLogs = searchAddress
    ? mockVoteLogs.filter(log => log.address.toLowerCase().includes(searchAddress.toLowerCase()))
    : mockVoteLogs;

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  // Truncate address for display
  const truncateAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-base-200 pb-16">
      {/* Header */}
      <div className="bg-primary bg-opacity-10 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">Vote Logs</h1>
              <p className="mt-2 text-base-content opacity-80">
                Transparent audit trail of all votes recorded on the blockchain
              </p>
            </div>
            <Link to="/" className="btn btn-sm btn-outline mt-4 md:mt-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="card bg-base-100 shadow-card">
          <div className="card-body">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="form-control w-full md:w-64 mb-4 md:mb-0">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search by address"
                    className="input input-bordered w-full"
                    value={searchAddress}
                    onChange={(e) => {
                      setSearchAddress(e.target.value);
                      setCurrentPage(1); // Reset to first page on search
                    }}
                  />
                  <button className="btn btn-square btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="badge badge-lg">
                <span>{filteredLogs.length} votes recorded</span>
              </div>
            </div>

            {/* Logs Table */}
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                <tr>
                  <th className="bg-base-200">Voter Address</th>
                  <th className="bg-base-200">Timestamp</th>
                  <th className="bg-base-200">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentLogs.length > 0 ? (
                  currentLogs.map((log, index) => (
                    <tr key={index} className="hover">
                      <td className="font-mono">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
                          {truncateAddress(log.address)}
                        </div>
                      </td>
                      <td>{log.timestamp}</td>
                      <td>
                        <a
                          href={`https://amoy.polygonscan.com/tx/${log.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-xs btn-outline btn-accent"
                        >
                          View on Explorer
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4">No votes found</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <div className="btn-group">
                  <button
                    className="btn btn-sm"
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`btn btn-sm ${currentPage === index + 1 ? 'btn-active' : ''}`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="btn btn-sm"
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </button>
                </div>
              </div>
            )}

            {/* Information Card */}
            <div className="bg-base-200 p-4 rounded-lg mt-8">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6 text-info mr-2 mt-1 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <p className="text-sm opacity-80">
                  This page displays a transparent log of all votes cast on the blockchain. Each vote is anonymously
                  recorded with only the voter's wallet address and timestamp, ensuring privacy while maintaining
                  auditability. Click "View on Explorer" to verify each transaction on Polygon Amoy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};