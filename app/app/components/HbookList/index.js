import CLoader from "@components/CLoader";
import ImageLoader from "@components/ImageLoader";
import { BaseColors } from "@config/theme";
import { FontFamily, FontWeight, Typography } from "@config/typography";
import { isEmpty, isNull } from "lodash-es";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import { images } from "@config/images";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HbookList(props) {
  const {
    data = [],
    style,
    title,
    description,
    rightText = "",
    editIcon = false,
    onPress,
    titleStyle,
    comingSoonDescription,
    loading = false,
    isAdd,
    handleAddBtn = () => {},
    shareIcon = false,
    handleShare = () => {},
  } = props;

  const renderComponent = ({ item }) => {
    return (
      <>
        <ImageLoader
          source={
            item?.image ||
            item?.thumbnail_image ||
            item?.bookData?.thumbnail_image
              ? {
                  uri:
                    item?.image ||
                    item?.bookData?.thumbnail_image ||
                    item?.thumbnail_image,
                }
              : images?.book
          }
          defaultImage={images.book}
          style={style}
          resizeMode={"cover"}
          data={item}
          type={"book"}
        />
        {comingSoonDescription ? (
          <View style={{ paddingRight: 10 }}>
            <View>
              <Text style={Typography.chipCompoText}>About book</Text>
            </View>
            <View style={{ width: 190, paddingVertical: 10, paddingRight: 10 }}>
              <Text
                style={[
                  {
                    fontSize: 10,
                    flex: 1,
                    textAlign: "left",
                    fontFamily: FontFamily.outfitRegular,
                    fontWeight: FontWeight.regular,
                    color: BaseColors.lightText,
                  },
                ]}
              >
                Despite facing numerous challenges, Michel began to change his
                attitude and overcome obstacles to reach new levels of success.
                Even though his teacher had discouraged him at times, Michel
                persevered and proved them wrong. What an inspiring story!
              </Text>
            </View>
          </View>
        ) : description ? (
          <View
            style={{
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <View style={{ width: 90, marginRight: 15 }}>
              <Text
                numberOfLines={3}
                style={[
                  Typography.profileName,
                  {
                    fontSize: 14,
                  },
                ]}
              >
                {item?.bookData?.title || item?.title}
              </Text>
            </View>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {title && (
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={2}
              style={[Typography.moreText, { ...titleStyle }]}
            >
              {title}
            </Text>
          </View>
        )}
        {shareIcon && (
          <TouchableOpacity
            style={{ alignSelf: "center", marginRight: 10 }}
            activeOpacity={0.8}
            onPress={() => handleShare()}
          >
            <FontAwesome
              name="share-square-o"
              size={22}
              color={BaseColors.text}
            />
          </TouchableOpacity>
        )}
        {rightText ? (
          <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <Text
              style={[
                Typography.default,
                {
                  color: BaseColors.lightText,
                },
              ]}
            >
              {rightText}
            </Text>
          </TouchableOpacity>
        ) : editIcon ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <Feather
              name="edit"
              style={{ fontSize: 23, color: BaseColors.borderColor }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {loading ? (
        <View
          style={{
            height: 111,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={BaseColors.primary} size={"large"} />
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          {isAdd && (
            <TouchableOpacity
              style={[styles.addBook, style]}
              activeOpacity={0.9}
              onPress={() => handleAddBtn()}
            >
              <Fontisto name="plus-a" size={30} color={BaseColors.text} />
              <Text style={[Typography.default, { fontSize: 12 }]}>
                Add Book
              </Text>
            </TouchableOpacity>
          )}
          <FlatList
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index} // Use unique ID or generate random key
            renderItem={renderComponent}
            ListEmptyComponent={() => <CLoader type="Books" noData textOnly />}
            contentContainerStyle={isEmpty(data) ? { flex: 1 } : null}
            style={{ overflow: "visible" }}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addBook: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BaseColors.primary,
    zIndex: 1,
    gap: 10,
  },
});
