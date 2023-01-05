require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/YcNlPpj5ty9KvvZAisSZWR3DDMIBQJYD",
      accounts:["c5b211c7f6774b2474b05ff19387ef2ddd05b501ea4a4f8642e26832f17883b3"]
    }
  }
};
