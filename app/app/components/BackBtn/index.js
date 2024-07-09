import { BaseColors } from "@config/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export default function BackBtn(props) {
  const { handleBackClick = () => null, leftClick = false } = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        if (leftClick) {
          handleBackClick();
        } else {
          navigation.goBack();
        }
      }}
      style={{ width: 40 }}
    >
      <SimpleLineIcons
        name="arrow-left-circle"
        style={{ fontSize: 35, color: BaseColors.text }}
      />
    </TouchableOpacity>
  );
}
