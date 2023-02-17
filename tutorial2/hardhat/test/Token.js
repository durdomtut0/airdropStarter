const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const {expect} = require("chai");
const { ethers } = require("hardhat");


describe("token contract", function (){
    it("Total supply equals balance of the owner after deployment", async function(){
        const [owner] = await ethers.getSigners()
        const contract = await ethers.getContractFactory("Token");
        const Token = await contract.deploy("Token1");
        //Factory design pattern => 
        

        const balanceOfOwner = await Token.balanceOf(owner.address);
        console.log(await Token.name())

        //console.log(await owner.getChainId())
        expect(await Token.totalSupply()) .to.equal(balanceOfOwner); 
        
        //expect(await owner.getBalance()).to.moreThan(0)
    })

    it("Should change token balances after calling transfer function", async function(){
        const [owner, addr1, addr2] = await ethers.getSigners();
        const contract = await ethers.getContractFactory("Token");
        const Token = await contract.deploy("Token2")
        
        expect(await Token.transfer(addr1.address, 1000))   .to.changeTokenBalances(
            Token,
            [owner, addr1],
            [-1000, 1000]
        )
        expect(await Token.balanceOf(addr1.address)).to.equal(1000);

        expect(await Token.connect(addr1).transfer(addr2.address, 500))   .to.changeTokenBalances(
            Token,
            [addr1, addr2],
            [-500, 500]
        )
        expect(await Token.balanceOf(addr2.address)).to.equal(500);

        
    })

})


describe("Token contract with fixture", function(){
    async function testFixtureFunction(){
        [owner, addr1, addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy("Token3");
        await token.deployed()

        return{owner, addr1, addr2, token}
    }

    it("Should assign supply to owner", async function(){
        const {owner, token} = await loadFixture(testFixtureFunction);
        expect(await token.totalSupply()) .to.equal(await token.balanceOf(owner.address))
    })
    it("Tokens are transfered between accounts", async function(){
        const {owner, addr1, addr2, token} = await loadFixture(testFixtureFunction);
        const transfer = await token.transfer(addr1.address, 1000);
        
        expect(transfer) .to.changeTokenBalance(
            token,
            [owner, addr1],
            [-1000, 1000]
        )
        console.log("Transfer from: %s, to: %s, amount: %s",
            owner.address, addr1.address, 1000 )

        await expect(transfer) .to.emit(token, "Transfer")
        .withArgs(owner.address, addr1.address, 1000)

        // expect(await token.connect(addr1).transfer(addr2.address, 1100)) .to.be.revertedWithCustomError(
        //     token,
        //     "Not enough tokens"
        //   );

    })
    it("Event must be emited after transfer", async function(){
        const {owner, addr1, addr2, token} = await loadFixture(testFixtureFunction);
        await expect(token.transfer(addr1.address, 500)) .to.emit(token, "Transfer")
        .withArgs(owner.address, addr1.address, 500)
    })
    it("should not transfer if user does not have tokens", async function(){
        const {owner, addr1, addr2, token} = await loadFixture(testFixtureFunction);

        await expect(token.connect(addr1).transfer(addr2.address, 10)).to.revertedWith("Not enough tokens")
    })

})

