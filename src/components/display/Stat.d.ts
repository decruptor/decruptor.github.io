import * as React from 'react';
/** Big number (46px Funnel Display) + micro unit, then 24px title and 20px description. Children render below (e.g. a progress meter). */
export interface StatProps {
  value: React.ReactNode;
  unit?: string;
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Stat(props: StatProps): JSX.Element;
