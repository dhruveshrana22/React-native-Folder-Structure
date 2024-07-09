import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { BaseColors } from "../../config/theme";
import { I18nManager } from "react-native";
import { isIPhoneX } from "react-native-status-bar-height";
import { CustomIcon } from "../../config/LoadIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontFamily, Typography } from "@config/typography";
import Toast from "react-native-toast-message";
import Chip from "@components/Chip";

const isIphoneCurve = isIPhoneX();

const IOS = Platform.OS === "ios";
function CInput(props, ref) {
  const { darkmode } = useSelector((state) => state.auth);

  const {
    placeholderText = "",
    onSubmit = () => {},
    onChange = () => {},
    value = "",
    secureText = false, // true | false
    textStyle = {},
    // style= {},
    onBlur = () => {},
    onBlurFunc = () => {},
    phoneNumber = false, // true | false
    Date = false, // true | false
    showError = false, // true | false
    keyBoardType = "default",
    errorText = "",
    returnKeyType,
    onCountryChange,
    style,
    numberOfLines,
    editable,
    multiline,
    country,
    callingCode,
    countryCode,
    minDate,
    maxDate,
    noIcon,
    isMax,
    // DateErrorTxt,
    maxLength,
    errIconStyl,
    iconStyl,
    r1Icon,
    rightIconPress = () => {},
    AddPress = () => {},
    disabledAdd = false,
    showDropDown,
    dropdownValue,
    onDropdownPress,
    onShowPassword,
    isPassWord = false,
    showPassword,
    maximumDate,
    isVerified = false,
    closeIcon = false,
    changeData = false,
    onClose = () => {},
    isSearch = false,
    errorRef,
    changeDataText,
    isFocused = () => null,
    autoFocus = false,
    Add,
    disableFocus = false,
    ...rest
  } = props;

  const [focused, setFocused] = useState(false);
  const [isOpenDatePicker, setOpenDatePicker] = useState(false);
  const [inputHeight, setInputHeight] = useState(50);

  useEffect(() => {
    isFocused(focused);
  }, [focused]);

  const disabled = _.has(props, "editable") && props.editable === false;

  const onPressTouch = () => {
    if (Date) {
      setOpenDatePicker(!isOpenDatePicker);
    } else if (disabled && showDropDown) {
      onDropdownPress();
    } else if (disabled && !showDropDown) {
      console.log("TOASTING");
      Toast.show({
        type: "error",
        text1: "This field is not editable",
        position: "bottom",
      });
    } else if (disableFocus) {
      props.isFocused(true); // Trigger navigation
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPressTouch()}
        style={{
          backgroundColor: disabled
            ? showDropDown
              ? BaseColors.secondary
              : "#F4F4F5"
            : BaseColors.secondary,
          paddingBottom: IOS && !Date ? 10 : 0,
          paddingTop: IOS ? 10 : 0,
          borderRadius: multiline ? 15 : 50,
          marginBottom: showError ? 5 : 15,
          borderColor: showError
            ? BaseColors?.error
            : focused
              ? BaseColors.primary
              : BaseColors.borderColor,
          borderWidth: showError ? 1 : 1,
          marginTop: 0,
          elevation: 1, // This corresponds to the CSS box-shadow
          shadowColor: showError
            ? BaseColors?.error
            : focused
              ? BaseColors.primary
              : "rgba(0, 0, 0, 0.08)", // Optional - adjust the shadow color
          shadowOffset: { width: 0, height: 1 }, // Optional - adjust the shadow offset
          shadowOpacity: 0.3, // Optional - adjust the shadow opacity
          shadowRadius: 3, // Optional - adjust the shadow radius
          zIndex: 111,
          ...style,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingTop: phoneNumber ? (!IOS ? 0 : 0) : 0,
          }}
        >
          <>
            {isSearch && (
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="search-outline"
                  color={BaseColors.text}
                  size={22}
                />
              </View>
            )}
            <TextInput
              {...rest}
              ref={ref}
              autoCorrect={false}
              onFocus={() => {
                if (!disableFocus) {
                  setFocused(true);
                }
              }}
              autoFocus={autoFocus}
              blurOnSubmit={false}
              editable={!disableFocus && editable}
              numberOfLines={numberOfLines}
              multiline={multiline}
              selectionColor={BaseColors.primary}
              cursorColor={BaseColors.primary}
              value={value}
              placeholder={placeholderText}
              placeholderTextColor={BaseColors.placeHolderColor}
              onSubmitEditing={onSubmit}
              onChangeText={(e) => onChange(e.trimStart())}
              secureTextEntry={secureText}
              keyboardType={keyBoardType}
              returnKeyType={returnKeyType}
              maxLength={maxLength}
              onContentSizeChange={(event) => {
                setInputHeight(event.nativeEvent.contentSize.height + 10); // Adjust the height
              }}
              style={{
                paddingHorizontal: 20,
                fontWeight: darkmode ? "bold" : "normal",
                // opacity: focused ? 1 : 0.5,
                fontSize: 16,
                color: BaseColors.text,
                width: noIcon ? "100%" : "85%",
                height: isMax ? 150 : null,
                fontFamily: FontFamily.outfitMedium,
                textAlignVertical: isMax || multiline ? "top" : null,
                position: "relative",
                textAlign: I18nManager.isRTL ? "right" : "left", // Set text alignment to right
                writingDirection: I18nManager.isRTL ? "rtl" : "ltr", // Set writing direction to RTL
                ...textStyle,
              }}
              onBlur={() => {
                setFocused(false);
                onBlurFunc();
                onBlur();
              }}
            />
            {isVerified && (
              <CustomIcon
                name="verified"
                size={20}
                color={"green"}
                style={{
                  justifyContent: "center",
                  marginLeft: 15,
                }}
              />
            )}
            {isPassWord && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={onShowPassword}
                style={{
                  justifyContent: "center",
                  marginLeft: 15,
                }}
              >
                {showPassword ? (
                  <Ionicons
                    name="eye-outline"
                    size={22}
                    style={{ color: BaseColors.text }}
                  />
                ) : (
                  <Ionicons
                    name="eye-off-outline"
                    size={22}
                    style={{ color: BaseColors.text }}
                  />
                )}
              </TouchableOpacity>
            )}
            {Add && (
              <View
                style={{
                  justifyContent: "center",
                  marginLeft: -20,
                }}
              >
                <Chip
                  title={"+ Add"}
                  variant={disabledAdd ? "disabled" : "success"}
                  onPress={AddPress}
                />
              </View>
            )}

            {r1Icon && (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={rightIconPress}
                style={{
                  justifyContent: "center",
                  marginLeft: 15,
                }}
              >
                {r1Icon}
              </TouchableOpacity>
            )}
          </>

          {closeIcon ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onClose()}
              style={styles.closeIcon}
            >
              <CustomIcon name="Icon" size={10} color={BaseColors.secondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
      {showError ? (
        <Text style={[Typography.errorText, styles.errorTxt]}>{errorText}</Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    opacity: 0.5,
    fontSize: 14,
  },

  errorTxt: {
    paddingLeft: 5,
    paddingBottom: 5,
    textAlign: "left",
  },
  closeIcon: {
    backgroundColor: BaseColors.primary,
    position: "absolute",
    top: isIphoneCurve ? -1 : 12,
    right: 12,
    zIndex: 11,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default React.forwardRef(CInput);
