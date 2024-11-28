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
        bytes32 hashedpassword;
        uint256 candidateId;
    }

    struct Candidate {
    string name;
    uint voteCount;
    }
    
    struct Election {
        uint256 id;
        string title;
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
    }
    
    mapping(address => Voter[]) public votersVotesMap; // Mapping of addresses with their respective votes.
    // At contract level
    mapping(uint256 => uint256) private candidateVoteCounts;

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
            votingTime: 0,
            hashedpassword: _hashedPassword,
            candidateId: 0
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
        election.totalVoters++;
        
        // Update analytics
        Voter storage voter = voters[msg.sender];
        election.regionVotes[voter.region]++;
        election.ageGroupVotes[voter.age / 10]++;
        election.groupVotes[voter.group]++;
        election.hourlyVotes[block.timestamp / 3600]++;
        
        // Record voting time
        voter.votingTime = block.timestamp;
        voter.candidateId = _candidateId;
        
        // Encrypt vote data
        bytes32 encryptedVote = keccak256(abi.encodePacked(
            _electionId,
            _candidateId,
            msg.sender,
            SALT
        ));
        
        emit VoteCast(_electionId, encryptedVote);
    }

    function getAllVoters() public view returns (address[] memory) {
    uint256 voterCount = 0;
    
    // First pass: count total registered voters
    for (uint256 i = 0; i < electionCount; i++) {
        Election storage election = elections[i];
        voterCount = election.totalVoters;
    }
    
    // Create array with exact size needed
    address[] memory voterAddresses = new address[](voterCount);
    uint256 currentIndex = 0;
    
    // Second pass: store voter addresses
    for (uint256 i = 0; i < electionCount; i++) {
        Election storage election = elections[i];
        if (election.isActive || !election.isActive) { // Include all elections
            for (uint256 j = 0; j < election.totalVoters; j++) {
                address voterAddress = msg.sender; // Replace with actual voter address
                if (voters[voterAddress].isRegistered) {
                    voterAddresses[currentIndex] = voterAddress;
                    currentIndex++;
                }
            }
        }
    }
    
    return voterAddresses;
}


    function getElectionResults(uint256 _electionId) 
    external 
    view 
    returns (uint256[] memory candidateIds, uint256[] memory voteResults) 
{
    Election storage election = elections[_electionId];
    require(_electionId <= electionCount, "Election does not exist");
    require(election.totalVoters > 0, "No voters registered for this election");
    
    uint256 maxCandidateId = 0;
    
    // First determine max candidate ID and create temporary count array
    address[] memory voterAddresses = getAllVoters();
    require(voterAddresses.length > 0, "No voters found");
    
    for (uint256 i = 0; i < voterAddresses.length; i++) {
        address voterAddr = voterAddresses[i];
        if (election.hasVoted[voterAddr]) {
            uint256 candidateId = voters[voterAddr].candidateId;
            if (candidateId > maxCandidateId) {
                maxCandidateId = candidateId;
            }
        }
    }
    
    require(maxCandidateId > 0, "No votes cast yet");
    
    // Create arrays for results
    candidateIds = new uint256[](maxCandidateId);
    voteResults = new uint256[](maxCandidateId);
    
    // Count votes
    for (uint256 i = 0; i < voterAddresses.length; i++) {
        address voterAddr = voterAddresses[i];
        if (election.hasVoted[voterAddr]) {
            uint256 candidateId = voters[voterAddr].candidateId;
            voteResults[candidateId - 1]++;
        }
    }
    
    // Fill candidate IDs
    for (uint256 i = 1; i <= maxCandidateId; i++) {
        candidateIds[i-1] = i;
    }
    
    // Sort results by vote count (descending)
    for (uint256 i = 0; i < maxCandidateId - 1; i++) {
        for (uint256 j = 0; j < maxCandidateId - i - 1; j++) {
            if (voteResults[j] < voteResults[j + 1]) {
                // Swap vote counts
                uint256 tempCount = voteResults[j];
                voteResults[j] = voteResults[j + 1];
                voteResults[j + 1] = tempCount;
                
                // Swap candidate IDs
                uint256 tempId = candidateIds[j];
                candidateIds[j] = candidateIds[j + 1];
                candidateIds[j + 1] = tempId;
            }
        }
    }
}



    // Function to activate election
    function activateElection(uint256 _electionId) external onlyOwner {
        require(elections[_electionId].isActive == false, "Election must be inactive");
        
        elections[_electionId].isActive = true;
        elections[_electionId].startTime = block.timestamp;
        elections[_electionId].endTime = block.timestamp + 24 hours;
        electionCount++;
        emit ElectionCreated(_electionId);
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
