import { BaseColors } from "@config/theme";
import { FontFamily, FontWeight } from "@config/typography";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: BaseColors.secondary,
    borderRadius: 8,
    ...Platform.select(BaseColors.commonShadow),
  },
  bookChapter: {
    fontFamily: FontFamily.outfitRegular,
    fontSize: 12,
    color: BaseColors.lightText,
    marginVertical: 5,
  },
  contentContainer: {
    backgroundColor: BaseColors.secondary,
    flex: 1,
  },
  text1: {
    fontFamily: FontFamily.outfitRegular,
    fontWeight: FontWeight.medium,
    color: BaseColors.lightText,
    fontSize: 10,
  },

  tagsText: {
    fontFamily: FontFamily.outfitRegular,
    fontWeight: FontWeight.regular,
    fontSize: 12,
    color: BaseColors.secondary,
  },

  dropdown: {
    backgroundColor: BaseColors.primary,
    borderColor: BaseColors.transparent,
    borderRadius: 30,
    height: 30,
  },
});
