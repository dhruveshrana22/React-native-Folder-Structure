import { BaseColors } from "../../config/theme";
import { translate } from "../../lang/Translate";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const UpdatePopup = ({
  isVisible,
  onUpdate,
  loader,
  updateProgress,
  message,
}) => {
  return (
    <Modal transparent={true} animationType={"none"} visible={isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Text style={styles.title}>{translate("UpdateAvailable")}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            onPress={() => onUpdate()}
            activeOpacity={0.9}
            style={styles.btnStyle}
          >
            <Text style={styles.modalButtonText}>
              {loader && updateProgress < 1
                ? translate("UpdatePreparing")
                : loader && updateProgress > 0 && updateProgress < 100
                  ? translate("Updating", {
                      progress: updateProgress,
                    })
                  : loader && updateProgress > 99
                    ? translate("Installing")
                    : translate("UpdateNow")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Define your styles here
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
    padding: 50,
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  title: {
    color: BaseColors.primary,
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    padding: 6,
    textAlign: "center",
  },
  btnStyle: {
    borderRadius: 10,
    backgroundColor: BaseColors.secondary,
    marginTop: 10,
    width: "100%",
  },
  modalButtonText: {
    color: BaseColors.secondary,
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    padding: 6,
    textAlign: "center",
    paddingHorizontal: 18,
  },
  message: {
    color: "#333",
    fontSize: 12,
    fontFamily: "Inter-Regular",
    padding: 6,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default UpdatePopup;
