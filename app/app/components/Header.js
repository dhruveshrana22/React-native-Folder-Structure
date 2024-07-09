/* eslint-disable react-native/no-inline-styles */
// Import React and Component
import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { isIPhoneX } from "react-native-status-bar-height";
import { BaseColors, paddingTop } from "@config/theme";
import { Typography } from "@config/typography";
import BackBtn from "./BackBtn";
import Feather from "react-native-vector-icons/Feather";

const isIphoneCurve = isIPhoneX();

const Header = (props) => {
  const {
    title,
    isBack = false,
    leftClick = false,
    handleNotification = () => null,
    handleBackClick = () => null,
    hideBell = false,
    rightText = "",
    style = {},
  } = props;
  return (
    <View
      style={{
        ...styles.textContainer,
        ...style,
        paddingTop: paddingTop,
      }}
    >
      {isBack && (
        <View style={{ marginLeft: -5 }}>
          <BackBtn handleBackClick={handleBackClick} leftClick={leftClick} />
        </View>
      )}
      <View style={{ ...styles.menuView }}>
        {title && (
          <Animated.Text
            entering={FadeInRight}
            exiting={FadeInLeft}
            style={[Typography.tableTitle, { textTransform: "capitalize" }]}
            numberOfLines={3}
          >
            {title}
          </Animated.Text>
        )}
        {!hideBell && !isBack ? (
          <TouchableOpacity activeOpacity={0.8} onPress={handleNotification}>
            <Feather
              name="bell"
              style={{ fontSize: 25, color: BaseColors.text }}
            />
          </TouchableOpacity>
        ) : rightText ? (
          rightText
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: BaseColors.secondary,
    marginTop: isIphoneCurve ? 20 : 0,
  },

  menuView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default React.memo(Header);
