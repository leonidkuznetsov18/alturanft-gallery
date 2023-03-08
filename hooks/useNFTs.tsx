import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import alchemyAPI from '../api';

interface IArgsNFT {
  walletAddress?: string;
  pageKey?: string;
  contractAddress?: string;
  isFetchForContract?: boolean;
}

export const getNftsForOwner = async (data: IArgsNFT) => {
  const { walletAddress, pageKey, contractAddress } = data;
  try {
    return await alchemyAPI.nft.getNftsForOwner(walletAddress, {
      pageKey: pageKey || undefined,
      pageSize: 20,
      contractAddresses: contractAddress ? [contractAddress] : undefined,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getNftsForContract = async (data: IArgsNFT) => {
  const { contractAddress, pageKey } = data;
  try {
    return await alchemyAPI.nft.getNftsForContract(contractAddress, {
      pageKey: pageKey || undefined,
      pageSize: 20,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const useNFTs = () => {
  const [pageKey, setPageKey] = useState(undefined);
  const getData = async (args: IArgsNFT) => {
    const { isFetchForContract, contractAddress } = args;
    let res = null;
    try {
      if (isFetchForContract && contractAddress) {
        res = await getNftsForContract(args);
      } else {
        res = await getNftsForOwner(args);
      }
      if (res.pageKey) {
        setPageKey(res.pageKey);
      } else {
        setPageKey(pageKey);
      }
      return res;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  const { isLoading, isError, error, data, mutate } = useMutation(getData);

  return { isLoading, isError, error, data, getNFTs: mutate, pageKey };
};
