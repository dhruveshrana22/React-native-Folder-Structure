import { StyleSheet } from "react-native";
import { BaseColors } from "./theme";

/**
 * Common font family setting
 * - This font name will be used for all template
 * - Check more how to add more font family with url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const FontFamily = {
  // playFair
  PlayfairRegular: "PlayfairDisplay-Regular",
  PlayfairMedium: "PlayfairDisplay-Medium",
  PlayfairSemiBold: "PlayfairDisplay-SemiBold",
  PlayfairBold: "PlayfairDisplay-Bold",
  PlayfairExtraBold: "PlayfairDisplay-ExtraBold",
  PlayfairBlack: "PlayfairDisplay-Black",

  // outfit
  outfitThin: "Outfit-Thin",
  outfitExtraLight: "Outfit-ExtraLight",
  outfitLight: "Outfit-Light",
  outfitRegular: "Outfit-Regular",
  outfitMedium: "Outfit-Medium",
  outfitSemiBold: "Outfit-SemiBold",
  outfitBold: "Outfit-Bold",
  outfitExtraBold: "Outfit-ExtraBold",
  outfitBlack: "Outfit-Black",
};

/**
 * Fontweight setting
 * FontsFree-Net-SF-Pro-Rounded-Medium
 * - This font weight will be used for style of screens where needed
 * - Check more how to use font weight with url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const FontWeight = {
  thin: "100",
  ultraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "800",
  black: "900",
};

export const Typography = StyleSheet.create({
  default: {
    fontFamily: FontFamily.outfitRegular,
    color: BaseColors.text,
  },
  bottomTabText: {
    color: BaseColors.primary,
    fontFamily: FontFamily.outfitBold,
  },
  splashTitle: {
    fontFamily: FontFamily.PlayfairRegular,
    fontSize: 22,
    color: BaseColors.text,
    textAlign: "center",
  },
  headerText: {
    fontFamily: FontFamily.outfitSemiBold,
    fontSize: 20,
    color: BaseColors.text,
  },
  splashSubText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: FontFamily.outfitRegular,
    color: BaseColors.titleColor,
  },
  tableTitle: {
    fontSize: 30,
    fontFamily: FontFamily.PlayfairBold,
    color: BaseColors.titleColor,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: FontFamily.outfitRegular,
    color: BaseColors.titleColor,
    marginTop: 10,
  },
  primaryLink: {
    fontSize: 14,
    fontFamily: FontFamily.outfitSemiBold,
    color: BaseColors.primary,
  },

  moreText: {
    fontSize: 18,
    fontFamily: FontFamily.outfitSemiBold,
    color: BaseColors.text,
  },

  link: {
    fontFamily: FontFamily.outfitBold,
    color: BaseColors.text,
    textDecorationLine: "underline",
  },

  primaryLinkText: {
    fontSize: 18,
    fontFamily: FontFamily.outfitRegular,
    color: BaseColors.text,
  },
  termsOfusestyle: {
    fontSize: 16,
    fontFamily: FontFamily.outfitRegular,
    color: BaseColors.text,
  },

  notificationtext: {
    fontSize: 16,
    color: BaseColors.text,
    fontFamily: FontFamily.outfitMedium,
  },

  discoverSubTitle: {
    fontSize: 20,
    color: BaseColors.text,
    fontFamily: FontFamily.outfitMedium,
    textTransform: "capitalize",
  },

  notificationDay: {
    fontSize: 14,
    fontFamily: FontFamily.outfitLight,
    color: BaseColors.lightText,
  },

  profileName: {
    fontSize: 24,
    fontFamily: FontFamily.outfitBold,
    color: BaseColors.text,
  },

  modalTitle: {
    fontSize: 20,
    fontFamily: FontFamily.outfitSemiBold,
    color: BaseColors.text,
  },

  logOutTxt: {
    fontSize: 22,
    fontFamily: FontFamily.outfitSemiBold,
    color: BaseColors.text,
    padding: 30,
    paddingTop: 15,
    textAlign: "center",
  },

  FavoriteBookGenre: {
    fontSize: 20,
    fontFamily: FontFamily.outfitRegular,
    color: BaseColors.titleColor,
  },
  chipCompoText: {
    fontSize: 16,
    color: BaseColors.text,
    fontFamily: FontFamily.outfitSemiBold,
  },
  dropdownText: {
    fontSize: 16,
    color: BaseColors.text,
    fontFamily: FontFamily.outfitRegular,
  },
  errorText: {
    fontSize: 16,
    color: BaseColors.error,
    fontFamily: FontFamily.outfitMedium,
  },
  tags: {
    fontSize: 12,
    fontFamily: FontFamily.outfitRegular,
    color: BaseColors.secondary,
    textAlign: "center",
    textTransform: "uppercase",
  },
  comment: {
    fontSize: 16,
    color: BaseColors.text,
    fontFamily: FontFamily.PlayfairRegular,
  },
  lightLink: {
    fontFamily: FontFamily.outfitRegular,
    fontSize: 14,
    color: BaseColors.text,
    textDecorationLine: "underline",
  },
});
