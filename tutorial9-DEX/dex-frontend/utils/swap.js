import { Contract } from "ethers";
import {
  EXCHANGE_CONTRACT_ABI,
  EXCHANGE_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ABI,
  TOKEN_CONTRACT_ADDRESS,
} from "../constants";



export const getAmountOfTokensReceivedFromSwap = async (
  _swapAmountWei,
  provider,
  ethSelected,
  ethBalance,
  resevedToken
) => {
  const exchangeContract = new Contract(
    EXCHANGE_CONTRACT_ADDRESS,
    EXCHANGE_CONTRACT_ABI,
    provider
  );
  let amountOfTokens; //amount of tokens received
  if (ethSelected) {
    amountOfTokens = await exchangeContract.getAmountOfTokens(
      _swapAmountWei,
      ethBalance,
      resevedToken
    );
  } else {
    amountOfTokens = await exchangeContract.getAmountOfTokens(
      _swapAmountWei,
      resevedToken,
      ethBalance
    );
  }
  return amountOfTokens;
};



export const swapTokens = async (
  signer,
  swapAmountWei,
  tokenToBeReceivedAfterSwap,
  ethSelected
) => {
  const exchangeContract = new Contract(
    EXCHANGE_CONTRACT_ADDRESS,
    EXCHANGE_CONTRACT_ABI,
    signer
  );
  const tokenContract = new Contract(
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    signer
  );
  let tx;
  if (ethSelected) {
    tx = await exchangeContract.ethToToken(tokenToBeReceivedAfterSwap, {
      value: swapAmountWei,
    });
  } else {
    tx = await tokenContract.allowance(
      signer.getAddress(),
      EXCHANGE_CONTRACT_ADDRESS
    );
    console.log("allowance: ", utils.formatEther(BigNumber.from(tx)));
    console.log("addTokenAmountWei: ", utils.formatEther(addTokenAmountWei));

    if (addTokenAmountWei > tx) {
      tx = await tokenContract.approve(
        EXCHANGE_CONTRACT_ADDRESS,
        swapAmountWei.toString()
      );
      await tx.wait();
    }

    tx = await exchangeContract.tokenToEth(
      swapAmountWei,
      tokenToBeReceivedAfterSwap
    );
  }
};
