import type { GetServerSideProps, NextPage } from 'next';

import PageContainer from '../../components/PageContainer';
import NFTDetail from '../../components/NFTDetail';
import alchemyAPI from '../../api';

const NftDetailsPage: NextPage = ({ currentNft }: any) => {
  return (
    <PageContainer>
      <NFTDetail nft={currentNft} />
    </PageContainer>
  );
};

export default NftDetailsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    media,
    contract: { address },
    description,
    title,
    tokenId,
  } = await alchemyAPI.nft.getNftMetadata(
    context.query.contractAddress as string,
    context.query.tokenId as string
  );

  return {
    props: {
      currentNft: {
        media,
        contract: {
          address: address,
        },
        description,
        title,
        tokenId,
      },
    },
  };
};
