//const contractTokenAddress = '0x7649D1aD599b2cd4DfE7B707C65c2665d2A82796';
const contractTokenABI = [
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractAirdropAddress = "0x85C06F97B11f75623634bab1FEC6ef5bd6847D03";
const contractAirdropABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_airdropReceivers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amount",
        type: "uint256[]",
      },
    ],
    name: "drop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

let signer;
let contractToken;
let contractAirdrop;

const provider = new ethers.providers.Web3Provider(window.ethereum, 80001); //Matic mumbai chain_id

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    console.log(signer);

    contractAirdrop = new ethers.Contract(
      contractAirdropAddress,
      contractAirdropABI,
      signer
    );
  });
});

async function getBalance() {
  let ERC20Balance = document.getElementById("ERC20Balance");
  ERC20Balance.innerText = await contractToken.balanceOf(signer.getAddress());
  console.log(ERC20Balance.innerHTML);
}

async function airdropTokensWithTransfer() {
  let tokenAddress = document.getElementById("tokenAddress").value;
  console.log(tokenAddress);
  let _arrayOfAddress = document.getElementById("arrayOfReceivers").value;
  let arrayOfAddress = _arrayOfAddress.split(",");

  let _arrayOfAmounts = document.getElementById("arrayOfAmounts").value;
  let arrayOfAmounts = _arrayOfAmounts.split(",");
  console.log(arrayOfAmounts);
  //TODO check for allowance
  console.log(await signer.getAddress());

  await loadTokenContract(tokenAddress);

  let allowance = await contractToken.allowance(
    signer.getAddress(),
    contractAirdropAddress
  );

  console.log(Number(allowance));
  if (Number(allowance) == 0) {
    contractToken.approve(contractAirdropAddress, 100000000000000);
  } else if (Number(allowance) > 0) {
    await contractAirdrop.drop(tokenAddress, arrayOfAddress, arrayOfAmounts);
  }
}

async function loadTokenContract(_tokenAddress) {
  console.log(signer);
  contractToken = new ethers.Contract(_tokenAddress, contractTokenABI, signer);
}
