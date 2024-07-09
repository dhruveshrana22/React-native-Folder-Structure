import { StyleSheet } from "react-native";
import { BaseColors, BorderRadius, FontFamily, FontSize } from "@config/theme";

const styles = StyleSheet.create({
  RbSheetModalCustomStyle: {
    wrapper: {},
    draggableIcon: {
      // backgroundColor: BaseColors.primary,
      width: 50,
    },
    container: {
      backgroundColor: "white",
      borderTopRightRadius: 45,
      borderTopLeftRadius: 45,
    },
  },
  RBSheetModalTitleText: {
    fontSize: FontSize(20),
    // fontFamily: FontFamily.medium,
    color: BaseColors.textColor,
    textAlign: "center",
    paddingVertical: 10,
  },
  RBsheetModalItemsMainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: BaseColors.borderColor,
  },
  RBSheetModalItemsIconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  RBSheetModalItemsLeftIcon: {
    fontSize: FontSize(25),
    color: BaseColors.primary,
  },
  RBSheetModalItemsTitleText: {
    fontSize: FontSize(16),
    // fontFamily: FontFamily.regular,
    color: BaseColors.text,
    textAlign: "center",
    marginLeft: 10,
  },
  RBSheetModalItemsRightIcon: {
    fontSize: FontSize(20),
    color: BaseColors.text,
  },
  mainView: {
    backgroundColor: BaseColors.lightYellow,
    borderRadius: 100,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 15,
    elevation: 3,
    position: "relative",
  },
  squareView: {
    backgroundColor: BaseColors.secondary,
    borderRadius: 12,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    borderWidth: 1,
    borderStyle: "dashed",
    overflow: "hidden",
  },
  textAndIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
  },
  attachmentIcon: {
    fontSize: FontSize(28),
    color: BaseColors.grey50,
  },
  titleText: {
    marginLeft: 10,
    fontSize: FontSize(18),
    // fontFamily: FontFamily.regular,
    color: BaseColors.textColor,
  },
  requiredIcon: {
    color: BaseColors.error,
    top: -8,
    fontSize: FontSize(8),
  },
  uploadedIcon: {
    position: "absolute",
    bottom: -5,
    right: 5,
    backgroundColor: BaseColors.blueWhale,
    borderRadius: 100,
    height: 30,
    width: 30,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  removeIcon: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: BaseColors.secondary,
    borderRadius: 100,
    color: BaseColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  rightContainer: {},
  uploadText: {
    fontSize: FontSize(18),
    // fontFamily: FontFamily.regular,
    color: BaseColors.primary,
  },
  multipleFileNameText: {
    fontSize: FontSize(18),
    // fontFamily: FontFamily.regular,
    color: BaseColors.grey50,
    marginLeft: 10,
  },
  multipleCardContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingTop: 10,
    marginHorizontal: 2,
  },
  multipleFileNameTextContainer: {
    width: "78%",
    flexDirection: "row",
    alignItems: "center",
  },
  multipleCardImageIcon: {
    fontSize: FontSize(22),
    color: BaseColors.grey50,
  },
  multipleRightContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  multipleDeleteIconContainer: {
    height: 30,
    width: 30,
    borderRadius: 10,
    backgroundColor: `${BaseColors.error}20`,
    justifyContent: "center",
    alignItems: "center",
  },
  multipleDeleteIcon: {
    fontSize: FontSize(20),
    color: BaseColors.error,
  },
  errorMsg: {
    // fontFamily: FontFamily.regular,
    textAlign: "left",
    color: BaseColors.error,
    marginStart: 2,
    marginEnd: 24,
    fontSize: FontSize(12),
    letterSpacing: 1,
  },
});

export default styles;