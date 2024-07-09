import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import { Typography } from "@config/typography";
import { BaseColors } from "@config/theme";

const Chip = ({
  title,
  variant,
  style,
  onPress = () => {},
  btnLoad = false,
  removeIconPress = () => {},
  removeIcon = false,
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (btnLoad) {
            return null;
          } else {
            onPress();
          }
        }}
        style={[
          style,
          styles.baseStyle,
          {
            backgroundColor:
              variant === "contained"
                ? BaseColors.primary
                : variant === "success"
                  ? BaseColors.green
                  : variant === "disable"
                    ? BaseColors.disable
                    : BaseColors.secondary,
          },
        ]}
      >
        {btnLoad ? (
          <ActivityIndicator color={BaseColors.text} />
        ) : (
          <Text
            style={[
              Typography.default,
              {
                color:
                  variant === "success"
                    ? BaseColors.secondary
                    : BaseColors.text,
              },
            ]}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>

      {removeIcon && (
        <TouchableOpacity
          onPress={removeIconPress}
          activeOpacity={0.9}
          style={styles.renoveIconConatiner}
        >
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
              textAlignVertical: "top",
              color: BaseColors.error,
            }}
          >
            x
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    ...Platform.select(BaseColors.commonShadow),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  renoveIconConatiner: {
    ...Platform.select(BaseColors.commonShadow),
    position: "absolute",
    zIndex: 1,
    alignSelf: "flex-end",
    height: 18,
    width: 18,
    borderRadius: 100,
    borderColor: BaseColors.error,
    borderWidth: 1,
    justifyContent: "center",
    bottom: 20,
    right: -6,
    backgroundColor: BaseColors.secondary,
  },
});

Chip.propTypes = {
  variant: PropTypes.oneOf(["contained", "outline", "shadow", "success"]),
  style: PropTypes.object,
  onPress: PropTypes.func,
  title: PropTypes.string,
  btnLoad: PropTypes.bool,
};

Chip.defaultProps = {
  variant: "contained",
  style: {},
  onPress: () => {},
};

export default Chip;
