// Components.d.ts — the complete catalog of the 9 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.Checkbox) and usable directly in JSX.
import * as React from 'react';

// figma layer: "Checkbox" (node 487:8847)
export interface CheckboxProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "on" | "off";
}

// figma layer: "Cover" (node 880:1689)
export interface CoverProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Flags" (node 309:1314)
export interface FlagsProps {
  className?: string;
  style?: React.CSSProperties;
  country?: "argentina" | "belgium" | "bolgaria" | "germany" | "japan" | "kazahstan" | "poland" | "spain" | "armenia" | "auto" | "france" | "turkey" | "usa" | "china" | "swiss" | "australia" | "brazil" | "canada" | "chilie" | "cuba" | "czech" | "india" | "denmark" | "greece" | "ukraine" | "britan" | "netherlands" | "finland" | "hong kong" | "portugal" | "ireland" | "lithuania" | "russia" | "belarus" | "latvia" | "israel" | "serbia" | "austria" | "sweden" | "estonia" | "italy" | "romany" | "hungary" | "mexico" | "south africa" | "vietnam" | "indonesia" | "cambodia" | "malaysia" | "mongolia" | "nepal" | "new zealand" | "pakistan" | "south korea" | "singapur" | "thailand" | "guinea" | "united arab emirates" | "saudi arabia" | "tunisia" | "georgia" | "norway" | "croatia" | "montenegro";
}

// figma layer: "01 RU" (node 878:4420)
export interface RU01Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "02 RU" (node 878:4443)
export interface RU02Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "03 RU" (node 878:4452)
export interface RU03Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "04 RU" (node 878:4501)
export interface RU04Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "05 RU" (node 878:4437)
export interface RU05Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Server-Item" (node 302:1133)
export interface ServerItemProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "default" | "touch" | "disable-flag";
  /** Text content; defaults to "Германия". */
  text1?: string;
  /** Text content; defaults to "46 ms". */
  text2?: string;
  /** Text content; defaults to "46 ms". */
  text3?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

declare const Checkbox: React.FC<CheckboxProps>;
declare const Cover: React.FC<CoverProps>;
declare const Flags: React.FC<FlagsProps>;
declare const RU01: React.FC<RU01Props>;
declare const RU02: React.FC<RU02Props>;
declare const RU03: React.FC<RU03Props>;
declare const RU04: React.FC<RU04Props>;
declare const RU05: React.FC<RU05Props>;
declare const ServerItem: React.FC<ServerItemProps>;
declare global {
  interface Window {
    Checkbox: React.FC<CheckboxProps>;
    Cover: React.FC<CoverProps>;
    Flags: React.FC<FlagsProps>;
    RU01: React.FC<RU01Props>;
    RU02: React.FC<RU02Props>;
    RU03: React.FC<RU03Props>;
    RU04: React.FC<RU04Props>;
    RU05: React.FC<RU05Props>;
    ServerItem: React.FC<ServerItemProps>;
  }
}
