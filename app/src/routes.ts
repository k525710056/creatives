/**
 * The prototypes linked between files by name and hash — `Creative Library.dc.html#shoppable`.
 * These are the equivalent app routes; every cross-screen link goes through here
 * so the flow stays wired the way the design bundle wired it.
 */
export const routes = {
  onboarding: '/',
  creativeLibrary: '/creative-library',
  campaign: '/campaign',
} as const;

export const libraryRoutes = {
  overview: '/creative-library',
  shoppable: '/creative-library/shoppable',
  media: (kind: string) => `/creative-library/media/${kind}`,
} as const;
