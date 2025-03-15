// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    address public electionManager;
    address public auditor;
    uint256 public totalVotes;
    mapping(address => bool) public hasVoted;
    mapping(string => uint256) public votesPerCandidate;
    string[] public candidates;

    event VotingStarted();
    event VotingEnded();
    event ResultAnnounced(string winner);
    event VoteLogged(address voter);

    modifier onlyElectionManager() {
        require(msg.sender == electionManager, "Only Election Manager");
        _;
    }

    modifier onlyAuditor() {
        require(msg.sender == auditor, "Only Auditor");
        _;
    }

    constructor(address _auditor) {
        electionManager = msg.sender;
        auditor = _auditor;
        candidates = ["Candidate1", "Candidate2", "Candidate3"];
    }

    function vote(string memory candidate) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(isCandidate(candidate), "Invalid candidate");
        hasVoted[msg.sender] = true;
        votesPerCandidate[candidate]++;
        totalVotes++;
        emit VoteLogged(msg.sender);
    }

    function getTurnout() external view returns (uint256) {
        return (totalVotes * 100) / 1000; // Assuming 1000 voters
    }

    function getVoteCount(string memory candidate) external view returns (uint256) {
        return votesPerCandidate[candidate];
    }

    function startVoting() external onlyElectionManager {
        emit VotingStarted();
    }

    function endVoting() external onlyElectionManager {
        emit VotingEnded();
    }

    function announceResult(string memory winner) external onlyAuditor {
        emit ResultAnnounced(winner);
    }

    function isCandidate(string memory candidate) internal view returns (bool) {
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(candidate))) return true;
        }
        return false;
    }
}