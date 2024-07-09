import React from "react";
import { View } from "react-native";
import { Dimensions } from "react-native";
import CLoader from "../../components/CLoader";
import { BaseColors } from "../../config/theme";

/**
 * About Screen
 * @module About
 *
 */
function WebviewLoader() {
  return (
    <View
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: BaseColors.secondary,
      }}
    >
      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: BaseColors.secondary,
        }}
      >
        <CLoader />
      </View>
    </View>
  );
}
export default React.memo(WebviewLoader);
