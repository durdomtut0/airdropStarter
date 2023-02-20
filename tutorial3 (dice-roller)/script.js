const  contractAirdropAddress = "0xaFC8DC0f242D06eB71965bD7fED937547796Fc2a"
const contractAirdropABI = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum DiceRoller.Dice",
				"name": "diceRolled",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isWinner",
				"type": "bool"
			}
		],
		"name": "GamePlayed",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "rollDice",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "dice",
		"outputs": [
			{
				"internalType": "enum DiceRoller.Dice",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let signer
let contract

const provider = new ethers.providers.Web3Provider(window.ethereum, 97)//BNBChain testnet chain_id 

provider.send("eth_requestAccounts",[]).then(() => {
        provider.listAccounts().then( (accounts) =>{
            signer = provider.getSigner(accounts[0]);
			console.log(signer)
            
            contract = new ethers.Contract(
                contractAirdropAddress,
                contractAirdropABI,
                signer
            )
        }
        )
    }
)

async function rollDice(){
    let amountInEth = document.getElementById("amountInEth").value;
    let amountInWei = ethers.utils.parseEther(amountInEth.toString())
    //WEI = 10^(-18) in ETH
    let diceRolled = await contract.rollDice({value: amountInWei});
    let res = await diceRolled.wait();

    let isWinner = await res.events[0].args.isWinner.toString();
    console.log(isWinner);

    let log = `Player is ${isWinner == true? "Winner": "Loser"}`;

    let result = document.getElementById("result");
    result.innerText = log;




}

