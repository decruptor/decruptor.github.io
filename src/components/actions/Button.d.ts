import * as React from 'react';
/**
 * Solid uppercase action. 73px tall (md) with the bracket-play glyph; radius 10.
 * @startingPoint section="Actions" subtitle="Solid uppercase button — ink, violet, teal, blue" viewport="700x300"
 */
export interface ButtonProps {
  /** ink = default/primary on light & bands; violet = brand CTA; teal = positive/verification; blue = link-like */
  variant?: 'ink' | 'violet' | 'teal' | 'blue';
  /** md = 20px text, 24/32 padding; sm = 10px text, used inside PhoneFrame */
  size?: 'md' | 'sm';
  /** Show the bracket-play glyph. Default true. */
  icon?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
