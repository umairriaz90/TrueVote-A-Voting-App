import { useWallet } from '../contexts/WalletContext';
import { useEffect } from 'react';

export function WalletConnect() {
  const { wallet, setWallet, onboard } = useWallet();

  useEffect(() => {
    // Check for previously connected wallet
    const previouslyConnectedWallets = JSON.parse(localStorage.getItem('connectedWallets') || '[]');
    if (previouslyConnectedWallets.length > 0) {
      onboard.connectWallet({
        autoSelect: { label: previouslyConnectedWallets[0], disableModals: true }
      });
    }
  }, [onboard]);

  const connectWallet = async () => {
    const wallets = await onboard.connectWallet();
    if (wallets[0]) {
      setWallet(wallets[0]);
      // Save connected wallet to localStorage
      localStorage.setItem('connectedWallets', JSON.stringify([wallets[0].label]));
    }
  };

  const disconnectWallet = async () => {
    const [primaryWallet] = await onboard.state.get().wallets;
    if (primaryWallet) {
      await onboard.disconnectWallet({ label: primaryWallet.label });
      setWallet(null);
      localStorage.removeItem('connectedWallets');
    }
  };

  return (
    <div>
      {!wallet ? (
        <button className='btn btn-primary text-black bg-white' onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div className='btn btn-primary text-white'>
          <p>Connected: {wallet.accounts[0].address}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
