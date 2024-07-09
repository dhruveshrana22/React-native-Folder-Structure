import ImageLoader from "@components/ImageLoader";
import { images } from "@config/images";
import { BaseColors } from "@config/theme";
import { Typography } from "@config/typography";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StarRating from "react-native-star-rating";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { flattenDeep, isEmpty } from "lodash-es";
import TextInput from "@components/TextInput";
import { getApiData } from "@app/utils/apiHelper";
import BaseSetting from "@config/setting";
import ModalComponent from "@components/Modal";
import CLoader from "@components/CLoader";
import Popover from "@components/Modal/Popover";
import Icon from "react-native-vector-icons/MaterialIcons";
import { remainingDays, reportArr } from "@config/staticData";
import Checkbox from "@components/Checkbox";
import Divider from "@components/Divider";
import Button from "@components/Button";
import HbookList from "@components/HbookList";
import { useNavigation } from "@react-navigation/native";

export default function PostCard(props) {
  const {
    from = "",
    data = [],
    type = "",
    addLike = () => null,
    addComment = () => null,
    onChange = () => null,
    comment = "",
    commentStatus,
    removePost = () => null,
  } = props;

  const navigation = useNavigation();
  const width = Dimensions.get("screen").width;
  const { userData } = useSelector((state) => state?.auth);
  const user = userData?.userData?.personal_info;

  const [commentList, setCommentList] = useState([]);
  const [visible, setVisible] = useState({ comment: false, report: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const viewAbilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const [loader, setLoader] = useState(false);
  const [paginationLoader, setPaginationLoader] = useState(false);
  const [refreshLoader, setRefreshLoader] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    loadMore: false,
    totalCount: 0,
  });
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });
  const [lastPress, setLastPress] = useState(0);
  const [check, setCheck] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState({ err: false, errMsg: "" });
  const [btnLoad, setBtnLoad] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const delay = 200; // Adjust the delay as per your requirement
  useEffect(() => {
    if (
      visible &&
      (type !== "genre_suggestions" || type !== "reading_suggestions")
    ) {
      getCommentList();
    }
  }, [visible, commentStatus]);

  // this function is used to get comment list
  async function getCommentList(bool, page = 1) {
    !bool && setLoader(true);
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.getCommentList}?page=${page}&post_id=${data?.post_id}`,
        "GET"
      );

      if (response.status) {
        if (response?.status) {
          setPagination({
            ...pagination,
            loadMore: response?.data?.pagination?.isMore,
            page: page,
            totalCount: response?.data?.pagination?.totalCount,
          });
          let nArr = [];
          if (bool) {
            nArr = flattenDeep([commentList, response?.data?.item || []]);
          } else {
            nArr = response?.data?.item || [];
          }
          setCommentList(nArr);
        } else {
          setPagination({
            ...pagination,
            loadMore: false,
          });
          Toast.show({
            type: "error",
            text1: response?.message,
            position: "bottom",
          });
        }
      }
    } catch (error) {
      console.log("error getCommentList =======>>>", error);
      Toast.show({
        type: "error",
        text1: error.toString(),
        position: "bottom",
      });
    } finally {
      setPaginationLoader(false);
      setRefreshLoader(false);
      setLoader(false);
    }
  }

  async function reportPostApi() {
    setBtnLoad(true);
    try {
      const response = await getApiData(BaseSetting.endpoints.report, "POST", {
        post_id: data?.post_id,
        description: !isEmpty(reason) ? reason : reportArr[check],
      });

      if (response?.status) {
        setVisible({ comment: false, report: false });
        setCheck(false);
        setReason("");
        setError({ err: false, errMsg: "" });
        Toast.show({
          type: "success",
          text1: "Post reported successfully",
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
      console.error("🚀 ~ reportPostApi ~ err==========>>>>>>>>>>", err);
      Toast.show({
        type: "error",
        text1: err?.toString(),
        position: "top",
      });
    } finally {
      setBtnLoad(false);
    }
  }

  function bottomAction(data) {
    return (
      <View style={{ flexDirection: "row", padding: 15, gap: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => addLike(data?.post_id)}
          >
            {data?.is_liked ? (
              <MaterialCommunityIcons
                name="heart"
                style={{
                  color: BaseColors.error,
                  fontSize: 24,
                }}
              />
            ) : (
              <MaterialCommunityIcons
                name="heart-outline"
                style={{
                  color: BaseColors.text,
                  fontSize: 24,
                }}
              />
            )}
          </TouchableOpacity>
          {data?.total_likes > 0 && (
            <Text style={[Typography.default, { marginLeft: 5 }]}>
              {data?.total_likes}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setVisible({ ...visible, comment: true })}
          >
            <MaterialCommunityIcons
              name="comment-outline"
              style={{
                color: visible ? BaseColors?.primary : BaseColors.text,
                fontSize: 22,
              }}
            />
          </TouchableOpacity>
          {data?.total_comments > 0 && (
            <Text style={[Typography.default, { marginHorizontal: 5 }]}>
              {data?.total_comments}
            </Text>
          )}
        </View>
      </View>
    );
  }

  function loadMoreData() {
    if (pagination?.loadMore && !paginationLoader) {
      setPaginationLoader(true);
      const page = pagination?.page + 1;
      getCommentList(true, page);
    }
  }

  const showPopover = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setPopoverPosition({ x: pageX - 160, y: pageY - 25 });
    setPopoverVisible(true);
  };

  const hidePopover = () => {
    setPopoverVisible(false);
  };

  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastPress < delay && !data?.is_liked) {
      addLike(data?.post_id);
    }
    setLastPress(now);
  };

  const isDateInFuture = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    givenDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return givenDate > currentDate;
  };

  return (
    <View
      style={
        type === "genre_suggestions" || type === "reading_suggestions"
          ? {
              marginHorizontal: 1,
              borderColor: BaseColors.borderColor,
              borderRadius: 12,
              backgroundColor: BaseColors.secondary,
            }
          : {
              marginHorizontal: 1,
              borderColor: BaseColors.borderColor,
              borderRadius: 12,
              backgroundColor: BaseColors.secondary,
              ...Platform.select(BaseColors.commonShadow),
            }
      }
    >
      {type === "post" ||
      type === "book_post" ||
      type === "thought" ||
      type === "rated_book" ||
      type === "book_added_shelf" ||
      type === "tag_added_book" ? (
        <View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleDoublePress}
            onPressIn={() => setScrollEnabled(false)}
            onPressOut={() => setScrollEnabled(true)}
          >
            {type === "rated_book" ||
            type === "book_added_shelf" ||
            type === "tag_added_book" ? (
              <ImageLoader
                resizeMode="cover"
                source={{
                  uri:
                    data?.bookData?.thumbnail_image ||
                    data?.thumbnail_image ||
                    "",
                }}
                defaultImage={images.book}
                style={{
                  height: width / 1.4,
                  width: width - 50,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
            ) : (
              <>
                <FlatList
                  data={
                    data?.images ||
                    data?.postImages ||
                    data?.postData?.postImages
                  }
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={width - 50}
                  onViewableItemsChanged={onViewableItemsChanged.current}
                  viewAbilityConfig={viewAbilityConfig.current}
                  scrollEnabled={scrollEnabled}
                  renderItem={({ item, index }) => {
                    return (
                      <ImageLoader
                        resizeMode="cover"
                        source={{
                          uri: item?.image,
                        }}
                        style={{
                          height: width / 1.4,
                          width: width - 50,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                        }}
                      />
                    );
                  }}
                />
                {(data?.images?.length ||
                  data?.postImages?.length ||
                  data?.postData?.postImages?.length) > 1 && (
                  <View
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: BaseColors.black90,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={[
                        Typography.default,
                        { color: BaseColors.secondary },
                      ]}
                    >
                      {activeIndex + 1}/
                      {data?.images?.length ||
                        data?.postImages?.length ||
                        data?.postData?.postImages?.length}
                    </Text>
                  </View>
                )}
              </>
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
                flex: 0.15,
              }}
            >
              <ImageLoader
                source={
                  from === "myPost"
                    ? {
                        uri: user?.profile_pic,
                      }
                    : data?.userData?.user_profile_pic
                      ? { uri: data?.userData?.user_profile_pic }
                      : images.user
                }
                defaultImage={images.user}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 50,
                  borderColor: BaseColors.secondary,
                  borderWidth: 3,
                  marginTop: -25,
                  backgroundColor: BaseColors.secondary,
                }}
              />
            </View>
            <View
              style={{
                padding: 10,
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {type === "rated_book" ||
                type === "book_added_shelf" ||
                type === "tag_added_book" ? (
                  <Text style={[Typography.chipCompoText]}>
                    {from === "myPost" ? "You" : data?.userData?.user_full_name}{" "}
                    <Text style={Typography.default}>
                      {type === "rated_book" ? "rated " : "added "}
                    </Text>
                    {data?.bookData?.title || data?.title}{" "}
                    <Text style={Typography.default}>
                      {type === "book_added_shelf" &&
                        `to the shelf ${data?.shelfData?.title}`}
                      {type === "tag_added_book" &&
                        `to their Tag "${data?.tagData?.title}"`}
                      {type === "rated_book" &&
                        `with ${data?.ratingData?.rating} stars`}
                    </Text>
                  </Text>
                ) : (
                  <Text style={[Typography.chipCompoText]}>
                    {from === "myPost" ? "You" : data?.userData?.user_full_name}{" "}
                    <Text style={Typography.default}>
                      Shared a {type == "thought" ? "thought" : "post"}
                    </Text>
                  </Text>
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={(e) => showPopover(e)}
              >
                <Feather
                  name="more-vertical"
                  style={{ fontSize: 22, color: BaseColors.text }}
                />
              </TouchableOpacity>
              <Popover
                visible={popoverVisible}
                onClose={hidePopover}
                content={
                  <View>
                    {from === "myPost" ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onPress={() => {
                          removePost(data?.post_id);
                          hidePopover();
                        }}
                      >
                        <Text style={Typography.moreText}>Delete</Text>
                        <Icon
                          name="delete-outline"
                          size={30}
                          color={BaseColors.error}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onPress={(e) => {
                          hidePopover();
                          setVisible({ ...visible, report: true });
                        }}
                      >
                        <Text style={Typography.moreText}>Report</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                }
                x={popoverPosition.x}
                y={popoverPosition.y}
                width={150}
              />
            </View>
          </View>
          {type === "rated_book" && (
            <View
              style={{
                marginLeft: 15,
                marginVertical: 5,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <StarRating
                disabled={false}
                maxStars={5}
                rating={data?.ratingData?.rating || 0}
                starSize={18}
                fullStarColor={BaseColors.primary}
                emptyStarColor={BaseColors.primary}
                starStyle={{ paddingHorizontal: 2 }}
              />
              <Text style={Typography.default}>
                {remainingDays(data?.ratingData?.createdAt)}
              </Text>
            </View>
          )}
          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={[
                type === "thought" ? Typography.comment : Typography.default,
                { width: "90%", fontSize: type === "thought" ? 22 : 16 },
              ]}
            >
              {data?.description || data?.postData?.description}
            </Text>
          </View>
          {bottomAction(data)}
        </View>
      ) : type === "followed_user" ? (
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View>
            <ImageLoader
              source={
                data?.userData?.user_profile_pic
                  ? { uri: data?.userData?.user_profile_pic }
                  : images.user
              }
              defaultImage={images.user}
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 50,
                flex: 1,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
            <Text style={Typography.chipCompoText}>
              {data?.userData?.user_full_name}
            </Text>
            <Text style={Typography.default}> started following </Text>
            <Text style={Typography.chipCompoText}>
              {data?.followingData?.following_name}
            </Text>
          </View>
          <View>
            <ImageLoader
              source={
                data?.followingData?.following_profile_pic
                  ? { uri: data?.followingData?.following_profile_pic }
                  : images.user
              }
              defaultImage={images.user}
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 50,
              }}
            />
          </View>
        </View>
      ) : type === "admin_post" ? (
        <View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              padding: 10,
              gap: 15,
            }}
          >
            <ImageLoader
              source={images.smallLogo}
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 50,
              }}
            />
            <Text style={Typography.chipCompoText}>Reanlo</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 15,
              marginVertical: 10,
            }}
          >
            <Text style={Typography.default}>
              The Book
              <Text style={Typography.chipCompoText}>
                {" "}
                {data?.bookData?.title}{" "}
              </Text>
              {isDateInFuture(data?.bookData?.publish_date)
                ? "will be release in"
                : "released in"}{" "}
              <Text style={Typography.chipCompoText}>
                {data?.bookData?.bookGenre
                  ?.map((genre) => genre?.genereData?.title)
                  .join(", ")}
              </Text>
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: "row",
              gap: 15,
            }}
          >
            <ImageLoader
              source={{ uri: data?.bookData?.thumbnail_image }}
              defaultImage={images.book}
              style={{
                width: 70,
                height: 100,
                objectFit: "contain",
                borderRadius: 8,
                borderColor: BaseColors.secondary,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={[Typography.chipCompoText]}>
                {data?.bookData?.title}
              </Text>

              <Text style={Typography.termsOfusestyle}>
                {data?.bookData?.book_authors
                  ?.map((genre) => genre?.authorData?.name)
                  .join(", ")}
              </Text>
            </View>
          </View>
          {bottomAction(data)}
        </View>
      ) : (type === "genre_suggestions" || type === "reading_suggestions") &&
        !isEmpty(data?.books) ? (
        <HbookList
          data={data?.books}
          title={
            type === "genre_suggestions"
              ? `Top Pics for You in ${data?.name}`
              : "Suggestions based on books you read"
          }
          rightText="View All"
          onPress={() =>
            navigation.navigate("DiscoverDetails", {
              title:
                type === "genre_suggestions"
                  ? `Top Pics for You in ${data?.name}`
                  : "Suggestions based on books you read",
              type:
                type === "genre_suggestions"
                  ? "user_liked_genre_books"
                  : "reading_suggestions",
              genreId: data?.genre_id || "",
              from: "discover",
            })
          }
          style={{
            width: 77,
            height: 111,
            marginRight: 10,
            borderRadius: 8,
            marginBottom: 15,
          }}
        />
      ) : null}

      <ModalComponent
        visible={visible?.comment || visible?.report}
        setModalVisible={() => {
          setVisible({ comment: false, report: false });
          setCheck(false);
          setReason("");
          setError({ err: false, errMsg: "" });
        }}
        title={visible?.comment ? "Add Comment" : "Report"}
        minHeight={Dimensions.get("screen").height / 2.5}
        contain={
          visible?.comment ? (
            <View
              style={{
                maxHeight: Dimensions.get("screen").height / 2.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <TextInput
                  textStyle={{ maxHeight: 100 }}
                  placeholderText="Comment"
                  value={comment}
                  onChange={(e) => onChange(e)}
                  style={{ flex: 1, marginBottom: 0 }}
                  multiline={true}
                />
                <TouchableOpacity
                  disabled={isEmpty(comment)}
                  activeOpacity={0.8}
                  onPress={() => addComment(data?.post_id)}
                  style={{
                    backgroundColor: isEmpty(comment)
                      ? BaseColors.bookEmptyColor
                      : BaseColors.primary,
                    padding: 10,
                    borderRadius: 100,
                  }}
                >
                  <Feather
                    name="send"
                    style={{ fontSize: 20, color: BaseColors.text }}
                  />
                </TouchableOpacity>
              </View>
              {pagination?.totalCount > 0 && (
                <Text
                  style={[Typography.moreText, { marginTop: 10 }]}
                >{`${pagination?.totalCount} ${pagination?.totalCount > 1 ? " Comments" : " Comment"}`}</Text>
              )}
              {loader ? (
                <View
                  style={{
                    height: 200,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator
                    size={"large"}
                    color={BaseColors.primary}
                  />
                </View>
              ) : (
                <FlatList
                  data={commentList}
                  keyExtractor={(item, index) => index}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1 }}
                  onEndReachedThreshold={0.1}
                  onEndReached={loadMoreData}
                  renderItem={(item) => {
                    return (
                      <Pressable
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          paddingVertical: 10,
                        }}
                      >
                        <View>
                          <ImageLoader
                            source={
                              item?.item?.profile_pic
                                ? { uri: item?.item?.profile_pic }
                                : images.user
                            }
                            defaultImage={images.user}
                            style={{
                              width: 45,
                              height: 45,
                              objectFit: "cover",
                              borderRadius: 50,
                            }}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={Typography.chipCompoText}>
                            {item?.item?.full_name}
                          </Text>

                          <Text style={Typography.termsOfusestyle}>
                            {item?.item?.comment}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: BaseColors.borderColor,
                          }}
                        >
                          {remainingDays(item?.item?.createdAt)}
                        </Text>
                      </Pressable>
                    );
                  }}
                  ListFooterComponent={() =>
                    paginationLoader ? (
                      <View style={{ alignItems: "center", padding: 10 }}>
                        <ActivityIndicator
                          color={BaseColors.primary}
                          size="small"
                        />
                      </View>
                    ) : null
                  }
                  ListEmptyComponent={() => (
                    <CLoader type="Comments" noData={true} />
                  )}
                />
              )}
            </View>
          ) : (
            <>
              <View
                style={{
                  maxHeight: Dimensions.get("screen").height / 3.3,
                }}
              >
                <FlatList
                  data={reportArr}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    const lastIndex = reportArr?.length - 1 === index;
                    return (
                      <Pressable>
                        <Checkbox
                          preTitle={item}
                          isChecked={check === index}
                          toggleCheckbox={() => setCheck(index)}
                        />
                        {check === 3 && index === 3 && (
                          <TextInput
                            placeholderText="Enter message"
                            value={reason}
                            multiline={true}
                            numberOfLines={3}
                            style={{ marginTop: 15 }}
                            onChange={(e) => {
                              setError({
                                err: false,
                                errMsg: "",
                              });
                              setReason(e);
                            }}
                            showError={error.err}
                            errorText={error.errMsg}
                          />
                        )}
                        {!lastIndex && <Divider marginVertical={15} />}
                      </Pressable>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  marginTop: 20,
                }}
              >
                <Button
                  style={{ flex: 1 }}
                  variant="outline"
                  onBtnClick={() => {
                    setCheck(false);
                    setReason("");
                    setVisible({ ...visible, report: false });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  style={{ flex: 1 }}
                  loading={btnLoad}
                  disabled={check === false || btnLoad}
                  onBtnClick={() => {
                    if (check === 3 && isEmpty(reason)) {
                      setError({
                        err: true,
                        errMsg: "Please enter reason",
                      });
                    } else {
                      reportPostApi();
                    }
                  }}
                >
                  Submit
                </Button>
              </View>
            </>
          )
        }
      />
    </View>
  );
}
