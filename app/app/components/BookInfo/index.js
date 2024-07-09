import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DropDownList from "@components/CDropDown";
import { BaseColors } from "@config/theme";
import { FontFamily, FontWeight, Typography } from "@config/typography";
import { images } from "@config/images";
import AddShelves from "@components/Modal/AddShelves";
import { StarCompo } from "@components/StarCompo";
import Toast from "react-native-toast-message";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getApiData } from "@app/utils/apiHelper";
import BaseSetting from "@config/setting";
import ImageLoader from "@components/ImageLoader";
import moment from "moment";
import { isArray, isEmpty } from "lodash-es";
import Request from "@components/Modal/RequestModal";
import ShareThoughts from "@components/Modal/ShareYourThoughts";
import AddBookDetails from "@components/Modal/AddBookDetails";

const BookInfo = ({ bookData, page = "", title }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [shelves, setShelves] = useState("");
  const [visible, setVisible] = useState(false);
  const [shelvesArr, setShelvesArr] = useState([]);
  const [shelvesAddSuccess, setShelvesAddSuccess] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [bookDetailModal, setBookDetailModal] = useState(false);
  const [activeData, setActiveData] = useState("");
  const [requestLoad, setRequestLoad] = useState(false);
  const [selectedSelf, setSelectedSelf] = useState("");

  useEffect(() => {
    getShelves();
  }, [isFocused, shelvesAddSuccess]);

  // this function is used get shelves list
  async function getShelves() {
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.shelfList}?is_all=1`,
        "GET"
      );
      if (response?.status) {
        setShelvesArr(response?.data);
      } else {
        Toast.show({
          type: "error",
          text1: response?.message,
          position: "bottom",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: response?.message,
        position: "bottom",
      });
      console.log("getShelves catch error =======>>>", error);
    }
  }

  // this function is used to add books in shelve
  async function addBooksInShelves(e) {
    try {
      const response = await getApiData(
        BaseSetting.endpoints.addBooksShelf,
        "POST",
        {
          book_id: bookData?.book_id,
          shelf_id: e?.shelf_id,
        }
      );
      if (response?.status) {
        Toast.show({
          type: "success",
          position: "top",
          text1: response?.message,
        });
        setActiveData({ ...bookData, shelf: e });
        setShareModal(true);
        setShelves(e);
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: response?.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: error?.toString(),
      });
      console.log("error addBooksInShelves =======>>>", error);
    }
  }

  // this function is used to add books in shelve
  async function requestBookClub() {
    setRequestLoad(true);
    try {
      const response = await getApiData(
        BaseSetting.endpoints.clubRequest,
        "POST",
        {
          book_id: bookData?.book_id,
        }
      );
      if (response?.status) {
        if (response?.club_exist) {
          navigation.navigate("BookClub", {
            data: response?.data,
          });
        } else {
          Toast.show({
            type: "success",
            position: "bottom",
            text1: response?.message,
          });
          setRequestModal(true);
        }
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: response?.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: error?.toString(),
      });
      console.log("error addBooksInShelves =======>>>", error);
    } finally {
      setRequestLoad(false);
    }
  }

  return (
    <View style={{ flex: 1, gap: 10 }}>
      {page === "discover" && (
        <Text style={Typography.discoverSubTitle}>{title}</Text>
      )}
      <View
        style={{
          flexDirection: "row",
          backgroundColor:
            page === "BookDetail" ? "transparent" : BaseColors.secondary,
          borderRadius: 10,
          ...(page === "BookDetail"
            ? null
            : Platform.select(BaseColors.commonShadow)),
        }}
      >
        <ImageLoader
          source={
            bookData?.thumbnail_image || bookData?.image
              ? { uri: bookData?.thumbnail_image || bookData?.image }
              : images.book
          }
          defaultImage={images.book}
          resizeMode={"cover"}
          style={{
            height: page === "discover" ? 180 : 280,
            width: page === "discover" ? 120 : 170,
            borderRadius: 10,
            margin: 10,
          }}
        />

        <View
          style={{
            flex: 1,
            padding: page === "discover" ? 10 : null,
          }}
        >
          {bookData?.type === "blog" ? (
            <Text style={Typography.notificationtext} numberOfLines={10}>
              {bookData?.description}
            </Text>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: FontFamily.PlayfairSemiBold,
                  fontSize: 22,
                  color: BaseColors.text,
                }}
              >
                {bookData?.title || bookData?.book_title}
              </Text>

              {/* Book Series..........................................  */}
              {!isEmpty(bookData?.series_data) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("MyBooksDetails", {
                      title: "Other books in the series",
                      type: "series",
                      data: bookData,
                    });
                  }}
                >
                  <Text style={[Typography.lightLink, { marginTop: 5 }]}>
                    {bookData?.series_data[0]?.name}
                  </Text>
                </TouchableOpacity>
              )}

              {/* Book author */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 10,
                }}
              >
                {page === "discover" ? (
                  <Text
                    style={[
                      Typography.termsOfusestyle,
                      { color: BaseColors.extraLightText },
                    ]}
                  >
                    by {bookData?.author_name}
                  </Text>
                ) : (
                  !isEmpty(bookData?.author) &&
                  isArray(bookData?.author) &&
                  bookData?.author?.map((item, index) => {
                    const lastIndex = bookData?.author?.length - 1 == index;
                    return (
                      <Text
                        style={[
                          Typography.moreText,
                          { color: BaseColors.extraLightText },
                        ]}
                        key={index}
                      >
                        {item?.name}
                        {lastIndex ? "" : ", "}
                      </Text>
                    );
                  })
                )}
              </View>

              {/* Book StarComponent*/}
              {page === "discover" ? (
                <View style={{ paddingTop: 15, flexDirection: "row" }}>
                  <StarCompo
                    maxStars={5}
                    rating={
                      bookData?.average_rate > 5 ? 5 : bookData?.average_rate
                    }
                    starSize={18}
                    containerStyle={{ gap: 5 }}
                  />
                  <Text style={Typography.default}>
                    {" "}
                    {bookData?.average_rate > 5 ? 5 : bookData?.average_rate}/
                    {5}
                  </Text>
                </View>
              ) : (
                <View style={{ marginTop: 10 }}>
                  {/* Book Published On: Date  */}
                  <Text
                    style={{
                      fontFamily: FontFamily.outfitRegular,
                      fontSize: 14,
                      fontWeight: FontWeight.medium,
                      color: "#808080",
                    }}
                  >
                    Published On:
                  </Text>
                  <Text style={Typography.notificationtext}>
                    {moment(bookData?.publish_date).format("MMM DD, YYYY")}
                  </Text>
                </View>
              )}

              {/* Book  ISBN & Users*/}
              <View style={{ paddingVertical: 10 }}>
                {page !== "discover" && (
                  <>
                    {/* Book  ISBN  */}
                    {bookData?.isbn_10 && (
                      <View style={{ marginBottom: 5 }}>
                        <Text
                          style={{
                            fontFamily: FontFamily.outfitSemiBold,
                            fontSize: 14,
                            fontWeight: FontWeight.medium,
                            color: BaseColors.extraLightText,
                          }}
                        >
                          ISBN10:
                        </Text>
                        <Text style={Typography.notificationtext}>
                          {bookData?.isbn_10}
                        </Text>
                      </View>
                    )}
                    {bookData?.isbn_13 && (
                      <>
                        <Text
                          style={[
                            Typography.notificationtext,
                            {
                              fontSize: 14,
                              color: BaseColors.extraLightText,
                            },
                          ]}
                        >
                          ISBN13:
                        </Text>
                        <Text style={Typography.notificationtext}>
                          {bookData?.isbn_13}
                        </Text>
                      </>
                    )}
                  </>
                )}
                {page !== "discover" && (
                  <View
                    style={{
                      marginTop: 5,
                      marginBottom: page !== "discover" && 5,
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    {requestLoad ? (
                      <View style={{ justifyContent: "center" }}>
                        <ActivityIndicator color={BaseColors.primary} />
                      </View>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ flexDirection: "row", gap: 10 }}
                        onPress={() => {
                          if (
                            bookData?.club_status == "accepted" &&
                            bookData?.user_joined == "joined"
                          ) {
                            navigation.navigate("BookClub", {
                              data: bookData,
                            });
                          } else if (
                            (bookData?.club_status !== "pending" &&
                              bookData?.user_joined !== "requested") ||
                            (bookData?.club_status == "accepted" &&
                              bookData?.user_joined == "not_requested")
                          ) {
                            requestBookClub();
                          }
                        }}
                      >
                        <FontAwesome5
                          name="users"
                          size={20}
                          color={BaseColors.text}
                        />
                        <Text style={Typography.lightLink}>
                          {(bookData?.club_status == "not_created" &&
                            bookData?.user_joined == "not_requested") ||
                          (bookData?.club_status == "pending" &&
                            bookData?.user_joined == "not_requested")
                            ? "Request Book Club"
                            : bookData?.club_status == "accepted" &&
                                bookData?.user_joined == "not_requested"
                              ? "Join Book Club"
                              : bookData?.club_status == "accepted" &&
                                  bookData?.user_joined == "joined"
                                ? "Book Club"
                                : bookData?.club_status == "pending" &&
                                    bookData?.user_joined == "requested"
                                  ? "Requested for Book club"
                                  : null}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>

              {/* Shelves Dropdown List */}
              <DropDownList
                placeholder="Shelves"
                data={shelvesArr}
                value={shelves}
                onChange={(e) => {
                  setSelectedSelf(e);
                  if (!bookData?.chapter_count && !bookData?.page_count) {
                    setBookDetailModal({ visible: true, type: "both" });
                  } else if (!bookData?.chapter_count) {
                    setBookDetailModal({ visible: true, type: "chapter" });
                  } else if (!bookData?.page_count) {
                    setBookDetailModal({ visible: true, type: "page" });
                  } else {
                    addBooksInShelves(e);
                  }
                }}
                valueProp={"shelf_id"}
                maxHeight={200}
                dropDownStyle={{
                  backgroundColor: BaseColors.primary,
                  borderColor: BaseColors.transparent,
                  borderRadius: 30,
                  height: page === "discover" ? 30 : 45,
                }}
                placeholderStyle={[
                  Typography.default,
                  {
                    color: BaseColors.text,
                    fontFamily: FontFamily.outfitSemiBold,
                  },
                ]}
                addItem={true}
                handleAddBtnClick={() => {
                  setVisible(true);
                }}
              />
              <AddShelves
                visible={visible}
                handleModalVisible={(e, success) => {
                  setVisible(false);
                  if (success) {
                    setShelvesAddSuccess(true);
                  }
                }}
              />
            </>
          )}
        </View>
      </View>
      <ShareThoughts
        visible={shareModal}
        handleModalVisible={() => setShareModal(false)}
        data={activeData}
        from="shelf"
      />
      <Request
        visible={requestModal}
        handleModalVisible={() => setRequestModal(false)}
      />

      <AddBookDetails
        visible={bookDetailModal?.visible}
        type={bookDetailModal?.type}
        data={bookData}
        handleModalVisible={(e, success) => {
          setBookDetailModal({ visible: false });
          if (success) {
            addBooksInShelves(selectedSelf);
          }
        }}
      />
    </View>
  );
};

export default BookInfo;
