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
let log = `
    
    `;
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

    // Event = Logs in blockchain (res => 1 Event), queryFilter (many Events)
    //let isWinner = await res.events[0].args.isWinner.toString();
    //let diceRolledNumber = await res.events[0].args.diceRolled.toString();
    //let player = await res.events[0].args.player.toString();


    let queryResult =  await contract.queryFilter('GamePlayed', await provider.getBlockNumber() - 4000, await provider.getBlockNumber());
    console.log(queryResult);
    let queryResultRecent = queryResult[queryResult.length-1]

    let isWinner = await queryResultRecent.args.isWinner.toString();
    let diceRolledNumber = await queryResultRecent.args.diceRolled.toString();
    let player = await queryResultRecent.args.player.toString();


    console.log(isWinner);

    let log1 = `
    Player's address: ${player},
    Player rolled: ${diceRolledNumber},
    Result: ${isWinner == true ? "Winner" : "Loser"}
    `;
    //BUG

    let result =  document.getElementById("result");
    result.innerText = log1;
}

async function displayLogs(){
    let queryResult =  await contract.queryFilter('GamePlayed', await provider.getBlockNumber() - 4000, await provider.getBlockNumber());
    console.log(queryResult);
    
    await processAllItems(queryResult);
  
    //queryResults.wait();
    console.log(log)
    let logs =  document.getElementById("logs");
    logs.innerText = log;
    
}


const processItem = element => {
    return new Promise(resolve => {
      // Do some asynchronous operation here
      // ...
  
      // Resolve the Promise once the operation is complete
      let player =  element.args.player.toString();
        
      let isWinner =  element.args.isWinner.toString();
      let diceRolledNumber =  element.args.diceRolled.toString();

      log += `
          Player's address: ${player},
          Player rolled: ${diceRolledNumber},
          Result: ${isWinner == true ? "Winner" : "Loser"}
      `;



      resolve();
    });
  };
  
  // Function to process all items
  const processAllItems = async (items) => {
    for (const item of items) {
      await processItem(item);
    }
  
    // Code to execute after all items have been processed
    console.log('All items processed');
  };
  

