// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DaoVoting is Ownable {
    IERC20 public votingToken;

    struct Proposal {
        uint256 id;
        string ipfsHash; // Stores proposal metadata
        uint256 voteCountAsYes;
        uint256 voteCountAsNo;
        uint256 endTime;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    uint256 public nextProposalId;
    uint256 public constant PROPOSAL_DURATION = 3 days;

    event ProposalCreated(uint256 indexed id, string ipfsHash, uint256 endTime);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed id, bool passed);

    constructor(address _votingTokenAddress, address initialOwner) Ownable(initialOwner) {
        votingToken = IERC20(_votingTokenAddress);
    }

    function createProposal(string memory _ipfsHash) external {
        require(votingToken.balanceOf(msg.sender) > 0, "Must hold tokens to propose");

        uint256 proposalId = nextProposalId++;
        proposals[proposalId] = Proposal({
            id: proposalId,
            ipfsHash: _ipfsHash,
            voteCountAsYes: 0,
            voteCountAsNo: 0,
            endTime: block.timestamp + PROPOSAL_DURATION,
            executed: false
        });

        emit ProposalCreated(proposalId, _ipfsHash, block.timestamp + PROPOSAL_DURATION);
    }

    function vote(uint256 _proposalId, bool _support) external {
        Proposal storage proposal = proposals[_proposalId];
        
        require(block.timestamp < proposal.endTime, "Voting period has ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");

        uint256 voterBalance = votingToken.balanceOf(msg.sender);
        require(voterBalance > 0, "No voting power");

        hasVoted[_proposalId][msg.sender] = true;

        if (_support) {
            proposal.voteCountAsYes += voterBalance;
        } else {
            proposal.voteCountAsNo += voterBalance;
        }

        emit Voted(_proposalId, msg.sender, _support, voterBalance);
    }

    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        
        require(block.timestamp >= proposal.endTime, "Voting period not yet ended");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;
        
        bool passed = proposal.voteCountAsYes > proposal.voteCountAsNo;
        
        emit ProposalExecuted(_proposalId, passed);
    }
    
    function getProposal(uint256 _proposalId) external view returns (
        string memory ipfsHash,
        uint256 voteCountAsYes,
        uint256 voteCountAsNo,
        uint256 endTime,
        bool executed
    ) {
        Proposal memory p = proposals[_proposalId];
        return (p.ipfsHash, p.voteCountAsYes, p.voteCountAsNo, p.endTime, p.executed);
    }
}
