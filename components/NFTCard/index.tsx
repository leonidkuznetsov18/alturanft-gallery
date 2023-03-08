import DynamicMediaTag from '../DynamicMediaTag';

interface INFTCardProps {
  nft: any;
  onClick: () => void;
}
export const NFTCard = (props: INFTCardProps): JSX.Element => {
  const { nft, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border bg-white p-4"
    >
      <div className="relative h-[200px] w-[200px] overflow-hidden rounded">
        <DynamicMediaTag
          format={nft?.media[0]?.format}
          url={nft?.media[0]?.gateway}
        />
      </div>
      <div className="w-full p-2 text-center ">
        <p className="mt-1 truncate text-lg font-semibold leading-tight ">
          {nft.title || 'No title'}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
