import * as React from 'react';
/** Flat device silhouette: 224×436, radius 24.89, solid 22px ink ring. Content is centred. */
export interface PhoneFrameProps {
  children?: React.ReactNode;
  screen?: string;
  style?: React.CSSProperties;
}
export declare function PhoneFrame(props: PhoneFrameProps): JSX.Element;
