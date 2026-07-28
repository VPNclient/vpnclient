// Components.d.ts — the complete catalog of the 25 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.Battery) and usable directly in JSX.
import * as React from 'react';

// figma layer: "Battery" (node 1:108)
export interface BatteryProps {
  className?: string;
  style?: React.CSSProperties;
  chargeStatus?: "full" | "charging" | "medium" | "low";
  dark?: boolean;
  /** Text content; defaults to "12". */
  text1?: string;
}

// figma layer: "Btn-Main" (node 137:1199)
export interface BtnMainProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "off" | "on";
}

// figma layer: "Checkbox" (node 487:8847)
export interface CheckboxProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "on" | "off";
}

// figma layer: "9:41" (node 1:50)
export interface ComponentProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "9:41". */
  text1?: string;
}

// figma layer: "Data" (node 1:91)
export interface DataProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "5g" | "hotspot" | "lte" | "wifi";
  dark?: boolean;
}

// figma layer: "Flags" (node 309:1314)
export interface FlagsProps {
  className?: string;
  style?: React.CSSProperties;
  country?: "argentina" | "belgium" | "bolgaria" | "germany" | "japan" | "kazahstan" | "poland" | "spain" | "armenia" | "auto" | "france" | "turkey" | "usa" | "china" | "swiss" | "australia" | "brazil" | "canada" | "chilie" | "cuba" | "czech" | "india" | "denmark" | "greece" | "ukraine" | "britan" | "netherlands" | "finland" | "hong kong" | "portugal" | "ireland" | "lithuania" | "russia" | "belarus" | "latvia" | "israel" | "serbia" | "austria" | "sweden" | "estonia" | "italy" | "romany" | "hungary" | "mexico" | "south africa" | "vietnam" | "indonesia" | "cambodia" | "malaysia" | "mongolia" | "nepal" | "new zealand" | "pakistan" | "south korea" | "singapur" | "thailand" | "guinea" | "united arab emirates" | "saudi arabia" | "tunisia" | "georgia" | "norway" | "croatia" | "montenegro";
}

// figma layer: "Icon" (node 78:395)
export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "on" | "off";
  type?: "apps" | "home" | "servers" | "settings";
}

// figma layer: "Icon" (node 137:534)
export interface Icon2Props {
  className?: string;
  style?: React.CSSProperties;
  type?: "download" | "signal" | "upload" | "filter" | "search" | "question" | "r-arrow" | "profile" | "support" | "night" | "card" | "exclamation" | "back" | "plus" | "cross" | "clip" | "screen";
}

// figma layer: "Info-Item" (node 137:865)
export interface InfoItemProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "23.1 Mb/s". */
  text1?: string;
  /** Text content; defaults to "23.1 Mb/s". */
  text2?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Location" (node 1:57)
export interface LocationProps {
  className?: string;
  style?: React.CSSProperties;
  dark?: boolean;
}

// figma layer: "Network" (node 1:62)
export interface NetworkProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "airplane mode" | "bad signal" | "good signal";
  dark?: boolean;
}

// figma layer: "Push" (node 829:20930)
export interface PushProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "2". */
  text1?: string;
}

// figma layer: "1" (node 1071:49661)
export interface ScreenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "2" (node 1071:49703)
export interface Screen2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "3" (node 1071:49909)
export interface Screen3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "4" (node 1071:49954)
export interface Screen4Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "5" (node 1074:51257)
export interface Screen5Props {
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

// figma layer: "Server-Main" (node 319:592)
export interface ServerMainProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "Ваша локация". */
  text1?: string;
  /** Text content; defaults to "Германия". */
  text2?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Status bar/iPhone 14/Main" (node 1:145)
export interface StatusBarIPhone14MainProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "iphone 14 main";
  dark?: boolean;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon4?: React.ReactNode;
}

// figma layer: "Switch" (node 487:9047)
export interface SwitchProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "off" | "on";
}

// figma layer: "Switch-Item" (node 487:9085)
export interface SwitchItemProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "default" | "touch";
  /** Text content; defaults to "Все приложения". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Tabbar" (node 78:402)
export interface TabbarProps {
  className?: string;
  style?: React.CSSProperties;
  type?: "apps" | "servers" | "main" | "speed" | "settings-push" | "home-settings-push" | "settings" | "support";
  /** Text content; defaults to "Сообщение". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon4?: React.ReactNode;
}

// figma layer: "Time" (node 1:52)
export interface TimeProps {
  className?: string;
  style?: React.CSSProperties;
  dark?: boolean;
  /** Text content; defaults to "9:41". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Top" (node 78:515)
export interface TopProps {
  className?: string;
  style?: React.CSSProperties;
  type?: "main" | "servers" | "apps" | "info" | "settings" | "support";
  /** Text content; defaults to "VPN Client". */
  text1?: string;
  /** Text content; defaults to "dev-версия". */
  text2?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

declare const Battery: React.FC<BatteryProps>;
declare const BtnMain: React.FC<BtnMainProps>;
declare const Checkbox: React.FC<CheckboxProps>;
declare const Component: React.FC<ComponentProps>;
declare const Data: React.FC<DataProps>;
declare const Flags: React.FC<FlagsProps>;
declare const Icon: React.FC<IconProps>;
declare const Icon2: React.FC<Icon2Props>;
declare const InfoItem: React.FC<InfoItemProps>;
declare const Location: React.FC<LocationProps>;
declare const Network: React.FC<NetworkProps>;
declare const Push: React.FC<PushProps>;
declare const Screen: React.FC<ScreenProps>;
declare const Screen2: React.FC<Screen2Props>;
declare const Screen3: React.FC<Screen3Props>;
declare const Screen4: React.FC<Screen4Props>;
declare const Screen5: React.FC<Screen5Props>;
declare const ServerItem: React.FC<ServerItemProps>;
declare const ServerMain: React.FC<ServerMainProps>;
declare const StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
declare const Switch: React.FC<SwitchProps>;
declare const SwitchItem: React.FC<SwitchItemProps>;
declare const Tabbar: React.FC<TabbarProps>;
declare const Time: React.FC<TimeProps>;
declare const Top: React.FC<TopProps>;
declare global {
  interface Window {
    Battery: React.FC<BatteryProps>;
    BtnMain: React.FC<BtnMainProps>;
    Checkbox: React.FC<CheckboxProps>;
    Component: React.FC<ComponentProps>;
    Data: React.FC<DataProps>;
    Flags: React.FC<FlagsProps>;
    Icon: React.FC<IconProps>;
    Icon2: React.FC<Icon2Props>;
    InfoItem: React.FC<InfoItemProps>;
    Location: React.FC<LocationProps>;
    Network: React.FC<NetworkProps>;
    Push: React.FC<PushProps>;
    Screen: React.FC<ScreenProps>;
    Screen2: React.FC<Screen2Props>;
    Screen3: React.FC<Screen3Props>;
    Screen4: React.FC<Screen4Props>;
    Screen5: React.FC<Screen5Props>;
    ServerItem: React.FC<ServerItemProps>;
    ServerMain: React.FC<ServerMainProps>;
    StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
    Switch: React.FC<SwitchProps>;
    SwitchItem: React.FC<SwitchItemProps>;
    Tabbar: React.FC<TabbarProps>;
    Time: React.FC<TimeProps>;
    Top: React.FC<TopProps>;
  }
}
