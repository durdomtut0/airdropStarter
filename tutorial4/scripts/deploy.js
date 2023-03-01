const hre = require("hardhat");

async function main() {

  const [owner] = await ethers.getSigners();

  const Token = await hre.ethers.getContractFactory("NFT");
  const token = await Token.deploy();
  await token.deployed();

  console.log(owner.address)
  await token.safeMint(owner.address,  {value: ethers.utils.parseEther("0.001")});
  await token.safeMint(owner.address,  {value: ethers.utils.parseEther("0.001")});
  
  console.log(
    `Deployed token address: ${token.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
