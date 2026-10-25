import * as React from 'react';
/** Filled status label ("Current challenge"): 20px uppercase on a tint, square corners, optional pixel mark. */
export interface BadgeProps {
  /** violet = in progress / current; teal = solved / verified; ink = inverted */
  tone?: 'violet' | 'teal' | 'ink';
  /** Append the Decruptor pixel mark */
  mark?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
