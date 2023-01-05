
const hre = require("hardhat");

async function main() {

    const Faucet = await hre.ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy("0xEc1Cc582B4883CAB95895417fD9C85Ee7D4e3a44");
    await faucet.deployed();
    console.log(
        `deployed to ${faucet.address}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
// faucet smart contract address
//0x756B5ecC99A1fcaDad13193816cA7ceFF60f4372