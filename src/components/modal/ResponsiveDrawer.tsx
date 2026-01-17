import { XIcon } from 'lucide-react';
import { type ReactNode } from 'react';
import { Drawer } from 'vaul';

import { cn } from '@/libs/utils';

import ScrollArea from '../ScrollArea';

export type DrawerPlacement = 'center' | 'bottom' | 'left' | 'right';

export interface ResponsiveDrawerProps {
  opened: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  withCloseButton?: boolean;
  shouldScaleBackground?: boolean;
  dismissible?: boolean;
  placement?: DrawerPlacement;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  zIndex?: number;
}

const getPlacementStyles = (placement: DrawerPlacement) => {
  const styles = {
    center: {
      container: 'inset-0 m-auto max-h-[90dvh] max-w-screen-sm rounded-2xl sm:after:hidden',
      dragHandle: false,
    },
    bottom: {
      container: 'inset-x-0 bottom-0 max-h-[96dvh] w-full max-w-screen-md rounded-t-2xl',
      dragHandle: true,
    },
    left: {
      container: 'inset-y-0 left-0 h-screen max-w-md rounded-r-2xl',
      dragHandle: false,
    },
    right: {
      container: 'inset-y-0 right-0 h-screen max-w-md rounded-l-2xl',
      dragHandle: false,
    },
  };

  return styles[placement];
};

export function ResponsiveDrawer({
  opened,
  onClose,
  title,
  children,
  footer,
  withCloseButton = true,
  shouldScaleBackground = true,
  dismissible = true,
  placement = 'center',
  className,
  contentClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  zIndex = 50,
}: ResponsiveDrawerProps) {
  const placementStyles = getPlacementStyles(placement);

  return (
    <Drawer.Root
      direction={placement === 'center' ? 'bottom' : placement}
      dismissible={dismissible}
      open={opened}
      shouldScaleBackground={shouldScaleBackground}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay style={{ zIndex }} className="fixed inset-0 bg-black/40" />
        <Drawer.Content style={{ zIndex: zIndex + 1 }} className={cn('fixed z-50 flex flex-col bg-white outline-none', placementStyles.container, className)}>
          {/* Content Wrapper */}
          <div className={cn('flex min-h-0 flex-1 flex-col', contentClassName)}>
            {/* Drag Handle - Only for bottom placement */}
            {placementStyles.dragHandle && (
              <div className="flex shrink-0 justify-center py-3">
                <div className="h-1.5 w-12 rounded-full bg-gray-300" />
              </div>
            )}

            {/* Header */}
            {(title || withCloseButton) && (
              <div className={cn('flex shrink-0 items-center justify-between gap-4 rounded-t-2xl border-b border-gray-200 px-4 py-3', headerClassName)}>
                {title && <Drawer.Title className="min-w-0 flex-1 text-lg font-semibold text-gray-900">{title}</Drawer.Title>}
                {withCloseButton && (
                  <button type="button" className="flex shrink-0 items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-100" onClick={onClose}>
                    <XIcon className="size-5 text-gray-600" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className={cn('relative min-h-0 flex-1 overflow-hidden', bodyClassName)}>
              <ScrollArea className="h-full">{children}</ScrollArea>
            </div>

            {/* Footer */}
            {footer && <div className={cn('shrink-0 border-t border-gray-200 bg-white px-4 py-3', footerClassName)}>{footer}</div>}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
