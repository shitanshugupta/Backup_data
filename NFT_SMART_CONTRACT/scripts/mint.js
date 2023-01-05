const { ethers } = require('hardhat')
require('dotenv').config();
const CONTRACT = require('../environment/deployAddress.json')
const cryptobeetleJson = require('../artifacts/contracts/cryptobeetle.sol/cryptobeetle.json')
async function main() {
    console.log("sdfghjdfghj");
    const abi = cryptobeetleJson.abi
    const provider = new ethers.providers.AlchemyProvider('goerli', process.env.GOERLI_PROJECT_ID)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const signer = wallet.connect(provider)
    const recryptobeetle = new ethers.Contract(CONTRACT.CONTRACT_ADDRESS, abi, signer)
    const ar = ['QmeyYKU9SqafhcwVWZdPjNCQLrda6BHdMMVcasj8ze1GZa', 'QmUm2WdWCc4bXJrQo4BiUHGaxdhkPCawRdxBAbrEGmRFLX']
    const length = ar.length
    let temp = []
    for (let i = 0; i < length; i++) {
        const data = await recryptobeetle.mint(`https://ipfs.io/ipfs/${ar[i]}`)
        temp.push(data.wait())
    }
    Promise.all(temp).then((values) => {
        // console.log(values);
        values.map((value) => {
            console.log(`${CONTRACT.CONTRACT_ADDRESS}/` + value.events[0].args[2].toNumber());
        })
    })

    // const data_wait = await data.wait();
    // const data_wait_args = await data_wait.events[0].args[2].toNumber();
    // console.log(data_wait_args);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


