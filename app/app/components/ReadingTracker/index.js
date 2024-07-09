import React from "react";
import { BaseColors } from "@config/theme";
import { Typography } from "@config/typography";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ImageLoader from "@components/ImageLoader";
import { images } from "@config/images";

export default function ReadingTracker(props) {
  const { achieved, goal, month, empty, onPress } = props;
  const height = Math.round((achieved / goal) * 100);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.container}>
        {empty ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: 78,
            }}
          >
            <FontAwesome5Icon
              name="plus"
              style={{ color: BaseColors.lightText }}
            />
            <Text
              style={[
                Typography.splashSubText,
                { color: BaseColors.lightText, marginTop: 10 },
              ]}
            >
              Set {month ? "Monthly" : "Yearly"} Reading Goal
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: BaseColors.bookEmptyColor,
                position: "relative",
                height: 100,
                width: month ? 85 : 70,
              }}
            >
              <View
                style={{
                  backgroundColor: goal === 0 ? "transparent" : BaseColors.text,
                  height: `${height < 100 ? height : 100}%`,
                  width: "100%",
                  position: "absolute",
                  bottom: 0,
                }}
              />
              <ImageLoader
                source={month ? images.monthlyGoal : images.yearlyGoal}
                style={{
                  width: "100%",
                  height: 100,
                  position: "absolute",
                  zIndex: 1,
                }}
              />
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text
                style={[
                  Typography.chipCompoText,
                  { color: BaseColors.primary, textAlign: "center" },
                ]}
              >
                {`${achieved}/${goal}`}
              </Text>
              <Text
                style={[
                  Typography.splashSubText,
                  { color: BaseColors.lightText, flexWrap: "wrap" },
                ]}
              >
                {month ? "Monthly" : "Yearly"} {"\n"} reading {"\n"} tracker
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: BaseColors.secondary,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    ...Platform.select(BaseColors.commonShadow),
  },
});
