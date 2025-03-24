import { useState } from 'react';
import useAppStore from '../domain/store.ts';
import { IS_ELECTION_MANAGER } from '../types/Role.ts';
import { LiaUserEditSolid } from 'react-icons/lia';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { CiCircleInfo, CiMenuKebab } from 'react-icons/ci';
import { Candidate } from '../types/Candidate.ts';
import candidatesUsecase from '../domain/candidatesUsecase.ts';

export default function CandidatesPage() {
  const isElectionManager = useAppStore(state => (state.role & IS_ELECTION_MANAGER) !== 0);
  const candidates = useAppStore(state => state.candidates);
  const [newCandidate, setNewCandidate] = useState<Partial<Candidate>>({
    name: '',
    bio: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<number | null>(null);

  // Handlers for candidate management
  const handleAddCandidate = (e) => {
    e.preventDefault();

    void candidatesUsecase.addCandidate({
      name: newCandidate.name,
      bio: newCandidate.bio
    });

    setNewCandidate({ name: '', bio: '' });
    setIsModalOpen(false);
  };

  const handleEditCandidate = (candidate) => {
    setEditingCandidate(candidate.id);
    setNewCandidate({ name: candidate.name, bio: candidate.bio });
    setIsModalOpen(true);
  };

  const handleUpdateCandidate = (e) => {
    e.preventDefault();

    void candidatesUsecase.updateCandidate({
      id: editingCandidate!,
      name: newCandidate.name!,
      bio: newCandidate.bio!
    });

    setNewCandidate({ name: '', bio: '' });
    setEditingCandidate(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-base-200 pb-12">
      {/* Page Header */}
      <div className="bg-primary bg-opacity-10 py-12 text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Election Candidates</h1>
        <p className="mt-2 text-base-content opacity-80">View and manage candidates for the current election</p>
      </div>

      <div className="container mx-auto px-4">
        {/* Admin Controls - Only visible to Election Manager */}
        {isElectionManager && (
          <div className="flex justify-end mb-6">
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditingCandidate(null);
                setNewCandidate({ name: '', bio: '' });
                setIsModalOpen(true);
              }}
            >
              <AiOutlineUserAdd className="w-5 h-5 mr-2" />
              Add Candidate
            </button>
          </div>
        )}

        {/* Candidates List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-primary text-2xl line-clamp-1 text-ellipsis">{candidate.name}</h2>
                    <div className="badge badge-outline my-2">ID: {candidate.id}</div>
                  </div>

                  {/* Admin Actions - Only visible to Election Manager */}
                  {isElectionManager && (
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <CiMenuKebab className="w-6 h-6" />
                      </label>
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                          <button onClick={() => handleEditCandidate(candidate)}>
                            <LiaUserEditSolid className="w-5 h-5" />
                            Edit Details
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-error"
                            onClick={() => candidatesUsecase.removeCandidate(candidate.id)}
                          >
                            <AiOutlineUserDelete className="w-5 h-5" />
                            Remove
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <p className="text-base-content mt-2">{candidate.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {candidates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🗳️</div>
            <h3 className="text-2xl font-semibold mb-2">No Candidates Yet</h3>
            <p className="text-base-content text-opacity-70">
              {isElectionManager
                ? 'Get started by adding candidates for the election.'
                : 'Candidates will appear here once they\'ve been added by the Election Manager.'}
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Candidate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="modal-box relative bg-base-100 rounded-lg shadow-xl p-6 w-full max-w-md">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4">
              {editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}
            </h3>

            <form onSubmit={editingCandidate ? handleUpdateCandidate : handleAddCandidate}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Candidate name"
                  className="input input-bordered w-full"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Brief candidate biography"
                  value={newCandidate?.bio ?? ''}
                  onChange={(e) => setNewCandidate({ ...newCandidate, bio: e.target.value })}
                  required
                ></textarea>
              </div>

              {editingCandidate && (
                <div className="alert alert-info mb-6">
                  <CiCircleInfo className="stroke-current shrink-0 w-6 h-6" />
                  <span>Blockchain ID: {editingCandidate} (cannot be changed)</span>
                </div>
              )}

              <div className="modal-action">
                <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCandidate ? 'Update Candidate' : 'Add Candidate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};