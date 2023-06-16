import { Client } from "../../ts-client";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";


const mnemonic =
  "click spirit stem seed summer foster raw glow ocean age purse romance";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);


const client = new Client(
  {
    apiURL: "http://localhost:1317",
    rpcURL: "http://localhost:26657",
    prefix: "cosmos",
  },
  wallet
);
await client.useKeplr();


const msg1 = await client.CosmosBankV1Beta1.tx.msgSend({
  value: {
    amount: [
      {
        amount: '1',
        denom: 'token',
      },
    ],
    fromAddress: 'cosmos1v0cfeqtrdlx4mdr6tvq77fh7949sh4lmdqzr8e',
    toAddress: 'cosmos15uw6qpxqs6zqh0zp3ty2ac29cvnnzd3qwjntnc',
  },
})

const msg2 = await client.CosmosBankV1Beta1.tx.msgSend({
  value: {
    amount: [
      {
        amount: '1',
        denom: 'token',
      },
    ],
    fromAddress: 'cosmos1v0cfeqtrdlx4mdr6tvq77fh7949sh4lmdqzr8e',
    toAddress: 'cosmos15uw6qpxqs6zqh0zp3ty2ac29cvnnzd3qwjntnc',
  },
})

const tx_result = await client.signAndBroadcast(
  [msg1, msg2],
  {
    amount: [{ amount: '0', denom: 'stake' }],
    gas: '200000',
  },
  '',
)
console.log(tx_result)

const balances = await client.CosmosBankV1Beta1.query.queryAllBalances(
  'cosmos13xkhcx2dquhqdml0k37sr7yndquwteuvt2cml7'
);

console.log(balances)