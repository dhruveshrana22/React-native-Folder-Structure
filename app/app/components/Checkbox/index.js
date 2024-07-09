/* eslint-disable react-native/no-inline-styles */
import { Typography } from "@config/typography";
import { images } from "../../config/images";
import { BaseColors } from "../../config/theme";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { isEmpty } from "lodash-es";

const Checkbox = ({
  isChecked,
  toggleCheckbox,
  title,
  preTitle,
  disabled,
  link,
  afterTitle,
  linkPress1 = () => {},
  linkPress2 = () => {},
}) => {
  return (
    <Animated.View entering={FadeInDown}>
      <TouchableOpacity
        onPress={toggleCheckbox}
        activeOpacity={0.9}
        disabled={disabled}
        style={{
          flexDirection: "row",
          justifyContent: preTitle ? "space-between" : "flex-start",
          alignItems: "center",
        }}
      >
        {preTitle && <Text style={Typography.primaryLinkText}>{preTitle}</Text>}
        <View
          style={{
            marginHorizontal: 10,
            width: 16,
            height: 16,
            borderWidth: 1,
            borderColor: isChecked ? BaseColors.primary : BaseColors.text,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isChecked
              ? BaseColors.primary
              : BaseColors.secondary, // Change the background color when checked
            borderRadius: 50,
          }}
        >
          {isChecked && (
            <Image
              tintColor={BaseColors.secondary}
              source={images.checkIcon}
              style={{
                width: 10,
                height: 10,
              }}
            />
          )}
        </View>
        {isEmpty(preTitle) && (
          <Text style={link ? Typography.default : Typography.chipCompoText}>
            {title}
            {link && (
              <>
                <Text onPress={linkPress1} style={[Typography.link]}>
                  Terms & Conditions
                </Text>
                {"\n"}
                and{" "}
                <Text onPress={linkPress2} style={[Typography.link]}>
                  Privacy Policy.
                </Text>
              </>
            )}
          </Text>
        )}

        {afterTitle && (
          <Text style={Typography.primaryLinkText}>{afterTitle}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Checkbox;
