/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { images } from "../../config/images";
import { BaseColors } from "../../config/theme";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Typography } from "@config/typography";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Calert from "@components/Calert";

const ModalComponent = ({
  visible,
  setModalVisible = () => null,
  style,
  title,
  contain,
  minHeight = 300,
  hideClose = false,
  modalTitle,
  modalDescription,
  buttonTxt,
  highLightText,
  onClickSaveBtn,
  showDropDown = false,
  cancelText = "cancel",
  isLoader = false,
  showCancelBtn = true,
  img = images.leaveIcon,
  imgStyle,
  info = false,
}) => {
  const handleOverlayClick = (e) => {
    // Check if the click event target is the overlay
    if (e.target === e.currentTarget) {
      setModalVisible(false);
    }
  };

  const [alert, setAlert] = useState(false);

  return (
    <View style={{ ...styles.centeredView, ...style }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        style={{ ...style, minHeight: minHeight }}
        onRequestClose={() => {
          setModalVisible(!visible);
        }}
      >
        <TouchableWithoutFeedback onPress={handleOverlayClick}>
          <View style={styles.overlayStyle}>
            <KeyboardAvoidingView behavior="padding">
              <View style={[styles.modalView, { minHeight: minHeight }]}>
                <View
                  style={{
                    height: 21,
                    width: 21,
                    backgroundColor: BaseColors.black90,
                    alignSelf: "center",
                    borderRadius: 50,
                    position: "relative",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={images.modal}
                    style={{ position: "absolute", bottom: 15 }}
                  />
                </View>
                {title ? (
                  <View style={styles.titleView}>
                    <Text style={Typography.modalTitle}>
                      {title}{" "}
                      {info && (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => setAlert(true)}
                        >
                          <Feather
                            name="alert-triangle"
                            style={{
                              fontSize: 18,
                              color: BaseColors.error,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    </Text>
                    {!hideClose && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setModalVisible(false)}
                      >
                        <AntDesign
                          name="closecircleo"
                          style={{ fontSize: 22, color: BaseColors.text }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ) : null}
                <View style={{ paddingHorizontal: 20 }}>{contain}</View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>

        <Calert
          content={
            "Import is only intended to be used once as an onboarding step. If you do so several times, you risk adding duplicate books and reviews to your account. We cannot undo individual imports."
          }
          visible={alert}
          onRequestClose={() => setAlert(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayStyle: {
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: BaseColors.secondary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
});

export default ModalComponent;
