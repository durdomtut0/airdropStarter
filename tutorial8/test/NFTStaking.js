const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("NFTStaking", function () {
  async function deployContractsFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await eth; //ers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();

    const NFTStaking = await ethers.getContractFactory("NFTStaking");
    const nftStaking = await NFTStaking.deploy(nft.address, token.address);

    await nft.mint(); //owner got 1 NFT
    await nft.connect(otherAccount).mint(); // otherAccount got 1 NFT
    await token.transfer(otherAccount.address, BigInt(10 * 10 ** 18));

    await nft.setApprovalForAll(nftStaking.address, true);
    await nft.connect(otherAccount).setApprovalForAll(nftStaking.address, true);

    return { owner, token, nft, nftStaking, otherAccount };
  }

  async function deployContractsFixtureStaked() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();

    const NFTStaking = await ethers.getContractFactory("NFTStaking");
    const nftStaking = await NFTStaking.deploy(nft.address, token.address);

    await nft.mint(); //owner got 1 NFT
    await nft.connect(otherAccount).mint(); // otherAccount got 1 NFT
    await token.transfer(otherAccount.address, BigInt(10 * 10 ** 18));

    await nft.setApprovalForAll(nftStaking.address, true);
    await nft.connect(otherAccount).setApprovalForAll(nftStaking.address, true);
    await nftStaking.stake(0);

    return { owner, token, nft, nftStaking, otherAccount };
  }

  describe("Deployment", function () {
    it("All contracts deployed successfully", async function () {
      const { token, nft, nftStaking } = await loadFixture(
        deployContractsFixture
      );
      //await console.log("Hi ", await nftStaking.nftAddress());
      await expect(await nftStaking.nftAddress()).to.equal(nft.address);
      await expect(await nftStaking.tokenAddress()).to.equal(token.address);
    });
  });
  describe("Stake", function () {
    describe("Validations", function () {
      it("Should revert with error You are not owner of the token", async function () {
        const { nftStaking } = await loadFixture(deployContractsFixture);
        await console.log(nftStaking.address);

        await expect(nftStaking.stake(1)).to.be.revertedWith(
          "You are not owner of the token"
        );
      });
      it("Should be reverted if token was not approved", async function () {
        const { nftStaking } = await loadFixture(deployContractsFixture);
        await expect(nftStaking.stake(100)).to.be.revertedWith(
          "ERC721: invalid token ID"
        );
      });
    });
    describe("Transfers", function () {
      it("transfer succesfully if token is owned by user", async function () {
        const { nft, nftStaking } = await loadFixture(deployContractsFixture);
        await nftStaking.stake(0);
        await expect(await nft.balanceOf(nftStaking.address)).to.be.equal(1);
      });
      it("stakerAddress added", async function () {
        const { owner, nftStaking } = await loadFixture(deployContractsFixture);
        await nftStaking.stake(0);

        await expect(await nftStaking.stakerAddress(0)).to.be.equal(
          owner.address
        );
      });
    });
  });

  describe("Withdrawal", function () {
    describe("User got nft after withraw", function () {
      it("NFT transfered", async function () {
        const { owner, nft, nftStaking } = await loadFixture(
          deployContractsFixtureStaked
        );

        await nftStaking.withdraw(0);

        await expect(await nft.balanceOf(owner.address)).to.be.equal(1);
      });
    });
  });

  /*

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });
  */
});
