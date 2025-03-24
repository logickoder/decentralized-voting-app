// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {CommonBase} from "../lib/forge-std/src/Base.sol";
import {StdAssertions} from "../lib/forge-std/src/StdAssertions.sol";
import {StdChains} from "../lib/forge-std/src/StdChains.sol";
import {StdCheats, StdCheatsSafe} from "../lib/forge-std/src/StdCheats.sol";
import {StdUtils} from "../lib/forge-std/src/StdUtils.sol";
import {Test} from "../lib/forge-std/src/Test.sol";
import {Voting} from "../src/Voting.sol";

contract VotingTest is Test {
    Voting public voting;
    address public electionManager;
    address public auditor;
    address public voter1;
    address public voter2;
    address public voter3;

    // Test candidate IDs
    uint256 constant CANDIDATE_1 = 1;
    uint256 constant CANDIDATE_2 = 2;
    uint256 constant CANDIDATE_3 = 3;

    function setUp() public {
        // Setup addresses
        electionManager = address(this); // Test contract itself is initially the election manager
        auditor = address(this); // Test contract itself is initially the auditor
        voter1 = address(0x1);
        voter2 = address(0x2);
        voter3 = address(0x3);

        // Deploy voting contract
        voting = new Voting();

        // Setup initial candidate list
        voting.addCandidate(CANDIDATE_1);
        voting.addCandidate(CANDIDATE_2);
        voting.addCandidate(CANDIDATE_3);
    }

    // Test initial state
    function testInitialState() public {
        // Check roles
        assertEq(voting.electionManager(), address(this));
        assertEq(voting.auditor(), address(this));

        // Check vote status
        assertEq(uint(voting.voteStatus()), uint(Voting.VoteStatus.Pending));

        // Check result status
        Voting.ResultStatus memory result = voting.getResultStatus();
        assertEq(uint(result.state), uint(Voting.ResultStatusState.NotAnnounced));
        assertEq(result.winnerId, 0);

        // Check candidates
        uint256[] memory candidates = voting.getCandidates();
        assertEq(candidates.length, 3);
        assertEq(candidates[0], CANDIDATE_1);
        assertEq(candidates[1], CANDIDATE_2);
        assertEq(candidates[2], CANDIDATE_3);
    }

    // Test role assignment
    function testRoleAssignment() public {
        address newManager = address(0x4);
        address newAuditor = address(0x5);

        // Change election manager
        voting.setElectionManager(newManager);
        assertEq(voting.electionManager(), newManager);

        // Can no longer call manager-only functions
        vm.expectRevert("Only Election Manager");
        voting.setAuditor(newAuditor);

        // Call as new manager
        vm.prank(newManager);
        voting.setAuditor(newAuditor);
        assertEq(voting.auditor(), newAuditor);

        // Test role bitmasks
        uint8 managerRole = voting.getRole(newManager);
        uint8 auditorRole = voting.getRole(newAuditor);
        uint8 bothRoles = voting.getRole(address(this)); // Should be 0 now

        assertEq(managerRole, 1); // IS_ELECTION_MANAGER
        assertEq(auditorRole, 2); // IS_AUDITOR
        assertEq(bothRoles, 0);   // No roles
    }

    // Test voting functionality
    function testVoting() public {
        // Start voting
        voting.startVoting();
        assertEq(uint(voting.voteStatus()), uint(Voting.VoteStatus.Active));

        // Vote as different users
        vm.prank(voter1);
        voting.vote(CANDIDATE_1);

        vm.prank(voter2);
        voting.vote(CANDIDATE_2);

        vm.prank(voter3);
        voting.vote(CANDIDATE_1);

        // Check vote counts
        assertEq(voting.getVoteCount(CANDIDATE_1), 2);
        assertEq(voting.getVoteCount(CANDIDATE_2), 1);
        assertEq(voting.getVoteCount(CANDIDATE_3), 0);
        assertEq(voting.totalVotes(), 3);

        // Can't vote twice
        vm.prank(voter1);
        vm.expectRevert("Already voted");
        voting.vote(CANDIDATE_2);

        // End voting
        voting.endVoting();
        assertEq(uint(voting.voteStatus()), uint(Voting.VoteStatus.Ended));
    }

    // Test candidate management
    function testCandidateManagement() public {
        // Add a new candidate
        uint256 newCandidateId = voting.addCandidate(voting.getNextCandidateId());

        // Check candidates
        uint256[] memory candidates = voting.getCandidates();
        assertEq(candidates.length, 4);

        // Remove a candidate
        voting.removeCandidate(newCandidateId);

        // Try to remove non-existent candidate
        vm.expectRevert("Candidate ID not found");
        voting.removeCandidate(99);

        // Check candidates again
        candidates = voting.getCandidates();
        assertEq(candidates.length, 3);
    }

    // Test result announcement
    function testResultAnnouncement() public {
        // Set up a vote
        voting.startVoting();

        vm.prank(voter1);
        voting.vote(CANDIDATE_1);

        vm.prank(voter2);
        voting.vote(CANDIDATE_2);

        vm.prank(voter3);
        voting.vote(CANDIDATE_1);

        voting.endVoting();

        // Announce result
        voting.announceResult(CANDIDATE_1);

        // Check result
        Voting.ResultStatus memory result = voting.getResultStatus();
        assertEq(uint(result.state), uint(Voting.ResultStatusState.Announced));
        assertEq(result.winnerId, CANDIDATE_1);

        // Try to announce invalid winner
        vm.expectRevert("Invalid winner ID");
        voting.announceResult(99);
    }

    // Test full voting lifecycle
    function testFullVotingLifecycle() public {
        // Setup different roles
        address newManager = address(0x4);
        address newAuditor = address(0x5);

        voting.setElectionManager(newManager);

        vm.prank(newManager);
        voting.setAuditor(newAuditor);

        // Start voting as manager
        vm.prank(newManager);
        voting.startVoting();

        // Multiple votes
        for (uint i = 1; i <= 10; i++) {
            address voter = address(uint160(i + 10));
            uint256 candidateId = (i % 3) + 1; // Vote for candidates 1, 2, 3 in rotation

            vm.prank(voter);
            voting.vote(candidateId);
        }

        // End voting
        vm.prank(newManager);
        voting.endVoting();

        // Check vote counts
        assertEq(voting.getVoteCount(CANDIDATE_1), 4); // 1, 4, 7, 10
        assertEq(voting.getVoteCount(CANDIDATE_2), 3); // 2, 5, 8
        assertEq(voting.getVoteCount(CANDIDATE_3), 3); // 3, 6, 9

        // Announce result as auditor
        vm.prank(newAuditor);
        voting.announceResult(CANDIDATE_1);

        // Verify final state
        Voting.ResultStatus memory result = voting.getResultStatus();
        assertEq(uint(result.state), uint(Voting.ResultStatusState.Announced));
        assertEq(result.winnerId, CANDIDATE_1);
        assertEq(uint(voting.voteStatus()), uint(Voting.VoteStatus.Ended));
    }

    // Test events
    function testEvents() public {
        // Test vote status change event
        vm.expectEmit(true, true, true, true);
        emit Voting.VoteStatusChanged(Voting.VoteStatus.Active);
        voting.startVoting();

        // Test vote logged event
        vm.prank(voter1);
        vm.expectEmit(true, true, true, true);
        emit Voting.VoteLogged(voter1);
        voting.vote(CANDIDATE_1);

        // Test candidate added event
        uint256 newCandidateId = voting.getNextCandidateId();
        vm.expectEmit(true, true, true, true);
        emit Voting.CandidateAdded(newCandidateId);
        voting.addCandidate(newCandidateId);

        // Test candidate removed event
        vm.expectEmit(true, true, true, true);
        emit Voting.CandidateRemoved(newCandidateId);
        voting.removeCandidate(newCandidateId);

        // Test result status change event
        voting.endVoting();
        vm.expectEmit(true, true, true, true);
        emit Voting.ResultStatusChanged(Voting.ResultStatus({
            state: Voting.ResultStatusState.Announced,
            winnerId: CANDIDATE_1
        }));
        voting.announceResult(CANDIDATE_1);
    }

    // Test edge cases
    function testEdgeCases() public {
        // Can't vote before voting starts
        vm.prank(voter1);
        vm.expectRevert(); // Will revert but no custom message
        voting.vote(CANDIDATE_1);

        // Can't vote for non-existent candidate
        voting.startVoting();
        vm.prank(voter1);
        vm.expectRevert("Invalid candidate ID");
        voting.vote(99);

        // Test with empty candidate list
        Voting emptyVoting = new Voting();
        emptyVoting.startVoting();

        vm.prank(voter1);
        vm.expectRevert("Invalid candidate ID");
        emptyVoting.vote(CANDIDATE_1);
    }
}