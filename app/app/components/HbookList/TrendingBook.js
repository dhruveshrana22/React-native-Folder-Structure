import ImageLoader from "@components/ImageLoader";
import { images } from "@config/images";
import { BaseColors } from "@config/theme";
import { FontWeight, Typography } from "@config/typography";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function TrendingBooks(props) {
  const { data = [], title, seeMore = "", onPress } = props;

  return (
    <View>
      <View
        style={{
          paddingVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={Typography.discoverSubTitle}>{title}</Text>
        {seeMore && (
          <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <Text
              style={[
                Typography.default,
                { color: BaseColors.lightText, fontSize: 14 },
              ]}
            >
              {seeMore}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Carousel
        width={Dimensions.get("screen").width - 40}
        style={{
          height: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
        data={data}
        modeConfig={{
          stackInterval: 50,
        }}
        mode="horizontal-stack"
        renderItem={(item) => {
          return (
            <ImageLoader
              source={{
                uri: item?.item?.thumbnail_image,
              }}
              defaultImage={images.book}
              style={{
                height: "100%",
                width: 130,
                borderRadius: 10,
                backgroundColor: BaseColors.secondary,
              }}
              resizeMode="cover"
              type={"book"}
              data={item?.item}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    padding: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 130,
    resizeMode: "cover",
    borderRadius: 10,
    textAlignVertical: "center",
  },
  imageCtr: {
    width: 100,
    alignItems: "center",
    // Adjust margin between images
  },
});
