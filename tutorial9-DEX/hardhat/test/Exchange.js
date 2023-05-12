const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { BigNumber, providers, utils } = require("ethers");

console.log("Type input: ", BigNumber.from(100n * 10n ** 18n));

describe("Exchange", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    const Exchange = await ethers.getContractFactory("Exchange");
    const exchange = await Exchange.deploy(token.address);

    return { token, exchange, owner, otherAccount };
  }

  describe("Token test", function () {
    describe("Approves", function () {
      it("Should succesfully approve Exhcange contract", async function () {
        const { token, exchange, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await token.approve(
          exchange.address,
          BigNumber.from(100n * 10n ** 18n)
        );

        await expect(BigNumber.from(100n * 10n ** 18n)).to.be.equal(
          BigNumber.from(
            await token.allowance(owner.address, exchange.address)
          ).toString()
        );
      });
    });
  });

  describe("Exchange test", function () {
    describe("Liquidity", function () {
      it("Liquidity should be added", async function () {
        const { token, exchange, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await token.approve(
          exchange.address,
          BigNumber.from(100n * 10n ** 18n)
        );

        const liquidity = await exchange.addLiquidity(
          BigNumber.from(50n * 10n ** 18n),
          {
            value: ethers.utils.parseEther("0.01"),
          }
        );

        console.log(
          "exchange LP token balance ",
          await BigNumber.from(token.balanceOf(exchange.address)).value
        );

        await expect(
          await exchange.addLiquidity(BigNumber.from(50n * 10n ** 18n), {
            value: ethers.utils.parseEther("0.01"),
          })
        ).to.be.equal(await BigNumber.from(token.balanceOf(exchange.address)));
      });
    });
  });
});
