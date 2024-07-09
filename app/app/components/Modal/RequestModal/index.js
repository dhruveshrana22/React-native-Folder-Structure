import React from "react";
import ModalComponent from "../index";
import { Text } from "react-native";
import { Typography } from "@config/typography";
import LottieView from "lottie-react-native";
import { images } from "@config/images";
import Button from "@components/Button";

export default function Request(props) {
  const { handleModalVisible = () => {}, visible = false, data = {} } = props;

  return (
    <ModalComponent
      visible={visible}
      setModalVisible={() => {
        handleModalVisible(false);
      }}
      title={"Request Book club"}
      contain={
        <>
          <LottieView
            autoSize={true}
            source={images?.requestAuthor}
            autoPlay={true}
            style={{ height: 180, width: "100%" }}
          />
          <Text
            style={[
              Typography?.moreText,
              { textAlign: "center", marginVertical: 20 },
            ]}
          >
            The request for the book club has been successfully submitted.
          </Text>
          <Text
            style={[
              Typography.bottomTabText,
              { fontSize: 18, textAlign: "center" },
            ]}
          >
            You will be notified once it's created.
          </Text>
          <Button onBtnClick={() => handleModalVisible(false)}>Okay</Button>
        </>
      }
    />
  );
}
