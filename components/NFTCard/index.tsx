
export const NFTCard = ({ nft }) => {
    console.log('nft:', nft);
    return (
        <div className="after:content group relative cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight flex flex-col">
            <div className="rounded-md bg-gray-100 shadow-md drop-shadow-md flex justify-center items-center h-full w-full">
                {nft?.media[0] ?
                    <img alt="Next.js Conf photo" src={nft?.media[0]?.gateway} className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 aspect-auto object-cover h-3/4" /> :
                    <div className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 aspect-auto object-cover h-3/4" />}

            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
                <h2 className="text-xl text-gray-800">{nft.title || 'No title'}</h2>
            </div>

        </div>
    )
}

export default NFTCard;