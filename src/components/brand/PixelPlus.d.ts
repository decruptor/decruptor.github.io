import * as React from 'react';
/** 20px pixel crosshair (four 4×8 bars around an open centre) — registration mark for page corners and framed bands. */
export interface PixelPlusProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}
export declare function PixelPlus(props: PixelPlusProps): JSX.Element;
