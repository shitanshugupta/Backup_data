const {hre, ethers} = require("hardhat")
const fs = require("fs")
async function main() {
  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
  const nftMarketplace = await NFTMarketplace.deploy();
  await nftMarketplace.deployed();
const address = {"nftMarketplace": nftMarketplace.address}
const addressJson = JSON.stringify(address)
  console.log('Market deployed to:', nftMarketplace.address);
  fs.writeFileSync("environment/contract-address.json", addressJson)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  ethers