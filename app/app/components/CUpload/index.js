import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import _, { isEmpty, isNull } from "lodash-es";
import RBSheet from "react-native-raw-bottom-sheet";
import FAIcon from "react-native-vector-icons/FontAwesome";
import AIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import styles from "./styles";
import { BaseColors } from "@config/theme";
import DeviceInfo from "react-native-device-info";
import { images } from "@config/images";
import ModalComponent from "@components/Modal";
import { Typography } from "@config/typography";
import Button from "@components/Button";

import DocumentPicker, { types } from "react-native-document-picker";

const IOS = Platform.OS === "ios";
const CUploadImage = forwardRef((props, ref) => {
  const {
    type = "round",
    modalTitle = "",
    multiple,
    onSet = () => {},
    handleRemove = () => {},
    onPressUpload = null,
    value = [],
    maxLength = 5,
    disabled = false,
    showError = false,
    errorMsg = "",
    errorMsgStyle = {},
    uploaded = false,
    doc = false,
    from = "",
  } = props;

  const selectPhotoModalRef = useRef();
  const warningModalRef = useRef();
  const [visible, setVisible] = useState(false);

  /////////////csv upload
  const requestStoragePermission = async () => {
    const androidVersion = DeviceInfo.getSystemVersion();
    try {
      const granted = await PermissionsAndroid.request(
        androidVersion >= 13
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_EXTERNAL_STORAGE
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Reanlo",
          message: "Reanlo need to access storage for upload photo",
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Storage permission denied!");
        return;
      }
      console.log("Storage permission granted");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileSelect = async (from) => {
    try {
      await requestStoragePermission();
      const result = await DocumentPicker.pick({
        type: from === "author" ? [types.pdf, types.images] : [types.csv],
      });
      onSet(result[0]); // Assuming single file selection
    } catch (err) {
      console.error("Error selecting file:", err);
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled file selection");
      }
    }
  };
  /////////////csv upload

  const imageOptionsArray = [
    {
      id: 1,
      optionTitle: "Select from Gallery",
      handleClick: (e) => {
        openGallery();
      },
      optionIcon: "photo",
    },
    {
      id: 2,
      optionTitle: "Open Camera",
      handleClick: () => {
        openCamera();
      },
      optionIcon: "camera",
    },
  ];

  useImperativeHandle(ref, () => ({
    open() {},
    stop() {},
  }));

  const showEnablePermissionAlert = (access) => {
    Alert.alert("Oops!", `Please allow access to your ${access}`, [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Pressed");
        },
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          if (Platform.OS === "ios") {
            Linking.openURL("app-settings:");
          } else {
            Linking.openSettings();
          }
        },
      },
    ]);
  };
  // function for openGallery
  const openGallery = async () => {
    const androidVersion = DeviceInfo.getSystemVersion();
    if (!IOS) {
      try {
        const granted = await PermissionsAndroid.request(
          androidVersion >= 13
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Reanlo",
            message: "Reanlo need to access storage for upload photo",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use read from the storage");
        } else {
          console.log("Storage permission denied");
        }
      } catch (err) {
        console.warn("Android lower Permission err", err);
      }
    }
    const readGranted = IOS
      ? true
      : await PermissionsAndroid.check(
          androidVersion >= 13
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
    if (!readGranted) {
      showEnablePermissionAlert("photo to select images.");
    } else {
      ImagePicker.openPicker({
        width: 200,
        height: 200,
        mediaType: "photo",
        multiple: multiple,
      }).then((image) => {
        selectPhotoModalRef?.current?.close();
        if (multiple) {
          const totalCount = image.length + value.length;
          if (_.isArray(image) && totalCount <= maxLength) {
            const newImages = image?.map((item, index) => {
              return {
                isLocal: true,
                uri: item?.path,
                name: item?.path.substr(item?.path.lastIndexOf("/") + 1),
                type: item.mime,
              };
            });

            if (value.length < maxLength) {
              let mulImg = [...value];
              mulImg = mulImg.concat(newImages);
              // if (mulImg?.length === maxLength) {
              setVisible(false);
              // }
              if (typeof onSet === "function") {
                onSet(mulImg);
              }
            }
          } else {
            warningModalRef?.current?.open();
          }
        } else {
          const imgFile = {
            isLocal: true,
            uri: image?.path,
            name: image?.path.substr(image?.path.lastIndexOf("/") + 1),
            type: image.mime,
          };
          onSet(imgFile);
          setVisible(false);
        }
      });
    }
  };

  // function for openCamera
  const openCamera = async () => {
    if (!IOS) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Reanlo",
            message: "Reanlo need to access to your camera",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use read from the storage");
        } else {
          console.log("Storage permission denied");
        }
      } catch (err) {
        console.warn("Android lower Permission err", err);
      }
    }

    const readCamera = IOS
      ? true
      : await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);

    if (!readCamera) {
      showEnablePermissionAlert("camera to capture images.");
    } else {
      // this code is to use for document scanner and generate local file
      ImagePicker.openCamera({
        width: 200,
        height: 200,
        compressImageQuality: 0.7,
      }).then((image) => {
        const imgFile = {
          isLocal: true,
          uri: image?.path,
          name: image?.path.substr(image?.path.lastIndexOf("/") + 1),
          type: image.mime,
        };
        selectPhotoModalRef?.current?.close();
        if (multiple) {
          if (value.length < maxLength) {
            let mulImg = value;
            mulImg = mulImg.concat(imgFile);
            // if (mulImg?.length === maxLength) {
            setVisible(false);
            // }
            if (typeof onSet === "function") {
              onSet(mulImg);
            }
          } else {
            setVisible(false);
          }
        } else {
          setVisible(false);
          onSet(imgFile);
        }
      });
    }
  };

  const isDisabled = value?.length === maxLength ? true : disabled;

  return (
    <>
      {doc ? (
        <>
          {isEmpty(value) ? (
            <>
              <Button
                error={showError}
                variant="outline"
                showRightIcon
                onBtnClick={() => handleFileSelect(from)}
                txtSty={
                  from === "author" && {
                    color: BaseColors.placeHolderColor,
                    fontSize: 14,
                    paddingVertical: 4,
                  }
                }
              >
                {from === "author"
                  ? "Choose File to Upload (Image or pdf)"
                  : "Upload a file"}
              </Button>
              {showError && (
                <Text
                  style={[
                    Typography.termsOfusestyle,
                    { marginTop: 5, color: BaseColors.error },
                  ]}
                >
                  {errorMsg}
                </Text>
              )}
            </>
          ) : from === "author" ? (
            <Button
              variant="outline"
              showRightIcon={"x-circle"}
              onRightIconClick={() => onSet([])}
              txtSty={{
                color: BaseColors.placeHolderColor,
                fontSize: 14,
                paddingVertical: 4,
              }}
            >
              {value?.name}
            </Button>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Image
                  source={images.sampleCSV}
                  style={{ width: 100, objectFit: "contain" }}
                />
                <TouchableOpacity
                  onPress={() => onSet([])}
                  activeOpacity={0.8}
                  style={{ position: "absolute", right: -10, top: -5 }}
                >
                  <Ionicons
                    name="close-circle-outline"
                    style={{ fontSize: 22, color: BaseColors.error }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  Typography.primaryLinkText,
                  { marginLeft: 20, width: 220 },
                ]}
              >
                {value?.name}
              </Text>
            </View>
          )}
        </>
      ) : type === "round" ? (
        <>
          <View
            onPress={() => {
              // setVisible(true);
              // selectPhotoModalRef?.current?.open();
              // if (onPressUpload) {
              //   onPressUpload();
              // } else {
              //   console.log("open camera callled ");
              //   openCamera();
              // }
            }}
            style={[styles.mainView, { opacity: 1 }]}
          >
            {uploaded ? (
              <Feather name="frown" style={styles.uploadedIcon} />
            ) : (
              <>
                {!isEmpty(value) && !isNull(value) ? (
                  <Image
                    source={value?.isLocal ? value : { uri: value }}
                    resizeMethod={"resize"}
                    resizeMode={"cover"}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 100,
                      borderWidth: 3,
                      borderColor: BaseColors.primary,
                    }}
                  />
                ) : (
                  <Image
                    source={images.profile}
                    resizeMethod={"resize"}
                    resizeMode={"cover"}
                    style={{
                      height: 40,
                      width: 35,
                    }}
                  />
                )}
              </>
            )}
            <TouchableOpacity
              style={[styles.uploadedIcon]}
              onPress={() => {
                setVisible(true);
              }}
            >
              <Feather name="upload" size={20} color={BaseColors.secondary} />
            </TouchableOpacity>
          </View>
          {showError ? (
            <Text style={[styles.errorMsg, errorMsgStyle]}>{errorMsg}</Text>
          ) : null}
        </>
      ) : multiple ? (
        <View style={{ flexDirection: "row-reverse", gap: 15 }}>
          {maxLength !== value?.length ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setVisible(true);
              }}
              style={[styles.squareView, { opacity: 1 }]}
            >
              <Feather name="plus" size={40} color={BaseColors.text} />
            </TouchableOpacity>
          ) : null}

          {value?.map((item, index) => {
            return (
              <View style={{ position: "relative" }}>
                <Image
                  source={item?.isLocal ? item : { uri: item?.uri }}
                  resizeMethod={"resize"}
                  resizeMode={"cover"}
                  style={[
                    styles.squareView,
                    {
                      borderWidth: 3,
                      borderColor:
                        type === "round" ? BaseColors.primary : "transparent",
                    },
                  ]}
                />
                {!isEmpty(value) && !isNull(value) && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.removeIcon]}
                    onPress={() => handleRemove(index)}
                  >
                    <AIcon
                      name="closecircleo"
                      style={{ fontSize: 20, color: BaseColors.error }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      ) : (
        <View style={{ position: "relative" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setVisible(true);
            }}
            style={[styles.squareView, { opacity: 1 }]}
          >
            {!isEmpty(value) && !isNull(value) ? (
              <Image
                source={value}
                resizeMethod={"resize"}
                resizeMode={"cover"}
                style={{
                  height: "100%",
                  width: "100%",
                  borderWidth: 3,
                  borderColor:
                    type === "round" ? BaseColors.primary : "transparent",
                }}
              />
            ) : (
              <Feather name="plus" size={40} color={BaseColors.text} />
            )}
          </TouchableOpacity>
          {!isEmpty(value) && !isNull(value) && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.removeIcon]}
              onPress={handleRemove}
            >
              <AIcon
                name="closecircleo"
                style={{ fontSize: 20, color: BaseColors.error }}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      <RBSheet
        ref={selectPhotoModalRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        dragFromTopOnly={true}
        customStyles={styles.RbSheetModalCustomStyle}
      >
        <Text style={[styles.RBSheetModalTitleText]}>{modalTitle}</Text>
        {!_.isEmpty(imageOptionsArray) && _.isArray(imageOptionsArray)
          ? imageOptionsArray.map((item, index) => {
              return (
                <View key={`options_${item.id}_${index}`}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={item.handleClick}
                  >
                    <View style={styles.RBsheetModalItemsMainContainer}>
                      <View
                        style={styles.RBSheetModalItemsIconAndTextContainer}
                      >
                        <FAIcon
                          style={styles.RBSheetModalItemsLeftIcon}
                          name={item.optionIcon}
                        />
                        <Text style={Typography.termsOfusestyle}>
                          {item.optionTitle}
                        </Text>
                      </View>
                      <AIcon
                        name="right"
                        style={styles.RBSheetModalItemsRightIcon}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          : null}
      </RBSheet>

      <ModalComponent
        visible={visible}
        setModalVisible={() => setVisible(false)}
        contain={
          !_.isEmpty(imageOptionsArray) && _.isArray(imageOptionsArray)
            ? imageOptionsArray.map((item, index) => {
                return (
                  <View key={`options_${item.id}_${index}`}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={item.handleClick}
                    >
                      <View style={styles.RBsheetModalItemsMainContainer}>
                        <View
                          style={styles.RBSheetModalItemsIconAndTextContainer}
                        >
                          <FAIcon
                            style={styles.RBSheetModalItemsLeftIcon}
                            name={item.optionIcon}
                          />
                          <Text style={styles.RBSheetModalItemsTitleText}>
                            {item.optionTitle}
                          </Text>
                        </View>
                        <AIcon
                          name="right"
                          style={styles.RBSheetModalItemsRightIcon}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            : null
        }
      />
    </>
  );
});

export default CUploadImage;
