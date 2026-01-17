import { Image } from '@unpic/react';
import { GemIcon } from 'lucide-react';

import { ResponsiveDrawer } from './ResponsiveDrawer';

type TModalQRProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  pType?: string;
  pName?: string;
};

const ModalQR = ({ open, setOpen, pType }: TModalQRProps) => {
  return (
    <ResponsiveDrawer
      bodyClassName="bg-white"
      headerClassName="bg-red-50"
      opened={open}
      placement="center"
      title={
        <div className="flex items-center gap-3 text-red-500">
          <GemIcon className="size-6" />
          <span className="text-lg font-bold">Hộp mừng cưới</span>
        </div>
      }
      withCloseButton
      className="h-fit w-[95vw] max-w-2xl overflow-hidden rounded-b-2xl"
      onClose={() => setOpen(false)}
    >
      <div className="flex flex-col sm:flex-row">
        {/* First QR Code */}
        <div className="flex-1">
          <Image height={400} loading="eager" src={pType === 'h' ? '/assets/huyen_qr.jpeg' : '/assets/tung_qr.jpeg'} width={400} className="w-full object-cover" />
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200 sm:h-auto sm:w-px" />

        {/* Second QR Code */}
        <div className="flex-1">
          <Image height={400} loading="eager" src={pType === 'h' ? '/assets/tung_qr.jpeg' : '/assets/huyen_qr.jpeg'} width={400} className="w-full object-cover" />
        </div>
      </div>
    </ResponsiveDrawer>
  );
};

export default ModalQR;
