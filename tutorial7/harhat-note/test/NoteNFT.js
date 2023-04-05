const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("NoteNFT", function () {
  let noteFactory, contract;

  beforeEach(async function () {
    noteFactory = await ethers.getContractFactory("NoteNFT");
    contract = await noteFactory.deploy();
  });

  it("Should revert with message ERC721: invalid token ID", async function () {
    //const expectedNote = "User note: Hello!, token id:0";
    //const myNote = await contract.getNote(0);
    //assert.equal(expectedNote, myNote);
    await expect(contract.getNote(0)).to.be.revertedWith(
      "ERC721: invalid token ID"
    );
  });

  it("Should update note", async function () {
    const myNote = "Hello!";
    await contract.setNote(myNote);
    const currentNote = await contract.getNote(0);
    expect(`User note: ${myNote}, token id:0`).to.be.equal(currentNote);
  });

  it("Should revert if Max notes reached", async function () {
    for (let index = 0; index < 10; index++) {
      //if want to test for 1000 iterations you should wait for block finish
      contract.setNote("...");
    }
    await expect(contract.setNote("...")).to.be.revertedWith(
      "Max notes reached"
    );
  });

  it("Should emit event for setnote function", async function () {
    await expect(contract.setNote("Hi")).to.emit(contract, "NoteNFTCreated");
  });
});
