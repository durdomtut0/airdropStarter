const {expect} = require("chai");
const { ethers } = require("hardhat");


describe("token contract", function (){
    it("Total supply equals balance of the owner after deployment", async function(){
        const [owner] = await ethers.getSigners()
        const contract = await ethers.getContractFactory("Token");
        const Token = await contract.deploy();
        const balanceOfOwner = await Token.balanceOf(owner.address);
        expect(await Token.totalSupply()) .to.equal(balanceOfOwner); 
        console.log(await owner.getChainId())
        //expect(await owner.getBalance()).to.moreThan(0)
    })
})
