import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import { Typography } from "@config/typography";
import { images } from "@config/images";
import LottieView from "lottie-react-native";
import { isEmpty } from "lodash-es";

const styles = StyleSheet.create({
  mainConSty: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingBottom: 55,
  },
  lottieContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loader: {
    height: 250,
    width: "100%",
  },
});
/**
 *Displays Loader
 * @function CLoader
 */
function CLoader(props) {
  const { noData, textOnly, style = {}, type = "" } = props;

  if (noData) {
    return (
      <View style={[styles.lottieContainer, style]}>
        {!textOnly && (
          <Image
            source={images.noRecordFound}
            style={{ width: 250, objectFit: "fill" }}
          />
        )}
        <Text style={[Typography.moreText]}>
          {type === "search"
            ? "Search Your Books"
            : `No ${!isEmpty(type) ? type : "Record"} Found`}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.lottieContainer}>
        <LottieView
          autoSize={true}
          source={images.bookLoader}
          autoPlay={true}
          style={styles.loader}
        />
      </View>
    );
  }
}

export default React.memo(CLoader);
