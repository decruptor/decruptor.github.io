import * as React from 'react';
/** Outlined Space Grotesk tag (1.5px stroke, radius 1). For identifiers: repo names, submission ids, evidence class. */
export interface TagProps {
  tone?: 'blue' | 'violet' | 'teal' | 'ink';
  href?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
