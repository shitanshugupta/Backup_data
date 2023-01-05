/** @type import('hardhat/config').HardhatUserConfig */
const secret = require("./environment/secrets.json")

require("@nomiclabs/hardhat-waffle")
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  paths:{
    sources: "./blockchain/contract",
    tests: "./blockchain/test",
    cache:"./blockchain/cache",
    artifacts: "./blockchain/artifacts"
  },
  networks:{
    goerli:{
      url: secret.goerlinode,
      accounts: [secret.privateKey]
    }
  }
};