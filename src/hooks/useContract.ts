import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { TrueVoteContract } from '../types/contract';

export const useContract = (
  address: string,
  ABI: any,
  signer?: ethers.Signer
): TrueVoteContract | null => {
  const [contract, setContract] = useState<TrueVoteContract | null>(null);

  useEffect(() => {
    if (signer && address && ABI) {
      const contractInstance = new ethers.Contract(
        address,
        ABI,
        signer
      ) as TrueVoteContract;
      setContract(contractInstance);
    }
  }, [address, ABI, signer]);

  return contract;
};
