import Onboard, { OnboardAPI } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import { ethers } from 'ethers';
import type { Chain } from '@web3-onboard/common';

const AMOY_RPC_URL = 'https://rpc-amoy.polygon.technology';

const injected = injectedModule();

const amoyChain: Chain = {
  id: '0x13881',
  token: 'MATIC',
  label: 'Polygon Amoy',
  rpcUrl: AMOY_RPC_URL
};

export const onboard: OnboardAPI = Onboard({
  wallets: [injected],
  chains: [amoyChain],
  appMetadata: {
    name: 'TrueVote',
    icon: '<your-logo-url>',
    description: 'TrueVote Blockchain Voting System'
  }
});
