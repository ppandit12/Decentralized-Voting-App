import { ethers } from "ethers";

const DAO_ABI = [
  "function createProposal(string memory _ipfsHash) external",
  "function vote(uint256 _proposalId, bool _support) external",
  "function executeProposal(uint256 _proposalId) external",
  "function getProposal(uint256 _proposalId) external view returns (string memory ipfsHash, uint256 voteCountAsYes, uint256 voteCountAsNo, uint256 endTime, bool executed)",
  "function nextProposalId() external view returns (uint256)",
  "function votingToken() external view returns (address)",
  "event ProposalCreated(uint256 indexed id, string ipfsHash, uint256 endTime)",
  "event Voted(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight)"
];

const TOKEN_ABI = [
  "function balanceOf(address owner) external view returns (uint256)",
  "function mint(address to, uint256 amount) external",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)"
];

export async function getWeb3Provider() {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
}

export async function getContract(address, abi, signer) {
  return new ethers.Contract(address, abi, signer);
}

export { DAO_ABI, TOKEN_ABI };
