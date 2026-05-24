import { Image } from '@unpic/react';
import { GemIcon, XIcon } from 'lucide-react';
import { Drawer } from 'vaul';

import { cn } from '@/libs/utils';

type TModalQRProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  pType?: string;
  pName?: string;
};

const QR_GAI = 'https://res.cloudinary.com/dnon5lwok/image/upload/v1779613612/2aOboQYKfXDBGM4CKJlJSweT5EpvOStqEDQOJhcu_bfhg5h.jpg';
const QR_TRAI = 'https://res.cloudinary.com/dnon5lwok/image/upload/v1779613612/2aOboQYKfXU89Ipxm1Lq8YYd3JPk7MEAskYtTRS4_mg1354.jpg';

const ModalQR = ({ open, setOpen, pType }: TModalQRProps) => {
  // Nhà trai (/t, /t-31): dùng QR nhà trai | Nhà gái (default): dùng QR nhà gái
  const isGroom = pType === 't' || pType === 't-31';
  const qrSrc = isGroom ? QR_TRAI : QR_GAI;

  return (
    <Drawer.Root
      direction="bottom"
      dismissible={true}
      open={open}
      shouldScaleBackground={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) setOpen(false);
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content
          className={cn(
            'fixed inset-0 z-50 m-auto flex h-fit max-h-[90dvh] w-[95vw] max-w-sm flex-col overflow-hidden rounded-2xl bg-white outline-none',
            'sm:after:hidden',
          )}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-red-50 py-3 pr-3 pl-4">
            <Drawer.Title className="flex items-center gap-3 text-red-500">
              <GemIcon className="size-6" />
              <span className="text-lg font-semibold">Hộp mừng cưới</span>
            </Drawer.Title>
            <button type="button" className="flex shrink-0 items-center justify-center rounded-full p-1 transition-colors hover:bg-red-100" onClick={() => setOpen(false)}>
              <XIcon className="size-6 text-gray-600" />
            </button>
          </div>

          {/* Body — hiển thị đúng QR theo nhà gái / nhà trai */}
          <div className="flex items-center justify-center bg-white">
            <Image
              height={400}
              loading="eager"
              operations={{
                cloudinary: {
                  c: 'fill',
                  g: 'north',
                },
              }}
              src={qrSrc}
              width={400}
              className="!h-auto !w-full"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ModalQR;
