import React, { createContext, useContext, useState, useEffect } from 'react';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'POL',
      label: 'Polygon amoy testnet',
      rpcUrl: 'https://rpc-amoy.polygon.com'
    }
  ],
  appMetadata: {
    name: 'TrueVote',
    icon: '<svg>...</svg>',
    description: 'TrueVote Web3 Voting Platform'
  }
});

interface WalletContextType {
  wallet: any;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const wallets = await onboard.connectWallet();
      if (wallets[0]) {
        setWallet(wallets[0]);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    const [primaryWallet] = onboard.state.get().wallets;
    if (primaryWallet) {
      await onboard.disconnectWallet({ label: primaryWallet.label });
      setWallet(null);
    }
  };

  // Check for existing wallet connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const previouslyConnectedWallets = await onboard.connectWallet();
      if (previouslyConnectedWallets[0]) {
        setWallet(previouslyConnectedWallets[0]);
      }
    };
    checkConnection();
  }, []);

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      connectWallet, 
      disconnectWallet,
      isConnecting 
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
