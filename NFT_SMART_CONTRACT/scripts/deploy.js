const { ethers } = require('hardhat')
const fs = require('fs')
async function main() {
  const cryptobeetle = await ethers.getContractFactory('cryptobeetle');// contract instance 
  const CryptoBeetles = await cryptobeetle.deploy('crypto', "CBTS")// contract deployed instance 
  try {
    await CryptoBeetles.deployed()
    console.log(`Address:${CryptoBeetles.address}`);
    const add = {
      CONTRACT_ADDRESS: CryptoBeetles.address
    }
    fs.writeFileSync('environment/deployAddress.json', JSON.stringify(add))

  } catch (error) {
    console.log(`error,${error.message}`);
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


