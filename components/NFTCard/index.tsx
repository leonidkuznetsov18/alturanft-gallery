
function getTagByFormat(format, url) {
    if (format === 'mp4' || format === 'webm') {
        return <video muted autoPlay src={url} controls={false} className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 aspect-auto object-cover h-3/4" />;
    } else {
        return <img src={url} className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 aspect-auto object-cover h-3/4" />;
    }
}
export const NFTCard = ({ nft, onClick }) => {
    console.log('nft:', nft);
    return (
        <div onClick={onClick} className="after:content group relative cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight flex flex-col">
            <div className="rounded-md bg-gray-100 shadow-md drop-shadow-md flex justify-center items-center h-full w-full">
                {getTagByFormat(nft?.media[0]?.format, nft?.media[0]?.gateway)}
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
                <h2 className="text-xl text-gray-800">{nft.title || 'No title'}</h2>
            </div>

        </div>
    )
}

export default NFTCard;