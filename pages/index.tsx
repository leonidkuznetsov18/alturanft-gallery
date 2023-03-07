import type { NextPage } from 'next'

import NFTGallery from "../components/NFTGallery";
import {useEffect, useRef, useState} from "react"
import PaginationBar from "../components/PaginnationBar";
import { useNFTs } from "../hooks/useNFTs";
import PageContainer from "../components/PageContainer";
import Modal from "../components/Modal";
import {useRouter} from "next/router";
import {useLastViewedNFT} from "../utils/useLastViewedNFT";
import NFTCard from "../components/NFTCard";
import Link from "next/link";

const Home: NextPage = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [collectionAddress, setCollectionAddress] = useState("");
    const [fetchForCollection, setFetchForCollection] = useState(false)
    const { isLoading, isError, error, data, getNFTs, pageKey } = useNFTs();
    const [pageKeys, setPageKeys] = useState([""]);
    const [currentPage, setCurrentPage] = useState(0);

    const router = useRouter();
    const { nftId } = router.query;

    console.log('nftId', nftId);
    const [lastViewedNFT, setLastViewedNFT] = useLastViewedNFT();

    const lastViewedNftRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedNFT && !nftId) {
            lastViewedNftRef.current.scrollIntoView({ block: 'center' })
            setLastViewedNFT(null)
        }
    }, [nftId, lastViewedNFT])


    // this logic need for updating page in pagination
    useEffect(() => {
        if (pageKey) {
            setPageKeys((prevKeys) => {
                const newKeys = [...prevKeys];
                newKeys[currentPage + 1] = pageKey;

                return newKeys;
            });
        }
    }, [pageKey]);
    const handleWalletChange = (e) => {
        setWalletAddress(e.target.value);
    };

    const handleCollectionChange = (e) => {
        setCollectionAddress(e.target.value);
    }

    const handleFetchForCollectionChange = (e) => {
        setFetchForCollection(e.target.checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // in this case we use pageKey from response
        getNFTs({
            walletAddress,
            contractAddress: collectionAddress,
            pageKey,
            isFetchForContract: fetchForCollection
        });
    }

    const onClickPage = async (pageIndex) => {
        if (currentPage === pageIndex) return;
        // in this case we use pageKey from pageKeys array
        getNFTs({
            walletAddress,
            contractAddress: collectionAddress,
            pageKey: pageKeys[pageIndex],
            isFetchForContract: fetchForCollection
        });
        setCurrentPage(pageIndex);
    };

    console.log("pageKey", pageKey);
    console.log("pageKeys", pageKeys);
  return (
        <PageContainer>
            {nftId && (
                <Modal
                    // data={[]}
                    onClose={() => {
                        setLastViewedNFT(nftId)
                    }}
                />
            )}
            <div className="flex flex-col items-center justify-center py-8 gap-y-3">
                <div className="flex flex-col w-full justify-center items-center gap-y-2">
                    <div>
                        <label htmlFor="email" className="text-black text-sm">Wallet Address</label>

                        <div className="relative">

                            <input disabled={fetchForCollection}
                                   className="disabled:text-gray-400 w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                   onChange={handleWalletChange}
                                   value={walletAddress} type={"text"}
                                   placeholder="Add your wallet address"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="text-black text-sm">Collection Address</label>

                        <div className="relative">

                            <input
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                onChange={handleCollectionChange}
                                value={collectionAddress}
                                type={"text"}
                                placeholder="Add the collection address" />
                        </div>

                        <div className="relative">
                            <label className="text-gray-600">
                                <input type={"checkbox"} className="mr-2" onChange={handleFetchForCollectionChange} />
                                Fetch for collection
                            </label>
                        </div>

                        <div>
                            <button
                                disabled={!walletAddress && !collectionAddress}
                                className={"w-full disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm"} onClick={handleSubmit}>Fetch NFTs</button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {data?.map((nft) => {
                        console.log('nft', nft)
                        return (
                            <Link href={`/?nftId=${nft.tokenId}`}
                                  as={`/nft-details/${nft.tokenId}`}
                                  ref={nft.tokenId === lastViewedNFT ? lastViewedNftRef : null}
                                  shallow key={nft.tokenId}>
                                <NFTCard nft={nft} />
                            </Link>
                        )
                    })}
                </div>

                <>
                    {isLoading && <div className="flex justify-center items-center mt-4"> Loading ... </div>}
                    {isError && <div className="flex justify-center items-center mt-4">Error: {JSON.stringify(error)} </div>}
                </>


                {pageKeys.length > 1 && (
                    <PaginationBar
                        currentPage={currentPage}
                        pageKeys={pageKeys}
                        onClickPage={onClickPage}
                        className="border-t"
                    />
                )}
            </div>

        </PageContainer>
  )
}

export default Home;
