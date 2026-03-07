import fs from 'fs';
import { ethers } from 'ethers';

const output = JSON.parse(fs.readFileSync('./output.json', 'utf8'));

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = await provider.getSigner(0); // Use the first Hardhat account
    
    console.log("Deploying with account:", signer.address);

    // 1. Deploy VotingToken
    const tokenContract = output.contracts['VotingToken.sol']['VotingToken'];
    const TokenFactory = new ethers.ContractFactory(tokenContract.abi, tokenContract.evm.bytecode.object, signer);
    const token = await TokenFactory.deploy(signer.address);
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("VotingToken deployed to:", tokenAddress);

    // 2. Deploy DaoVoting
    const daoContract = output.contracts['DaoVoting.sol']['DaoVoting'];
    const DaoFactory = new ethers.ContractFactory(daoContract.abi, daoContract.evm.bytecode.object, signer);
    const dao = await DaoFactory.deploy(tokenAddress, signer.address);
    await dao.waitForDeployment();
    const daoAddress = await dao.getAddress();
    console.log("DaoVoting deployed to:", daoAddress);

    // 3. Mint some tokens
    const amount = ethers.parseUnits("1000", 18);
    await token.mint(signer.address, amount);
    console.log("Minted 1000 tokens to:", signer.address);

    // Save addresses for frontend
    const addresses = {
        votingToken: tokenAddress,
        daoVoting: daoAddress
    };
    fs.writeFileSync('../src/utils/addresses.json', JSON.stringify(addresses, null, 2));
    console.log("Addresses saved to src/utils/addresses.json");
}

main().catch(console.error);
