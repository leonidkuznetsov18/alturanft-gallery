import {useMutation} from "@tanstack/react-query";
import alchemyAPI from "../api"
import {useState} from "react";

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
            contractAddresses: contractAddress ? [contractAddress] : undefined
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getNftsForContract = async (data: IArgsNFT) => {
    const { contractAddress, pageKey } = data;
    try {
        return await alchemyAPI.nft.getNftsForContract(contractAddress, {
            pageKey: pageKey || undefined,
            pageSize: 20
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}


export const useNFTs = () => {

    const [nfts, setNfts] = useState([]);
    const [pageKey, setPageKey] = useState(undefined);
    const getData = async (args: IArgsNFT) => {
        const { isFetchForContract, contractAddress } = args;
        let res = null;
        console.log('args', args);
        try {
            if (isFetchForContract && contractAddress) {
                res = await getNftsForContract(args);
            } else {
                res = await getNftsForOwner(args);
            }
            // debugger;
            console.log('res', res);
            console.log('pageKey', res?.pageKey);
            setNfts((prevState) => [...prevState, ...(res.nfts || res.ownedNfts)?.filter(i => i.media.length !== 0)]);
            if(res.pageKey) {
                setPageKey(res.pageKey);
            } else {
                setPageKey(pageKey);
            }
            return nfts;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    const { isLoading, isError, error, data, mutate } = useMutation(getData);

    return {  isLoading, isError, error, data: nfts, getNFTs: mutate, pageKey };
};