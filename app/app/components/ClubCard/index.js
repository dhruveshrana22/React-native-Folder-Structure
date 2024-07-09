import { remainingDays } from "@app/utils/commonFunction";
import Chip from "@components/Chip";
import Divider from "@components/Divider";
import ImageLoader from "@components/ImageLoader";
import { images } from "@config/images";
import { BaseColors } from "@config/theme";
import { Typography } from "@config/typography";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

export default function ClubCard(props) {
  const {
    handleClick = () => null,
    addLikes = () => null,
    addComment = () => null,
    data = {},
    userFollow = () => null,
    followBtnLoad = { id: null, load: false },
  } = props;
  const { userData } = useSelector((state) => state.auth);

  function bottomAction() {
    return (
      <View style={{ flexDirection: "row", gap: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => addLikes(data?.id)}
          >
            {data?.is_liked ? (
              <MaterialCommunityIcons
                name="heart"
                style={{
                  color: BaseColors.error,
                  fontSize: 24,
                }}
              />
            ) : (
              <MaterialCommunityIcons
                name="heart-outline"
                style={{
                  color: BaseColors.text,
                  fontSize: 24,
                }}
              />
            )}
          </TouchableOpacity>
          {data?.total_likes > 0 && (
            <Text style={[Typography.default, { marginLeft: 5 }]}>
              {data?.total_likes}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              addComment(data?.id);
            }}
          >
            <MaterialCommunityIcons
              name="comment-outline"
              style={{
                color: BaseColors.text,
                fontSize: 22,
              }}
            />
          </TouchableOpacity>
          {data?.total_comments > 0 && (
            <Text style={[Typography.default, { marginHorizontal: 5 }]}>
              {data?.total_comments}
            </Text>
          )}
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        ...Platform.select(BaseColors.commonShadow),
        backgroundColor: BaseColors.secondary,
        borderRadius: 12,
        padding: 10,
        gap: 10,
      }}
    >
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View>
            <ImageLoader
              source={
                data?.profile_pic ? { uri: data?.profile_pic } : images.user
              }
              defaultImage={images.user}
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 50,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={Typography.headerText}>{data?.full_name}</Text>
            <Text style={Typography.default}>
              {remainingDays(data?.createdAt)}
            </Text>
          </View>
          {userData?.userData?.personal_info?.user_id !== data?.user_id && (
            <Chip
              title={data?.is_followed ? "Unfollow" : "Follow"}
              variant={data?.is_followed ? "default" : "contained"}
              onPress={() => {
                userFollow(data?.user_id);
              }}
              btnLoad={
                followBtnLoad?.id === data?.user_id && followBtnLoad?.load
              }
            />
          )}
        </View>
        <Divider borderWidth={0.2} />
      </>
      <View>
        <Text style={Typography.comment}>{data?.description}</Text>
      </View>
      {bottomAction()}
    </View>
  );
}
