import { BaseColors } from "@config/theme";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: BaseColors.primary,
    borderWidth: 3,
  },

  author: {
    width: 18,
    height: 18,
  },

  chip: {
    borderWidth: 0.3,
    borderColor: BaseColors.bookEmptyColor,
    textAlign: "center",
    width: Dimensions.get("window").width / 2 - 30,
  },
  setting: {
    color: BaseColors.borderColor,
    fontSize: 30,
    padding: 5,
    marginRight: -5,
  },
});
