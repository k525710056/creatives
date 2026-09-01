import type { CSSProperties } from 'react';

/**
 * Keystone glyphs, transcribed verbatim from the design bundle so every icon
 * still points back to a specific source file rather than a redrawn shape.
 */
export interface IconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
}


export function IconSearch({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 15.500 15.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 6.75 1.5 C 3.851 1.5 1.5 3.851 1.5 6.75 C 1.5 9.649 3.851 12 6.75 12 C 9.649 12 12 9.649 12 6.75 C 12 3.851 9.649 1.5 6.75 1.5 Z M 0 6.75 C 0 3.022 3.022 0 6.75 0 C 10.478 0 13.5 3.022 13.5 6.75 C 13.5 10.478 10.478 13.5 6.75 13.5 C 3.022 13.5 0 10.478 0 6.75 Z" fillRule="evenodd"  /><path d="M 11.016 9.955 L 15.28 14.22 C 15.573 14.513 15.573 14.987 15.28 15.28 C 14.987 15.573 14.513 15.573 14.22 15.28 L 9.955 11.016 L 11.016 9.955 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconHome({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36.000 38.095" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 33 35.095 L 33 15.5 L 18 3 L 3 15.5 L 3 35.095 L 33 35.095 Z M 36 15.5 C 36 14.61 35.604 13.765 34.92 13.195 L 19.92 0.695 C 18.808 -0.232 17.192 -0.232 16.079 0.695 L 1.079 13.195 C 0.395 13.765 0 14.61 0 15.5 L 0 35.095 C 0 36.752 1.343 38.095 3 38.095 L 33 38.095 C 34.657 38.095 36 36.752 36 35.095 L 36 15.5 Z" fillRule="evenodd"  /><path d="M 10.137 29.335 C 10.137 28.506 10.808 27.835 11.637 27.835 L 24.365 27.835 C 25.193 27.835 25.865 28.506 25.865 29.335 C 25.865 30.163 25.193 30.835 24.365 30.835 L 11.637 30.835 C 10.808 30.835 10.137 30.163 10.137 29.335 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconCampaigns({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13.476 15.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 6.738 1.5 C 4.532 1.5 2.575 2.564 1.352 4.211 C 1.105 4.544 0.635 4.613 0.303 4.366 C -0.03 4.119 -0.099 3.649 0.148 3.317 C 1.642 1.306 4.037 0 6.738 0 C 9.438 0 11.834 1.306 13.328 3.317 C 13.575 3.649 13.505 4.119 13.173 4.366 C 12.84 4.613 12.37 4.544 12.123 4.211 C 10.9 2.564 8.944 1.5 6.738 1.5 Z" fillRule="evenodd"  /><path d="M 6.738 14 C 4.532 14 2.575 12.936 1.352 11.289 C 1.105 10.956 0.635 10.887 0.303 11.134 C -0.03 11.381 -0.099 11.851 0.148 12.183 C 1.642 14.194 4.037 15.5 6.738 15.5 C 9.438 15.5 11.834 14.194 13.328 12.183 C 13.575 11.851 13.505 11.381 13.173 11.134 C 12.84 10.887 12.37 10.956 12.123 11.289 C 10.9 12.936 8.944 14 6.738 14 Z" fillRule="evenodd"  /><path d="M 7.894 10.25 C 7.629 10.25 7.425 10.186 7.282 10.057 C 7.145 9.923 7.076 9.732 7.076 9.484 L 7.076 5.71 C 7.076 5.461 7.145 5.273 7.282 5.144 C 7.425 5.01 7.629 4.943 7.894 4.943 L 8.1 4.943 L 8.1 10.25 L 7.894 10.25 Z M 8.001 9.319 L 8.98 9.319 C 9.367 9.319 9.688 9.247 9.943 9.104 C 10.203 8.961 10.394 8.76 10.516 8.503 C 10.644 8.245 10.707 7.944 10.707 7.6 C 10.707 7.247 10.646 6.941 10.524 6.684 C 10.401 6.426 10.21 6.228 9.95 6.089 C 9.696 5.946 9.372 5.874 8.98 5.874 L 8.001 5.874 L 8.001 4.943 L 8.98 4.943 C 9.555 4.943 10.05 5.065 10.463 5.309 C 10.881 5.552 11.197 5.877 11.411 6.283 C 11.625 6.688 11.732 7.128 11.732 7.6 C 11.732 8.063 11.625 8.498 11.411 8.904 C 11.197 9.309 10.881 9.637 10.463 9.885 C 10.05 10.128 9.555 10.25 8.98 10.25 L 8.001 10.25 L 8.001 9.319 Z" fillRule="nonzero"  /><path d="M 6.303 9.684 C 6.359 9.832 6.349 9.964 6.273 10.078 C 6.196 10.193 6.074 10.25 5.906 10.25 L 5.875 10.25 C 5.707 10.25 5.572 10.205 5.47 10.114 C 5.373 10.018 5.292 9.88 5.225 9.699 L 3.742 5.874 L 4.17 5.874 L 2.687 9.699 C 2.616 9.88 2.532 10.018 2.435 10.114 C 2.338 10.205 2.206 10.25 2.038 10.25 L 2.007 10.25 C 1.839 10.25 1.716 10.193 1.64 10.078 C 1.564 9.964 1.553 9.832 1.609 9.684 L 3.291 5.359 C 3.403 5.082 3.623 4.943 3.949 4.943 L 3.964 4.943 C 4.29 4.943 4.509 5.082 4.622 5.359 L 6.303 9.684 Z M 5.218 7.958 L 5.218 8.889 L 2.695 8.889 L 2.695 7.958 L 5.218 7.958 Z" fillRule="nonzero"  />
    </svg>
  );
}

export function IconAssets({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13.123 14.011" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 0 6.375 C 0 5.554 0.811 5.088 1.497 5.313 L 1.632 5.368 L 5.483 7.217 C 5.863 7.399 6.122 7.783 6.122 8.224 L 6.122 12.894 C 6.122 13.757 5.221 14.231 4.514 13.911 L 0.662 12.168 C 0.271 11.991 0 11.601 0 11.15 L 0 6.375 Z M 1.5 10.9 L 4.622 12.312 L 4.622 8.466 L 1.5 6.968 L 1.5 10.9 Z" fillRule="evenodd"  /><path d="M 11.49 5.366 C 12.199 5.026 13.123 5.497 13.123 6.373 L 13.123 11.15 C 13.123 11.601 12.852 11.991 12.461 12.168 L 8.608 13.911 C 7.901 14.231 6.999 13.757 6.999 12.894 L 6.999 8.222 C 6.999 7.781 7.259 7.397 7.638 7.215 L 11.49 5.366 Z M 8.499 8.465 L 8.499 12.313 L 11.623 10.9 L 11.623 6.966 L 8.499 8.465 Z" fillRule="evenodd"  /><path d="M 6.195 0.061 C 6.436 -0.02 6.698 -0.02 6.939 0.061 L 7.058 0.107 L 11.817 2.303 C 12.706 2.713 12.706 3.959 11.817 4.369 L 7.058 6.564 C 6.747 6.708 6.388 6.707 6.077 6.564 L 1.317 4.369 C 0.429 3.959 0.429 2.713 1.317 2.303 L 6.077 0.107 L 6.195 0.061 Z M 2.658 3.336 L 6.567 5.138 L 10.476 3.336 L 6.567 1.533 L 2.658 3.336 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconCreativeLibrary({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 6.793 8.854 C 7.183 9.244 7.817 9.244 8.207 8.854 L 10.25 6.811 L 10.25 5.75 L 9.189 5.75 L 7.5 7.439 L 6.207 6.146 C 5.817 5.756 5.183 5.756 4.793 6.146 L 1.97 8.97 C 1.677 9.263 1.677 9.737 1.97 10.03 C 2.263 10.323 2.737 10.323 3.03 10.03 L 5.5 7.561 L 6.793 8.854 Z" fillRule="evenodd"  /><path d="M 1.5 1.5 L 1.5 12.5 L 12.5 12.5 L 12.5 1.5 L 1.5 1.5 Z M 1 0 C 0.448 0 0 0.448 0 1 L 0 13 C 0 13.552 0.448 14 1 14 L 13 14 C 13.552 14 14 13.552 14 13 L 14 1 C 14 0.448 13.552 0 13 0 L 1 0 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconBilling({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12.500 15.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 0 1.75 C 0 0.784 0.784 0 1.75 0 L 8.221 0 C 8.673 0 9.108 0.175 9.434 0.489 L 11.963 2.922 C 12.306 3.252 12.5 3.707 12.5 4.183 L 12.5 13.75 C 12.5 14.716 11.716 15.5 10.75 15.5 L 1.75 15.5 C 0.784 15.5 0 14.716 0 13.75 L 0 1.75 Z M 1.75 1.5 C 1.612 1.5 1.5 1.612 1.5 1.75 L 1.5 13.75 C 1.5 13.888 1.612 14 1.75 14 L 10.75 14 C 10.888 14 11 13.888 11 13.75 L 11 4.183 C 11 4.115 10.972 4.05 10.923 4.003 L 8.394 1.57 C 8.347 1.525 8.285 1.5 8.221 1.5 L 1.75 1.5 Z" fillRule="evenodd"  /><path d="M 3 7 C 3 6.586 3.336 6.25 3.75 6.25 L 8.75 6.25 C 9.164 6.25 9.5 6.586 9.5 7 C 9.5 7.414 9.164 7.75 8.75 7.75 L 3.75 7.75 C 3.336 7.75 3 7.414 3 7 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconAudience({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 11.500 12.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 5.75 1.5 C 4.507 1.5 3.5 2.507 3.5 3.75 C 3.5 4.993 4.507 6 5.75 6 C 6.993 6 8 4.993 8 3.75 C 8 2.507 6.993 1.5 5.75 1.5 Z M 2 3.75 C 2 1.679 3.679 0 5.75 0 C 7.821 0 9.5 1.679 9.5 3.75 C 9.5 5.821 7.821 7.5 5.75 7.5 C 3.679 7.5 2 5.821 2 3.75 Z" fillRule="evenodd"  /><path d="M 5.75 7.5 C 3.403 7.5 1.5 9.403 1.5 11.75 C 1.5 12.164 1.164 12.5 0.75 12.5 C 0.336 12.5 0 12.164 0 11.75 C 0 8.574 2.574 6 5.75 6 C 8.926 6 11.5 8.574 11.5 11.75 C 11.5 12.164 11.164 12.5 10.75 12.5 C 10.336 12.5 10 12.164 10 11.75 C 10 9.403 8.097 7.5 5.75 7.5 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconCatalog({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14.417 14.750" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 2 3.75 C 2 3.06 2.56 2.5 3.25 2.5 L 13.167 2.5 C 13.933 2.5 14.519 3.183 14.403 3.94 L 13.557 9.44 C 13.463 10.05 12.938 10.5 12.321 10.5 L 3.25 10.5 C 2.56 10.5 2 9.94 2 9.25 L 2 3.75 Z M 3.5 4 L 3.5 9 L 12.107 9 L 12.876 4 L 3.5 4 Z" fillRule="evenodd"  /><path d="M 0.264 0.179 C 0.58 -0.09 1.053 -0.051 1.321 0.264 L 3.202 2.477 C 3.395 2.703 3.5 2.99 3.5 3.287 L 3.5 11 L 12.75 11 C 13.164 11 13.5 11.336 13.5 11.75 C 13.5 12.164 13.164 12.5 12.75 12.5 L 3.25 12.5 C 2.56 12.5 2 11.94 2 11.25 L 2 3.379 L 0.179 1.236 C -0.09 0.92 -0.051 0.447 0.264 0.179 Z" fillRule="evenodd"  /><path d="M 3.75 13.75 C 3.75 14.302 3.302 14.75 2.75 14.75 C 2.198 14.75 1.75 14.302 1.75 13.75 C 1.75 13.198 2.198 12.75 2.75 12.75 C 3.302 12.75 3.75 13.198 3.75 13.75 Z" fillRule="nonzero"  /><path d="M 13.75 13.75 C 13.75 14.302 13.302 14.75 12.75 14.75 C 12.198 14.75 11.75 14.302 11.75 13.75 C 11.75 13.198 12.198 12.75 12.75 12.75 C 13.302 12.75 13.75 13.198 13.75 13.75 Z" fillRule="nonzero"  />
    </svg>
  );
}

export function IconMoreHorizontal({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <g transform="translate(2.25 6.75)"><path d="M 7 1.25 C 7 1.94 6.44 2.5 5.75 2.5 C 5.06 2.5 4.5 1.94 4.5 1.25 C 4.5 0.56 5.06 0 5.75 0 C 6.44 0 7 0.56 7 1.25 Z"  /><path d="M 11.5 1.25 C 11.5 1.94 10.94 2.5 10.25 2.5 C 9.56 2.5 9 1.94 9 1.25 C 9 0.56 9.56 0 10.25 0 C 10.94 0 11.5 0.56 11.5 1.25 Z"  /><path d="M 2.5 1.25 C 2.5 1.94 1.94 2.5 1.25 2.5 C 0.56 2.5 0 1.94 0 1.25 C 0 0.56 0.56 0 1.25 0 C 1.94 0 2.5 0.56 2.5 1.25 Z"  /></g>
    </svg>
  );
}

export function IconChevronDown({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path transform="translate(1.25 4.354)" d="M 5.866 6.927 C 6.354 7.415 7.146 7.415 7.634 6.927 L 13.28 1.28 C 13.573 0.987 13.573 0.513 13.28 0.22 C 12.987 -0.073 12.513 -0.073 12.22 0.22 L 6.75 5.689 L 1.28 0.22 C 0.987 -0.073 0.513 -0.073 0.22 0.22 C -0.073 0.513 -0.073 0.987 0.22 1.28 L 5.866 6.927 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconCheck({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path transform="translate(1.25 2.25)" d="M 13.229 0.173 C 13.548 0.438 13.592 0.911 13.327 1.229 L 5.019 11.229 C 4.877 11.401 4.665 11.5 4.442 11.5 C 4.219 11.5 4.008 11.401 3.865 11.229 L 0.173 6.785 C -0.092 6.466 -0.048 5.993 0.271 5.729 C 0.589 5.464 1.062 5.508 1.327 5.826 L 4.442 9.576 L 12.173 0.271 C 12.438 -0.048 12.911 -0.092 13.229 0.173 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconDoc({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12.500 15.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 8.25 0.75 C 7.836 0.75 7.5 1.086 7.5 1.5 L 7.5 5.25 L 11.25 5.25 C 11.664 5.25 12 4.914 12 4.5 C 12 4.086 11.664 3.75 11.25 3.75 L 9 3.75 L 9 1.5 C 9 1.086 8.664 0.75 8.25 0.75 Z" fillRule="evenodd"  /><path d="M 3 7 C 3 6.586 3.336 6.25 3.75 6.25 L 8.75 6.25 C 9.164 6.25 9.5 6.586 9.5 7 C 9.5 7.414 9.164 7.75 8.75 7.75 L 3.75 7.75 C 3.336 7.75 3 7.414 3 7 Z" fillRule="evenodd"  /><path d="M 3 9.5 C 3 9.086 3.336 8.75 3.75 8.75 L 8.75 8.75 C 9.164 8.75 9.5 9.086 9.5 9.5 C 9.5 9.914 9.164 10.25 8.75 10.25 L 3.75 10.25 C 3.336 10.25 3 9.914 3 9.5 Z" fillRule="evenodd"  /><path d="M 0 1.75 C 0 0.784 0.784 0 1.75 0 L 8.221 0 C 8.673 0 9.108 0.175 9.434 0.489 L 11.963 2.922 C 12.306 3.252 12.5 3.707 12.5 4.183 L 12.5 13.75 C 12.5 14.716 11.716 15.5 10.75 15.5 L 1.75 15.5 C 0.784 15.5 0 14.716 0 13.75 L 0 1.75 Z M 1.75 1.5 C 1.612 1.5 1.5 1.612 1.5 1.75 L 1.5 13.75 C 1.5 13.888 1.612 14 1.75 14 L 10.75 14 C 10.888 14 11 13.888 11 13.75 L 11 4.183 C 11 4.115 10.972 4.05 10.923 4.003 L 8.394 1.57 C 8.347 1.525 8.285 1.5 8.221 1.5 L 1.75 1.5 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconAd({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13.476 15.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 7.894 10.25 C 7.629 10.25 7.425 10.186 7.282 10.057 C 7.145 9.923 7.076 9.732 7.076 9.484 L 7.076 5.71 C 7.076 5.461 7.145 5.273 7.282 5.144 C 7.425 5.01 7.629 4.943 7.894 4.943 L 8.1 4.943 L 8.1 10.25 L 7.894 10.25 Z M 8.001 9.319 L 8.98 9.319 C 9.367 9.319 9.688 9.247 9.943 9.104 C 10.203 8.961 10.394 8.76 10.516 8.503 C 10.644 8.245 10.707 7.944 10.707 7.6 C 10.707 7.247 10.646 6.941 10.524 6.684 C 10.401 6.426 10.21 6.228 9.95 6.089 C 9.696 5.946 9.372 5.874 8.98 5.874 L 8.001 5.874 L 8.001 4.943 L 8.98 4.943 C 9.555 4.943 10.05 5.065 10.463 5.309 C 10.881 5.552 11.197 5.877 11.411 6.283 C 11.625 6.688 11.732 7.128 11.732 7.6 C 11.732 8.063 11.625 8.498 11.411 8.904 C 11.197 9.309 10.881 9.637 10.463 9.885 C 10.05 10.128 9.555 10.25 8.98 10.25 L 8.001 10.25 L 8.001 9.319 Z" fillRule="nonzero"  /><path d="M 6.303 9.684 C 6.359 9.832 6.349 9.964 6.273 10.078 C 6.196 10.193 6.074 10.25 5.906 10.25 L 5.875 10.25 C 5.707 10.25 5.572 10.205 5.47 10.114 C 5.373 10.018 5.292 9.88 5.225 9.699 L 3.742 5.874 L 4.17 5.874 L 2.687 9.699 C 2.616 9.88 2.532 10.018 2.435 10.114 C 2.338 10.205 2.206 10.25 2.038 10.25 L 2.007 10.25 C 1.839 10.25 1.716 10.193 1.64 10.078 C 1.564 9.964 1.553 9.832 1.609 9.684 L 3.291 5.359 C 3.403 5.082 3.623 4.943 3.949 4.943 L 3.964 4.943 C 4.29 4.943 4.509 5.082 4.622 5.359 L 6.303 9.684 Z M 5.218 7.958 L 5.218 8.889 L 2.695 8.889 L 2.695 7.958 L 5.218 7.958 Z" fillRule="nonzero"  /><path d="M 6.738 1.5 C 4.532 1.5 2.575 2.564 1.352 4.211 C 1.105 4.544 0.635 4.613 0.303 4.366 C -0.03 4.119 -0.099 3.649 0.148 3.317 C 1.642 1.306 4.037 0 6.738 0 C 9.438 0 11.834 1.306 13.328 3.317 C 13.575 3.649 13.505 4.119 13.173 4.366 C 12.84 4.613 12.37 4.544 12.123 4.211 C 10.9 2.564 8.944 1.5 6.738 1.5 Z" fillRule="evenodd"  /><path d="M 6.738 14 C 4.532 14 2.575 12.936 1.352 11.289 C 1.105 10.956 0.635 10.887 0.303 11.134 C -0.03 11.381 -0.099 11.851 0.148 12.183 C 1.642 14.194 4.037 15.5 6.738 15.5 C 9.438 15.5 11.834 14.194 13.328 12.183 C 13.575 11.851 13.505 11.381 13.173 11.134 C 12.84 10.887 12.37 10.956 12.123 11.289 C 10.9 12.936 8.944 14 6.738 14 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconClose({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <g transform="translate(2.25 2.25)"><path d="M 0.22 0.22 C 0.513 -0.073 0.987 -0.073 1.28 0.22 L 11.28 10.22 C 11.573 10.513 11.573 10.987 11.28 11.28 C 10.987 11.573 10.513 11.573 10.22 11.28 L 0.22 1.28 C -0.073 0.987 -0.073 0.513 0.22 0.22 Z" fillRule="evenodd"  /><path d="M 0.22 11.28 C -0.073 10.987 -0.073 10.513 0.22 10.22 L 10.22 0.22 C 10.513 -0.073 10.987 -0.073 11.28 0.22 C 11.573 0.513 11.573 0.987 11.28 1.28 L 1.28 11.28 C 0.987 11.573 0.513 11.573 0.22 11.28 Z" fillRule="evenodd"  /></g>
    </svg>
  );
}

export function IconChevronLeft({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path transform="translate(4.354 1.25)" d="M 0.366 5.866 C -0.122 6.354 -0.122 7.146 0.366 7.634 L 6.013 13.28 C 6.305 13.573 6.78 13.573 7.073 13.28 C 7.366 12.987 7.366 12.513 7.073 12.22 L 1.604 6.75 L 7.073 1.28 C 7.366 0.987 7.366 0.513 7.073 0.22 C 6.78 -0.073 6.305 -0.073 6.013 0.22 L 0.366 5.866 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconPlus({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <g transform="translate(0.886 0.886)"><path d="M 7.114 0 C 7.528 0 7.864 0.336 7.864 0.75 L 7.864 13.478 C 7.864 13.892 7.528 14.228 7.114 14.228 C 6.7 14.228 6.364 13.892 6.364 13.478 L 6.364 0.75 C 6.364 0.336 6.7 0 7.114 0 Z" fillRule="evenodd"  /><path d="M 0 7.114 C 0 6.7 0.336 6.364 0.75 6.364 L 13.478 6.364 C 13.892 6.364 14.228 6.7 14.228 7.114 C 14.228 7.528 13.892 7.864 13.478 7.864 L 0.75 7.864 C 0.336 7.864 0 7.528 0 7.114 Z" fillRule="evenodd"  /></g>
    </svg>
  );
}

export function IconEye({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M8 3C4.5 3 1.7 5.4 0.6 7.6a0.9 0.9 0 0 0 0 0.8C1.7 10.6 4.5 13 8 13s6.3-2.4 7.4-4.6a0.9 0.9 0 0 0 0-0.8C14.3 5.4 11.5 3 8 3Zm0 1.5c2.7 0 5 1.8 6 3.5-1 1.7-3.3 3.5-6 3.5S3 9.7 2 8c1-1.7 3.3-3.5 6-3.5Zm0 1.6a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconAllApps({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13.123 14.011" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 0 6.375 C 0 5.554 0.811 5.088 1.497 5.313 L 1.632 5.368 L 5.483 7.217 C 5.863 7.399 6.122 7.783 6.122 8.224 L 6.122 12.894 C 6.122 13.757 5.221 14.231 4.514 13.911 L 0.662 12.168 C 0.271 11.991 0 11.601 0 11.15 L 0 6.375 Z M 1.5 10.9 L 4.622 12.312 L 4.622 8.466 L 1.5 6.968 L 1.5 10.9 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 11.49 5.366 C 12.199 5.026 13.123 5.497 13.123 6.373 L 13.123 11.15 C 13.123 11.601 12.852 11.991 12.461 12.168 L 8.608 13.911 C 7.901 14.231 6.999 13.757 6.999 12.894 L 6.999 8.222 C 6.999 7.781 7.259 7.397 7.638 7.215 L 11.49 5.366 Z M 8.499 8.465 L 8.499 12.313 L 11.623 10.9 L 11.623 6.966 L 8.499 8.465 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 6.195 0.061 C 6.436 -0.02 6.698 -0.02 6.939 0.061 L 7.058 0.107 L 11.817 2.303 C 12.706 2.713 12.706 3.959 11.817 4.369 L 7.058 6.564 C 6.747 6.708 6.388 6.707 6.077 6.564 L 1.317 4.369 C 0.429 3.959 0.429 2.713 1.317 2.303 L 6.077 0.107 L 6.195 0.061 Z M 2.658 3.336 L 6.567 5.138 L 10.476 3.336 L 6.567 1.533 L 2.658 3.336 Z" fill="currentColor" fillRule="evenodd"  />
    </svg>
  );
}

export function IconSearchNav({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 15.500 15.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 6.75 1.5 C 3.851 1.5 1.5 3.851 1.5 6.75 C 1.5 9.649 3.851 12 6.75 12 C 9.649 12 12 9.649 12 6.75 C 12 3.851 9.649 1.5 6.75 1.5 Z M 0 6.75 C 0 3.022 3.022 0 6.75 0 C 10.478 0 13.5 3.022 13.5 6.75 C 13.5 10.478 10.478 13.5 6.75 13.5 C 3.022 13.5 0 10.478 0 6.75 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 7.088 2.796 C 7.226 2.405 7.655 2.201 8.045 2.339 C 8.512 2.503 8.936 2.758 9.296 3.08 C 9.759 3.495 10.12 4.024 10.332 4.625 C 10.47 5.016 10.265 5.444 9.875 5.582 C 9.484 5.72 9.056 5.515 8.918 5.125 C 8.791 4.766 8.575 4.448 8.295 4.198 C 8.078 4.004 7.824 3.851 7.546 3.753 C 7.155 3.615 6.95 3.186 7.088 2.796 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 11.016 9.955 L 15.28 14.22 C 15.573 14.513 15.573 14.987 15.28 15.28 C 14.987 15.573 14.513 15.573 14.22 15.28 L 9.955 11.016 L 11.016 9.955 Z" fill="currentColor" fillRule="evenodd"  />
    </svg>
  );
}

export function IconBell({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12.679 13.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 6.339 0 C 3.716 0 1.589 2.127 1.589 4.75 L 1.589 7.725 C 1.532 7.758 1.48 7.798 1.434 7.845 L 0.516 8.763 C -0.586 9.865 0.194 11.75 1.754 11.75 L 3.937 11.75 C 4.256 12.764 5.203 13.5 6.323 13.5 C 7.442 13.5 8.39 12.764 8.708 11.75 L 10.925 11.75 C 12.484 11.75 13.265 9.865 12.163 8.763 L 11.245 7.845 C 11.199 7.799 11.146 7.758 11.089 7.725 L 11.089 4.75 C 11.089 2.127 8.963 0 6.339 0 Z M 6.339 1.5 C 4.544 1.5 3.089 2.955 3.089 4.75 L 3.089 7.625 L 9.589 7.625 L 9.589 4.75 C 9.589 2.955 8.134 1.5 6.339 1.5 Z M 1.577 9.823 L 2.275 9.125 L 10.404 9.125 L 11.102 9.823 C 11.259 9.981 11.148 10.25 10.925 10.25 L 1.754 10.25 C 1.531 10.25 1.419 9.981 1.577 9.823 Z M 5.661 11.75 C 5.837 11.906 6.069 12 6.323 12 C 6.576 12 6.808 11.906 6.984 11.75 L 5.661 11.75 Z" fill="currentColor" fillRule="evenodd"  />
    </svg>
  );
}

export function IconHelp({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13.833 13.833" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 1.5 6.916 C 1.5 9.907 3.925 12.333 6.916 12.333 C 9.908 12.333 12.333 9.908 12.333 6.916 C 12.333 3.925 9.907 1.5 6.916 1.5 C 3.925 1.5 1.5 3.925 1.5 6.916 Z M 0 6.916 C 0 3.096 3.096 0 6.916 0 C 10.736 0 13.833 3.096 13.833 6.916 C 13.833 10.736 10.736 13.833 6.916 13.833 C 3.096 13.833 0 10.736 0 6.916 Z" fill="currentColor" fillRule="nonzero"  /> <path d="M 6.089 8.54 L 6.089 7.682 C 6.089 6.82 6.793 6.311 7.24 6.099 C 7.515 5.968 7.655 5.732 7.656 5.506 C 7.656 5.192 7.355 4.825 6.839 4.825 C 6.479 4.825 6.206 5.016 6.09 5.238 C 5.899 5.605 5.446 5.747 5.078 5.556 C 4.711 5.364 4.569 4.911 4.76 4.543 C 5.148 3.8 5.951 3.325 6.839 3.325 C 8.053 3.325 9.156 4.239 9.156 5.506 C 9.155 6.386 8.611 7.109 7.883 7.455 C 7.765 7.51 7.676 7.577 7.625 7.635 C 7.578 7.689 7.589 7.702 7.589 7.682 L 7.589 8.54 C 7.589 8.955 7.253 9.29 6.839 9.29 C 6.425 9.29 6.089 8.954 6.089 8.54 Z" fill="currentColor" fillRule="nonzero"  /> <path d="M 6.125 10.239 L 6.125 10.236 C 6.125 9.821 6.46 9.486 6.875 9.486 C 7.289 9.486 7.625 9.821 7.625 10.236 L 7.625 10.239 C 7.625 10.653 7.289 10.989 6.875 10.989 C 6.46 10.989 6.125 10.653 6.125 10.239 Z" fill="currentColor" fillRule="nonzero"  />
    </svg>
  );
}

export function IconDashboard({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36.000 38.095" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 33 35.095 L 33 15.5 L 18 3 L 3 15.5 L 3 35.095 L 33 35.095 Z M 36 15.5 C 36 14.61 35.604 13.765 34.92 13.195 L 19.92 0.695 C 18.808 -0.232 17.192 -0.232 16.079 0.695 L 1.079 13.195 C 0.395 13.765 0 14.61 0 15.5 L 0 35.095 C 0 36.752 1.343 38.095 3 38.095 L 33 38.095 C 34.657 38.095 36 36.752 36 35.095 L 36 15.5 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 10.137 29.335 C 10.137 28.506 10.808 27.835 11.637 27.835 L 24.365 27.835 C 25.193 27.835 25.865 28.506 25.865 29.335 C 25.865 30.163 25.193 30.835 24.365 30.835 L 11.637 30.835 C 10.808 30.835 10.137 30.163 10.137 29.335 Z" fill="currentColor" fillRule="evenodd"  />
    </svg>
  );
}

export function IconNavCampaigns({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13.476 15.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 7.894 10.25 C 7.629 10.25 7.425 10.186 7.282 10.057 C 7.145 9.923 7.076 9.732 7.076 9.484 L 7.076 5.71 C 7.076 5.461 7.145 5.273 7.282 5.144 C 7.425 5.01 7.629 4.943 7.894 4.943 L 8.1 4.943 L 8.1 10.25 L 7.894 10.25 Z M 8.001 9.319 L 8.98 9.319 C 9.367 9.319 9.688 9.247 9.943 9.104 C 10.203 8.961 10.394 8.76 10.516 8.503 C 10.644 8.245 10.707 7.944 10.707 7.6 C 10.707 7.247 10.646 6.941 10.524 6.684 C 10.401 6.426 10.21 6.228 9.95 6.089 C 9.696 5.946 9.372 5.874 8.98 5.874 L 8.001 5.874 L 8.001 4.943 L 8.98 4.943 C 9.555 4.943 10.05 5.065 10.463 5.309 C 10.881 5.552 11.197 5.877 11.411 6.283 C 11.625 6.688 11.732 7.128 11.732 7.6 C 11.732 8.063 11.625 8.498 11.411 8.904 C 11.197 9.309 10.881 9.637 10.463 9.885 C 10.05 10.128 9.555 10.25 8.98 10.25 L 8.001 10.25 L 8.001 9.319 Z" fill="currentColor" fillRule="nonzero"  /> <path d="M 6.303 9.684 C 6.359 9.832 6.349 9.964 6.273 10.078 C 6.196 10.193 6.074 10.25 5.906 10.25 L 5.875 10.25 C 5.707 10.25 5.572 10.205 5.47 10.114 C 5.373 10.018 5.292 9.88 5.225 9.699 L 3.742 5.874 L 4.17 5.874 L 2.687 9.699 C 2.616 9.88 2.532 10.018 2.435 10.114 C 2.338 10.205 2.206 10.25 2.038 10.25 L 2.007 10.25 C 1.839 10.25 1.716 10.193 1.64 10.078 C 1.564 9.964 1.553 9.832 1.609 9.684 L 3.291 5.359 C 3.403 5.082 3.623 4.943 3.949 4.943 L 3.964 4.943 C 4.29 4.943 4.509 5.082 4.622 5.359 L 6.303 9.684 Z M 5.218 7.958 L 5.218 8.889 L 2.695 8.889 L 2.695 7.958 L 5.218 7.958 Z" fill="currentColor" fillRule="nonzero"  /> <path d="M 6.738 1.5 C 4.532 1.5 2.575 2.564 1.352 4.211 C 1.105 4.544 0.635 4.613 0.303 4.366 C -0.03 4.119 -0.099 3.649 0.148 3.317 C 1.642 1.306 4.037 0 6.738 0 C 9.438 0 11.834 1.306 13.328 3.317 C 13.575 3.649 13.505 4.119 13.173 4.366 C 12.84 4.613 12.37 4.544 12.123 4.211 C 10.9 2.564 8.944 1.5 6.738 1.5 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 6.738 14 C 4.532 14 2.575 12.936 1.352 11.289 C 1.105 10.956 0.635 10.887 0.303 11.134 C -0.03 11.381 -0.099 11.851 0.148 12.183 C 1.642 14.194 4.037 15.5 6.738 15.5 C 9.438 15.5 11.834 14.194 13.328 12.183 C 13.575 11.851 13.505 11.381 13.173 11.134 C 12.84 10.887 12.37 10.956 12.123 11.289 C 10.9 12.936 8.944 14 6.738 14 Z" fill="currentColor" fillRule="evenodd"  />
    </svg>
  );
}

export function IconCustomReports({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14.750 14.750" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 6.91 2.43 C 3.922 2.43 1.5 4.852 1.5 7.84 C 1.5 10.828 3.922 13.25 6.91 13.25 C 9.898 13.25 12.32 10.828 12.32 7.84 L 13.82 7.84 C 13.82 11.656 10.726 14.75 6.91 14.75 C 3.094 14.75 0 11.656 0 7.84 C 0 4.024 3.094 0.93 6.91 0.93 L 6.91 2.43 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 6.91 0 L 6.91 7.84 L 14.75 7.84 C 14.75 7.327 14.701 6.826 14.607 6.34 C 14.001 3.213 11.537 0.749 8.41 0.143 C 7.924 0.049 7.423 0 6.91 0 Z M 8.41 1.678 L 8.41 6.34 L 13.071 6.34 C 12.514 4.043 10.707 2.236 8.41 1.678 Z" fill="currentColor" fillRule="evenodd"  />
    </svg>
  );
}

export function IconPayment({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12.500 15.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 8.25 0.75 C 7.836 0.75 7.5 1.086 7.5 1.5 L 7.5 5.25 L 11.25 5.25 C 11.664 5.25 12 4.914 12 4.5 C 12 4.086 11.664 3.75 11.25 3.75 L 9 3.75 L 9 1.5 C 9 1.086 8.664 0.75 8.25 0.75 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 3 7 C 3 6.586 3.336 6.25 3.75 6.25 L 8.75 6.25 C 9.164 6.25 9.5 6.586 9.5 7 C 9.5 7.414 9.164 7.75 8.75 7.75 L 3.75 7.75 C 3.336 7.75 3 7.414 3 7 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 3 9.5 C 3 9.086 3.336 8.75 3.75 8.75 L 8.75 8.75 C 9.164 8.75 9.5 9.086 9.5 9.5 C 9.5 9.914 9.164 10.25 8.75 10.25 L 3.75 10.25 C 3.336 10.25 3 9.914 3 9.5 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 0 1.75 C 0 0.784 0.784 0 1.75 0 L 8.221 0 C 8.673 0 9.108 0.175 9.434 0.489 L 11.963 2.922 C 12.306 3.252 12.5 3.707 12.5 4.183 L 12.5 13.75 C 12.5 14.716 11.716 15.5 10.75 15.5 L 1.75 15.5 C 0.784 15.5 0 14.716 0 13.75 L 0 1.75 Z M 1.75 1.5 C 1.612 1.5 1.5 1.612 1.5 1.75 L 1.5 13.75 C 1.5 13.888 1.612 14 1.75 14 L 10.75 14 C 10.888 14 11 13.888 11 13.75 L 11 4.183 C 11 4.115 10.972 4.05 10.923 4.003 L 8.394 1.57 C 8.347 1.525 8.285 1.5 8.221 1.5 L 1.75 1.5 Z" fill="currentColor" fillRule="evenodd"  />
    </svg>
  );
}

export function IconAccountSetup({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 11.500 12.500" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 5.75 1.5 C 4.507 1.5 3.5 2.507 3.5 3.75 C 3.5 4.993 4.507 6 5.75 6 C 6.993 6 8 4.993 8 3.75 C 8 2.507 6.993 1.5 5.75 1.5 Z M 2 3.75 C 2 1.679 3.679 0 5.75 0 C 7.821 0 9.5 1.679 9.5 3.75 C 9.5 5.821 7.821 7.5 5.75 7.5 C 3.679 7.5 2 5.821 2 3.75 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 5.75 7.5 C 3.403 7.5 1.5 9.403 1.5 11.75 C 1.5 12.164 1.164 12.5 0.75 12.5 C 0.336 12.5 0 12.164 0 11.75 C 0 8.574 2.574 6 5.75 6 C 8.926 6 11.5 8.574 11.5 11.75 C 11.5 12.164 11.164 12.5 10.75 12.5 C 10.336 12.5 10 12.164 10 11.75 C 10 9.403 8.097 7.5 5.75 7.5 Z" fill="currentColor" fillRule="evenodd"  />
    </svg>
  );
}

export function IconGmvMax({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14.417 14.750" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 2 3.75 C 2 3.06 2.56 2.5 3.25 2.5 L 13.167 2.5 C 13.933 2.5 14.519 3.183 14.403 3.94 L 13.557 9.44 C 13.463 10.05 12.938 10.5 12.321 10.5 L 3.25 10.5 C 2.56 10.5 2 9.94 2 9.25 L 2 3.75 Z M 3.5 4 L 3.5 9 L 12.107 9 L 12.876 4 L 3.5 4 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 0.264 0.179 C 0.58 -0.09 1.053 -0.051 1.321 0.264 L 3.202 2.477 C 3.395 2.703 3.5 2.99 3.5 3.287 L 3.5 11 L 12.75 11 C 13.164 11 13.5 11.336 13.5 11.75 C 13.5 12.164 13.164 12.5 12.75 12.5 L 3.25 12.5 C 2.56 12.5 2 11.94 2 11.25 L 2 3.379 L 0.179 1.236 C -0.09 0.92 -0.051 0.447 0.264 0.179 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 3.75 13.75 C 3.75 14.302 3.302 14.75 2.75 14.75 C 2.198 14.75 1.75 14.302 1.75 13.75 C 1.75 13.198 2.198 12.75 2.75 12.75 C 3.302 12.75 3.75 13.198 3.75 13.75 Z" fill="currentColor" fillRule="nonzero"  /> <path d="M 13.75 13.75 C 13.75 14.302 13.302 14.75 12.75 14.75 C 12.198 14.75 11.75 14.302 11.75 13.75 C 11.75 13.198 12.198 12.75 12.75 12.75 C 13.302 12.75 13.75 13.198 13.75 13.75 Z" fill="currentColor" fillRule="nonzero"  />
    </svg>
  );
}

export function IconStepPixel({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 6.793 8.854 C 7.183 9.244 7.817 9.244 8.207 8.854 L 10.25 6.811 L 10.25 5.75 L 9.189 5.75 L 7.5 7.439 L 6.207 6.146 C 5.817 5.756 5.183 5.756 4.793 6.146 L 1.97 8.97 C 1.677 9.263 1.677 9.737 1.97 10.03 C 2.263 10.323 2.737 10.323 3.03 10.03 L 5.5 7.561 L 6.793 8.854 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 1.5 1.5 L 1.5 12.5 L 12.5 12.5 L 12.5 1.5 L 1.5 1.5 Z M 1 0 C 0.448 0 0 0.448 0 1 L 0 13 C 0 13.552 0.448 14 1 14 L 13 14 C 13.552 14 14 13.552 14 13 L 14 1 C 14 0.448 13.552 0 13 0 L 1 0 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 8 5.75 L 9.189 5.75 L 10.25 5.75 L 10.25 6.811 L 10.25 8 C 10.25 8.414 10.586 8.75 11 8.75 C 11.414 8.75 11.75 8.414 11.75 8 L 11.75 4.999 C 11.75 4.586 11.414 4.25 11.001 4.25 L 8 4.25 C 7.586 4.25 7.25 4.586 7.25 5 C 7.25 5.414 7.586 5.75 8 5.75 Z" fill="currentColor" fillRule="evenodd"  />
    </svg>
  );
}

export function IconChevronRight({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path transform="translate(4.354 1.25)" d="M 6.927 5.866 C 7.415 6.354 7.415 7.146 6.927 7.634 L 1.28 13.28 C 0.987 13.573 0.513 13.573 0.22 13.28 C -0.073 12.987 -0.073 12.513 0.22 12.22 L 5.689 6.75 L 0.22 1.28 C -0.073 0.987 -0.073 0.513 0.22 0.22 C 0.513 -0.073 0.987 -0.073 1.28 0.22 L 6.927 5.866 Z" fillRule="evenodd"  />
    </svg>
  );
}

export function IconInfo({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path fill="currentColor" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 1.5a5 5 0 1 1 0 10A5 5 0 0 1 8 3zm-.75 3.25h1.5v1.5h-1.5v-1.5zm0 3h1.5v4h-1.5v-4z"  />
    </svg>
  );
}

export function IconCloseSmall({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path fill="currentColor" d="M4.47 4.47a.75.75 0 0 1 1.06 0L8 6.94l2.47-2.47a.75.75 0 1 1 1.06 1.06L9.06 8l2.47 2.47a.75.75 0 1 1-1.06 1.06L8 9.06l-2.47 2.47a.75.75 0 1 1-1.06-1.06L6.94 8 4.47 5.53a.75.75 0 0 1 0-1.06z"  />
    </svg>
  );
}

export function IconEdit({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12.500 13.233" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 11.764 0.731 C 12.739 1.707 12.739 3.288 11.764 4.263 L 5.01 11.017 C 4.94 11.087 4.846 11.126 4.748 11.128 L 2.377 11.155 C 1.82 11.161 1.365 10.711 1.365 10.154 L 1.366 7.746 C 1.366 7.646 1.405 7.551 1.476 7.48 L 8.233 0.73 C 9.208 -0.244 10.789 -0.243 11.764 0.731 Z M 2.865 8.212 L 2.865 9.649 L 4.273 9.633 L 9.457 4.449 L 8.046 3.037 L 2.865 8.212 Z M 10.703 3.203 L 10.518 3.388 L 9.107 1.977 L 9.293 1.792 C 9.683 1.403 10.314 1.403 10.703 1.792 C 11.093 2.182 11.093 2.813 10.703 3.203 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 0.75 11.733 C 0.336 11.733 0 12.069 0 12.483 C 0 12.898 0.336 13.233 0.75 13.233 L 11.75 13.233 C 12.164 13.233 12.5 12.898 12.5 12.483 C 12.5 12.069 12.164 11.733 11.75 11.733 L 0.75 11.733 Z" fill="currentColor" fillRule="nonzero"  />
    </svg>
  );
}

export function IconCalendar({ size = 16, className, style, title }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 13.499" fill="currentColor" className={className} style={{ flex: 'none', ...style }} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M 1.5 2.999 L 1.5 11.999 L 12.5 11.999 L 12.5 2.999 L 1.5 2.999 Z M 1 1.499 C 0.448 1.499 0 1.946 0 2.499 L 0 12.499 C 0 13.051 0.448 13.499 1 13.499 L 13 13.499 C 13.552 13.499 14 13.051 14 12.499 L 14 2.499 C 14 1.946 13.552 1.499 13 1.499 L 1 1.499 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 4 0 C 4.414 0 4.75 0.336 4.75 0.75 L 4.75 3.256 C 4.75 3.67 4.414 4.006 4 4.006 C 3.586 4.006 3.25 3.67 3.25 3.256 L 3.25 0.75 C 3.25 0.336 3.586 0 4 0 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 10 0 C 10.414 0 10.75 0.336 10.75 0.75 L 10.75 3.256 C 10.75 3.67 10.414 4.006 10 4.006 C 9.586 4.006 9.25 3.67 9.25 3.256 L 9.25 0.75 C 9.25 0.336 9.586 0 10 0 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 13.5 6.249 L 0.5 6.249 L 0.5 4.749 L 13.5 4.749 L 13.5 6.249 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 2.25 7.97 C 2.25 7.556 2.586 7.22 3 7.22 L 7 7.22 C 7.414 7.22 7.75 7.556 7.75 7.97 C 7.75 8.385 7.414 8.72 7 8.72 L 3 8.72 C 2.586 8.72 2.25 8.385 2.25 7.97 Z" fill="currentColor" fillRule="evenodd"  /> <path d="M 2.25 10.482 C 2.25 10.067 2.586 9.732 3 9.732 L 10 9.732 C 10.414 9.732 10.75 10.067 10.75 10.482 C 10.75 10.896 10.414 11.232 10 11.232 L 3 11.232 C 2.586 11.232 2.25 10.896 2.25 10.482 Z" fill="currentColor" fillRule="evenodd"  />
    </svg>
  );
}
