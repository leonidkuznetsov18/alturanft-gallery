import type { NextPage } from 'next'
import Head from 'next/head'
import NFTGallery from "../components/NFTGallery";
import {useEffect, useState} from "react"
import PaginationBar from "../components/PaginnationBar";
import { useNFTs } from "../hooks/useNFTs";

const Home: NextPage = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [collectionAddress, setCollectionAddress] = useState("");
    const [fetchForCollection, setFetchForCollection]=useState(false)
    const { isLoading, isError, error, data, getNFTs, pageKey } = useNFTs();
    const [pageKeys, setPageKeys] = useState([""]);
    const [currentPage, setCurrentPage] = useState(0);

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
    <>
      <Head>
        <title>AlturaNFT Gallery</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
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
            <NFTGallery data={data} />

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
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Footer
      </footer>
    </>
  )
}

export default Home;
