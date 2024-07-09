import { BaseColors } from "@config/theme";
import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    // padding: 8,
    backgroundColor: BaseColors.transparent,
    // borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: BaseColors.text,
  },
});

export default memo(Label);
