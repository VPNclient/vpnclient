// Components.d.ts — the complete catalog of the 8 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.All) and usable directly in JSX.
import * as React from 'react';

// figma layer: "Аватарка-All" (node 137:1523)
export interface AllProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Аватарка-HR" (node 137:1519)
export interface HRProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "husband 001 1" (node 137:1502)
export interface Husband0011Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Аватарка-Реклама" (node 137:1503)
export interface ScreenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Аватарка-Руководство" (node 137:1507)
export interface Screen2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Аватарка-Продажи" (node 137:1511)
export interface Screen3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Аватарка-Аналитика" (node 137:1515)
export interface Screen4Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vector" (node 137:1499)
export interface VectorProps {
  className?: string;
  style?: React.CSSProperties;
}

declare const All: React.FC<AllProps>;
declare const HR: React.FC<HRProps>;
declare const Husband0011: React.FC<Husband0011Props>;
declare const Screen: React.FC<ScreenProps>;
declare const Screen2: React.FC<Screen2Props>;
declare const Screen3: React.FC<Screen3Props>;
declare const Screen4: React.FC<Screen4Props>;
declare const Vector: React.FC<VectorProps>;
declare global {
  interface Window {
    All: React.FC<AllProps>;
    HR: React.FC<HRProps>;
    Husband0011: React.FC<Husband0011Props>;
    Screen: React.FC<ScreenProps>;
    Screen2: React.FC<Screen2Props>;
    Screen3: React.FC<Screen3Props>;
    Screen4: React.FC<Screen4Props>;
    Vector: React.FC<VectorProps>;
  }
}
