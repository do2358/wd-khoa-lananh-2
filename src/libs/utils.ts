import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function openInNewTab(href: string, download?: string) {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    rel: 'noopener noreferrer',
    href: href,
    download,
  }).click();
  return href;
}
