import { ethers } from 'ethers';

export interface WalletState {
  label: string;
  accounts: { address: string }[];
  provider: any;
}

export interface TrueVoteContract extends ethers.Contract {
  // Add your contract's function types here
  vote: (candidateId: number) => Promise<ethers.ContractTransaction>;
  // Add other contract functions as needed
}
