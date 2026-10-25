import * as React from 'react';
/** Full-bleed colour band with an inner framed box marked by four PixelPlus corners (inset 67/52, padding 52/68). */
export interface BandProps {
  tone?: 'violet' | 'teal' | 'tint' | 'paper' | 'white' | string;
  corners?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
}
export declare function Band(props: BandProps): JSX.Element;
