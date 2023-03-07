import Link from "next/link";
import {useRouter} from "next/router";
import {useLastViewedNFT} from "../../utils/useLastViewedNFT";
import {useEffect, useRef} from "react";
import NFTCard from "../NFTCard";


const NFTGallery = ({ data }): JSX.Element => {

    const router = useRouter()
    const { id } = router.query
    const [lastViewedNFT, setLastViewedNft] = useLastViewedNFT()

    const lastViewedNFTRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedNFT && !id) {
            lastViewedNFTRef.current.scrollIntoView({ block: 'center' })
            setLastViewedNft(null)
        }
    }, [id, lastViewedNFT])
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {data?.map((nft) => (
                <NFTCard nft={nft} />
            ))}
        </div>
    )
};

export default NFTGallery;