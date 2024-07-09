import React from "react";
import ModalComponent from "../index";
import { View } from "react-native";
import Button from "@components/Button";

export default function ConfirmModal(props) {
  const {
    handleModalVisible = () => {},
    visible = false,
    title = "",
    body = "",
    onBtnClick = () => {},
    btnTitle = "Confirm",
    btnLoad = false,
  } = props;
  return (
    <ModalComponent
      visible={visible}
      setModalVisible={() => {
        handleModalVisible(false);
      }}
      title={title}
      contain={
        <View>
          {body}
          <Button
            loading={btnLoad}
            disabled={btnLoad}
            onBtnClick={() => onBtnClick()}
          >
            {btnTitle}
          </Button>
        </View>
      }
    />
  );
}
