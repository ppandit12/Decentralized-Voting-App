const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy VotingToken
  const VotingToken = await hre.ethers.getContractFactory("VotingToken");
  const votingToken = await VotingToken.deploy(deployer.address);
  await votingToken.waitForDeployment();
  
  const votingTokenAddress = await votingToken.getAddress();
  console.log("VotingToken deployed to:", votingTokenAddress);

  // Deploy DaoVoting
  const DaoVoting = await hre.ethers.getContractFactory("DaoVoting");
  const daoVoting = await DaoVoting.deploy(votingTokenAddress, deployer.address);
  await daoVoting.waitForDeployment();

  console.log("DaoVoting deployed to:", await daoVoting.getAddress());

  // Mint some tokens to the deployer for testing
  const amount = hre.ethers.parseUnits("1000", 18);
  await votingToken.mint(deployer.address, amount);
  console.log("Minted 1000 tokens to deployer");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
