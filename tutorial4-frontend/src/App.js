import "./App.css";
import Web3Modal from "web3modal";
import { ethers, providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { NFT_CONTRACT_ADDRESS, abi } from "./constants";
import NFTs from "./NFTs";
import NFTList from "./NFTList";

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [nfts, setNfts] = useState(null);

  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change network");
      //TODO metmask переключился на 80001
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();

      return signer;
    }
    return web3Provider;
  };

  const safeMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      console.log(signer);
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);

      //console.log(nftContract);
      const tx = await nftContract.safeMint(signer.getAddress(), {
        value: ethers.utils.parseEther("0.001"),
      });
      console.log(tx);
    } catch (error) {
      console.error(error);
    }
  };

  const getNFTs = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const address = await signer.getAddress();
      //const tx = await nftContract.balanceOf(address);
      let tempNftArray = [];

      for (let index = 0; index < 100000; index++) {
        try {
          const tokenURI = await nftContract.tokenURI(index);
          if (tokenURI) {
            tempNftArray.push(tokenURI);
          }
        } catch (error) {
          break;
        }
      }
      console.log(tempNftArray);
      const tx = await nftContract.tokenURI(0);

      let txProcced;

      //ipfs://QmYpyqM7q7fw2vAy87e4Gyag1QnbX9AmQmcmwsmq9Wu2Ji/0.json
      //https://gateway.pinata.cloud/ipfs/QmYpyqM7q7fw2vAy87e4Gyag1QnbX9AmQmcmwsmq9Wu2Ji/0.json
      if (tx.includes("ipfs")) {
        txProcced = "https://gateway.pinata.cloud/ipfs/".concat(tx.slice(7));
      }

      const response = await fetch(txProcced);
      const json = await response.json();

      if (json.image.includes("ipfs")) {
        json.image = "https://gateway.pinata.cloud/ipfs/".concat(
          json.image.slice(7)
        );
      }

      console.log(JSON.stringify(json));

      setNfts(json);

      console.log(nfts);

      console.log(tx);
    } catch (error) {
      console.error(error);
    }
  };

  const displayNFTs = () => {
    if (nfts) {
      return (
        <>
          {<img src={nfts.image} width={200} />}
          <br />
          <span>Name: {nfts.name}, </span>
          <br />
          <span>Description: {nfts.description}</span>
          <br />
        </>
      );
    } else {
      return (
        <div>
          <div></div>
          {getNFTs}
          <button onClick={getNFTs}>get NFTs</button>
        </div>
      );
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const renderButton = () => {
    if (walletConnected) {
      return (
        <div>
          <div>You can mint NFT:</div>
          <button className="button" onClick={safeMint}>
            mint
          </button>
        </div>
      );
    } else {
      return (
        <button onClick={connectWallet} className="button">
          Connect Wallet
        </button>
      );
    }
  };

  useEffect(() => {}, [nfts]);

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "matic",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <>
      <h>NFT dapp</h>
      <br />
      {renderButton()}

      <p>All NFTs:</p>
      {displayNFTs()}
    </>
  );
}
