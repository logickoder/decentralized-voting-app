// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    enum VoteStatus {
        Pending,
        Active,
        Ended
    }

    enum ResultStatusState {
        NotAnnounced,
        Announced
    }

    struct ResultStatus {
        ResultStatusState state;
        uint256 winnerId;
    }

    uint8 private constant IS_ELECTION_MANAGER = 1;
    uint8 private constant IS_AUDITOR = 2;

    address public electionManager;
    address public auditor;

    uint256 public totalVotes;
    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public votesPerCandidate; // candidateId => vote count
    uint256[] public candidateIds; // Array of valid candidate IDs

    VoteStatus public voteStatus;
    ResultStatus public resultStatus;

    event ElectionManagerChanged(address oldManager, address newManager);
    event AuditorChanged(address oldAuditor, address newAuditor);

    event VoteStatusChanged(VoteStatus status);
    event ResultStatusChanged(ResultStatus status);

    event VoteLogged(address voter);

    event CandidateAdded(uint256 candidateId);
    event CandidateRemoved(uint256 candidateId);

    modifier onlyElectionManager() {
        require(msg.sender == electionManager, "Only Election Manager");
        _;
    }

    modifier onlyAuditor() {
        require(msg.sender == auditor, "Only Auditor");
        _;
    }

    constructor() {
        // Deployer is the initial Election Manager and Auditor
        electionManager = msg.sender;
        auditor = msg.sender;
        // No initial candidateIds; Election Manager will add them later
        _init();
    }

    function setElectionManager(address newElectionManager) external onlyElectionManager {
        require(newElectionManager != address(0), "Invalid address");
        address oldManager = electionManager;
        electionManager = newElectionManager;
        emit ElectionManagerChanged(oldManager, newElectionManager);
    }

    function setAuditor(address newAuditor) external onlyElectionManager {
        require(newAuditor != address(0), "Invalid address");
        address oldAuditor = auditor;
        auditor = newAuditor;
        emit AuditorChanged(oldAuditor, newAuditor);
    }

    function getRole(address account) external view returns (uint8) {
        uint8 role = 0;
        if (account == electionManager) role |= IS_ELECTION_MANAGER;
        if (account == auditor) role |= IS_AUDITOR;
        return role;
    }

    function vote(uint256 candidateId) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(isCandidate(candidateId), "Invalid candidate ID");
        hasVoted[msg.sender] = true;
        votesPerCandidate[candidateId]++;
        totalVotes++;
        emit VoteLogged(msg.sender);
    }

    function getTurnout() external view returns (uint256) {
        return (totalVotes * 100) / 1000; // Assuming 1000 voters
    }

    function getVoteCount(uint256 candidateId) external view returns (uint256) {
        return votesPerCandidate[candidateId];
    }

    function startVoting() external onlyElectionManager {
        _setVoteStatus(VoteStatus.Active);
    }

    function endVoting() external onlyElectionManager {
        _setVoteStatus(VoteStatus.Ended);
    }

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

    function isCandidate(uint256 candidateId) internal view returns (bool) {
        for (uint i = 0; i < candidateIds.length; i++) {
            if (candidateIds[i] == candidateId) return true;
        }
        return false;
    }

    function getNextCandidateId() external view returns (uint256) {
        return candidateIds.length + 1;
    }

    function addCandidate(uint256 candidateId) external onlyElectionManager returns (uint256) {
        require(!isCandidate(candidateId), "Candidate ID already exists");
        candidateIds.push(candidateId);
        emit CandidateAdded(candidateId);
        return candidateId;
    }

    function removeCandidate(uint256 candidateId) external onlyElectionManager {
        uint256 index = findCandidateIndex(candidateId);
        require(index < candidateIds.length, "Candidate ID not found");
        candidateIds[index] = candidateIds[candidateIds.length - 1]; // Swap with last
        candidateIds.pop(); // Remove last
        emit CandidateRemoved(candidateId);
    }

    function findCandidateIndex(uint256 candidateId) internal view returns (uint256) {
        for (uint i = 0; i < candidateIds.length; i++) {
            if (candidateIds[i] == candidateId) return i;
        }
        return candidateIds.length; // Not found
    }

    function getCandidates() external view returns (uint256[] memory) {
        return candidateIds;
    }

    function getVoteStatus() external view returns (VoteStatus) {
        return voteStatus;
    }

    function getResultStatus() external view returns (ResultStatus memory) {
        return resultStatus;
    }

    function _setVoteStatus(VoteStatus status) private {
        voteStatus = status;
        emit VoteStatusChanged(status);
    }

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