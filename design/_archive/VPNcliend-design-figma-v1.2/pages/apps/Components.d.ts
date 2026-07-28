// Components.d.ts — the complete catalog of the 52 component(s) in
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

// figma layer: "App-Item" (node 487:8872)
export interface AppItemProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "default" | "touch" | "disable";
  /** Text content; defaults to "Instagram". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "Apps" (node 552:15119)
export interface AppsProps {
  className?: string;
  style?: React.CSSProperties;
  app?: "instagram" | "youtube" | "facebook" | "tiktok" | "x" | "vk" | "chrome" | "amazon" | "opera" | "empty" | "netflix" | "spotify" | "whatsapp";
}

// figma layer: "Apps-Search-End" (node 576:18161)
export interface AppsSearchEndProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Apps-Search-Facebook-Touch" (node 576:18599)
export interface AppsSearchFacebookTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Apps-Search-Fasebook-Enable" (node 576:19050)
export interface AppsSearchFasebookEnableProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Apps-Search-Instagram-Disable" (node 576:16581)
export interface AppsSearchInstagramDisableProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Apps-Search-Instagram-Touch" (node 576:16202)
export interface AppsSearchInstagramTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Apps-Search-Load" (node 576:15792)
export interface AppsSearchLoadProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Apps-Search-Open" (node 576:14836)
export interface AppsSearchOpenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Apps-Search-Open" (node 576:19714)
export interface AppsSearchOpen2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Apps-Search-Start" (node 576:14343)
export interface AppsSearchStartProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Apps-Search-Type-I" (node 576:15234)
export interface AppsSearchTypeIProps {
  className?: string;
  style?: React.CSSProperties;
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

// figma layer: "Checkbox" (node 487:8847)
export interface CheckboxProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "on" | "off";
}

// figma layer: "Chose-Apps-All" (node 555:11062)
export interface ChoseAppsAllProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-All" (node 555:12608)
export interface ChoseAppsAll2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-All-Disable" (node 555:8611)
export interface ChoseAppsAllDisableProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-All-Touch" (node 555:12381)
export interface ChoseAppsAllTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-All-Touch" (node 555:13227)
export interface ChoseAppsAllTouch2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-All-Touch" (node 555:8992)
export interface ChoseAppsAllTouch3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-All-Touch" (node 555:8370)
export interface ChoseAppsAllTouch4Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-Handed" (node 555:11079)
export interface ChoseAppsHandedProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-Instagram-Disable" (node 555:10158)
export interface ChoseAppsInstagramDisableProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-Instagram-Touch" (node 555:10379)
export interface ChoseAppsInstagramTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-Instagram-Touch" (node 555:12992)
export interface ChoseAppsInstagramTouch2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-Main" (node 433:8025)
export interface ChoseAppsMainProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Chose-Apps-Start" (node 487:7519)
export interface ChoseAppsStartProps {
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

// figma layer: "Readme" (node 555:13469)
export interface ReadmeProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Readme" (node 555:13474)
export interface Readme2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Readme" (node 576:18531)
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

declare const AlphabeticKeyboardIPhone: React.FC<AlphabeticKeyboardIPhoneProps>;
declare const AppItem: React.FC<AppItemProps>;
declare const Apps: React.FC<AppsProps>;
declare const AppsSearchEnd: React.FC<AppsSearchEndProps>;
declare const AppsSearchFacebookTouch: React.FC<AppsSearchFacebookTouchProps>;
declare const AppsSearchFasebookEnable: React.FC<AppsSearchFasebookEnableProps>;
declare const AppsSearchInstagramDisable: React.FC<AppsSearchInstagramDisableProps>;
declare const AppsSearchInstagramTouch: React.FC<AppsSearchInstagramTouchProps>;
declare const AppsSearchLoad: React.FC<AppsSearchLoadProps>;
declare const AppsSearchOpen: React.FC<AppsSearchOpenProps>;
declare const AppsSearchOpen2: React.FC<AppsSearchOpen2Props>;
declare const AppsSearchStart: React.FC<AppsSearchStartProps>;
declare const AppsSearchTypeI: React.FC<AppsSearchTypeIProps>;
declare const Battery: React.FC<BatteryProps>;
declare const BtnMain: React.FC<BtnMainProps>;
declare const Checkbox: React.FC<CheckboxProps>;
declare const ChoseAppsAll: React.FC<ChoseAppsAllProps>;
declare const ChoseAppsAll2: React.FC<ChoseAppsAll2Props>;
declare const ChoseAppsAllDisable: React.FC<ChoseAppsAllDisableProps>;
declare const ChoseAppsAllTouch: React.FC<ChoseAppsAllTouchProps>;
declare const ChoseAppsAllTouch2: React.FC<ChoseAppsAllTouch2Props>;
declare const ChoseAppsAllTouch3: React.FC<ChoseAppsAllTouch3Props>;
declare const ChoseAppsAllTouch4: React.FC<ChoseAppsAllTouch4Props>;
declare const ChoseAppsHanded: React.FC<ChoseAppsHandedProps>;
declare const ChoseAppsInstagramDisable: React.FC<ChoseAppsInstagramDisableProps>;
declare const ChoseAppsInstagramTouch: React.FC<ChoseAppsInstagramTouchProps>;
declare const ChoseAppsInstagramTouch2: React.FC<ChoseAppsInstagramTouch2Props>;
declare const ChoseAppsMain: React.FC<ChoseAppsMainProps>;
declare const ChoseAppsStart: React.FC<ChoseAppsStartProps>;
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
declare const ServerMain: React.FC<ServerMainProps>;
declare const StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
declare const Switch: React.FC<SwitchProps>;
declare const SwitchItem: React.FC<SwitchItemProps>;
declare const Tabbar: React.FC<TabbarProps>;
declare const Time: React.FC<TimeProps>;
declare const Top: React.FC<TopProps>;
declare global {
  interface Window {
    AlphabeticKeyboardIPhone: React.FC<AlphabeticKeyboardIPhoneProps>;
    AppItem: React.FC<AppItemProps>;
    Apps: React.FC<AppsProps>;
    AppsSearchEnd: React.FC<AppsSearchEndProps>;
    AppsSearchFacebookTouch: React.FC<AppsSearchFacebookTouchProps>;
    AppsSearchFasebookEnable: React.FC<AppsSearchFasebookEnableProps>;
    AppsSearchInstagramDisable: React.FC<AppsSearchInstagramDisableProps>;
    AppsSearchInstagramTouch: React.FC<AppsSearchInstagramTouchProps>;
    AppsSearchLoad: React.FC<AppsSearchLoadProps>;
    AppsSearchOpen: React.FC<AppsSearchOpenProps>;
    AppsSearchOpen2: React.FC<AppsSearchOpen2Props>;
    AppsSearchStart: React.FC<AppsSearchStartProps>;
    AppsSearchTypeI: React.FC<AppsSearchTypeIProps>;
    Battery: React.FC<BatteryProps>;
    BtnMain: React.FC<BtnMainProps>;
    Checkbox: React.FC<CheckboxProps>;
    ChoseAppsAll: React.FC<ChoseAppsAllProps>;
    ChoseAppsAll2: React.FC<ChoseAppsAll2Props>;
    ChoseAppsAllDisable: React.FC<ChoseAppsAllDisableProps>;
    ChoseAppsAllTouch: React.FC<ChoseAppsAllTouchProps>;
    ChoseAppsAllTouch2: React.FC<ChoseAppsAllTouch2Props>;
    ChoseAppsAllTouch3: React.FC<ChoseAppsAllTouch3Props>;
    ChoseAppsAllTouch4: React.FC<ChoseAppsAllTouch4Props>;
    ChoseAppsHanded: React.FC<ChoseAppsHandedProps>;
    ChoseAppsInstagramDisable: React.FC<ChoseAppsInstagramDisableProps>;
    ChoseAppsInstagramTouch: React.FC<ChoseAppsInstagramTouchProps>;
    ChoseAppsInstagramTouch2: React.FC<ChoseAppsInstagramTouch2Props>;
    ChoseAppsMain: React.FC<ChoseAppsMainProps>;
    ChoseAppsStart: React.FC<ChoseAppsStartProps>;
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
    ServerMain: React.FC<ServerMainProps>;
    StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
    Switch: React.FC<SwitchProps>;
    SwitchItem: React.FC<SwitchItemProps>;
    Tabbar: React.FC<TabbarProps>;
    Time: React.FC<TimeProps>;
    Top: React.FC<TopProps>;
  }
}
