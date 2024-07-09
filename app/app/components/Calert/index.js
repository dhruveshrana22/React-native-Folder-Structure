import { BaseColors } from "@config/theme";
import { Typography } from "@config/typography";
import React from "react";
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native";

export default function Calert(props) {
  const { content = "", visible = false, onRequestClose = () => null } = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              borderRadius: 10,
              backgroundColor: BaseColors.secondary,
              borderWidth: 1,
              borderTopColor: BaseColors.borderColor,
              borderRightColor: BaseColors.borderColor,
              borderLeftColor: BaseColors.borderColor,
              borderBottomColor: BaseColors.error,
              borderBottomWidth: 5,
              margin: 20,
              marginBottom: 40,
              padding: 15,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1,
              elevation: 10,
            }}
          >
            <Text style={[Typography.termsOfusestyle, { fontSize: 14 }]}>
              {content}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
