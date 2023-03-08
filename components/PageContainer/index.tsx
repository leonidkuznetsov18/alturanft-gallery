import { useRouter } from 'next/router'
import Head from 'next/head'
import Footer from '../Footer'

const PageContainer = (props: any) => {

    const { children, ...customMeta } = props;
    const router = useRouter()
    const meta = {
        title: 'AlturaNFT – NFT Collection',
        description: 'A collection of NFTs from the AlturaNFT project.',
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/thumbnail.jpg`,
        type: 'website',
        robots: 'follow, index',
        ...customMeta
    }


    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content={meta.robots} />

                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />

                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="AlturaNFT" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />

                <meta name="description" content={meta.description} />
                <meta name="thumbnail" property="og:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@alturanft.com" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                <meta name="twitter:image:alt" content={meta.title} />
                {meta.date && (
                    <meta property="article:published_time" content={meta.date} />
                )}
            </Head>

            <div className="siteWrapper w-full h-full">
                <div className="container mx-auto px-4 h-full">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PageContainer;