import Rc_Image, { type ImageProps as Rc_ImageProps } from '@rc-component/image';

type TRcImageProps = Rc_ImageProps & {};

const RcImage = (props: TRcImageProps) => {
  return <Rc_Image {...props} />;
};

export default RcImage;
