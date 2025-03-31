// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Voting Contract
/// @notice This contract manages the voting process, including candidate management, voting, and result announcement.
contract Voting {
    enum VoteStatus { // Represents the current status of the voting process.
        Pending, // Voting has not started yet.
        Active, // Voting is currently in progress.
        Ended
    }

    enum ResultStatusState {
        NotAnnounced,
        Announced
    }

    /// @notice Represents the status of the result announcement.
    struct ResultStatus {
        ResultStatusState state;
        uint256 winnerId;
    }

    struct ResultStatistics {
        uint256 totalVotes;
        uint256 winnerId;
        uint256 voterTurnout;
        uint256[] candidateIds;
        uint256[] voteCounts;
    }

    uint8 private constant IS_ELECTION_MANAGER = 1; // Bitmask for Election Manager role.
    uint8 private constant IS_AUDITOR = 2; // Bitmask for Auditor role.
    uint16 private constant ELIGIBLE_VOTERS = 1000; // Total number of eligible voters.

    address public electionManager;
    address public auditor;

    uint256 public totalVotes;
    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public votesPerCandidate; // candidateId => vote count
    uint256[] public candidateIds; // Array of valid candidate IDs

    VoteStatus public voteStatus;
    ResultStatus public resultStatus;

    event ElectionManagerChanged(address oldManager, address newManager); // Emitted when the Election Manager is changed.
    event AuditorChanged(address oldAuditor, address newAuditor); // Emitted when the Auditor is changed.

    event VoteStatusChanged(VoteStatus status);  // Emitted when the voting status changes.
    event ResultStatusChanged(ResultStatus status);

    event VoteLogged(address voter);

    event CandidateAdded(uint256 candidateId);
    event CandidateRemoved(uint256 candidateId);

    /// @notice Modifier to restrict function access to the Election Manager.
    modifier onlyElectionManager() {
        require(msg.sender == electionManager, "Only Election Manager");
        _;
    }

    /// @notice Modifier to restrict function access to the Auditor.
    modifier onlyAuditor() {
        require(msg.sender == auditor, "Only Auditor");
        _;
    }

    constructor() {
        // @notice Constructor to initialize the contract.
        // Deployer is the initial Election Manager and Auditor
        electionManager = msg.sender;
        auditor = msg.sender;
        _init();
    }

    /// @notice Sets a new Election Manager.
    function setElectionManager(address newElectionManager) external onlyElectionManager {
        require(newElectionManager != address(0), "Invalid address");
        address oldManager = electionManager;
        electionManager = newElectionManager;
        emit ElectionManagerChanged(oldManager, newElectionManager);
    }

    /// @notice Sets a new Auditor.
    function setAuditor(address newAuditor) external onlyElectionManager {
        require(newAuditor != address(0), "Invalid address");
        address oldAuditor = auditor;
        auditor = newAuditor;
        emit AuditorChanged(oldAuditor, newAuditor);
    }

    /// @notice Returns the role of an account.
    function getRole(address account) external view returns (uint8) {
        uint8 role = 0;
        if (account == electionManager) role |= IS_ELECTION_MANAGER;
        if (account == auditor) role |= IS_AUDITOR;
        return role;
    }

    /// @notice Allows a voter to cast their vote for a candidate.
    function vote(uint256 candidateId) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(isCandidate(candidateId), "Invalid candidate ID");
        hasVoted[msg.sender] = true;
        votesPerCandidate[candidateId]++;
        totalVotes++;
        emit VoteLogged(msg.sender);
    }

    function hasAddressVoted(address account) external view returns (bool) {
        return hasVoted[account];
    }

    /// @notice Returns the number of votes a candidate has received.
    function getVoteCount(uint256 candidateId) external view returns (uint256) {
        return votesPerCandidate[candidateId];
    }

    /// @notice Starts the voting process.
    function startVoting() external onlyElectionManager {
        _setVoteStatus(VoteStatus.Active);
    }

    /// @notice Ends the voting process.
    function endVoting() external onlyElectionManager {
        _setVoteStatus(VoteStatus.Ended);
    }

    /// @notice Resets the voting process.
    function reset() external onlyElectionManager {
        _init();
    }

    function announceResult(uint256 winnerId) external onlyAuditor {
        require(isCandidate(winnerId), "Invalid winner ID");
        _setResultStatus(
            ResultStatus({
                state: ResultStatusState.Announced,
                winnerId: winnerId
            })
        );
    }

    /// @notice Checks if a candidate ID is valid.
    function isCandidate(uint256 candidateId) internal view returns (bool) {
        for (uint i = 0; i < candidateIds.length; i++) {
            if (candidateIds[i] == candidateId) return true;
        }
        return false;
    }

    /// @notice Returns the next available candidate ID.
    function getNextCandidateId() external view returns (uint256) {
        return candidateIds.length + 1;
    }

    /// @notice Adds a new candidate.
    function addCandidate(uint256 candidateId) external onlyElectionManager returns (uint256) {
        require(!isCandidate(candidateId), "Candidate ID already exists");
        candidateIds.push(candidateId);
        emit CandidateAdded(candidateId);
        return candidateId;
    }

    /// @notice Removes a candidate.
    function removeCandidate(uint256 candidateId) external onlyElectionManager {
        uint256 index = findCandidateIndex(candidateId);
        require(index < candidateIds.length, "Candidate ID not found");
        candidateIds[index] = candidateIds[candidateIds.length - 1]; // Swap with last
        candidateIds.pop(); // Remove last
        emit CandidateRemoved(candidateId);
    }

    /// @notice Finds the index of a candidate in the candidateIds array.
    function findCandidateIndex(uint256 candidateId) internal view returns (uint256) {
        for (uint i = 0; i < candidateIds.length; i++) {
            if (candidateIds[i] == candidateId) return i;
        }
        return candidateIds.length; // Not found
    }

    /// @notice Returns the list of candidate IDs.
    function getCandidates() external view returns (uint256[] memory) {
        return candidateIds;
    }

    /// @notice Returns the current voting status.
    function getVoteStatus() external view returns (VoteStatus) {
        return voteStatus;
    }

    /// @notice Returns the current result status.
    function getResultStatus() external view returns (ResultStatus memory) {
        return resultStatus;
    }

    /// @notice Returns the result statistics.
    function getResultStatistics() external view returns (ResultStatistics memory) {
        uint256 winnerId = 0;
        uint256 maxVotes = 0;
        for (uint i = 0; i < candidateIds.length; i++) {
            if (votesPerCandidate[candidateIds[i]] > maxVotes) {
                maxVotes = votesPerCandidate[candidateIds[i]];
                winnerId = candidateIds[i];
            }
        }

        uint256[] memory voteCounts = new uint256[](candidateIds.length);
        for (uint i = 0; i < candidateIds.length; i++) {
            voteCounts[i] = votesPerCandidate[candidateIds[i]];
        }

        return ResultStatistics({
            totalVotes: totalVotes,
            winnerId: winnerId,
            voterTurnout: (totalVotes * 100) / ELIGIBLE_VOTERS,
            candidateIds: candidateIds,
            voteCounts: voteCounts
        });
    }

    /// @notice Sets the voting status and emits an event.
    function _setVoteStatus(VoteStatus status) private {
        voteStatus = status;
        emit VoteStatusChanged(status);
    }

    /// @notice Sets the result status and emits an event.
    function _setResultStatus(ResultStatus memory status) private {
        resultStatus = status;
        emit ResultStatusChanged(status);
    }

    function _init() private {
        for (uint i = 0; i < candidateIds.length; i++) {
            votesPerCandidate[candidateIds[i]] = 0;
        }
        totalVotes = 0;
        _setVoteStatus(VoteStatus.Pending);
        _setResultStatus(
            ResultStatus({
                state: ResultStatusState.NotAnnounced,
                winnerId: 0
            })
        );
    }
}