import { images } from "@config/images";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Linking } from "react-native";
import { BaseColors } from "@config/theme";
import { Typography } from "@config/typography";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Divider from "@components/Divider";
import Chip from "@components/Chip";
import { isEmpty } from "lodash-es";
import styles from "./styles";
import { profileSettingArr } from "@config/staticData";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import ImportLibrary from "@components/ImportLibrary";
import ImageLoader from "@components/ImageLoader";
import ModalComponent from "@components/Modal";
import LottieView from "lottie-react-native";
import Popover from "@components/Modal/Popover";

export default function UserProfile(props) {
  const {
    userData = [],
    accList = [],
    type = "",
    onFollow = () => {},
    disableNavigate,
    chipTitle = "",
    btnLoad = false,
    chipVariant = "",
  } = props;
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  const showPopover = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setPopoverPosition({ x: pageX - 160, y: pageY });
    setPopoverVisible(true);
  };

  useEffect(() => {
    setPopoverVisible(false);
  }, [isFocused]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            alignSelf: "flex-start",
          }}
          onPress={() => {
            if (!disableNavigate) {
              navigation.navigate("EditProfile");
            }
          }}
        >
          <ImageLoader
            source={
              userData?.profile_pic
                ? { uri: userData?.profile_pic }
                : images.user
            }
            defaultImage={images.user}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          {type === "home" && (
            <Text style={Typography.primaryLinkText}>Hello,</Text>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text numberOfLines={2} style={[Typography.profileName]}>
              {userData?.full_name}
            </Text>
            {userData?.role === "author" && (
              <ImageLoader source={images.author} style={styles.author} />
            )}
          </View>
          {type !== "home" && userData?.user_name && (
            <Text style={[Typography.primaryLink, { fontSize: 16 }]}>
              @{userData?.user_name}
            </Text>
          )}
          {type !== "home" && !isEmpty(accList) && (
            <View
              style={{
                flexDirection: "row",
                marginLeft: -7,
              }}
            >
              {accList?.map((item, index) => {
                if (item?.connect) {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={() =>
                        Linking.openURL(`${item?.link}${item?.user_name}`)
                      }
                    >
                      <FontAwesome6Icon
                        name={item?.icon}
                        style={{
                          color: BaseColors.borderColor,
                          padding: 7,
                          fontSize: 17,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          )}
        </View>
        {type === "profile" ? (
          <TouchableOpacity activeOpacity={0.8} onPress={(e) => showPopover(e)}>
            <AntDesign name="setting" style={styles.setting} />
          </TouchableOpacity>
        ) : type === "home" ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Notification")}
          >
            <Feather
              name="bell"
              style={{ fontSize: 25, color: BaseColors.text }}
            />
          </TouchableOpacity>
        ) : (
          <Chip
            title={chipTitle || ""}
            variant={chipVariant || ""}
            onPress={onFollow}
            btnLoad={btnLoad}
          />
        )}
        <Popover
          x={popoverPosition.x}
          y={popoverPosition.y}
          width={170}
          visible={popoverVisible}
          onClose={() => setPopoverVisible(false)}
          content={
            <View
              style={{
                borderRadius: 8,
                backgroundColor: BaseColors.secondary,
                borderColor: BaseColors.borderColor,
                padding: 5,
              }}
            >
              {profileSettingArr.map((item, index) => {
                if (userData?.role === "author" && index === 3) {
                  return null;
                } else {
                  return (
                    <>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ paddingVertical: 4 }}
                        onPress={() => {
                          setPopoverVisible(false);
                          if (index === 0) {
                            navigation.navigate("EditProfile");
                          } else if (index === 1) {
                            setImportVisible(true);
                          } else if (index === 2) {
                            navigation.navigate("MyPosts");
                          } else if (index === 3) {
                            if (userData?.is_requested == 1) {
                              setOpen(true);
                            } else {
                              navigation.navigate("EditProfile", {
                                from: "author",
                              });
                            }
                          } else if (index === 4) {
                            navigation.navigate("Configuration");
                          } else if (index === 5) {
                            navigation.navigate("More", { from: "more" });
                          }
                        }}
                      >
                        <Text style={Typography.termsOfusestyle}>{item}</Text>
                      </TouchableOpacity>
                      {index !== profileSettingArr?.length - 1 && <Divider />}
                    </>
                  );
                }
              })}
            </View>
          }
        />
      </View>

      <ImportLibrary
        from="profile"
        visible={importVisible}
        handleVisible={() => setImportVisible(false)}
      />

      <ModalComponent
        visible={open}
        title={"Under Approval"}
        setModalVisible={() => setOpen(false)}
        contain={
          <View>
            <LottieView
              autoSize={true}
              source={images.pendingAuthor}
              autoPlay={true}
              style={{ height: 250, marginTop: -30, width: "100%" }}
            />
            <Text
              style={[
                Typography.notificationtext,
                {
                  fontSize: 20,
                  marginTop: -30,
                  marginBottom: 30,
                  textAlign: "center",
                },
              ]}
            >
              Your request to become {"\n"} Author is Under Approval
            </Text>
          </View>
        }
      />
    </>
  );
}
