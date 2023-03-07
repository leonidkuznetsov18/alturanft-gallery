import type { GetStaticProps, NextPage } from 'next'

import PageContainer from "../../components/PageContainer";
import NFTDetail from "../../components/NFTDetail";
import {useRouter} from "next/router";

const NftDetailsPage: NextPage = () => {
    // const router = useRouter()
    // const { nftId } = router.query

    return (
       <PageContainer>
           <NFTDetail nft={{}} />
       </PageContainer>
    )
}

export default NftDetailsPage

// export const getStaticProps: GetStaticProps = async (context) => {
//     const results = await getResults()
//
//     let reducedResults: ImageProps[] = []
//     let i = 0
//     for (let result of results.resources) {
//         reducedResults.push({
//             id: i,
//             height: result.height,
//             width: result.width,
//             public_id: result.public_id,
//             format: result.format,
//         })
//         i++
//     }
//
//     const currentPhoto = reducedResults.find(
//         (img) => img.id === Number(context.params.photoId)
//     )
//     currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
//
//     return {
//         props: {
//             currentPhoto: currentPhoto,
//         },
//     }
// }

// export async function getStaticPaths() {
//     const results = await cloudinary.v2.search
//         .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
//         .sort_by('public_id', 'desc')
//         .max_results(400)
//         .execute()
//
//     let fullPaths = []
//     for (let i = 0; i < results.resources.length; i++) {
//         fullPaths.push({ params: { photoId: i.toString() } })
//     }
//
//     return {
//         paths: fullPaths,
//         fallback: false,
//     }
// }