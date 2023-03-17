require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
//SENSITIVE INFO SECURITY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    mumbai:{
      url: "https://polygon-mumbai.g.alchemy.com/v2/yHQ9Mob9ao0uBh9Ft8mOgRRmMwqlITye",
      accounts: ["49f81f1557bee75f498a31694831d9460a0c289175416bb225d6702ec459781b"]
    }
  },
    etherscan: {
      apiKey: "FAWN197TDBNFBJ4ZTJB2SB6ASBMQY2NMC8", // Your Etherscan API key
    }
}
