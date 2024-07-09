import HbookList from "@components/HbookList";
import ImageLoader from "@components/ImageLoader";
import { images } from "@config/images";
import { BaseColors } from "@config/theme";
import { FontFamily, Typography } from "@config/typography";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CommentForDiscover = (props) => {
  const { data, comingSoon, description } = props;

  return (
    <View style={styles.container}>
      <View style={styles.userMainCtr}>
        {comingSoon ? (
          <>
            <ImageLoader
              source={images.bell}
              style={{ height: 25, width: 25 }}
            />
            <Text style={Typography.splashSubText}>Coming Soon</Text>
          </>
        ) : (
          <>
            <ImageLoader
              source={images.spakerPhone}
              style={{ height: 25, width: 25 }}
            />
            <Text style={Typography.splashSubText}>Author’s Insights</Text>
          </>
        )}
      </View>
      <View style={{ padding: 20, paddingHorizontal: 0 }}>
        <View style={styles.userNameCtr}>
          <View style={styles.userMainCtr}>
            <ImageLoader
              source={{ uri: data?.profile_pic }}
              defaultImage={images.author}
              style={{
                borderRadius: 50,
                height: 37,
                width: 37,
              }}
            />
            <Text style={[Typography.profileName, { fontSize: 14 }]}>
              {data?.name}
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 45, overflow: "hidden" }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FontFamily.outfitMedium,
              color: BaseColors.lightText,
              marginBottom: -10,
            }}
          >
            will be released on{" "}
            <Text
              style={{
                fontFamily: FontFamily.outfitSemiBold,
                color: BaseColors.text,
              }}
            >
              July 2024
            </Text>
          </Text>
          <HbookList
            data={data?.books}
            title={null}
            style={{
              width: comingSoon ? 109 : 57,
              height: comingSoon ? 132 : 77,
              borderRadius: 5,
              marginRight: 10,
            }}
            comingSoonDescription={comingSoon ? description : null}
            titleStyle={[
              Typography.primaryLink,
              {
                color: BaseColors.lightText,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  userMainCtr: { flexDirection: "row", alignItems: "center", gap: 10 },
  userNameCtr: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconCtr: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default CommentForDiscover;
