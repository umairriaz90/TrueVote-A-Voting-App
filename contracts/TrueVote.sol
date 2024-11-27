// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract TrueVote is ReentrancyGuard, Ownable, Pausable {
    struct Voter {
        string firstName;
        string lastName;
        string voterId;
        string email;
        uint256 age;
        string region;
        string group;
        bool isRegistered;
        uint256 votingTime;
    }
    
    struct Candidate {
        uint256 id;
        string firstName;
        string lastName;
        string voterId;
        string email;
        uint256 voteCount;
    }
    
    struct Election {
        uint256 id;
        string name;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        uint256 totalVoters;
        uint256 votedCount;
        mapping(address => bool) hasVoted;
        mapping(string => uint256) regionVotes;
        mapping(uint256 => uint256) ageGroupVotes;
        mapping(string => uint256) groupVotes;
        mapping(uint256 => uint256) hourlyVotes;
        Candidate[] candidates;
    }
    
    mapping(uint256 => Election) public elections;
    mapping(address => Voter) public voters;
    mapping(string => bool) private usedVoterIds;
    
    uint256 public electionCount;
    bytes32 private constant SALT = keccak256("TrueVote2024");
    
    event VoterRegistered(address indexed voter, string voterId);
    event CandidateRegistered(uint256 indexed electionId, uint256 candidateId);
    event VoteCast(uint256 indexed electionId, bytes32 encryptedVote);
    event ElectionCreated(uint256 indexed electionId);
    event ElectionEnded(uint256 indexed electionId);
    
    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "Not registered");
        _;
    }
    
    modifier onlyDuringElection(uint256 _electionId) {
        require(elections[_electionId].isActive, "Election inactive");
        require(block.timestamp >= elections[_electionId].startTime, "Not started");
        require(block.timestamp <= elections[_electionId].endTime, "Ended");
        _;
    }
    
    constructor() Ownable(msg.sender) {
        _pause(); // Start paused for security
    }
    
    function registerVoter(
        string memory _firstName,
        string memory _lastName,
        string memory _voterId,
        string memory _email,
        uint256 _age,
        string memory _region,
        string memory _group,
        bytes32 _hashedPassword
    ) external whenNotPaused {
        require(!usedVoterIds[_voterId], "VoterId already exists");
        require(_age >= 18, "Must be 18 or older");
        
        voters[msg.sender] = Voter({
            firstName: _firstName,
            lastName: _lastName,
            voterId: _voterId,
            email: _email,
            age: _age,
            region: _region,
            group: _group,
            isRegistered: true,
            votingTime: 0
        });
        
        usedVoterIds[_voterId] = true;
        emit VoterRegistered(msg.sender, _voterId);
    }
    
    function castVote(uint256 _electionId, uint256 _candidateId) 
        external 
        nonReentrant 
        whenNotPaused
        onlyRegisteredVoter 
        onlyDuringElection(_electionId) 
    {
        Election storage election = elections[_electionId];
        require(!election.hasVoted[msg.sender], "Already voted");
        
        election.hasVoted[msg.sender] = true;
        election.votedCount++;
        election.candidates[_candidateId].voteCount++;
        
        // Update analytics
        Voter storage voter = voters[msg.sender];
        election.regionVotes[voter.region]++;
        election.ageGroupVotes[voter.age / 10]++;
        election.groupVotes[voter.group]++;
        election.hourlyVotes[block.timestamp / 3600]++;
        
        // Record voting time
        voter.votingTime = block.timestamp;
        
        // Encrypt vote data
        bytes32 encryptedVote = keccak256(abi.encodePacked(
            _electionId,
            _candidateId,
            msg.sender,
            SALT
        ));
        
        emit VoteCast(_electionId, encryptedVote);
    }
    
    function getVoterAnalytics(uint256 _electionId) 
        external 
        view 
        returns (
            uint256 totalVoters,
            uint256 votedCount,
            uint256 turnoutPercentage
        ) 
    {
        Election storage election = elections[_electionId];
        totalVoters = election.totalVoters;
        votedCount = election.votedCount;
        turnoutPercentage = (votedCount * 100) / totalVoters;
    }
    
    function getRegionAnalytics(uint256 _electionId, string memory _region) 
        external 
        view 
        returns (uint256) 
    {
        return elections[_electionId].regionVotes[_region];
    }
    
    function getAgeGroupAnalytics(uint256 _electionId, uint256 _ageGroup) 
        external 
        view 
        returns (uint256) 
    {
        return elections[_electionId].ageGroupVotes[_ageGroup];
    }
    
    function emergencyPause() external onlyOwner {
        _pause();
    }
    
    function emergencyUnpause() external onlyOwner {
        _unpause();
    }
}
