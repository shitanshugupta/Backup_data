
const hre = require("hardhat");

async function main() {
  
  const MatiCoin = await hre.ethers.getContractFactory("MatiCoin");
  const maticoin = await MatiCoin.deploy(10000);
  await maticoin.deployed();
  console.log(
    `deployed to ${maticoin.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
