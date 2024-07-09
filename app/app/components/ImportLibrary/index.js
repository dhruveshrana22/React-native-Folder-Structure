import Button from "@components/Button";
import ModalComponent from "@components/Modal";
import { images } from "@config/images";
import { BaseColors } from "@config/theme";
import { FontFamily, Typography } from "@config/typography";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View, Platform } from "react-native";
import Upload from "@components/CUpload";
import Chip from "@components/Chip";
import Toast from "react-native-toast-message";
import { isEmpty } from "lodash-es";
import RNFetchBlob from "rn-fetch-blob";
import { getApiData } from "@app/utils/apiHelper";
import BaseSetting from "@config/setting";
import DeviceInfo from "react-native-device-info";
import { PERMISSIONS, check, request } from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";
import AuthActions from "../../redux/reducers/auth/actions";

export default function ImportLibrary(props) {
  const { from = "", visible = false, handleVisible = () => null } = props;

  const Arr = [
    { name: "Goodreads", type: "good_reads" },
    { name: "Story Graph", type: "story_graph" },
    { name: "CSV", type: "sample_csv" },
  ];
  const fileRef = useRef();
  const dispatch = useDispatch();
  const { setUserData } = AuthActions;
  const { userData } = useSelector((state) => state.auth);
  const data = userData?.userData?.personal_info;

  const [open, setOpen] = useState(false);
  const [next, setNext] = useState({
    from: "",
    continue: false,
    err: false,
    errTxt: "",
  });
  const [file, setFile] = useState([]);
  const [btnLoad, setBtnLoad] = useState({ upload: false, download: false });

  useEffect(() => {
    setOpen(visible);
    setBtnLoad({ upload: false, download: false });
  }, [visible]);

  useEffect(() => {
    if (!open) {
      handleVisible();
      setNext({ from: "", continue: false, err: false, errTxt: "" });
      setFile([]);
    }
  }, [open]);

  const requestStoragePermission = async () => {
    let deviceVersion = DeviceInfo.getSystemVersion();
    try {
      const storagePermission = Platform.select({
        ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
        android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      });

      const result = await check(storagePermission);
      if (deviceVersion >= 11) {
        handleDownload();
      } else {
        if (result === "denied") {
          const permissionResult = await request(storagePermission);
          if (permissionResult === "denied") {
            // Show an alert or prompt the user to grant permission
            Alert.alert(
              "Permission Denied",
              "Please enable storage permission to download files.",
              [{ text: "OK", onPress: () => handleDownload() }]
            );
          }
        } else {
          handleDownload();
        }
      }
    } catch (error) {
      console.log("Error checking or requesting storage permission: ", error);
    }
  };

  const handleDownload = async () => {
    setBtnLoad({ ...btnLoad, download: false });
    const desiredFileName = `sample`;
    const url =
      "https://reanlo-pubic.s3.us-east-2.amazonaws.com/sample_import.csv";

    const { config, fs } = RNFetchBlob;
    const { DocumentDir, DownloadDir } = fs.dirs;
    const response = await config({
      fileCache: true,
      path: `${DocumentDir}/${desiredFileName.replace(/\s/g, "")}.csv`,
      appendExt: "xlsx",
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${DownloadDir}/${desiredFileName.replace(/\s/g, "")}.csv`, // Save the file with the desired file name
        description: "Downloading file.",
      },
    }).fetch("GET", url);
    // Check if download was successful
    if (response.path) {
      setBtnLoad({ ...btnLoad, download: false });
      setOpen(false);
      Toast.show({
        type: "success",
        text1: "File downloaded successfully",
        position: "bottom",
      });
      if (Platform.OS === "ios") {
        Share.share({
          url: `file://${response.path()}`,
        })
          .then((res) => console.log("File shared successfully"))
          .catch((err) => console.log("Failed to share file", err));
      }
    } else {
      Toast.show({
        type: "error",
        text1: "File downloaded successfully",
        position: "bottom",
      });
      setOpen(false);
      setBtnLoad({ ...btnLoad, download: false });
    }
  };

  const uploadCsvApi = async () => {
    setBtnLoad({ ...btnLoad, upload: true });

    try {
      const response = await getApiData(
        BaseSetting.endpoints.uploadCSV,
        "POST",
        {
          user_csv: {
            uri: file?.uri,
            type: file?.type,
            name: file?.name, // Specify the file name here
          },
          file_type: next?.from?.type,
        },
        {},
        true
      );
      if (response?.status) {
        dispatch(
          setUserData({
            ...userData,
            userData: {
              ...userData.userData,
              personal_info: {
                ...userData?.userData?.personal_info,
                imported_csv: true,
              },
            },
          })
        );
        Toast.show({
          type: "success",
          text1: response?.message,
          position: "top",
        });
      } else {
        Toast.show({
          type: "error",
          text1: response?.message,
          position: "top",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.toString(),
        position: "top",
      });
      console.log("🚀 ~ uploadCsvApi ~ err==========>>>>>>>>>>", err);
    } finally {
      setBtnLoad({ ...btnLoad, upload: false });
      setOpen(false);
    }
  };

  return (
    <>
      {from !== "profile" && (
        <View>
          <View
            style={{
              marginBottom: 5,
            }}
          >
            <Text style={Typography.modalTitle}>Your Library</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor: BaseColors.secondary,
              borderRadius: 10,
              margin: 1,
              ...Platform.select(BaseColors.commonShadow),
            }}
          >
            <Image
              source={images.importImg}
              style={{
                height: 120,
                objectFit: "contain",
                marginTop: 20,
              }}
            />
            <View style={{ justifyContent: "center", paddingRight: 15 }}>
              <View>
                <Text
                  style={{
                    color: BaseColors.borderColor,
                    fontFamily: FontFamily.outfitSemiBold,
                    fontSize: 14,
                    width: 150,
                  }}
                >
                  You don't have any books yet.
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Chip
                  onPress={() => setOpen(true)}
                  title={"Import your library"}
                />
              </View>
            </View>
          </View>
        </View>
      )}

      <ModalComponent
        info={true}
        title={next?.continue && `Import library from ${next?.from?.name}`}
        visible={open}
        setModalVisible={() => {
          setOpen(false);
        }}
        contain={
          next?.continue ? (
            <View>
              {next?.from?.name === "CSV" && (
                <Button
                  loading={btnLoad?.download}
                  disabled={btnLoad?.download}
                  onBtnClick={() => {
                    requestStoragePermission();
                  }}
                  showRightIcon={"download"}
                  variant="outline"
                >
                  Download sample CSV
                </Button>
              )}
              <View style={{ marginVertical: 25 }}>
                <Upload
                  showError={next?.err}
                  errorMsg={next?.errTxt}
                  doc={true}
                  ref={fileRef}
                  value={file}
                  onSet={(val) => {
                    setFile(val);
                    setNext({ ...next, err: false, errTxt: "" });
                  }}
                />
              </View>

              <Button
                loading={btnLoad?.upload}
                disabled={btnLoad?.upload}
                onBtnClick={() => {
                  if (isEmpty(file)) {
                    setNext({
                      ...next,
                      err: true,
                      errTxt: "Please select a file",
                    });
                  } else {
                    uploadCsvApi();
                  }
                }}
              >
                Upload
              </Button>
            </View>
          ) : (
            <View>
              <Text
                style={[
                  Typography.tableTitle,
                  {
                    fontFamily: FontFamily.PlayfairSemiBold,
                    marginVertical: 15,
                  },
                ]}
              >
                Make your library something you're proud of.
              </Text>

              <Text style={[Typography.default, { fontSize: 23 }]}>
                If you already have a book app, you can{" "}
                <Text style={{ color: BaseColors.primary }}>import it</Text>{" "}
                from there.
              </Text>

              <View
                style={{ flexDirection: "row", gap: 10, marginVertical: 20 }}
              >
                {Arr.map((item, index) => (
                  <Chip
                    onPress={() => setNext({ ...next, from: item })}
                    key={index}
                    title={item?.name}
                    variant={
                      next?.from?.type === item?.type ? "success" : "shadow"
                    }
                  />
                ))}
              </View>

              <View style={{ flexDirection: "row", flexGrow: 1, gap: 20 }}>
                <Button
                  style={{ flex: 1 }}
                  variant="outline"
                  onBtnClick={() => setOpen(false)}
                >
                  Skip
                </Button>
                <Button
                  disabled={isEmpty(next?.from)}
                  style={{ flex: 1 }}
                  onBtnClick={() => setNext({ ...next, continue: true })}
                >
                  Continue
                </Button>
              </View>
            </View>
          )
        }
      />
    </>
  );
}
