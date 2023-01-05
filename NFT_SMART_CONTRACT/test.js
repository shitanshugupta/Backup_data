// solc compiler
solc = require("solc");

// file reader
fs = require("fs");

// Creation of Web3 class
// Web3 = require("web3");
const { ethers } = require('hardhat')
require('dotenv').config();

// Setting up a HttpProvider
// web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const provider = new ethers.providers.AlchemyProvider('goerli', process.env.GOERLI_PROJECT_ID)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const signer = wallet.connect(provider)
// Reading the file
file = fs.readFileSync("cryptobeetle.sol").toString();

// console.log(file);

// input structure for solidity compiler
var input = {
    language: "Solidity",
    sources: {
        "cryptobeetle.sol": {
            content: file,
        },
    },

    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log("Result : ", output);

ABI = output.contracts["cryptobeetle.sol"]["initial"].abi;
bytecode = output.contracts["cryptobeetle.sol"]["initial"].evm.bytecode.object;
// console.log("Bytecode: ", bytecode);
// console.log("ABI: ", ABI);


contract = new ethers.Contract(ABI);
web3.eth.getAccounts().then((accounts) => {
    // Display all Ganache Accounts
    console.log("Accounts:", accounts);

    mainAccount = accounts[0];

    // address that will deploy smart contract
    console.log("Default Account:", mainAccount);
    contract
        .deploy({ data: bytecode })
        .send({ from: mainAccount, gas: 470000 })
        .on("receipt", (receipt) => {

            // Contract Address will be returned here
            console.log("Contract Address:", receipt.contractAddress);
        })
        .then((initialContract) => {
            initialContract.methods.message().call((err, data) => {
                console.log("Initial Data:", data);
            });
        });
});
