import * as React from 'react';
/** 60px pixel icon, 32px title, 20px description; 3-up across 1180px in source ("Why Decruptor?"). */
export interface FeatureProps {
  /** 60×60 slot — use a pixel mark asset from assets/marks */
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Feature(props: FeatureProps): JSX.Element;
