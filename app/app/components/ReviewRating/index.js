import ImageLoader from "@components/ImageLoader";
import { StarCompo } from "@components/StarCompo";
import { images } from "@config/images";
import { remainingDays } from "@config/staticData";
import { BaseColors } from "@config/theme";
import { FontWeight, Typography } from "@config/typography";
import React from "react";
import { Text, View, Platform } from "react-native";

export const ReviewRating = (props) => {
  const { data } = props;

  return (
    <View
      style={{
        borderBottomColor: BaseColors.borderColor,
        paddingVertical: 10,
        gap: 5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <ImageLoader
          source={{ uri: data?.userData?.profile_pic || data?.profile_pic }}
          defaultImage={images.user}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            ...Platform.select(BaseColors.commonShadow),
          }}
        />
        <Text
          style={[
            Typography.moreText,
            { fontSize: 14, fontWeight: FontWeight.medium },
          ]}
        >
          {data?.userData?.full_name || data?.full_name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignContent: "center",
          gap: 5,
        }}
      >
        <StarCompo
          maxStars={5}
          rating={data?.rating}
          starSize={15}
          containerStyle={{ gap: 5 }}
        />
        {data?.createdAt ? (
          <Text style={Typography.notificationDay}>
            {remainingDays(data?.createdAt)}
          </Text>
        ) : null}
      </View>

      <View style={{ alignSelf: "flex-start" }}>
        <Text style={[Typography.notificationDay]}>{data?.description}</Text>
      </View>
    </View>
  );
};
