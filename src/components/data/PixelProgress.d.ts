import * as React from 'react';
/** Row of 8×8 pixels with 2px gaps (358px at 36 cells) filled to value, with an uppercase label in the fill colour. */
export interface PixelProgressProps {
  /** 0–1 */
  value: number;
  cells?: number;
  /** px between cells; default 2 */
  gap?: number;
  label?: string;
  color?: string;
  track?: string;
  style?: React.CSSProperties;
}
export declare function PixelProgress(props: PixelProgressProps): JSX.Element;
