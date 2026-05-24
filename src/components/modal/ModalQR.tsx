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

const ModalQR = ({ open, setOpen, pType }: TModalQRProps) => {
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
            'fixed inset-0 z-50 m-auto flex h-fit max-h-[90dvh] w-[95vw] max-w-2xl flex-col overflow-hidden rounded-2xl bg-white outline-none',
            // Hide the drag indicator for center modal
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

          {/* Body */}
          <div className="flex min-h-0 flex-col overflow-y-auto sm:flex-1 sm:flex-row">
            {/* First QR Code */}
            <div className="flex items-center justify-center bg-white sm:flex-1">
              <Image
                height={400}
                loading="eager"
                operations={{
                  cloudinary: {
                    c: 'fill',
                    g: 'north',
                  },
                }}
                src={
                  pType === 'h'
                    ? 'https://res.cloudinary.com/dnon5lwok/image/upload/v1779613612/2aOboQYKfXDBGM4CKJlJSweT5EpvOStqEDQOJhcu_bfhg5h.jpg'
                    : 'https://res.cloudinary.com/dnon5lwok/image/upload/v1779613612/2aOboQYKfXU89Ipxm1Lq8YYd3JPk7MEAskYtTRS4_mg1354.jpg'
                }
                width={400}
                className="!h-auto !w-full"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>

            {/* Divider */}
            <div className="h-px w-full shrink-0 bg-gray-200 sm:h-auto sm:w-px" />

            {/* Second QR Code */}
            <div className="flex items-center justify-center bg-white sm:flex-1">
              <Image
                height={400}
                loading="eager"
                operations={{
                  cloudinary: {
                    c: 'fill',
                    g: 'north',
                  },
                }}
                src={
                  pType === 'h'
                    ? 'https://res.cloudinary.com/dnon5lwok/image/upload/v1779613612/2aOboQYKfXU89Ipxm1Lq8YYd3JPk7MEAskYtTRS4_mg1354.jpg'
                    : 'https://res.cloudinary.com/dnon5lwok/image/upload/v1779613612/2aOboQYKfXDBGM4CKJlJSweT5EpvOStqEDQOJhcu_bfhg5h.jpg'
                }
                width={400}
                className="!h-auto !w-full"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ModalQR;
