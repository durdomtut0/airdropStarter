import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import Web3Modal from "web3modal";
import { BigNumber, providers, utils } from "ethers";
import { addLiquidity, calculateToken } from "@/utils/addLiquidity";
import { removeLiquidity, getTokensAfterRemove } from "@/utils/removeLiquidity";
import { swapTokens, getAmountOfTokensReceivedFromSwap } from "@/utils/swap";

import {
  getTokensBalance,
  getEtherBalance,
  getLPTokensBalance,
  getReserveOfTokens,
} from "../utils/getAmounts";

import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [liquidityTab, setLiquidityTab] = useState(true);
  const zero = BigNumber.from(0);
  const [ethBalance, setEtherBalance] = useState(zero);
  const [reservedToken, setReservedToken] = useState(zero);
  const [etherBalanceContract, setEtherBalanceContract] = useState(zero);
  const [tokenBalance, setTokenBalance] = useState(zero);
  const [lpBalance, setLPBalance] = useState(zero);
  const [addEther, setAddEther] = useState(zero);
  const [addTokens, setAddTokens] = useState(zero);
  const [removeEther, setRemoveEther] = useState(zero);
  const [removeToken, setRemoveToken] = useState(zero);
  const [removeLPTokens, setRemoveLPTokens] = useState("0");
  const [swapAmount, setSwapAmount] = useState("");
  const [tokenToBeReceivedAfterSwap, settokenToBeReceivedAfterSwap] =
    useState(zero);
  const [ethSelected, setEthSelected] = useState(true);

  const web3ModalRef = useRef();
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);

  const getAmounts = async () => {
    try {
      //to improve speed use indexing (the graph)
      const provider = await getProviderOrSigner(false);
      const signer = await getProviderOrSigner(true);

      const address = await signer.getAddress();
      // get the amount of eth in the user's account
      const _ethBalance = await getEtherBalance(provider, address);
      // get the amount of `Crypto Dev` tokens held by the user
      const _tokenBalance = await getTokensBalance(provider, address);
      // get the amount of `Crypto Dev` LP tokens held by the user
      const _lpBalance = await getLPTokensBalance(provider, address);
      // gets the amount of `CD` tokens that are present in the reserve of the `Exchange contract`
      const _reservedToken = await getReserveOfTokens(provider);
      // Get the ether reserves in the contract
      const _ethBalanceContract = await getEtherBalance(provider, null, true);
      //Price display: _reservedCD/_ethBalanceContract/
      //Min received:

      setEtherBalance(_ethBalance);
      setTokenBalance(_tokenBalance);
      setLPBalance(_lpBalance);
      setReservedToken(_reservedToken);
      setEtherBalanceContract(_ethBalanceContract);

      console.log("_ethBalance ", _ethBalance);
      console.log("_cdBalance ", _tokenBalance);
      console.log("_lpBalance ", _lpBalance);
      console.log("_reservedCD ", _reservedToken);
      console.log("_ethBalanceContract", _ethBalanceContract);
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 97) {
      window.alert("Change the network to bnbt");
      throw new Error("Change network to bnbt");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const _addLiquidity = async () => {
    try {
      // Convert the ether amount entered by the user to Bignumber
      const addEtherWei = utils.parseEther(addEther.toString());

      // Check if the values are zero
      if (!addTokens.eq(zero) && !addEtherWei.eq(zero)) {
        const signer = await getProviderOrSigner(true);
        setLoading(true);
        // call the addLiquidity function from the utils folder
        await addLiquidity(signer, addTokens, addEtherWei);
        setLoading(false);
        // Reinitialize the CD tokens
        setAddTokens(zero);
        // Get amounts for all values after the liquidity has been added
        await getAmounts();
      } else {
        setAddTokens(zero);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setAddTokens(zero);
    }
  };

  const _removeLiquidity = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const removeLPTokensWei = utils.parseEther(removeLPTokens);
      setLoading(true);
      await removeLiquidity(signer, removeLPTokensWei);
      setLoading(false);
      await getAmounts();
      setRemoveToken(zero);
      setRemoveEther(zero);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setRemoveToken(zero);
      setRemoveEther(zero);
    }
  };

  const _getTokensAfterRemove = async (_removeLPTokens) => {
    try {
      const provider = await getProviderOrSigner();
      const removeLPTokensWei = utils.parseEther(_removeLPTokens);
      const _ethBalance = await getEtherBalance(provider, null, true);
      const tokenReserve = await getReserveOfTokens(provider);
      const { _removeEther, _removeToken } = await getTokensAfterRemove(
        provider,
        removeLPTokensWei,
        _ethBalance,
        tokenReserve
      );
      setRemoveToken(_removeEther);
      setRemoveEther(_removeToken);
    } catch (error) {
      console.error(error);
    }
  };

  const _swapTokens = async () => {
    try {
      const swapTokensWei = utils.parseEther(swapAmount);
      if (!swapTokensWei.eq(zero)) {
        const signer = await getProviderOrSigner(true);
        setLoading(true);
        await swapTokens(
          signer,
          swapTokensWei,
          tokenToBeReceivedAfterSwap,
          ethSelected
        );
        setLoading(false);
        await getAmounts();
        setSwapAmount("");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSwapAmount("");
    }
  };

  const _getAmountOfTokensReceivedFromSwap = async (_swapAmount) => {
    try {
      const swapAmountWei = utils.parseEther(_swapAmount.toString());
      if(!swapAmountWei.eq(zero)) {      
        const provider = await getProviderOrSigner();
        const _ethBalance = await getEtherBalance(provider, null, true);
        
        const amountOfTokens = await getAmountOfTokensReceivedFromSwap(
          swapAmountWei,
          provider,
          ethSelected,
          _ethBalance,
          reservedToken
        );
        settokenToBeReceivedAfterSwap(amountOfTokens);
      }
      else {
        settokenToBeReceivedAfterSwap(zero);
      }
    
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting its `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "bnbtestnet",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      getAmounts();
    }
  }, [walletConnected]);

  const renderButton = () => {
    // If wallet is not connected, return a button which allows them to connect their wllet
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
    if (loading) {
      return <button className={styles.button}>Loading...</button>;
    }
    if (liquidityTab) {
      return (
        <div>
          <div className={styles.description}>
            You have:
            <br />
            {utils.formatEther(tokenBalance)} Token
            <br />
            {utils.formatEther(ethBalance)} Ether
            <br />
            {utils.formatEther(lpBalance)} LP Token
          </div>
          <div>
            {utils.parseEther(reservedToken.toString()).eq(zero) ? (
              <div>
                <input
                  type="number"
                  placeholder="Amount of BNB"
                  onChange={(e) => setAddEther(e.target.value || "0")}
                  className={styles.input}
                />
                <input
                  type="number"
                  placeholder="Amount of Tokens"
                  onChange={(e) =>
                    setAddTokens(
                      BigNumber.from(utils.parseEther(e.target.value)) || "0"
                    )
                  }
                  className={styles.input}
                />
                <button className={styles.button1} onClick={_addLiquidity}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  placeholder="Amount of BNB"
                  onChange={async (e) => {
                    setAddEther(e.target.value || "0");
                    const _addTokens = await calculateToken(
                      e.target.value || "0",
                      etherBalanceContract,
                      reservedToken
                    );
                    setAddTokens(_addTokens);
                  }}
                  className={styles.input}
                />
                <div className={styles.inputDiv}>
                  {/* Convert the BigNumber to string using the formatEther function from ethers.js */}
                  {`You will need ${utils.formatEther(addTokens)} Token Tokens`}
                </div>
                <button className={styles.button1} onClick={_addLiquidity}>
                  Add
                </button>
              </div>
            )}
          </div>
          {/*Remove Liquidity */}
          <div>
            <input
              type="number"
              placeholder="amount of LP tokens"
              onChange={async (e) => {
                setRemoveLPTokens(e.target.value, "0");
                await _getTokensAfterRemove(e.target.value || "0");
              }}
              className={styles.input}
            />
            <div className={styles.inputDiv}>
              {`You will get ${utils.formatEther(removeToken)} Tokens
             and ${utils.formatEther(removeEther)} BNB`}
              <button className={styles.button1} onClick={_removeLiquidity}>
                Remove LP
              </button>
            </div>
          </div>
        </div>
      );
    }
    else{
      return(<div>
        <input
          type="number"
          placeholder="amount of Tokens"
          onChange={async (e) => {
            setSwapAmount(e.target.value || "0");
            await _getAmountOfTokensReceivedFromSwap(e.target.value || "0");
          }}
          className={styles.input}
          value={swapAmount}
        />
        <select
          className={styles.select}
          name="dropdown"
          id="dropdown"
          onChange={async (e) => {
            //setEthSelected(!ethSelected);//setEthSelected();
            setEthSelected(e.target.value === "BNB" ? true : false);
            await _getAmountOfTokensReceivedFromSwap(0);
            setSwapAmount("");//TODO: add logic reverse swaps
          }}
        >
          <option value="BNB">BNB</option>
          <option value="Token">Token</option>
        </select>
        <br />
        <div className={styles.inputDiv}>
          {
            ethSelected 
            ? `You will get ${utils.formatEther(tokenToBeReceivedAfterSwap)} Tokens` 
            : `You will get ${utils.formatEther(tokenToBeReceivedAfterSwap)} BNB`
          }
        </div>
        <button className={styles.button1} onClick={_swapTokens}>
          swap
        </button>

      </div>)
    }


  };

  return (
    <div>
      <Head>
        <title>Crypto Devs</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Uniswap V1</h1>
          <div className={styles.description}></div>
          {renderButton()}
          <button
            className={styles.button}
            onClick={() => {
              setLiquidityTab(true);
            }}
          >
            Liquidity
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setLiquidityTab(false);
            }}
          >
            swap
          </button>
        </div>
      </div>
    </div>
  );
}
