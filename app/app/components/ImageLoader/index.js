import { BaseColors } from "@config/theme";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash-es";
import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";

const ImageLoader = ({
  source,
  style,
  resizeMethod,
  resizeMode,
  defaultImage = "",
  type = "default",
  data = {},
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          size="small"
          color={BaseColors.primary}
          style={[StyleSheet.absoluteFill, styles.activityIndicator]}
        />
      )}
      <TouchableOpacity
        activeOpacity={type === "book" ? 0.9 : 1}
        onPress={() => {
          if (type === "book" && !isEmpty(data)) {
            navigation.navigate("BookDetails", { bookData: data });
          }
        }}
      >
        <FastImage
          source={error ? defaultImage : source}
          style={style}
          resizeMethod={resizeMethod}
          resizeMode={error ? "contain" : resizeMode}
          onLoadEnd={() => setLoading(false)}
          onError={handleError}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageLoader;
