import * as React from 'react';
/** Stepped bar silhouette (12 bars, 1/12 width each) that rises out of a coloured band — the section-transition motif. */
export interface SkylineProps {
  preset?: 'stairs' | 'city';
  /** px heights, overrides preset */
  heights?: number[];
  tone?: 'violet' | 'teal' | 'tint' | string;
  style?: React.CSSProperties;
}
export declare function Skyline(props: SkylineProps): JSX.Element;
