const { ethers, run, network } = require("hardhat");

async function main() {
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log(`NFT address ${nft.address}`);
  //console.log(network.config);
  const TOKEN = await ethers.getContractFactory("Token");
  const token = await TOKEN.deploy();
  await token.deployed();
  console.log(`token address ${token.address}`);

  const NFTStaking = await ethers.getContractFactory("NFTStaking");
  const nftStaking = await NFTStaking.deploy(nft.address, token.address);
  await nftStaking.deployed();
  console.log(`nftStaking address ${nftStaking.address}`);

  const mint = await nft.mint();
  mint.wait(3);
  const approve = await nft.setApprovalForAll(nftStaking.address, true);
  approve.wait(3);
  const stake = await nftStaking.stake(0);
  stake.wait(3);
  const withdraw = await nftStaking.withdraw(0);
  withdraw.wait(3);

  if (network.config.chainId === 97) {
    nftStaking.deployTransaction.wait(20);
    verify(nftStaking.address, []);
  }
}

async function verify(contractAddress, arguments) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: arguments,
    });
  } catch (e) {
    if (e.message.includes("already verified")) {
      console.log("The contract already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
