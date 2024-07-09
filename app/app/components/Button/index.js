/* eslint-disable react-native/no-inline-styles */

import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { BaseColors } from "../../config/theme";
import Animated, {
  Easing,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";
import { Image } from "react-native";
import { FontFamily } from "@config/typography";
import Feather from "react-native-vector-icons/Feather";
import { isString } from "lodash-es";

/**
 * Component for Button
 * @module  Button
 *
 */
export default function Button(props) {
  const {
    variant,
    children,
    type,
    shape,
    raised,
    containerStyle,
    loading,
    onBtnClick,
    style,
    txtSty,
    iconPosition,
    iconName,
    iconSty,
    showRightIcon = "",
    showLeftIcon,
    imgSrc = "",
    fromModal,
    disabled,
    error,
    onRightIconClick,
    ...rest
  } = props;

  const renderText = () => (
    <Text
      numberOfLines={1}
      style={{
        fontSize: 16,
        marginRight: showRightIcon && 25,
        color: BaseColors.text,
        fontFamily: FontFamily.outfitSemiBold,
        ...txtSty,
      }}
    >
      {!loading ? (
        children
      ) : (
        <ActivityIndicator animating color={BaseColors.text} />
      )}
    </Text>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={disabled}
      {...rest}
      onPress={loading ? () => {} : onBtnClick}
      style={{
        paddingBottom: 7,
        ...styles[shape],
        ...styles[type],
        ...style,
      }}
    >
      <View
        style={[
          styles.btnContainer,
          {
            backgroundColor:
              variant === "outline"
                ? BaseColors.secondary
                : disabled
                  ? "#F5F6F8"
                  : BaseColors.primary,
            borderWidth: fromModal || disabled ? 0 : 1,
            borderStyle: children.includes("Upload") ? "dashed" : "solid",
            borderColor: showRightIcon
              ? error
                ? BaseColors.error
                : BaseColors.lightText
              : variant === "outline"
                ? BaseColors.text
                : BaseColors.primary,
            position: "relative",
            ...Platform.select(BaseColors.commonShadow),
          },
          containerStyle,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: showRightIcon ? "start" : "center",
          }}
        >
          {isString(showRightIcon) && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onRightIconClick}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                justifyContent: "center",
              }}
            >
              <Animated.View
                entering={FadeInUp.duration(500).easing(Easing.ease)}
                exiting={FadeInLeft}
              >
                <Feather
                  name={showRightIcon}
                  style={{ fontSize: 20, color: BaseColors.text }}
                />
              </Animated.View>
            </TouchableOpacity>
          )}
          {renderText()}
          {showLeftIcon ? (
            <Animated.View
              entering={FadeInUp.duration(500).easing(Easing.ease)}
              exiting={FadeInLeft}
              style={{ position: "absolute", left: 0, top: 0, bottom: 0 }}
            >
              <Image
                source={imgSrc}
                resizeMethod={"resize"}
                resizeMode={"cover"}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
            </Animated.View>
          ) : null}
        </View>
      </View>
      {/* )} */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  round: {
    borderRadius: 50,
  },
  square: {
    borderRadius: 5,
  },
  btnContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 50,
  },
  outlined: {
    backgroundColor: BaseColors.secondary,
    borderWidth: 1,
    borderColor: BaseColors.text,
  },
  text: {
    backgroundColor: "transparent",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 0,
  },
});

Button.propTypes = {
  variant: PropTypes.oneOf(["contained", "outline"]),
  type: PropTypes.oneOf(["primary", "outlined", "text", "secondary"]),
  shape: PropTypes.oneOf(["round", "square"]),
  raised: PropTypes.bool,
  containerStyle: PropTypes.object,
  loading: PropTypes.bool,
  showRightIcon: PropTypes.string,
  showLeftIcon: PropTypes.bool,
  onBtnClick: PropTypes.func,
  style: PropTypes.object,
  txtSty: PropTypes.object,
  iconPosition: PropTypes.string,
  iconName: PropTypes.string,
  iconSty: PropTypes.object,
  imgSrc: PropTypes.string,
  onRightIconClick: PropTypes.func,
};

Button.defaultProps = {
  variant: "contained", // "outline"
  type: "primary", // "primary"  | "outlined" | "text"
  shape: "square", // "round"  | "square"
  raised: true, // true | false
  containerStyle: {},
  loading: false, // true | false
  showRightIcon: "",
  showLeftIcon: false,
  onBtnClick: () => {},
  onRightIconClick: () => {},
  style: {},
  txtSty: {},
  iconPosition: "left",
  iconName: "",
  iconSty: {},
  imgSrc: "",
};
