import { ethers } from "ethers";
import addresses from "./addresses.json";
import abis from "./abis.json";

const DAO_ABI = abis.DaoVoting;
const TOKEN_ABI = abis.VotingToken;
const ADDRESSES = addresses;

export async function getWeb3Provider() {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
}

export async function getSigner() {
  const provider = await getWeb3Provider();
  if (provider) {
    return await provider.getSigner();
  }
  return null;
}

export async function getContract(address, abi, withSigner = false) {
  const provider = await getWeb3Provider();
  if (!provider) return null;

  if (withSigner) {
    const signer = await provider.getSigner();
    return new ethers.Contract(address, abi, signer);
  }
  return new ethers.Contract(address, abi, provider);
}

export { DAO_ABI, TOKEN_ABI, ADDRESSES };
