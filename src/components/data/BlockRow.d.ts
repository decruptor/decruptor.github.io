import * as React from 'react';
/** Row of 96px "blocks" (radius 1, gap 7) — the key-space-partition motif. */
export interface BlockRowProps {
  count?: number;
  /** indices rendered in the fill colour */
  filled?: number[];
  size?: number;
  gap?: number;
  color?: string;
  empty?: string;
  style?: React.CSSProperties;
}
export declare function BlockRow(props: BlockRowProps): JSX.Element;
