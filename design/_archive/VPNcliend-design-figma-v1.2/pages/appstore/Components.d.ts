// Components.d.ts — the complete catalog of the 13 component(s) in
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

// figma layer: "Flags" (node 309:1314)
export interface FlagsProps {
  className?: string;
  style?: React.CSSProperties;
  country?: "argentina" | "belgium" | "bolgaria" | "germany" | "japan" | "kazahstan" | "poland" | "spain" | "armenia" | "auto" | "france" | "turkey" | "usa" | "china" | "swiss" | "australia" | "brazil" | "canada" | "chilie" | "cuba" | "czech" | "india" | "denmark" | "greece" | "ukraine" | "britan" | "netherlands" | "finland" | "hong kong" | "portugal" | "ireland" | "lithuania" | "russia" | "belarus" | "latvia" | "israel" | "serbia" | "austria" | "sweden" | "estonia" | "italy" | "romany" | "hungary" | "mexico" | "south africa" | "vietnam" | "indonesia" | "cambodia" | "malaysia" | "mongolia" | "nepal" | "new zealand" | "pakistan" | "south korea" | "singapur" | "thailand" | "guinea" | "united arab emirates" | "saudi arabia" | "tunisia" | "georgia" | "norway" | "croatia" | "montenegro";
}

// figma layer: "Large 01 RU" (node 877:24109)
export interface Large01RUProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Large 02 RU" (node 877:24126)
export interface Large02RUProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Large 03 RU" (node 877:24135)
export interface Large03RUProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Large 04 RU" (node 877:24184)
export interface Large04RUProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Large 05 RU" (node 877:24195)
export interface Large05RUProps {
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

// figma layer: "Small 01 RU" (node 878:4274)
export interface Small01RUProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Small 02 RU" (node 878:4291)
export interface Small02RUProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Small 03 RU" (node 878:4300)
export interface Small03RUProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Small 04 RU" (node 878:4349)
export interface Small04RUProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Small 05 RU" (node 878:4361)
export interface Small05RUProps {
  className?: string;
  style?: React.CSSProperties;
}

declare const Checkbox: React.FC<CheckboxProps>;
declare const Flags: React.FC<FlagsProps>;
declare const Large01RU: React.FC<Large01RUProps>;
declare const Large02RU: React.FC<Large02RUProps>;
declare const Large03RU: React.FC<Large03RUProps>;
declare const Large04RU: React.FC<Large04RUProps>;
declare const Large05RU: React.FC<Large05RUProps>;
declare const ServerItem: React.FC<ServerItemProps>;
declare const Small01RU: React.FC<Small01RUProps>;
declare const Small02RU: React.FC<Small02RUProps>;
declare const Small03RU: React.FC<Small03RUProps>;
declare const Small04RU: React.FC<Small04RUProps>;
declare const Small05RU: React.FC<Small05RUProps>;
declare global {
  interface Window {
    Checkbox: React.FC<CheckboxProps>;
    Flags: React.FC<FlagsProps>;
    Large01RU: React.FC<Large01RUProps>;
    Large02RU: React.FC<Large02RUProps>;
    Large03RU: React.FC<Large03RUProps>;
    Large04RU: React.FC<Large04RUProps>;
    Large05RU: React.FC<Large05RUProps>;
    ServerItem: React.FC<ServerItemProps>;
    Small01RU: React.FC<Small01RUProps>;
    Small02RU: React.FC<Small02RUProps>;
    Small03RU: React.FC<Small03RUProps>;
    Small04RU: React.FC<Small04RUProps>;
    Small05RU: React.FC<Small05RUProps>;
  }
}
