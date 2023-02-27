require("@nomicfoundation/hardhat-toolbox");

//SENSITIVE INFO SECURITY


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    mumbai:{
      url: "https://polygon-mumbai.g.alchemy.com/v2/yHQ9Mob9ao0uBh9Ft8mOgRRmMwqlITye",
      accounts: ["49f81f1557bee75f498a31694831d9460a0c289175416bb225d6702ec459781b"]
    }
    //SMART-CONTRACT VERIFICATION
    //GAS REPORT
  }

};
