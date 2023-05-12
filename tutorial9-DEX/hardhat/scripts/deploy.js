const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
//const { CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  const tokenContract = await ethers.getContractFactory("Token");
  const deployedTokenContract = await tokenContract.deploy();
  await deployedTokenContract.deployed();

  const tokenAddress = deployedTokenContract.address;
  console.log("Token Contract Address:", tokenAddress);

  /*
  const exchangeContract = await ethers.getContractFactory("Exchange");
  const deployedExchangeContract = await exchangeContract.deploy(tokenAddress);
  await deployedExchangeContract.deployed();
  console.log("Exchange Contract Address:", deployedExchangeContract.address);
  */

  const factoryContract = await ethers.getContractFactory("Factory");
  const FactoryContract = await factoryContract.deploy();
  await FactoryContract.deployed();
  console.log("Factory Contract Address:", FactoryContract.address);

  const exchangeCreated = await FactoryContract.createExchange(tokenAddress);
  exchangeCreated.wait(5);
  console.log(
    "Exchange Contract Address:",
    await FactoryContract.getExchange(tokenAddress)
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//Contracts:
//Token old: 0x146ABB1CD834e2149d4Aac0c5e25B7Ac1EE81Ef7
//Factory old: 0xb2EBC1a96212Dfb81e6AC45dAD26D5A59aF4E7fe

//Token new: 0x6391B263E958cd78952DDc21089cC36Fa3072820
//Factory: 0x35DBD33E6A7C7D562C0da2fb63caf34c0f2D4317
//Exchange: 0xADc18Aa14e0d85B3E04dAAD84c21dc12835EcfcE
