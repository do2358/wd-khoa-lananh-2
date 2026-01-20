import { type ClassValue, clsx } from 'clsx';
import queryString from 'query-string';
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

export const stringify = (object: Record<string, any>) => queryString.stringify(object, { skipEmptyString: true, arrayFormat: 'comma', sort: false, skipNull: false });
export const parse = (string: string) => queryString.parse(string, { parseBooleans: true, parseNumbers: true });
