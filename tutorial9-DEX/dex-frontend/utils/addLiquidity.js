import { BigNumber, Contract, utils } from "ethers";
import {
  EXCHANGE_CONTRACT_ABI,
  EXCHANGE_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ABI,
  TOKEN_CONTRACT_ADDRESS,
} from "@/constants";

export const addLiquidity = async (
  signer,
  addTokenAmountWei,
  addEtherAmountWei
) => {
  try {
    const tokenContract = new Contract(
      TOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ABI,
      signer
    );

    const exchangeContract = new Contract(
      EXCHANGE_CONTRACT_ADDRESS,
      EXCHANGE_CONTRACT_ABI,
      signer
    );
    //TODO if approved procceed to ADD liquidity

    let tx = await tokenContract.allowance(
      signer.getAddress(),
      EXCHANGE_CONTRACT_ADDRESS
    );
    console.log("allowance: ", utils.formatEther(BigNumber.from(tx)));
    console.log("addTokenAmountWei: ", utils.formatEther(addTokenAmountWei));

    if (addTokenAmountWei > tx) {
      tx = await tokenContract.approve(
        EXCHANGE_CONTRACT_ADDRESS,
        addTokenAmountWei.toString()
      );
      await tx.wait();
    }

    tx = await exchangeContract.addLiquidity(addTokenAmountWei, {
      value: addEtherAmountWei,
    });

    await tx.wait();
  } catch (error) {
    console.error(error);
  } finally {
    console.log("We tried to add liquidity");
  }
};

export const calculateToken = async (
  _addEther = "0",
  etherBalanceContract,
  tokenReserve
) => {
  const _addEtherAmountWei = utils.parseEther(_addEther);
  const tokenAmount = _addEtherAmountWei
    .mul(tokenReserve)
    .div(etherBalanceContract);

  return tokenAmount;
};
