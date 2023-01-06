// solc compiler
solc = require("solc");

// file reader
fs = require("fs");

// Creation of Web3 class
Web3 = require("web3");

// Setting up a HttpProvider
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

// Reading the file
file = fs.readFileSync("initial.sol").toString();

// console.log(file);

// input structure for solidity compiler
var input = {
	language: "Solidity",
	sources: {
		"initial.sol": {
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

ABI = output.contracts["initial.sol"]["initial"].abi;
bytecode = output.contracts["initial.sol"]["initial"].evm.bytecode.object;
// console.log("Bytecode: ", bytecode);
// console.log("ABI: ", ABI);


contract = new web3.eth.Contract(ABI);
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
