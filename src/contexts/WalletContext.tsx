import React, { createContext, useContext, useState } from 'react';
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
  setWallet: (wallet: any) => void;
  onboard: any;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState(null);

  return (
    <WalletContext.Provider value={{ wallet, setWallet, onboard }}>
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
