import * as React from 'react';
/** Space Grotesk 12/16 uppercase multi-line readout (hero corner stats). */
export interface DataReadoutProps {
  heading?: string;
  lines: string[];
  tone?: 'teal' | 'violet' | 'ink';
  align?: 'left' | 'right';
  style?: React.CSSProperties;
}
export declare function DataReadout(props: DataReadoutProps): JSX.Element;
