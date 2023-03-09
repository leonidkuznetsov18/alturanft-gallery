import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
interface IDynamicMediaTagProps {
  format: string;
  url: string;
}
const DynamicMediaTag = (props: IDynamicMediaTagProps): JSX.Element => {
  const { format, url } = props;
  if (format === 'mp4' || format === 'webm') {
    return <video muted autoPlay src={url} controls={false} />;
  } else {
    return (
      <LazyLoadImage effect="blur" placeholderSrc={'/no-img.png'} src={url} />
    );
  }
};

export default DynamicMediaTag;
