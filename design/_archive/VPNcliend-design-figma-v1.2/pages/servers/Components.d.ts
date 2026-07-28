// Components.d.ts — the complete catalog of the 43 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.AlphabeticKeyboardIPhone) and usable directly in JSX.
import * as React from 'react';

// figma layer: "Alphabetic Keyboard (iPhone)" (node 364:7015)
export interface AlphabeticKeyboardIPhoneProps {
  className?: string;
  style?: React.CSSProperties;
  darkMode?: boolean;
  suggestion?: boolean;
  /** Text content; defaults to "return". */
  text1?: string;
  /** Text content; defaults to "space". */
  text2?: string;
  /** Text content; defaults to "123". */
  text3?: string;
  /** Text content; defaults to "M". */
  text4?: string;
}

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

// figma layer: "Chose-Server" (node 387:5009)
export interface ChoseServerProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Server-Bot" (node 720:19937)
export interface ChoseServerBotProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Server-End" (node 366:10389)
export interface ChoseServerEndProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Server-Germany" (node 262:958)
export interface ChoseServerGermanyProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Server-Germany-Touch" (node 319:5241)
export interface ChoseServerGermanyTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Server-Start" (node 262:871)
export interface ChoseServerStartProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Server-Turkey" (node 319:4379)
export interface ChoseServerTurkeyProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Server-Turkey-Chosen" (node 319:3417)
export interface ChoseServerTurkeyChosenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Server-Turkey-Touch" (node 319:3505)
export interface ChoseServerTurkeyTouchProps {
  className?: string;
  style?: React.CSSProperties;
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

// figma layer: "🧰/Home Indicator (iPhone)" (node 364:7010)
export interface HomeIndicatorIPhoneProps {
  className?: string;
  style?: React.CSSProperties;
  darkMode?: boolean;
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

// figma layer: "Input-Search" (node 302:958)
export interface InputSearchProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "default" | "touch" | "type" | "typing" | "typing-2" | "card" | "numbers" | "card-touch" | "card-typing";
  /** Text content; defaults to "Название страны". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
}

// figma layer: "🧰/Keyboard suggestion (iPhone)" (node 364:6961)
export interface KeyboardSuggestionIPhoneProps {
  className?: string;
  style?: React.CSSProperties;
  darkMode?: boolean;
  type?: "text" | "security code" | "apps";
  code?: string;
  subheading?: boolean;
  subheading2?: string;
  /** Text content; defaults to "“design”". */
  text1?: string;
  /** Text content; defaults to "Design". */
  text2?: string;
  /** Text content; defaults to "Designer". */
  text3?: string;
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

// figma layer: "Pay-Logos" (node 1058:22902)
export interface PayLogosProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "mastercard" | "visa" | "mir";
}

// figma layer: "Push" (node 829:20930)
export interface PushProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "2". */
  text1?: string;
}

