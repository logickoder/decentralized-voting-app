import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with:', deployer.address);

  const Voting = await ethers.getContractFactory('Voting');
  const auditorAddress = '0xYourAuditorAddressHere'; // Replace with a test wallet address
  const voting = await Voting.deploy(auditorAddress);

  await voting.waitForDeployment();
  console.log('Voting deployed to:', await voting.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});