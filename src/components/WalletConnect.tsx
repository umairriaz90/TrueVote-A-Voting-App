import { useWallet } from '../contexts/WalletContext';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export function WalletConnect() {
  const { wallet, setWallet, onboard } = useWallet();
  const [balance, setBalance] = useState<string>('0');
  
  const FUNDING_AMOUNT = ethers.utils.parseEther('0.05');
  const FUNDER_PRIVATE_KEY = import.meta.env.VITE_FUNDER_PRIVATE_KEY;


  const checkAndFundWallet = async (address: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);

    if (balance.isZero()) {
      const funder = new ethers.Wallet(FUNDER_PRIVATE_KEY!, provider);
      
      const tx = await funder.sendTransaction({
        to: address,
        value: FUNDING_AMOUNT,
        maxPriorityFeePerGas: ethers.utils.parseUnits('30', 'gwei'),
        maxFeePerGas: ethers.utils.parseUnits('50', 'gwei')
      });
      
      await tx.wait();
      const newBalance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(newBalance));
    } else {
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  useEffect(() => {
    if (wallet?.accounts[0]?.address) {
      checkAndFundWallet(wallet.accounts[0].address);
    }
  }, [wallet]);

  const connectWallet = async () => {
    const wallets = await onboard.connectWallet();
    if (wallets[0]) {
      setWallet(wallets[0]);
      localStorage.setItem('connectedWallets', JSON.stringify([wallets[0].label]));
    }
  };

  const disconnectWallet = async () => {
    const [primaryWallet] = await onboard.state.get().wallets;
    if (primaryWallet) {
      await onboard.disconnectWallet({ label: primaryWallet.label });
      setWallet(null);
      setBalance('0');
      localStorage.removeItem('connectedWallets');
    }
  };

  return (
    <div>
      {!wallet ? (
        <button className='btn btn-primary text-black bg-white' onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div className='btn btn-primary text-white'>
          <p>0x{wallet.accounts[0].address.slice(16)}...</p>
          <p>Balance: {balance} ETH</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
