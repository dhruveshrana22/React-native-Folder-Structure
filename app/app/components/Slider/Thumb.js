import { images } from "@config/images";
import LottieView from "lottie-react-native";
import React, { memo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Label from "./Label";
import { BaseColors } from "@config/theme";

const THUMB_RADIUS_LOW = 12;
const THUMB_RADIUS_HIGH = 16;

const Thumb = ({ count }) => {
  const lottieRef = useRef(null);

  return (
    <View style={styles.root}>
      <Label text={count} />
      <LottieView
        ref={lottieRef}
        source={images.sliderBook}
        autoPlay={true}
        loop={true}
        style={{
          width: 30,
          height: 30,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: BaseColors.secondary,
  },
  rootHigh: {
    width: THUMB_RADIUS_HIGH * 2,
    height: THUMB_RADIUS_HIGH * 2,
    borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: BaseColors.secondary,
  },
  root: {
    marginBottom: 10,
    marginTop: -15,
  },
});

export default memo(Thumb);