// figma layer: "Readme" (node 319:6576)
export interface ReadmeProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Readme" (node 387:5879)
export interface Readme2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Readme" (node 364:3661)
export interface Readme3Props {
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

// figma layer: "Server-Search" (node 573:8164)
export interface ServerSearchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Server-Search-Be-Touch" (node 366:10204)
export interface ServerSearchBeTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Server-Search-Load" (node 366:9617)
export interface ServerSearchLoadProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Server-Search-Open" (node 364:4569)
export interface ServerSearchOpenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Server-Search-Start" (node 364:3665)
export interface ServerSearchStartProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Server-Search-Type-B" (node 366:9247)
export interface ServerSearchTypeBProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Server-Search-Type-E" (node 366:9804)
export interface ServerSearchTypeEProps {
  className?: string;
  style?: React.CSSProperties;
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

declare const AlphabeticKeyboardIPhone: React.FC<AlphabeticKeyboardIPhoneProps>;
declare const Battery: React.FC<BatteryProps>;
declare const BtnMain: React.FC<BtnMainProps>;
declare const ChoseServer: React.FC<ChoseServerProps>;
declare const ChoseServerBot: React.FC<ChoseServerBotProps>;
declare const ChoseServerEnd: React.FC<ChoseServerEndProps>;
declare const ChoseServerGermany: React.FC<ChoseServerGermanyProps>;
declare const ChoseServerGermanyTouch: React.FC<ChoseServerGermanyTouchProps>;
declare const ChoseServerStart: React.FC<ChoseServerStartProps>;
declare const ChoseServerTurkey: React.FC<ChoseServerTurkeyProps>;
declare const ChoseServerTurkeyChosen: React.FC<ChoseServerTurkeyChosenProps>;
declare const ChoseServerTurkeyTouch: React.FC<ChoseServerTurkeyTouchProps>;
declare const Component: React.FC<ComponentProps>;
declare const Data: React.FC<DataProps>;
declare const Flags: React.FC<FlagsProps>;
declare const HomeIndicatorIPhone: React.FC<HomeIndicatorIPhoneProps>;
declare const Icon: React.FC<IconProps>;
declare const Icon2: React.FC<Icon2Props>;
declare const InfoItem: React.FC<InfoItemProps>;
declare const InputSearch: React.FC<InputSearchProps>;
declare const KeyboardSuggestionIPhone: React.FC<KeyboardSuggestionIPhoneProps>;
declare const Location: React.FC<LocationProps>;
declare const Network: React.FC<NetworkProps>;
declare const PayLogos: React.FC<PayLogosProps>;
declare const Push: React.FC<PushProps>;
declare const Readme: React.FC<ReadmeProps>;
declare const Readme2: React.FC<Readme2Props>;
declare const Readme3: React.FC<Readme3Props>;
declare const ServerItem: React.FC<ServerItemProps>;
declare const ServerMain: React.FC<ServerMainProps>;
declare const ServerSearch: React.FC<ServerSearchProps>;
declare const ServerSearchBeTouch: React.FC<ServerSearchBeTouchProps>;
declare const ServerSearchLoad: React.FC<ServerSearchLoadProps>;
declare const ServerSearchOpen: React.FC<ServerSearchOpenProps>;
declare const ServerSearchStart: React.FC<ServerSearchStartProps>;
declare const ServerSearchTypeB: React.FC<ServerSearchTypeBProps>;
declare const ServerSearchTypeE: React.FC<ServerSearchTypeEProps>;
declare const StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
declare const Switch: React.FC<SwitchProps>;
declare const SwitchItem: React.FC<SwitchItemProps>;
declare const Tabbar: React.FC<TabbarProps>;
declare const Time: React.FC<TimeProps>;
declare const Top: React.FC<TopProps>;
declare global {
  interface Window {
    AlphabeticKeyboardIPhone: React.FC<AlphabeticKeyboardIPhoneProps>;
    Battery: React.FC<BatteryProps>;
    BtnMain: React.FC<BtnMainProps>;
    ChoseServer: React.FC<ChoseServerProps>;
    ChoseServerBot: React.FC<ChoseServerBotProps>;
    ChoseServerEnd: React.FC<ChoseServerEndProps>;
    ChoseServerGermany: React.FC<ChoseServerGermanyProps>;
    ChoseServerGermanyTouch: React.FC<ChoseServerGermanyTouchProps>;
    ChoseServerStart: React.FC<ChoseServerStartProps>;
    ChoseServerTurkey: React.FC<ChoseServerTurkeyProps>;
    ChoseServerTurkeyChosen: React.FC<ChoseServerTurkeyChosenProps>;
    ChoseServerTurkeyTouch: React.FC<ChoseServerTurkeyTouchProps>;
    Component: React.FC<ComponentProps>;
    Data: React.FC<DataProps>;
    Flags: React.FC<FlagsProps>;
    HomeIndicatorIPhone: React.FC<HomeIndicatorIPhoneProps>;
    Icon: React.FC<IconProps>;
    Icon2: React.FC<Icon2Props>;
    InfoItem: React.FC<InfoItemProps>;
    InputSearch: React.FC<InputSearchProps>;
    KeyboardSuggestionIPhone: React.FC<KeyboardSuggestionIPhoneProps>;
    Location: React.FC<LocationProps>;
    Network: React.FC<NetworkProps>;
    PayLogos: React.FC<PayLogosProps>;
    Push: React.FC<PushProps>;
    Readme: React.FC<ReadmeProps>;
    Readme2: React.FC<Readme2Props>;
    Readme3: React.FC<Readme3Props>;
    ServerItem: React.FC<ServerItemProps>;
    ServerMain: React.FC<ServerMainProps>;
    ServerSearch: React.FC<ServerSearchProps>;
    ServerSearchBeTouch: React.FC<ServerSearchBeTouchProps>;
    ServerSearchLoad: React.FC<ServerSearchLoadProps>;
    ServerSearchOpen: React.FC<ServerSearchOpenProps>;
    ServerSearchStart: React.FC<ServerSearchStartProps>;
    ServerSearchTypeB: React.FC<ServerSearchTypeBProps>;
    ServerSearchTypeE: React.FC<ServerSearchTypeEProps>;
    StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
    Switch: React.FC<SwitchProps>;
    SwitchItem: React.FC<SwitchItemProps>;
    Tabbar: React.FC<TabbarProps>;
    Time: React.FC<TimeProps>;
    Top: React.FC<TopProps>;
  }
}
