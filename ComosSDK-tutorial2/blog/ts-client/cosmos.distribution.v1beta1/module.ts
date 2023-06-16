// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgFundCommunityPool } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgSetWithdrawAddress } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgWithdrawDelegatorReward } from "./types/cosmos/distribution/v1beta1/tx";
import { MsgWithdrawValidatorCommission } from "./types/cosmos/distribution/v1beta1/tx";

import { Params as typeParams} from "./types"
import { ValidatorHistoricalRewards as typeValidatorHistoricalRewards} from "./types"
import { ValidatorCurrentRewards as typeValidatorCurrentRewards} from "./types"
import { ValidatorAccumulatedCommission as typeValidatorAccumulatedCommission} from "./types"
import { ValidatorOutstandingRewards as typeValidatorOutstandingRewards} from "./types"
import { ValidatorSlashEvent as typeValidatorSlashEvent} from "./types"
import { ValidatorSlashEvents as typeValidatorSlashEvents} from "./types"
import { FeePool as typeFeePool} from "./types"
import { CommunityPoolSpendProposal as typeCommunityPoolSpendProposal} from "./types"
import { DelegatorStartingInfo as typeDelegatorStartingInfo} from "./types"
import { DelegationDelegatorReward as typeDelegationDelegatorReward} from "./types"
import { CommunityPoolSpendProposalWithDeposit as typeCommunityPoolSpendProposalWithDeposit} from "./types"
import { DelegatorWithdrawInfo as typeDelegatorWithdrawInfo} from "./types"
import { ValidatorOutstandingRewardsRecord as typeValidatorOutstandingRewardsRecord} from "./types"
import { ValidatorAccumulatedCommissionRecord as typeValidatorAccumulatedCommissionRecord} from "./types"
import { ValidatorHistoricalRewardsRecord as typeValidatorHistoricalRewardsRecord} from "./types"
import { ValidatorCurrentRewardsRecord as typeValidatorCurrentRewardsRecord} from "./types"
import { DelegatorStartingInfoRecord as typeDelegatorStartingInfoRecord} from "./types"
import { ValidatorSlashEventRecord as typeValidatorSlashEventRecord} from "./types"

export { MsgFundCommunityPool, MsgSetWithdrawAddress, MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission };

type sendMsgFundCommunityPoolParams = {
  value: MsgFundCommunityPool,
  fee?: StdFee,
  memo?: string
};

type sendMsgSetWithdrawAddressParams = {
  value: MsgSetWithdrawAddress,
  fee?: StdFee,
  memo?: string
};

type sendMsgWithdrawDelegatorRewardParams = {
  value: MsgWithdrawDelegatorReward,
  fee?: StdFee,
  memo?: string
};

type sendMsgWithdrawValidatorCommissionParams = {
  value: MsgWithdrawValidatorCommission,
  fee?: StdFee,
  memo?: string
};


type msgFundCommunityPoolParams = {
  value: MsgFundCommunityPool,
};

type msgSetWithdrawAddressParams = {
  value: MsgSetWithdrawAddress,
};

type msgWithdrawDelegatorRewardParams = {
  value: MsgWithdrawDelegatorReward,
};

type msgWithdrawValidatorCommissionParams = {
  value: MsgWithdrawValidatorCommission,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgFundCommunityPool({ value, fee, memo }: sendMsgFundCommunityPoolParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgFundCommunityPool: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgFundCommunityPool({ value: MsgFundCommunityPool.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgFundCommunityPool: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgSetWithdrawAddress({ value, fee, memo }: sendMsgSetWithdrawAddressParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgSetWithdrawAddress: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgSetWithdrawAddress({ value: MsgSetWithdrawAddress.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgSetWithdrawAddress: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgWithdrawDelegatorReward({ value, fee, memo }: sendMsgWithdrawDelegatorRewardParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgWithdrawDelegatorReward: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgWithdrawDelegatorReward({ value: MsgWithdrawDelegatorReward.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgWithdrawDelegatorReward: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgWithdrawValidatorCommission({ value, fee, memo }: sendMsgWithdrawValidatorCommissionParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgWithdrawValidatorCommission: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgWithdrawValidatorCommission({ value: MsgWithdrawValidatorCommission.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgWithdrawValidatorCommission: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgFundCommunityPool({ value }: msgFundCommunityPoolParams): EncodeObject {
			try {
				return { typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPool", value: MsgFundCommunityPool.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgFundCommunityPool: Could not create message: ' + e.message)
			}
		},
		
		msgSetWithdrawAddress({ value }: msgSetWithdrawAddressParams): EncodeObject {
			try {
				return { typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", value: MsgSetWithdrawAddress.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSetWithdrawAddress: Could not create message: ' + e.message)
			}
		},
		
		msgWithdrawDelegatorReward({ value }: msgWithdrawDelegatorRewardParams): EncodeObject {
			try {
				return { typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", value: MsgWithdrawDelegatorReward.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgWithdrawDelegatorReward: Could not create message: ' + e.message)
			}
		},
		
		msgWithdrawValidatorCommission({ value }: msgWithdrawValidatorCommissionParams): EncodeObject {
			try {
				return { typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission", value: MsgWithdrawValidatorCommission.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgWithdrawValidatorCommission: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						Params: getStructure(typeParams.fromPartial({})),
						ValidatorHistoricalRewards: getStructure(typeValidatorHistoricalRewards.fromPartial({})),
						ValidatorCurrentRewards: getStructure(typeValidatorCurrentRewards.fromPartial({})),
						ValidatorAccumulatedCommission: getStructure(typeValidatorAccumulatedCommission.fromPartial({})),
						ValidatorOutstandingRewards: getStructure(typeValidatorOutstandingRewards.fromPartial({})),
						ValidatorSlashEvent: getStructure(typeValidatorSlashEvent.fromPartial({})),
						ValidatorSlashEvents: getStructure(typeValidatorSlashEvents.fromPartial({})),
						FeePool: getStructure(typeFeePool.fromPartial({})),
						CommunityPoolSpendProposal: getStructure(typeCommunityPoolSpendProposal.fromPartial({})),
						DelegatorStartingInfo: getStructure(typeDelegatorStartingInfo.fromPartial({})),
						DelegationDelegatorReward: getStructure(typeDelegationDelegatorReward.fromPartial({})),
						CommunityPoolSpendProposalWithDeposit: getStructure(typeCommunityPoolSpendProposalWithDeposit.fromPartial({})),
						DelegatorWithdrawInfo: getStructure(typeDelegatorWithdrawInfo.fromPartial({})),
						ValidatorOutstandingRewardsRecord: getStructure(typeValidatorOutstandingRewardsRecord.fromPartial({})),
						ValidatorAccumulatedCommissionRecord: getStructure(typeValidatorAccumulatedCommissionRecord.fromPartial({})),
						ValidatorHistoricalRewardsRecord: getStructure(typeValidatorHistoricalRewardsRecord.fromPartial({})),
						ValidatorCurrentRewardsRecord: getStructure(typeValidatorCurrentRewardsRecord.fromPartial({})),
						DelegatorStartingInfoRecord: getStructure(typeDelegatorStartingInfoRecord.fromPartial({})),
						ValidatorSlashEventRecord: getStructure(typeValidatorSlashEventRecord.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			CosmosDistributionV1Beta1: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;