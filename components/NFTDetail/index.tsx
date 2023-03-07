import CopyToClipboard from "../CopyToClipboard";
import {getCleanTokenId, shortAddress} from "../../utils/common";


const NFTDetail = ({ nft }): JSX.Element => {
    return (
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
            <h2 className="text-xl text-gray-800">{nft.title}</h2>
            <p className="text-gray-600">Id: {getCleanTokenId(nft.tokenId)}</p>
            <div className={'flex justify-between'}>
                <p className="text-gray-600" >Address: {shortAddress(nft.contract.address)}</p>
                <CopyToClipboard text={nft.contract.address} />
            </div>
        </div>

        <div className="flex-grow mt-2">
            <p className="text-gray-600">{nft.description}</p>
        </div>

        <div className={'flex justify-center mb-1'}>
            <a
                className="py-2 px-4 text-white bg-blue-400 rounded-sm cursor-pointer decoration-0"
                href={`https://etherscan.io/address/${nft.contract.address}`} target="_blank" rel="noreferrer" >View on Etherscan</a>
        </div>
    </div>
    )
}

export default NFTDetail;