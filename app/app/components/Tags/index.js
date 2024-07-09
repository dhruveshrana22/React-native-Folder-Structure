import { BaseColors } from "@config/theme";
import { Typography } from "@config/typography";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";

export default function Tags(props) {
  const {
    data,
    isAdd,
    onPress = () => {},
    handlePress = () => {},
    type = "default",
  } = props;

  const renderItem = (item, index) => {
    const tagSize = item?.tag_size <= 33 ? 50 : item?.tag_size <= 66 ? 65 : 80;
    return (
      <TouchableOpacity
        key={index}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BaseColors.green,
          borderRadius: 100,
          position: "relative",
          zIndex: 1,
          height: tagSize,
          width: tagSize,
          flexDirection: "row",
          padding: 5,
        }}
        activeOpacity={0.9}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: tagSize === 50 ? 12 : tagSize === 65 ? 14 : 16,
            color: BaseColors.secondary,
          }}
          numberOfLines={2}
        >
          {item?.title || item?.item?.tagData?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
      }}
    >
      {isAdd && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onPress()}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: BaseColors.primary,
            borderRadius: 100,
            position: "relative",
            zIndex: 1,
            height: 50,
            width: 50,
            flexDirection: "row",
          }}
        >
          <Fontisto name="plus-a" size={14} color={BaseColors.text} />
          <Text
            style={[Typography.default, { fontSize: 12, textAlign: "center" }]}
          >
            {" "}
            Add
          </Text>
        </TouchableOpacity>
      )}

      {type === "assign" ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{ gap: 5 }}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        data?.map((item, index) => renderItem(item, index))
      )}
    </View>
  );
}
