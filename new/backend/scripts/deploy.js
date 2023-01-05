const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
 

  const balance = await deployer.getBalance();

  const Marketplace = await hre.ethers.getContractFactory("MarketPlace");
  const marketplace = await Marketplace.deploy();
  console.log(marketplace.address);
  console.log(marketplace.interface);
  // await marketplace.deployed();
  

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }
  console.log("line 23");
  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('src/Marketplace.json', JSON.stringify(data))
  console.log("line 26");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });