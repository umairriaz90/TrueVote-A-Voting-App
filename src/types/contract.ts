import { ethers } from 'ethers';

export interface WalletState {
  label: string;
  accounts: { address: string }[];
  provider: any;
}

export interface TrueVoteContract extends ethers.Contract {
    registerVoter: (
      firstName: string,
      lastName: string,
      voterId: string,
      email: string,
      age: number,
      region: string,
      group: string,
      hashedPassword: string
    ) => Promise<ethers.ContractTransaction>;
  }
  
