import Chip from "@components/Chip";
import HbookList from "@components/HbookList";
import ImageLoader from "@components/ImageLoader";
import { images } from "@config/images";
import { BaseColors } from "@config/theme";
import { FontFamily, Typography } from "@config/typography";
import { isArray, isEmpty } from "lodash-es";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Card = (props) => {
  const {
    title = "",
    imageUrl,
    genre,
    books,
    onPress,
    onCarPress,
    isChecked,
    arrow,
    chip,
    description,
    More,
    subArray,
    handleSubGenreSelect = () => {},
    btnLoad = false,
    from = "",
    readOnly = false,
    chipTitle = "",
    chipVariant = "",
    btnNone,
  } = props;

  const [items, setItems] = useState(subArray);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    setItems(subArray);
  }, [subArray]);

  const handleChipPress = (id) => {
    const checkedGenres = items?.filter((genre) => genre?.isChecked);
    const selectedGenreIds = checkedGenres?.map((item) => item?.sub_genre_id);

    const updatedItems =
      !isEmpty(items) &&
      isArray(items) &&
      items.map((item) => {
        if (item.sub_genre_id === id) {
          if (selectedGenreIds?.length >= 12 && !item.isChecked) {
            Toast.show({
              type: "error",
              text1: "You can choose a maximum of 12 Subgenre.",
              position: "bottom",
            });
            return item;
          } else {
            return { ...item, isChecked: !item.isChecked };
          }
        } else {
          return item;
        }
      });
    handleSubGenreSelect(updatedItems);
    setItems(updatedItems);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onCarPress}
        style={styles.main}
      >
        <View
          style={[
            styles.commonShadow,
            {
              padding: !imageUrl && from === "author" ? 6 : 0,
            },
          ]}
        >
          {imageUrl ? (
            <ImageLoader
              source={{ uri: imageUrl }}
              defaultImage={from === "author" ? images.author : images.user}
              style={{
                width: 66,
                height: from === "book" ? 100 : 66,
                borderRadius: 5,
              }}
            />
          ) : from === "book" || from === "genre" ? (
            <FontAwesome
              name="book"
              style={{ fontSize: 40, color: BaseColors.primary, padding: 12 }}
            />
          ) : (
            <ImageLoader
              source={from === "user" ? images.user : images.author}
              style={{
                width: 55,
                height: 55,
                borderRadius: 5,
              }}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={[Typography.chipCompoText]}>{title}</Text>
          {description ? (
            <Text numberOfLines={2} style={styles.descriptionText}>
              {description}
            </Text>
          ) : null}
        </View>
        {!btnNone && (
          <View>
            {chip ? (
              <View style={{ alignItems: "center", gap: 5 }}>
                <Chip
                  style={[
                    {
                      paddingHorizontal: isChecked ? 20 : 30,
                      fontSize: 14,
                      fontFamily: FontFamily.outfitBold,
                    },
                  ]}
                  title={chipTitle || ""}
                  variant={chipVariant || ""}
                  onPress={onPress}
                  btnLoad={btnLoad}
                />

                {description ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setDetails(!details)}
                  >
                    <Text style={styles.moreText}>
                      {details ? "Less" : "More"}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onPress}
                style={{ borderRadius: 50, overflow: "hidden" }}
              >
                <Icon
                  name={
                    arrow
                      ? isChecked
                        ? "up"
                        : "down"
                      : isChecked
                        ? "check"
                        : "plus"
                  }
                  size={20}
                  style={{
                    backgroundColor: arrow
                      ? BaseColors.primary
                      : isChecked
                        ? BaseColors.primary
                        : BaseColors.secondary,
                    borderRadius: 50,
                    padding: 10,
                    color: BaseColors.text,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
      {details && (
        <Animated.View entering={FadeInLeft}>
          {!isEmpty(genre) && (
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 5,
              }}
            >
              {genre?.map((item, index) => (
                <Chip key={index} title={item} variant="success" />
              ))}
            </View>
          )}
          {!isEmpty(books) && (
            <HbookList
              title={null}
              data={books}
              style={{
                width: 50,
                height: 70,
                borderRadius: 4,
                marginRight: 10,
              }}
            />
          )}
        </Animated.View>
      )}
      {arrow && isChecked && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {!isEmpty(items) &&
            isArray(items) &&
            items.map((item) => {
              return (
                <Chip
                  key={item.sub_genre_id}
                  title={item.title}
                  variant={item.isChecked ? "success" : "shadow"}
                  onPress={() => {
                    if (readOnly) {
                      return null;
                    } else {
                      handleChipPress(item.sub_genre_id);
                    }
                  }}
                />
              );
            })}
        </View>
      )}
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
    gap: 15,
  },
  commonShadow: {
    ...Platform.select(BaseColors.commonShadow),
    // Common styles
    backgroundColor: BaseColors.secondary,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: FontFamily.outfitMedium,
    color: BaseColors.text,
    marginTop: 5,
  },
  moreText: {
    color: BaseColors.primary,
    fontFamily: FontFamily.outfitMedium,
    fontSize: 12,
  },
});
