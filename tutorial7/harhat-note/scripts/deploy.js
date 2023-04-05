const { ethers, run, network } = require("hardhat");

async function main() {
  const noteFactory = await ethers.getContractFactory("NoteNFT");
  const contract = await noteFactory.deploy();
  await contract.deployed();

  console.log(`Contract address ${contract.address}`);
  console.log(network.config);

  if (network.config.chainId === 97) {
    contract.deployTransaction.wait(6);
    verify(contract.address, []);
  }

  const txResponse = await contract.setNote("Hello!");
  txResponse.wait(1);
  const myNote = await contract.getNote(0);
  console.log(`${myNote}`);

  contract.deployTransaction.wait(3);

  const txResponse2 = await contract.setNote("This is note 2");
  txResponse2.wait(1);
  const myNote2 = await contract.getNote(1);
  console.log(`${myNote2}`);
}

async function verify(contractAddress, arguments) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: arguments,
    });
  } catch (e) {
    if (e.message.toLowerCase.includes("already verified")) {
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
