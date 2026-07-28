// Components.d.ts — the complete catalog of the 94 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.About) and usable directly in JSX.
import * as React from 'react';

// figma layer: "About" (node 829:21187)
export interface AboutProps {
  className?: string;
  style?: React.CSSProperties;
}

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

// figma layer: "Button" (node 790:20586)
export interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "touch";
  /** Text content; defaults to "Продлить подписку". */
  text1?: string;
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

// figma layer: "Main Off" (node 790:19931)
export interface MainOffProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Main Off" (node 1009:21660)
export interface MainOff2Props {
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

// figma layer: "Pay" (node 1064:24363)
export interface PayProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Pay-Keyboard-Up" (node 1064:23279)
export interface PayKeyboardUpProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Pay-Logos" (node 1058:22902)
export interface PayLogosProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "mastercard" | "visa" | "mir";
}

// figma layer: "Pay-Number-Fill" (node 1064:24027)
export interface PayNumberFillProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Pay-Number-Touch" (node 1064:22582)
export interface PayNumberTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Pay-Number-Touch-Up" (node 1058:23453)
export interface PayNumberTouchUpProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Pay-Open" (node 1058:22231)
export interface PayOpenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Pay-Start" (node 1058:21310)
export interface PayStartProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Pay-Touch" (node 1058:21770)
export interface PayTouchProps {
  className?: string;
  style?: React.CSSProperties;
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

// figma layer: "Payment" (node 987:34156)
export interface Payment2Props {
  className?: string;
  style?: React.CSSProperties;
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

// figma layer: "Payment-Method" (node 1024:2724)
export interface PaymentMethodProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Payment-Promo" (node 1004:35081)
export interface PaymentPromoProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Payment-Promo-Fill" (node 1050:34691)
export interface PaymentPromoFillProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Pill-Alt" (node 998:14224)
export interface PillAltProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "%". */
  text1?: string;
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

// figma layer: "Readme" (node 793:20604)
export interface ReadmeProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Readme" (node 1009:21755)
export interface Readme2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Readme" (node 1058:21306)
export interface Readme3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Readme" (node 1071:41744)
export interface Readme4Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Readme" (node 1064:43607)
export interface Readme5Props {
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

// figma layer: "Settings" (node 790:20021)
export interface SettingsProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Settings" (node 836:21010)
export interface Settings2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Settings" (node 984:14578)
export interface Settings3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Settings" (node 1011:7524)
export interface Settings4Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Settings-Btn-Touch" (node 1011:7819)
export interface SettingsBtnTouchProps {
  className?: string;
  style?: React.CSSProperties;
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

// figma layer: "Sub" (node 987:33335)
export interface Sub3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Sub/Toast" (node 1004:35996)
export interface SubToastProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "Введите промокод". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Subscribe" (node 1011:7672)
export interface SubscribeProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-12Month-Touch" (node 1011:9408)
export interface Subscribe12MonthTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-3Month" (node 1011:8202)
export interface Subscribe3MonthProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-3Month-Touch" (node 1011:8000)
export interface Subscribe3MonthTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Btn-Touch" (node 1011:9595)
export interface SubscribeBtnTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment" (node 1011:9772)
export interface SubscribePaymentProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Card" (node 1031:3838)
export interface SubscribePaymentCardProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Card-Touch" (node 1031:3487)
export interface SubscribePaymentCardTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Open" (node 1021:10138)
export interface SubscribePaymentOpenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Promo" (node 1031:4867)
export interface SubscribePaymentPromoProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Promo-Accept" (node 1050:32833)
export interface SubscribePaymentPromoAcceptProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Promo-End" (node 1031:5896)
export interface SubscribePaymentPromoEndProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Promo-End" (node 1050:34211)
export interface SubscribePaymentPromoEnd2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Promo-Input" (node 1048:31439)
export interface SubscribePaymentPromoInputProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Promo-Start" (node 1031:5204)
export interface SubscribePaymentPromoStartProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Promo-Toast" (node 1048:30977)
export interface SubscribePaymentPromoToastProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Promo-Touch" (node 1031:4524)
export interface SubscribePaymentPromoTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Promo-Touch-2" (node 1050:32372)
export interface SubscribePaymentPromoTouch2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Promo-Touch" (node 1048:30518)
export interface SubscribePaymentPromoTouch3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Subscribe-Payment-Touch" (node 1021:9951)
export interface SubscribePaymentTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Succes-End" (node 1071:43842)
export interface SuccesEndProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Succes-Ok-Touch" (node 1071:43738)
export interface SuccesOkTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Succes-Open" (node 1071:43633)
export interface SuccesOpenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Succes-Start" (node 1071:41748)
export interface SuccesStartProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Support" (node 1070:40476)
export interface SupportProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Support-Add-Open" (node 1070:41243)
export interface SupportAddOpenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Support-Add-Touch" (node 1070:41079)
export interface SupportAddTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Support-Close-Touch" (node 1070:41533)
export interface SupportCloseTouchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Support-Open" (node 1070:40914)
export interface SupportOpenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Support-Start" (node 1064:24699)
export interface SupportStartProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Support-Touch" (node 1070:40740)
export interface SupportTouchProps {
  className?: string;
  style?: React.CSSProperties;
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

declare const About: React.FC<AboutProps>;
declare const AboutItem: React.FC<AboutItemProps>;
declare const AlphabeticKeyboardIPhone: React.FC<AlphabeticKeyboardIPhoneProps>;
declare const Battery: React.FC<BatteryProps>;
declare const BtnMain: React.FC<BtnMainProps>;
declare const Button: React.FC<ButtonProps>;
declare const Checkbox: React.FC<CheckboxProps>;
declare const Component: React.FC<ComponentProps>;
declare const Data: React.FC<DataProps>;
declare const Discount: React.FC<DiscountProps>;
declare const Flags: React.FC<FlagsProps>;
declare const HomeIndicatorIPhone: React.FC<HomeIndicatorIPhoneProps>;
declare const Icon: React.FC<IconProps>;
declare const Icon2: React.FC<Icon2Props>;
declare const InfoItem: React.FC<InfoItemProps>;
declare const InputSearch: React.FC<InputSearchProps>;
declare const KeyboardSuggestionIPhone: React.FC<KeyboardSuggestionIPhoneProps>;
declare const Location: React.FC<LocationProps>;
declare const MainOff: React.FC<MainOffProps>;
declare const MainOff2: React.FC<MainOff2Props>;
declare const Network: React.FC<NetworkProps>;
declare const Pay: React.FC<PayProps>;
declare const PayKeyboardUp: React.FC<PayKeyboardUpProps>;
declare const PayLogos: React.FC<PayLogosProps>;
declare const PayNumberFill: React.FC<PayNumberFillProps>;
declare const PayNumberTouch: React.FC<PayNumberTouchProps>;
declare const PayNumberTouchUp: React.FC<PayNumberTouchUpProps>;
declare const PayOpen: React.FC<PayOpenProps>;
declare const PayStart: React.FC<PayStartProps>;
declare const PayTouch: React.FC<PayTouchProps>;
declare const Payment: React.FC<PaymentProps>;
declare const Payment2: React.FC<Payment2Props>;
declare const PaymentIcon: React.FC<PaymentIconProps>;
declare const PaymentItem: React.FC<PaymentItemProps>;
declare const PaymentMethod: React.FC<PaymentMethodProps>;
declare const PaymentPromo: React.FC<PaymentPromoProps>;
declare const PaymentPromoFill: React.FC<PaymentPromoFillProps>;
declare const PillAlt: React.FC<PillAltProps>;
declare const Promo: React.FC<PromoProps>;
declare const Push: React.FC<PushProps>;
declare const Readme: React.FC<ReadmeProps>;
declare const Readme2: React.FC<Readme2Props>;
declare const Readme3: React.FC<Readme3Props>;
declare const Readme4: React.FC<Readme4Props>;
declare const Readme5: React.FC<Readme5Props>;
declare const ServerMain: React.FC<ServerMainProps>;
declare const Settings: React.FC<SettingsProps>;
declare const Settings2: React.FC<Settings2Props>;
declare const Settings3: React.FC<Settings3Props>;
declare const Settings4: React.FC<Settings4Props>;
declare const SettingsBtnTouch: React.FC<SettingsBtnTouchProps>;
declare const SettingsItem: React.FC<SettingsItemProps>;
declare const StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
declare const Sub: React.FC<SubProps>;
declare const Sub2: React.FC<Sub2Props>;
declare const Sub3: React.FC<Sub3Props>;
declare const SubToast: React.FC<SubToastProps>;
declare const Subscribe: React.FC<SubscribeProps>;
declare const Subscribe12MonthTouch: React.FC<Subscribe12MonthTouchProps>;
declare const Subscribe3Month: React.FC<Subscribe3MonthProps>;
declare const Subscribe3MonthTouch: React.FC<Subscribe3MonthTouchProps>;
declare const SubscribeBtnTouch: React.FC<SubscribeBtnTouchProps>;
declare const SubscribePayment: React.FC<SubscribePaymentProps>;
declare const SubscribePaymentCard: React.FC<SubscribePaymentCardProps>;
declare const SubscribePaymentCardTouch: React.FC<SubscribePaymentCardTouchProps>;
declare const SubscribePaymentOpen: React.FC<SubscribePaymentOpenProps>;
declare const SubscribePaymentPromo: React.FC<SubscribePaymentPromoProps>;
declare const SubscribePaymentPromoAccept: React.FC<SubscribePaymentPromoAcceptProps>;
declare const SubscribePaymentPromoEnd: React.FC<SubscribePaymentPromoEndProps>;
declare const SubscribePaymentPromoEnd2: React.FC<SubscribePaymentPromoEnd2Props>;
declare const SubscribePaymentPromoInput: React.FC<SubscribePaymentPromoInputProps>;
declare const SubscribePaymentPromoStart: React.FC<SubscribePaymentPromoStartProps>;
declare const SubscribePaymentPromoToast: React.FC<SubscribePaymentPromoToastProps>;
declare const SubscribePaymentPromoTouch: React.FC<SubscribePaymentPromoTouchProps>;
declare const SubscribePaymentPromoTouch2: React.FC<SubscribePaymentPromoTouch2Props>;
declare const SubscribePaymentPromoTouch3: React.FC<SubscribePaymentPromoTouch3Props>;
declare const SubscribePaymentTouch: React.FC<SubscribePaymentTouchProps>;
declare const SuccesEnd: React.FC<SuccesEndProps>;
declare const SuccesOkTouch: React.FC<SuccesOkTouchProps>;
declare const SuccesOpen: React.FC<SuccesOpenProps>;
declare const SuccesStart: React.FC<SuccesStartProps>;
declare const Support: React.FC<SupportProps>;
declare const SupportAddOpen: React.FC<SupportAddOpenProps>;
declare const SupportAddTouch: React.FC<SupportAddTouchProps>;
declare const SupportCloseTouch: React.FC<SupportCloseTouchProps>;
declare const SupportOpen: React.FC<SupportOpenProps>;
declare const SupportStart: React.FC<SupportStartProps>;
declare const SupportTouch: React.FC<SupportTouchProps>;
declare const Switch: React.FC<SwitchProps>;
declare const SwitchItem: React.FC<SwitchItemProps>;
declare const Tabbar: React.FC<TabbarProps>;
declare const ThemeItem: React.FC<ThemeItemProps>;
declare const Time: React.FC<TimeProps>;
declare const Top: React.FC<TopProps>;
declare global {
  interface Window {
    About: React.FC<AboutProps>;
    AboutItem: React.FC<AboutItemProps>;
    AlphabeticKeyboardIPhone: React.FC<AlphabeticKeyboardIPhoneProps>;
    Battery: React.FC<BatteryProps>;
    BtnMain: React.FC<BtnMainProps>;
    Button: React.FC<ButtonProps>;
    Checkbox: React.FC<CheckboxProps>;
    Component: React.FC<ComponentProps>;
    Data: React.FC<DataProps>;
    Discount: React.FC<DiscountProps>;
    Flags: React.FC<FlagsProps>;
    HomeIndicatorIPhone: React.FC<HomeIndicatorIPhoneProps>;
    Icon: React.FC<IconProps>;
    Icon2: React.FC<Icon2Props>;
    InfoItem: React.FC<InfoItemProps>;
    InputSearch: React.FC<InputSearchProps>;
    KeyboardSuggestionIPhone: React.FC<KeyboardSuggestionIPhoneProps>;
    Location: React.FC<LocationProps>;
    MainOff: React.FC<MainOffProps>;
    MainOff2: React.FC<MainOff2Props>;
    Network: React.FC<NetworkProps>;
    Pay: React.FC<PayProps>;
    PayKeyboardUp: React.FC<PayKeyboardUpProps>;
    PayLogos: React.FC<PayLogosProps>;
    PayNumberFill: React.FC<PayNumberFillProps>;
    PayNumberTouch: React.FC<PayNumberTouchProps>;
    PayNumberTouchUp: React.FC<PayNumberTouchUpProps>;
    PayOpen: React.FC<PayOpenProps>;
    PayStart: React.FC<PayStartProps>;
    PayTouch: React.FC<PayTouchProps>;
    Payment: React.FC<PaymentProps>;
    Payment2: React.FC<Payment2Props>;
    PaymentIcon: React.FC<PaymentIconProps>;
    PaymentItem: React.FC<PaymentItemProps>;
    PaymentMethod: React.FC<PaymentMethodProps>;
    PaymentPromo: React.FC<PaymentPromoProps>;
    PaymentPromoFill: React.FC<PaymentPromoFillProps>;
    PillAlt: React.FC<PillAltProps>;
    Promo: React.FC<PromoProps>;
    Push: React.FC<PushProps>;
    Readme: React.FC<ReadmeProps>;
    Readme2: React.FC<Readme2Props>;
    Readme3: React.FC<Readme3Props>;
    Readme4: React.FC<Readme4Props>;
    Readme5: React.FC<Readme5Props>;
    ServerMain: React.FC<ServerMainProps>;
    Settings: React.FC<SettingsProps>;
    Settings2: React.FC<Settings2Props>;
    Settings3: React.FC<Settings3Props>;
    Settings4: React.FC<Settings4Props>;
    SettingsBtnTouch: React.FC<SettingsBtnTouchProps>;
    SettingsItem: React.FC<SettingsItemProps>;
    StatusBarIPhone14Main: React.FC<StatusBarIPhone14MainProps>;
    Sub: React.FC<SubProps>;
    Sub2: React.FC<Sub2Props>;
    Sub3: React.FC<Sub3Props>;
    SubToast: React.FC<SubToastProps>;
    Subscribe: React.FC<SubscribeProps>;
    Subscribe12MonthTouch: React.FC<Subscribe12MonthTouchProps>;
    Subscribe3Month: React.FC<Subscribe3MonthProps>;
    Subscribe3MonthTouch: React.FC<Subscribe3MonthTouchProps>;
    SubscribeBtnTouch: React.FC<SubscribeBtnTouchProps>;
    SubscribePayment: React.FC<SubscribePaymentProps>;
    SubscribePaymentCard: React.FC<SubscribePaymentCardProps>;
    SubscribePaymentCardTouch: React.FC<SubscribePaymentCardTouchProps>;
    SubscribePaymentOpen: React.FC<SubscribePaymentOpenProps>;
    SubscribePaymentPromo: React.FC<SubscribePaymentPromoProps>;
    SubscribePaymentPromoAccept: React.FC<SubscribePaymentPromoAcceptProps>;
    SubscribePaymentPromoEnd: React.FC<SubscribePaymentPromoEndProps>;
    SubscribePaymentPromoEnd2: React.FC<SubscribePaymentPromoEnd2Props>;
    SubscribePaymentPromoInput: React.FC<SubscribePaymentPromoInputProps>;
    SubscribePaymentPromoStart: React.FC<SubscribePaymentPromoStartProps>;
    SubscribePaymentPromoToast: React.FC<SubscribePaymentPromoToastProps>;
    SubscribePaymentPromoTouch: React.FC<SubscribePaymentPromoTouchProps>;
    SubscribePaymentPromoTouch2: React.FC<SubscribePaymentPromoTouch2Props>;
    SubscribePaymentPromoTouch3: React.FC<SubscribePaymentPromoTouch3Props>;
    SubscribePaymentTouch: React.FC<SubscribePaymentTouchProps>;
    SuccesEnd: React.FC<SuccesEndProps>;
    SuccesOkTouch: React.FC<SuccesOkTouchProps>;
    SuccesOpen: React.FC<SuccesOpenProps>;
    SuccesStart: React.FC<SuccesStartProps>;
    Support: React.FC<SupportProps>;
    SupportAddOpen: React.FC<SupportAddOpenProps>;
    SupportAddTouch: React.FC<SupportAddTouchProps>;
    SupportCloseTouch: React.FC<SupportCloseTouchProps>;
    SupportOpen: React.FC<SupportOpenProps>;
    SupportStart: React.FC<SupportStartProps>;
    SupportTouch: React.FC<SupportTouchProps>;
    Switch: React.FC<SwitchProps>;
    SwitchItem: React.FC<SwitchItemProps>;
    Tabbar: React.FC<TabbarProps>;
    ThemeItem: React.FC<ThemeItemProps>;
    Time: React.FC<TimeProps>;
    Top: React.FC<TopProps>;
  }
}
