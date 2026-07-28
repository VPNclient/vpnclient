// Components.d.ts — the complete catalog of the 40 component(s) in
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

// figma layer: "Lost-Internet" (node 691:8335)
export interface LostInternetProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Lost-Internet-1" (node 691:7750)
export interface LostInternet1Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Lost-Internet-2" (node 691:7845)
export interface LostInternet2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Lost-Internet-3" (node 691:7940)
export interface LostInternet3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Lost-Internet-4" (node 691:7655)
export interface LostInternet4Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Lost-Internet-5" (node 691:8138)
export interface LostInternet5Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Lost-Internet-Start" (node 691:19504)
export interface LostInternetStartProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main Connection 1/2" (node 137:1023)
export interface MainConnection12Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main Connection 2/2" (node 137:1117)
export interface MainConnection22Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main Disconect" (node 162:932)
export interface MainDisconectProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main-Disconect-Timer" (node 644:7076)
export interface MainDisconectTimerProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main Off" (node 86:781)
export interface MainOffProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main Off" (node 644:7171)
export interface MainOff2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main Off Touch" (node 137:942)
export interface MainOffTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main-On" (node 644:6983)
export interface MainOnProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main-On" (node 691:7381)
export interface MainOn2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main-On" (node 644:7260)
export interface MainOn3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main-On-Timer" (node 137:1374)
export interface MainOnTimerProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main On Touch" (node 137:1541)
export interface MainOnTouchProps {
  className?: string;
  style?: React.CSSProperties;
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

// figma layer: "Readme" (node 137:1528)
export interface ReadmeProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Readme" (node 691:7374)
export interface Readme2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Readme" (node 644:18424)
export interface Readme3Props {
  className?: string;
  style?: React.CSSProperties;
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
declare const Component: React.FC<ComponentProps>;
declare const Data: React.FC<DataProps>;
declare const Flags: React.FC<FlagsProps>;
declare const Icon: React.FC<IconProps>;
declare const Icon2: React.FC<Icon2Props>;
declare const InfoItem: React.FC<InfoItemProps>;
declare const Location: React.FC<LocationProps>;
declare const LostInternet: React.FC<LostInternetProps>;
declare const LostInternet1: React.FC<LostInternet1Props>;
declare const LostInternet2: React.FC<LostInternet2Props>;
declare const LostInternet3: React.FC<LostInternet3Props>;
declare const LostInternet4: React.FC<LostInternet4Props>;
declare const LostInternet5: React.FC<LostInternet5Props>;
declare const LostInternetStart: React.FC<LostInternetStartProps>;
declare const MainConnection12: React.FC<MainConnection12Props>;
declare const MainConnection22: React.FC<MainConnection22Props>;
declare const MainDisconect: React.FC<MainDisconectProps>;
declare const MainDisconectTimer: React.FC<MainDisconectTimerProps>;
declare const MainOff: React.FC<MainOffProps>;
declare const MainOff2: React.FC<MainOff2Props>;
declare const MainOffTouch: React.FC<MainOffTouchProps>;
declare const MainOn: React.FC<MainOnProps>;
declare const MainOn2: React.FC<MainOn2Props>;
declare const MainOn3: React.FC<MainOn3Props>;
declare const MainOnTimer: React.FC<MainOnTimerProps>;
declare const MainOnTouch: React.FC<MainOnTouchProps>;
declare const Network: React.FC<NetworkProps>;
declare const Push: React.FC<PushProps>;
declare const Readme: React.FC<ReadmeProps>;
declare const Readme2: React.FC<Readme2Props>;
declare const Readme3: React.FC<Readme3Props>;
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
    Component: React.FC<ComponentProps>;
    Data: React.FC<DataProps>;
    Flags: React.FC<FlagsProps>;
    Icon: React.FC<IconProps>;
    Icon2: React.FC<Icon2Props>;
    InfoItem: React.FC<InfoItemProps>;
    Location: React.FC<LocationProps>;
    LostInternet: React.FC<LostInternetProps>;
    LostInternet1: React.FC<LostInternet1Props>;
    LostInternet2: React.FC<LostInternet2Props>;
    LostInternet3: React.FC<LostInternet3Props>;
    LostInternet4: React.FC<LostInternet4Props>;
    LostInternet5: React.FC<LostInternet5Props>;
    LostInternetStart: React.FC<LostInternetStartProps>;
    MainConnection12: React.FC<MainConnection12Props>;
    MainConnection22: React.FC<MainConnection22Props>;
    MainDisconect: React.FC<MainDisconectProps>;
    MainDisconectTimer: React.FC<MainDisconectTimerProps>;
    MainOff: React.FC<MainOffProps>;
    MainOff2: React.FC<MainOff2Props>;
    MainOffTouch: React.FC<MainOffTouchProps>;
    MainOn: React.FC<MainOnProps>;
    MainOn2: React.FC<MainOn2Props>;
    MainOn3: React.FC<MainOn3Props>;
    MainOnTimer: React.FC<MainOnTimerProps>;
    MainOnTouch: React.FC<MainOnTouchProps>;
    Network: React.FC<NetworkProps>;
    Push: React.FC<PushProps>;
    Readme: React.FC<ReadmeProps>;
    Readme2: React.FC<Readme2Props>;
    Readme3: React.FC<Readme3Props>;
    ServerMain: React.FC<ServerMainProps>;
    StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
    Switch: React.FC<SwitchProps>;
    SwitchItem: React.FC<SwitchItemProps>;
    Tabbar: React.FC<TabbarProps>;
    Time: React.FC<TimeProps>;
    Top: React.FC<TopProps>;
  }
}
