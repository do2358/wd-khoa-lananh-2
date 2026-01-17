import { Image } from '@unpic/react';
import { GemIcon } from 'lucide-react';

import { Modal } from './AnimatedModal';

type TModalQRProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  pType?: string;
  pName?: string;
};

const ModalQR = ({ open, setOpen, pType }: TModalQRProps) => {
  return (
    <Modal open={open} className="max-sm:mt-auto md:max-w-[800px]" classNameCloseBtn="top-4 right-4" setOpen={setOpen}>
      <div className="flex items-center justify-center gap-4 bg-red-50 p-4 pr-10 text-red-500">
        <GemIcon />
        <h4 className="text-lg font-bold md:text-2xl">Hộp mừng cưới</h4>
      </div>
      <div className="flex min-h-0 flex-[1_1_auto] justify-between overflow-y-auto pb-24 max-sm:flex-col sm:pb-10 sm:[&>*]:w-1/2">
        {pType === 'h' ? <></> : <></>}
        <Image
          height={400}
          loading="eager"
          src={pType === 'h' ? '/assets/huyen_qr.jpeg' : '/assets/tung_qr.jpeg'}
          width={400}
          className="object-cover max-sm:w-full max-sm:border-b-2 max-sm:border-dashed max-sm:border-b-red-500"
        />
        <Image height={400} loading="eager" src={pType === 'h' ? '/assets/tung_qr.jpeg' : '/assets/huyen_qr.jpeg'} width={400} className=" object-cover max-sm:w-full" />
      </div>
    </Modal>
  );
};

export default ModalQR;
