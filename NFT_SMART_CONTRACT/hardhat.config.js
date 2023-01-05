require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/XpOKC5w21LZCGiRoPtYX0RC3_Cr0Jjur',
      accounts: ['a42512a8de82afb867ee0d88657ca1e62953747c0d8cc6ca8c3b7c69463d3026']
    }
  }
};
