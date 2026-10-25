import * as React from 'react';
/** Indexed item: teal bracket index "[ 1 ]", 24px title, 20px body, optional action 48px below. 420px column in source. */
export interface StepProps {
  /** Rendered verbatim — source uses "[ 1 ]", "( 3 )", "{ 1 }" */
  index?: string;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Step(props: StepProps): JSX.Element;
