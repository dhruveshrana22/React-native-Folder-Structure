import { BaseColors } from "@config/theme";
import React from "react";
import { View } from "react-native";

export default function Divider(props) {
  const {
    marginVertical = 4,
    marginHorizontal = 4,
    borderWidth = 1,
    borderColor = BaseColors.dividerColor,
  } = props;
  return (
    <View
      style={{
        borderWidth: borderWidth,
        borderColor: borderColor,
        marginVertical: marginVertical,
        marginHorizontal: marginHorizontal,
      }}
    />
  );
}
