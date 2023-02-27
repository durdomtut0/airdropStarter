//import "@nomicfoundation/hardhat-toolbox"
require ("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const ALCHEMY_API_KEY = "yHQ9Mob9ao0uBh9Ft8mOgRRmMwqlITye";// process.env.ALCHEMY_API_KEY;//ALCHEMY_API_KEY "KEY";
const PRIVATE_KEY =  "49f81f1557bee75f498a31694831d9460a0c289175416bb225d6702ec459781b";  //process.env.PRIVATE_KEY; 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      //https://endpoints.omniatech.io/v1/matic/mumbai/public
      //https://polygon-mumbai.g.alchemy.com/v2/yHQ9Mob9ao0uBh9Ft8mOgRRmMwqlITye
      url: `https://endpoints.omniatech.io/v1/matic/mumbai/public`,
      accounts: [PRIVATE_KEY]
    }
  }
};
