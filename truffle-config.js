import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    polygon_amoy: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://rpc-amoy.polygon.technology`
      ),
      network_id: 80002,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gasPrice: 20000000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.20",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
