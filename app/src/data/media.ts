import type { CSSProperties } from 'react';

/**
 * Where an image's bytes live.
 *
 * `local` is a path under `public/media/` — the permanent copy that travels
 * with the repo. `remote` is the URL the design prototypes pointed at, kept as
 * a fallback so the app still renders before the local file has been added.
 *
 * Nothing in the UI builds an image URL itself; everything goes through the
 * helpers below, so swapping an asset is a one-line change on the object that
 * owns it.
 */
export interface MediaRef {
  local?: string;
  remote?: string;
}

const LOCAL_ROOT = 'media/';

/** Every candidate for a ref, most-preferred first. */
export const mediaUrls = (ref: MediaRef | undefined): string[] => {
  if (!ref) return [];
  const out: string[] = [];
  if (ref.local) out.push(LOCAL_ROOT + ref.local);
  if (ref.remote) out.push(ref.remote);
  return out;
};

/** The single URL to use where only one is possible (an `<img src>`). */
export const mediaUrl = (ref: MediaRef | undefined): string | undefined =>
  mediaUrls(ref)[0];

/**
 * Background layers for a ref, as the custom property every stylesheet reads.
 *
 * CSS paints the first layer on top, so a local file that is not there yet
 * simply does not paint and the remote one shows through — and the day the file
 * lands it takes over with no code change. Extra refs act as further fallbacks.
 */
export const bg = (...refs: (MediaRef | undefined)[]): CSSProperties => {
  const layers = refs.flatMap(mediaUrls).map((u) => `url(${u})`);
  return { ['--thumb' as string]: layers.join(', ') } as CSSProperties;
};
