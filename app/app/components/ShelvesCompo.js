import React from "react";
import { TouchableOpacity, Text, FlatList, View } from "react-native";
import { BaseColors } from "@config/theme";
import { FontWeight, Typography } from "@config/typography";
import ImageLoader from "./ImageLoader";
import { images } from "@config/images";
import Fontisto from "react-native-vector-icons/Fontisto";

const ShelfList = ({
  shelvesData,
  handlePress = () => {},
  isAdd,
  onPress = () => {},
  from = "",
}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ alignItems: "center" }}
      onPress={() => handlePress(item)}
      activeOpacity={0.9}
    >
      <ImageLoader
        source={images.shelf}
        style={{ height: 40, width: 40 }}
        resizeMode={"contain"}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          color: BaseColors.lightText,
          fontWeight: FontWeight.regular,
          width: 70,
          marginTop: 10,
        }}
        numberOfLines={2}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {isAdd && (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: BaseColors.primary,
              borderRadius: 100,
              position: "relative",
              zIndex: 1,
              height: 50,
              width: 50,
            }}
          >
            <Fontisto name="plus-a" size={20} color={BaseColors.text} />
          </TouchableOpacity>
          <Text
            style={[Typography.default, { fontSize: 12, textAlign: "center" }]}
            numberOfLines={2}
          >
            Add{"\n"} Shelves
          </Text>
        </View>
      )}
      <FlatList
        data={shelvesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // Ensure unique keys
        horizontal={from !== "modal"} // Render horizontally
        showsHorizontalScrollIndicator={false} // Hide scroll indicator
        contentContainerStyle={{
          paddingHorizontal: from === "modal" ? 0 : 5,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }} // Add horizontal padding
        // ListEmptyComponent={() => {
        //   return <CLoader noData textOnly={true} />;
        // }}
      />
    </View>
  );
};

export default ShelfList;
