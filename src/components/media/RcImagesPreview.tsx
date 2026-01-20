import RcImage from '@rc-component/image';
import { ArrowLeftIcon, ArrowLeftRightIcon, ArrowRightIcon, RotateCcwSquareIcon, RotateCwSquareIcon, XIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import React, { memo } from 'react';

import { cn } from '@/libs/utils';
import { type GetProps } from '@/libs/utils-type';

type RcPreviewGroupProps = GetProps<typeof RcImage.PreviewGroup>;

type OriginPreviewConfig = NonNullable<Exclude<RcPreviewGroupProps['preview'], boolean>>;
type TRcImagesPreviewProps = OriginPreviewConfig & { children?: React.ReactNode };

const RcImagesPreview = ({ children, ...props }: TRcImagesPreviewProps) => {
  return (
    <RcImage.PreviewGroup
      icons={{
        rotateLeft: <RotateCcwSquareIcon className="size-5" />,
        rotateRight: <RotateCwSquareIcon className="size-5" />,
        zoomIn: <ZoomInIcon className="size-5" />,
        zoomOut: <ZoomOutIcon className="size-5" />,
        close: <XIcon className="size-5" />,
        left: <ArrowLeftIcon className="size-5" />,
        right: <ArrowRightIcon className="size-5" />,
        flipX: <ArrowLeftRightIcon className="size-5" />,
        flipY: <ArrowLeftRightIcon className="size-5 rotate-90" />,
      }}
      {...props}
      preview={{
        rootClassName: cn(
          '',
          // '[&_.rc-image-preview-switch]:top-auto! [&_.rc-image-preview-switch]:bottom-0! [&_.rc-image-preview-switch]:translate-0!',
          '[&_.rc-image-preview-switch-prev]:ml-4',
          '[&_.rc-image-preview-switch-next]:mr-4',
          '[&_.rc-image-preview-close]:flex [&_.rc-image-preview-close]:size-9! [&_.rc-image-preview-close]:items-center [&_.rc-image-preview-close]:justify-center',
          '[&_.rc-image-preview-actions]:hidden! [&_.rc-image-preview-actions]:gap-2! [&_.rc-image-preview-actions]:rounded-full! [&_.rc-image-preview-actions]:px-2!',
          '[&_.rc-image-preview-actions>*]:flex [&_.rc-image-preview-actions>*]:size-9 [&_.rc-image-preview-actions>*]:items-center [&_.rc-image-preview-actions>*]:justify-center [&_.rc-image-preview-actions>*]:rounded-full [&_.rc-image-preview-actions>*]:bg-gray-50/5',
          '[&_.rc-image-preview-actions-action-flipX]:hidden!',
          '[&_.rc-image-preview-actions-action-flipY]:hidden!',
        ),
        actionsRender: () => <></>,
      }}
    >
      {children}
    </RcImage.PreviewGroup>
  );
};

export default memo(RcImagesPreview);
