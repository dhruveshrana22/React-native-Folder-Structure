import Chip from "@components/Chip";
import ImageLoader from "@components/ImageLoader";
import { images } from "@config/images";
import { BaseColors } from "@config/theme";
import { Typography } from "@config/typography";
import { isNull } from "lodash-es";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const AuthorCard = (props) => {
  const {
    title = "",
    imageUrl,
    onPress,
    isChecked = false,
    type = "",
    follow = false,
  } = props;

  return type === "horizontal" ? (
    <>
      <View
        style={[
          styles.horizontalContainer,
          {
            minHeight: follow ? 150 : 135,
          },
        ]}
      >
        <ImageLoader
          style={[
            styles.image,
            {
              width: 50,
              height: 50,
            },
          ]}
          resizeMode={"contain"}
          source={imageUrl ? images.author : { uri: imageUrl }}
          defaultImage={images?.author}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={3}
            style={[Typography.splashSubText, { marginBottom: follow && 5 }]}
          >
            {title}
          </Text>
        </View>
      </View>
      {follow && (
        <View style={{ marginTop: -20, alignItems: "center" }}>
          <Chip title="Follow" variant="outline" />
        </View>
      )}
    </>
  ) : (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            borderColor: isChecked
              ? BaseColors.primary
              : BaseColors.transparent,
          },
        ]}
      >
        {isChecked && (
          <View style={styles.checkIcon}>
            <Icon name="check" size={12} color={BaseColors.text} />
          </View>
        )}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <ImageLoader
            style={[
              styles.image,
              {
                width: isNull(imageUrl) ? 66 : 55,
                height: isNull(imageUrl) ? 66 : 55,
              },
            ]}
            resizeMode={"contain"}
            source={imageUrl ? images.author : { uri: imageUrl }}
            defaultImage={images.author}
          />
          <Text
            style={[
              Typography.chipCompoText,
              {
                textAlign: "center",
                marginTop: 15,
              },
            ]}
            numberOfLines={3}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AuthorCard;

const styles = StyleSheet.create({
  container: {
    ...Platform.select(BaseColors.commonShadow),
    width: "100%",
    backgroundColor: BaseColors.secondary,
    borderRadius: 10,
    minHeight: 150,
    padding: 15,
    borderWidth: 2,
  },
  image: {
    ...Platform.select(BaseColors.commonShadow),
    borderRadius: 100,
    backgroundColor: BaseColors.secondary,
  },
  checkIcon: {
    alignItems: "flex-end",
    position: "absolute",
    right: 5,
    top: 5,
    backgroundColor: BaseColors.primary,
    padding: 3,
    borderRadius: 100,
  },

  horizontalContainer: {
    ...Platform.select(BaseColors.commonShadow),
    backgroundColor: BaseColors.secondary,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    width: 90,
  },
});
