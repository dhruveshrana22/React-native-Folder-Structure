import { Platform } from "react-native";

export const BaseColors = {
  primary: "#F8BB25",
  secondary: "#FFFFFF",
  lightYellow: "#FFE499",
  extraLightYellow: "#FFF8E8",

  green: "#008037",
  error: "#F04248",
  titleColor: "#212121",
  text: "#424242",
  lightText: "#616161",
  extraLightText: "#A7A7A7",

  border: "#f0f0f0",
  bookEmptyColor: "#c5c5c5",
  disable: "#F5F6F8",

  placeHolderColor: "#555454",
  borderColor: "#8E8383",
  divider: "#F1F5F9",
  toastTitle: "#242C32",
  toastSubText: "#3C3C3C",
  splashSubText: "#252D41",
  sliderDot: "#DDDDDD",
  dividerColor: "#DCDFE3",
  dropdown: "#FFFCF4",
  search: "#F8F8F8",
  transparent: "#ffffff00",

  // shadow
  commonShadow: {
    ios: {
      // iOS specific styles
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
    },
    android: {
      // Android specific styles
      elevation: 3,
    },
  },

  blueWhale: "#1C2543",
  black: "#000000",

  whiteSmoke: "#F1F1F1",
  white10: "#ffffff10",
  white20: "#ffffff20",
  white30: "#ffffff30",
  white40: "#ffffff40",
  white50: "#ffffff50",
  white60: "#ffffff60",
  white70: "#ffffff70",
  white80: "#ffffff80",
  white90: "#ffffff90",

  black10: "#00000010",
  black20: "#00000020",
  black30: "#00000030",
  black40: "#00000040",
  black50: "#00000050",
  black60: "#00000060",
  black70: "#00000070",
  black80: "#00000080",
  black90: "#00000090",
};

export const FontSize = (size) => {
  return size;
};
export const commonImageRadius = 5;
export const commonPadding = 25;
export const commonVerticallyPadding = 8;
export const paddingTop = Platform.OS === "ios" ? 50 : 15;
