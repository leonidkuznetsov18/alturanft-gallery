import { useEffect, useState } from 'react';

import type { NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';

import { useNFTs } from '../hooks/useNFTs';
import PageContainer from '../components/PageContainer';
import Modal from '../components/Modal';
import NFTCard from '../components/NFTCard';

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [collectionAddress, setCollectionAddress] = useState('');
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const { isLoading, isError, error, data, getNFTs, pageKey } = useNFTs();

  const [nfts, setNfts] = useState([]);

  const [currentNft, setCurrentNft] = useState(null);

  useEffect(() => {
    if (data) {
      setNfts((prevState) => [
        ...prevState,
        ...(data.nfts || data.ownedNfts)
          ?.filter((i) => i.media.length !== 0)
          .map((i) => ({
            ...i,
            id: uuidv4(),
          })),
      ]);
    }
  }, [data]);

  const handleWalletChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleCollectionChange = (e) => {
    setCollectionAddress(e.target.value);
  };

  const handleFetchForCollectionChange = (e) => {
    setFetchForCollection(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // in this case we use pageKey from response
    getNFTs({
      walletAddress,
      contractAddress: collectionAddress,
      isFetchForContract: fetchForCollection,
    });
    setNfts([]);
  };

  return (
    <PageContainer>
      {currentNft && (
        <Modal
          nft={currentNft}
          onClose={() => {
            setCurrentNft(null);
          }}
        />
      )}
      <div className="flex flex-col items-center justify-center gap-y-3 py-8">
        <h1
          className={
            'mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'
          }
        >
          AlturaNFT Gallery
        </h1>

        <div className="mb-6">
          <form className="flex flex-col items-center">
            <div className="mb-2">
              <label
                htmlFor="wallet-input"
                className="mb-2 block text-left text-sm font-medium text-black"
              >
                Wallet Address
              </label>
              <input
                disabled={fetchForCollection}
                onChange={handleWalletChange}
                value={walletAddress}
                placeholder="Add your wallet address"
                type="text"
                id="wallet-input"
                className="sm:text-md block w-full truncate rounded-lg border border-gray-300 bg-white p-4 text-black focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="collection-input"
                className="mb-2 block text-left text-sm font-medium text-black"
              >
                Collection Address
              </label>
              <input
                onChange={handleCollectionChange}
                value={collectionAddress}
                placeholder="Add the collection address"
                type="text"
                id="collection-input"
                className="sm:text-md block w-full truncate rounded-lg border border-gray-300 bg-white p-4 text-black focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-500 disabled:text-gray-200"
              />
            </div>
            <div className="mb-2 mb-6 self-start">
              <label className="text-gray-600">
                <input
                  type={'checkbox'}
                  className="mr-2"
                  onChange={handleFetchForCollectionChange}
                />
                Fetch for collection
              </label>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!walletAddress && !collectionAddress}
                className="mr-2 mb-2 cursor-pointer rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-default disabled:bg-gray-500 disabled:text-gray-200"
              >
                Fetch NFTs
              </button>
            </div>
          </form>
        </div>

        <InfiniteScroll
          dataLength={nfts?.length}
          next={() =>
            getNFTs({
              walletAddress,
              contractAddress: collectionAddress,
              pageKey: pageKey,
              isFetchForContract: fetchForCollection,
            })
          }
          hasMore={!!pageKey}
          loader={<h4>Loading...</h4>}
        >
          <div className="List grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {nfts?.map((nft) => {
              return (
                <div className={'ListItem'} key={nft.id}>
                  <NFTCard nft={nft} onClick={() => setCurrentNft(nft)} />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>

        {
          <>
            {isError && (
              <div className="mt-4 flex items-center justify-center">
                Error: {JSON.stringify(error)}{' '}
              </div>
            )}
            {isLoading && (
              <div className="mt-4 flex items-center justify-center">
                Loading...
              </div>
            )}
          </>
        }
      </div>
    </PageContainer>
  );
};

export default Home;
