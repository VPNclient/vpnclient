// Components.d.ts — the complete catalog of the 29 component(s) in
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

// figma layer: "Button" (node 790:20586)
export interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "touch";
  /** Text content; defaults to "Продлить подписку". */
  text1?: string;
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

// figma layer: "Info-Default" (node 691:19690)
export interface InfoDefaultProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Info-Default" (node 808:13659)
export interface InfoDefault2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Info-Default" (node 808:21883)
export interface InfoDefault3Props {
  className?: string;
  style?: React.CSSProperties;
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

// figma layer: "Info-Test-200" (node 808:13997)
export interface InfoTest200Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Info-Test-50" (node 808:13773)
export interface InfoTest50Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Info-Test-Download-50" (node 808:13885)
export interface InfoTestDownload50Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Info-Test-Full" (node 808:14221)
export interface InfoTestFullProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Info-Test-Upload-200" (node 808:14109)
export interface InfoTestUpload200Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Location" (node 1:57)
export interface LocationProps {
  className?: string;
  style?: React.CSSProperties;
  dark?: boolean;
}

// figma layer: "Main-On" (node 691:19600)
export interface MainOnProps {
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

// figma layer: "Readme" (node 806:13647)
export interface ReadmeProps {
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
declare const Button: React.FC<ButtonProps>;
declare const Component: React.FC<ComponentProps>;
declare const Data: React.FC<DataProps>;
declare const Flags: React.FC<FlagsProps>;
declare const Icon: React.FC<IconProps>;
declare const Icon2: React.FC<Icon2Props>;
declare const InfoDefault: React.FC<InfoDefaultProps>;
declare const InfoDefault2: React.FC<InfoDefault2Props>;
declare const InfoDefault3: React.FC<InfoDefault3Props>;
declare const InfoItem: React.FC<InfoItemProps>;
declare const InfoTest200: React.FC<InfoTest200Props>;
declare const InfoTest50: React.FC<InfoTest50Props>;
declare const InfoTestDownload50: React.FC<InfoTestDownload50Props>;
declare const InfoTestFull: React.FC<InfoTestFullProps>;
declare const InfoTestUpload200: React.FC<InfoTestUpload200Props>;
declare const Location: React.FC<LocationProps>;
declare const MainOn: React.FC<MainOnProps>;
declare const Network: React.FC<NetworkProps>;
declare const Push: React.FC<PushProps>;
declare const Readme: React.FC<ReadmeProps>;
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
    Button: React.FC<ButtonProps>;
    Component: React.FC<ComponentProps>;
    Data: React.FC<DataProps>;
    Flags: React.FC<FlagsProps>;
    Icon: React.FC<IconProps>;
    Icon2: React.FC<Icon2Props>;
    InfoDefault: React.FC<InfoDefaultProps>;
    InfoDefault2: React.FC<InfoDefault2Props>;
    InfoDefault3: React.FC<InfoDefault3Props>;
    InfoItem: React.FC<InfoItemProps>;
    InfoTest200: React.FC<InfoTest200Props>;
    InfoTest50: React.FC<InfoTest50Props>;
    InfoTestDownload50: React.FC<InfoTestDownload50Props>;
    InfoTestFull: React.FC<InfoTestFullProps>;
    InfoTestUpload200: React.FC<InfoTestUpload200Props>;
    Location: React.FC<LocationProps>;
    MainOn: React.FC<MainOnProps>;
    Network: React.FC<NetworkProps>;
    Push: React.FC<PushProps>;
    Readme: React.FC<ReadmeProps>;
    ServerMain: React.FC<ServerMainProps>;
    StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
    Switch: React.FC<SwitchProps>;
    SwitchItem: React.FC<SwitchItemProps>;
    Tabbar: React.FC<TabbarProps>;
    Time: React.FC<TimeProps>;
    Top: React.FC<TopProps>;
  }
}
