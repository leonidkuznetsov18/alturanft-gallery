import CopyToClipboard from '../CopyToClipboard';
import { cutText, getCleanTokenId, shortAddress } from '../../utils/common';
import DynamicMediaTag from '../DynamicMediaTag';

const NFTDetail = ({ nft }): JSX.Element => {
  return (
    <div className="flex h-[400px] w-full flex-col rounded-md bg-slate-100 px-4 py-8">
      <div className={'mb-4 flex h-full w-full gap-4 overflow-hidden'}>
        <div className={'flex w-1/2 justify-center'}>
          <DynamicMediaTag
            format={nft?.media[0]?.format}
            url={nft?.media[0]?.gateway}
          />
        </div>
        <div className={'y-gap-2 flex w-1/2 flex-col'}>
          <div className={'mb-4'}>
            <h2 className="truncate text-xl text-gray-800">{nft.title}</h2>
            <p className="text-gray-600">Id: {getCleanTokenId(nft.tokenId)}</p>
            <div className={'flex items-center justify-between'}>
              <p className="text-gray-600">
                Address: {shortAddress(nft.contract.address)}
              </p>
              <CopyToClipboard text={nft.contract.address} />
            </div>
          </div>

          <div className="">
            <p className="break-all text-gray-600">
              {cutText(nft.description, 200)}
            </p>
          </div>
        </div>
      </div>
      <div className={'flex justify-center gap-2'}>
        <a
          className="cursor-pointer rounded-sm bg-blue-400 py-2 px-4 text-white decoration-0"
          href={`https://etherscan.io/address/${nft.contract.address}`}
          target="_blank"
          rel="noreferrer"
        >
          View on Etherscan
        </a>
        <a
          className="cursor-pointer rounded-sm bg-blue-400 py-2 px-4 text-white decoration-0"
          href={`https://opensea.io/assets/${nft.contract.address}/${nft.tokenId}`}
          target="_blank"
          rel="noreferrer"
        >
          View on OpenSea
        </a>
      </div>
    </div>
  );
};

export default NFTDetail;
