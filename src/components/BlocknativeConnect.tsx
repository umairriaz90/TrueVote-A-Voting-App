import { useState } from 'react';
import { ethers } from 'ethers';
import { onboard } from '../utils/web3Provider';
import TrueVoteABI from './contracts/TrueVote.json';
import { WalletState, TrueVoteContract } from '../types/contract';

const CONTRACT_ADDRESS = '0xa7A38ceEd4a71B6d7c26b3764c44145aa4808009';

const BlocknativeConnect: React.FC = () => {
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
    <div>
      {!wallet ? (
        <button onClick={connectWallet} className="connect-btn">
          Connect Wallet
        </button>
      ) : (
        <button onClick={disconnectWallet} className="disconnect-btn">
          Disconnect {wallet.accounts[0].address.slice(0, 6)}...{wallet.accounts[0].address.slice(-4)}
        </button>
      )}
    </div>
  );
};

export default BlocknativeConnect;
