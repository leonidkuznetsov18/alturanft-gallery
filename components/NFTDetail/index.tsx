import CopyToClipboard from "../CopyToClipboard";
import {cutText, getCleanTokenId, shortAddress} from "../../utils/common";


function getTagByFormat(format, url) {
    if (format === 'mp4' || format === 'webm') {
        return <video muted autoPlay src={url} controls={false} className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 aspect-auto object-cover h-3/4" />;
    } else {
        return <img src={url} className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 aspect-auto object-cover h-3/4" />;
    }
}
const NFTDetail = ({ nft }): JSX.Element => {
    return (
        <div className="flex flex-col px-4 py-8 bg-slate-100 rounded-md w-full h-[400px]">
            <div className={'flex gap-4 w-full h-full overflow-hidden mb-4'}>
                <div className={'w-1/2 flex justify-center'}>
                    {getTagByFormat(nft?.media[0]?.format, nft?.media[0]?.gateway)}
                </div>
                <div className={'flex flex-col y-gap-2 w-1/2'}>
                    <div className={'mb-4'}>
                        <h2 className="text-xl text-gray-800 truncate">{nft.title}</h2>
                        <p className="text-gray-600">Id: {getCleanTokenId(nft.tokenId)}</p>
                        <div className={'flex justify-between items-center'}>
                            <p className="text-gray-600" >Address: {shortAddress(nft.contract.address)}</p>
                            <CopyToClipboard text={nft.contract.address} />
                        </div>
                    </div>

                    <div className="">
                        <p className="text-gray-600 break-all">{cutText(nft.description, 200)}</p>
                    </div>
                </div>
            </div>
            <div className={'flex justify-center gap-2'}>
                <a
                    className="py-2 px-4 text-white bg-blue-400 rounded-sm cursor-pointer decoration-0"
                    href={`https://etherscan.io/address/${nft.contract.address}`} target="_blank" rel="noreferrer" >View on Etherscan</a>
                <a
                    className="py-2 px-4 text-white bg-blue-400 rounded-sm cursor-pointer decoration-0"
                    href={`https://opensea.io/assets/${nft.contract.address}/${nft.tokenId}`} target="_blank" rel="noreferrer" >View on OpenSea</a>
            </div>
    </div>
    )
}

export default NFTDetail;