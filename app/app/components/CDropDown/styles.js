import { BaseColors } from "@config/theme";
import { FontFamily } from "@config/typography";
import { StyleSheet, Platform } from "react-native";

const IOS = Platform.OS === "ios";
const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
  },
  requiredIcon: {
    color: BaseColors.error,
    marginLeft: 2,
    fontSize: 8,
  },
  disabled: {
    backgroundColor: BaseColors.grey20,
    opacity: 0.7,
  },
  dropdownContainer: {
    padding: 10,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: BaseColors.secondary,
    borderColor: BaseColors.borderColor,
  },
  placeholderStyle: {
    color: BaseColors.placeHolderColor,
    paddingLeft: 20,
  },
  selectedTextStyle: {
    paddingLeft: 20,
    color: BaseColors.text,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  inputSearchStyle: {
    borderRadius: 12,
    height: 40,
    color: BaseColors.text,
    lineHeight: 20,
    padding: 0,
  },
  listContainer: {
    backgroundColor: BaseColors.dropdown,
    borderRadius: 12,
    borderColor: BaseColors.primary,
    borderWidth: 1,
    overflow: "hidden",
    paddingVertical: 10,
  },
  listText: {
    color: BaseColors.text,
  },
  selectedStyle: {
    backgroundColor: BaseColors.primary,
    borderRadius: 12,
  },
  errorMsg: {
    fontFamily: FontFamily.regular,
    textAlign: "left",
    color: BaseColors.error,
    marginStart: 2,
    marginEnd: 24,
    margin: 5,
    fontSize: 12,
    letterSpacing: 1,
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  noDataText: {
    color: BaseColors.text,
    fontSize: 16,
  },
});

export default styles;
