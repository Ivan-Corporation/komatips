
const hre = require("hardhat");

async function main() {
  const KomaTips = await hre.ethers.getContractFactory("komatips"); //fetching bytecode and ABI
  const komatips_deploy = await KomaTips.deploy(); //creating an instance of our smart contract

  await komatips_deploy.deployed();//deploying your smart contract

  console.log("Deployed contract address:",`${komatips_deploy.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});