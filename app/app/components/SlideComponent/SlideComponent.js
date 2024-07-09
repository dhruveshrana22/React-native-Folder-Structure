/* eslint-disable react-native/no-inline-styles */
import Thumb from "@components/Slider/Thumb";
import React, { useCallback } from "react";
import { Dimensions, View } from "react-native";
import RnRangeSlider from "rn-range-slider";
import Rail from "@components/Slider/Rail";
import RailSelected from "@components/Slider/RailSelected";

const { width, height } = Dimensions.get("screen");

const slideWidth = width * 0.75;
const slideHeight = height * 0.4;

const SlideComponent = (props) => {
  const { value, onValueChange, alwaysLabel = false, disabled = false } = props;

  const renderThumb = useCallback(
    (index) => {
      if (index === "high") {
        return <View />;
      }
      return <Thumb count={value} />;
    },
    [value]
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  return (
    <RnRangeSlider
      min={0}
      max={100}
      step={1}
      high={100}
      low={value}
      floatingLabel
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      onValueChanged={onValueChange}
      disabled={disabled}
    />
  );
};

//  use this component like this

//   <SlideComponent
//         onValueChange={(low, high) => setValue(low)}
//         value={value}
//       />

export default React.memo(SlideComponent);
