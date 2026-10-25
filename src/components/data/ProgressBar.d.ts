import * as React from 'react';
/** 12px square-ended bar (track + fill) with centered micro label. */
export interface ProgressBarProps {
  value: number;
  tone?: 'violet' | 'teal' | 'ink';
  label?: string;
  /** px or CSS length; default 184 */
  width?: number | string;
  style?: React.CSSProperties;
}
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
