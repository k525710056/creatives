import type { CSSProperties } from 'react';

/**
 * Background images are data, not layout, so they ride in as a custom property
 * the stylesheet consumes. Passing a cover plus the product photo layers them:
 * a cover file that is not present simply does not paint, and the photo shows.
 */
export const bg = (...urls: (string | undefined)[]): CSSProperties =>
  ({
    ['--thumb' as string]: urls
      .filter(Boolean)
      .map((u) => `url(${u})`)
      .join(', '),
  }) as CSSProperties;
