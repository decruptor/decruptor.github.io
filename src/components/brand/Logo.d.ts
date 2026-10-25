import * as React from 'react';
/**
 * DECRUPTOR wordmark (Funnel Display ExtraBold, uppercase, +0.02em) followed by the pixel mark.
 * @startingPoint section="Brand" subtitle="Wordmark + pixel mark" viewport="700x260"
 */
export interface LogoProps {
  /** wordmark font size in px. Header = 41.07, closing band = 30.99, specimen = 97.96 */
  size?: number;
  color?: string;
  markColor?: string;
  mark?: boolean;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
