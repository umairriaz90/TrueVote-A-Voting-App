import { useState } from 'react';
import { onboard } from '../utils/web3Provider';
import { WalletState, TrueVoteContract } from '../types/contract';
import TrueVoteABI from './contracts/TrueVote.json';
import {ethers} from "ethers";
import { Wallet } from "lucide-react";

const CONTRACT_ADDRESS = '0x5B7e9aFd3dDe1D2a4D948Cd46b4E0c98e16900FE';

export function WalletConnect() {
  
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [contract, setContract] = useState<TrueVoteContract | null>(null);



  const connectWallet = async (): Promise<void> => {
    const wallets = await onboard.connectWallet();
    
    if (wallets[0]) {
      const ethersProvider = new ethers.providers.Web3Provider(wallets[0].provider);
      const signer = ethersProvider.getSigner();
      
      const trueVoteContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        TrueVoteABI,
        signer
      ) as TrueVoteContract;

      setWallet(wallets[0]);
      setContract(trueVoteContract);
      contract;
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    if (wallet) {
      await onboard.disconnectWallet({ label: wallet.label });
      setWallet(null);
      setContract(null);
    }
  };

  return (
    <div className="bg-patriot-white p-8 rounded-lg shadow-xl">
      <div className="flex justify-center">
          {!wallet ? (
            <button
              onClick={connectWallet}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-patriot-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-patriot-blue transition-colors duration-200"
            >
              <Wallet className="h-5 w-5 mr-2" />
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={disconnectWallet}
              className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-patriot-blue transition-colors duration-200"
            >
              <Wallet className="h-5 w-5 mr-2" />
              {wallet.accounts[0].address.slice(0, 6)}...{wallet.accounts[0].address.slice(-4)}
            </button>
          )}
        </div>
    </div>
  );
}
