// Components.d.ts — the complete catalog of the 36 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.AboutItem) and usable directly in JSX.
import * as React from 'react';

// figma layer: "About-Item" (node 829:21123)
export interface AboutItemProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "touch";
  /** Text content; defaults to "Политика конфиденциальности". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
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

// figma layer: "Button-Reset" (node 902:41094)
export interface ButtonResetProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "touch";
  /** Text content; defaults to "Сбросить настройки". */
  text1?: string;
}

// figma layer: "Checkbox" (node 487:8847)
export interface CheckboxProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "on" | "off";
}

// figma layer: "Colors" (node 137:1461)
export interface ColorsProps {
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

// figma layer: "Discount" (node 987:33601)
export interface DiscountProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "-14%". */
  text1?: string;
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

// figma layer: "Payment" (node 998:34978)
export interface PaymentProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "touch";
  /** Text content; defaults to "Способ оплаты". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "Payment-Icon" (node 1027:10207)
export interface PaymentIconProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "card" | "sbp" | "sber" | "t-bank" | "mir" | "yandex" | "qr" | "tg-stars" | "crypto";
  /** Text content; defaults to "⭐️". */
  text1?: string;
}

// figma layer: "Payment-Item" (node 1031:3812)
export interface PaymentItemProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "touch";
  /** Text content; defaults to "Карта рубли". */
  text1?: string;
  /** Text content; defaults to "2 337 ₽". */
  text2?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Promo" (node 1031:4857)
export interface PromoProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "touch";
  /** Text content; defaults to "У меня есть промокод!". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Push" (node 829:20930)
export interface PushProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "2". */
  text1?: string;
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

// figma layer: "Settings-Item" (node 819:18052)
export interface SettingsItemProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "default" | "touch" | "push" | "push-touch";
  /** Text content; defaults to "Чат с поддержкой". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
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

// figma layer: "Sub" (node 836:20317)
export interface SubProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "10-days";
  /** Text content; defaults to "Активная подписка". */
  text1?: string;
  /** Text content; defaults to "VPN Client". */
  text2?: string;
  /** Text content; defaults to "365 д.". */
  text3?: string;
  /** Text content; defaults to "0". */
  text4?: string;
}

// figma layer: "Sub" (node 987:33172)
export interface Sub2Props {
  className?: string;
  style?: React.CSSProperties;
  state?: "default" | "touch";
  discount?: "off" | "on";
  /** Text content; defaults to "1 месяц". */
  text1?: string;
  /** Text content; defaults to "3 588 ₽ в год". */
  text2?: string;
  /** Text content; defaults to "299 ₽". */
  text3?: string;
  /** Text content; defaults to "897 ₽". */
  text4?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
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

// figma layer: "Tabbar-Mini" (node 902:10897)
export interface TabbarMiniProps {
  className?: string;
  style?: React.CSSProperties;
  type?: "servers" | "main" | "settings";
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
}

// figma layer: "Theme-Item" (node 829:21270)
export interface ThemeItemProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "default" | "touch" | "on";
  /** Text content; defaults to "Темная тема". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
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

declare const AboutItem: React.FC<AboutItemProps>;
declare const AppItem: React.FC<AppItemProps>;
declare const Apps: React.FC<AppsProps>;
declare const Battery: React.FC<BatteryProps>;
declare const BtnMain: React.FC<BtnMainProps>;
declare const Button: React.FC<ButtonProps>;
declare const ButtonReset: React.FC<ButtonResetProps>;
declare const Checkbox: React.FC<CheckboxProps>;
declare const Colors: React.FC<ColorsProps>;
declare const Component: React.FC<ComponentProps>;
declare const Data: React.FC<DataProps>;
declare const Discount: React.FC<DiscountProps>;
declare const Flags: React.FC<FlagsProps>;
declare const Icon: React.FC<IconProps>;
declare const Icon2: React.FC<Icon2Props>;
declare const InputSearch: React.FC<InputSearchProps>;
declare const Location: React.FC<LocationProps>;
declare const Network: React.FC<NetworkProps>;
declare const PayLogos: React.FC<PayLogosProps>;
declare const Payment: React.FC<PaymentProps>;
declare const PaymentIcon: React.FC<PaymentIconProps>;
declare const PaymentItem: React.FC<PaymentItemProps>;
declare const Promo: React.FC<PromoProps>;
declare const Push: React.FC<PushProps>;
declare const ServerItem: React.FC<ServerItemProps>;
declare const SettingsItem: React.FC<SettingsItemProps>;
declare const StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
declare const Sub: React.FC<SubProps>;
declare const Sub2: React.FC<Sub2Props>;
declare const Switch: React.FC<SwitchProps>;
declare const SwitchItem: React.FC<SwitchItemProps>;
declare const Tabbar: React.FC<TabbarProps>;
declare const TabbarMini: React.FC<TabbarMiniProps>;
declare const ThemeItem: React.FC<ThemeItemProps>;
declare const Time: React.FC<TimeProps>;
declare const Top: React.FC<TopProps>;
declare global {
  interface Window {
    AboutItem: React.FC<AboutItemProps>;
    AppItem: React.FC<AppItemProps>;
    Apps: React.FC<AppsProps>;
    Battery: React.FC<BatteryProps>;
    BtnMain: React.FC<BtnMainProps>;
    Button: React.FC<ButtonProps>;
    ButtonReset: React.FC<ButtonResetProps>;
    Checkbox: React.FC<CheckboxProps>;
    Colors: React.FC<ColorsProps>;
    Component: React.FC<ComponentProps>;
    Data: React.FC<DataProps>;
    Discount: React.FC<DiscountProps>;
    Flags: React.FC<FlagsProps>;
    Icon: React.FC<IconProps>;
    Icon2: React.FC<Icon2Props>;
    InputSearch: React.FC<InputSearchProps>;
    Location: React.FC<LocationProps>;
    Network: React.FC<NetworkProps>;
    PayLogos: React.FC<PayLogosProps>;
    Payment: React.FC<PaymentProps>;
    PaymentIcon: React.FC<PaymentIconProps>;
    PaymentItem: React.FC<PaymentItemProps>;
    Promo: React.FC<PromoProps>;
    Push: React.FC<PushProps>;
    ServerItem: React.FC<ServerItemProps>;
    SettingsItem: React.FC<SettingsItemProps>;
    StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
    Sub: React.FC<SubProps>;
    Sub2: React.FC<Sub2Props>;
    Switch: React.FC<SwitchProps>;
    SwitchItem: React.FC<SwitchItemProps>;
    Tabbar: React.FC<TabbarProps>;
    TabbarMini: React.FC<TabbarMiniProps>;
    ThemeItem: React.FC<ThemeItemProps>;
    Time: React.FC<TimeProps>;
    Top: React.FC<TopProps>;
  }
}
