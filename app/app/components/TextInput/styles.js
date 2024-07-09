import { BaseColors } from "@config/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: BaseColors.subTextColor,
    marginTop: 20,
  },
  countryPickerView: {
    // backgroundColor: 'red'
  },
  inputWrapper: {
    // padding: ,
    backgroundColor: BaseColors.recordingRed,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: BaseColors.secondary,
  },
  input: {
    flex: 1,
    // marginEnd: 24,
    color: BaseColors.blackColor,
    height: 50,
  },
});

export default styles;
