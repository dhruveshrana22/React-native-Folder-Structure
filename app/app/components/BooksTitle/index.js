import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { BaseColors } from "@config/theme";
import Chip from "@components/Chip";
import DropDownList from "@components/CDropDown";
import { FontFamily, Typography } from "@config/typography";
import SlideComponent from "@components/SlideComponent/SlideComponent";
import ImageLoader from "@components/ImageLoader";
import { isArray, isEmpty, isNull } from "lodash-es";
import Tags from "@components/Tags";
import { images } from "@config/images";
import BaseSetting from "@config/setting";
import { getApiData } from "@app/utils/apiHelper";
import Toast from "react-native-toast-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StarCompo } from "@components/StarCompo";
import Fontisto from "react-native-vector-icons/Fontisto";
import ShareThoughts from "@components/Modal/ShareYourThoughts";
import AddBookDetails from "@components/Modal/AddBookDetails";
import moment from "moment";

export const Tag = ({ tag }) => {
  const width = tag.length * 7;
  const height = tag.length * 7;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        backgroundColor: BaseColors.green,
        height: height,
        width: width,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 200,
      }}
    >
      <Text style={styles.tagsText}>{tag}</Text>
    </TouchableOpacity>
  );
};
const BooksTitle = ({
  bookData,
  handleBtnPress = () => {},
  type = "progress",
  from = "",
  shelvesArr = [],
  shareIcon = false,
  handleShare = () => {},
  handleTagModal = () => {},
  handleBookDetails = () => {},
}) => {
  const [rating, setRating] = useState(0);
  const [showMoreView, setShowMoreView] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [shareModal, setShareModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedSelf, setSelectedSelf] = useState("");
  const [activeData, setActiveData] = useState("");
  const typesToCheck = [
    "books_to_read",
    "search_books",
    "finished_reading",
    "similar_books",
  ];

  useEffect(() => {
    if (!isEmpty(bookData)) {
      setSliderValue(bookData?.progress_percentage);
      setRating(bookData?.average_rate || 0);
    }
  }, [bookData]);

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

  const ShelfDropDown = () => {
    return (
      <View style={{ paddingTop: 10 }}>
        <DropDownList
          placeholder="Shelves"
          data={shelvesArr}
          onChange={(e) => {
            setSelectedSelf(e);
            if (
              isNull(bookData?.bookData?.chapter_count) &&
              isNull(bookData?.bookData?.page_count)
            ) {
              setDetailModal({ open: true, type: "both" });
            } else if (isNull(bookData?.bookData?.chapter_count)) {
              setDetailModal({ open: true, type: "chapter" });
            } else if (isNull(bookData?.bookData?.page_count)) {
              setDetailModal({ open: true, type: "page" });
            } else {
              addBooksInShelves(e);
            }
          }}
          valueProp={"shelf_id"}
          maxHeight={200}
          dropDownStyle={[
            styles.dropdown,
            {
              minWidth: type !== "series" && 130,
              marginLeft: type !== "series" && "auto",
              width: type === "series" && 150,
            },
          ]}
          placeholderStyle={[
            Typography.default,
            {
              color: BaseColors.text,
              fontFamily: FontFamily.outfitSemiBold,
            },
          ]}
          addItem={true}
          handleAddBtnClick={() => {
            handleBtnPress();
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <ImageLoader
          source={{
            uri:
              bookData?.thumbnail_image ||
              bookData?.bookData?.thumbnail_image ||
              bookData?.image,
          }}
          resizeMode={"cover"}
          defaultImage={images.book}
          style={{
            height: from === "currently_reading" ? 150 : 120,
            width: from === "currently_reading" ? 90 : 75,
            borderRadius: 10,
          }}
          data={bookData}
          type="book"
        />

        {/* BookTitle & Chapter With the condition */}
        <View style={styles.contentContainer}>
          {shareIcon && (
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              activeOpacity={0.8}
              onPress={() => handleShare()}
            >
              <FontAwesome
                name="share-square-o"
                size={22}
                color={BaseColors.text}
              />
            </TouchableOpacity>
          )}
          {type === "progress" && (
            <>
              <Text style={Typography.subTitle} numberOfLines={2}>
                {bookData?.title || bookData?.bookData?.title}
              </Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {!isEmpty(bookData?.author) &&
                  isArray(bookData?.author) &&
                  bookData?.author?.map((item, index) => {
                    const lastIndex = bookData?.author?.length - 1 == index;
                    return (
                      <Text style={styles.bookChapter} key={index}>
                        {item?.name}
                        {lastIndex ? "" : ", "}
                      </Text>
                    );
                  })}
              </View>
            </>
          )}
          {(typesToCheck.includes(type) || type === "series") && (
            <>
              <Text
                style={[Typography.moreText, { fontSize: 16 }]}
                numberOfLines={2}
              >
                {bookData?.title || bookData?.bookData?.title}
              </Text>
              {bookData?.bookData?.chapter_count && (
                <View>
                  <Text style={styles.bookChapter}>
                    Chapter {bookData?.progress_chapter} of{" "}
                    {bookData?.bookData?.chapter_count}
                  </Text>
                </View>
              )}
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {!isEmpty(bookData?.author) &&
                  isArray(bookData?.author) &&
                  bookData?.author?.map((item, index) => {
                    const lastIndex = bookData?.author?.length - 1 == index;
                    return (
                      <Text style={styles.bookChapter} key={index}>
                        {item?.name}
                        {lastIndex ? "" : ", "}
                      </Text>
                    );
                  })}
              </View>
            </>
          )}
          {/* Add StarRating component with onPress handler */}
          {type === "progress" && (
            <View style={{ marginTop: 20 }}>
              <SlideComponent
                onValueChange={(low, high) => setSliderValue(low)}
                value={sliderValue}
                disabled={true}
                alwaysLabel={true}
              />
            </View>
          )}
          {type === "series" && <ShelfDropDown />}
          {typesToCheck.includes(type) && (
            <View style={{ paddingTop: 10, flexDirection: "row", gap: 5 }}>
              <StarCompo
                disabled={true}
                maxStars={5}
                rating={rating}
                starSize={16}
                containerStyle={{ gap: 2 }}
              />
              <Text style={[Typography.default, { fontSize: 12 }]}>
                {rating}/{5}
              </Text>
            </View>
          )}

          {/* DropDown Shelves data With out Tags Data */}
          {["books_to_read", "similar_books"].includes(type) && (
            <ShelfDropDown />
          )}
          {type === "progress" ? (
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Chip
                title="Update Progress"
                style={[Typography.moreText, { fontSize: 10 }]}
                onPress={() => handleBtnPress()}
              />
            </View>
          ) : null}
        </View>

        {/* Tags Component */}
        {type === "finished_reading"
          ? !showMoreView && (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.text1}>My Tags</Text>

                  <TouchableOpacity
                    onPress={() => setShowMoreView(!showMoreView)}
                  >
                    <Text style={[styles.text1, { marginLeft: 10 }]}>More</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    backgroundColor: BaseColors.primary,
                    height: 50,
                    width: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                    flexDirection: "row",
                  }}
                  onPress={() => {
                    setShowMoreView(!showMoreView);
                    handleTagModal();
                  }}
                >
                  <Fontisto name="plus-a" size={14} color={BaseColors.text} />
                  <Text
                    style={[
                      Typography.default,
                      { fontSize: 12, textAlign: "center" },
                    ]}
                  >
                    {" "}
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            )
          : null}
      </View>
      {showMoreView && (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text1}>My Tags</Text>
            <TouchableOpacity onPress={() => setShowMoreView(!showMoreView)}>
              <Text style={[styles.text1, { marginLeft: 10 }]}>Less</Text>
            </TouchableOpacity>
          </View>

          <Tags
            type="assign"
            data={bookData?.bookTags}
            handlePress={(item) => {
              return null;
            }}
            isAdd
            onPress={() => {
              handleTagModal();
            }}
          />
        </>
      )}

      {/* when tags in new line tags and salves */}
      {type === "finished_reading" ? (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              gap: 20,
              paddingTop: 5,
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <Text style={styles.text1}>Started on:</Text>
              <Text style={Typography.default}>
                {moment(bookData?.started_on).format("MMM DD, YYYY") || "--"}
              </Text>
            </View>
            <View style={{ alignItems: "flex-start" }}>
              <Text style={styles.text1}>Finished on:</Text>
              <Text style={Typography.default}>
                {moment(bookData?.finished_on).format("MMM DD, YYYY") || "--"}
              </Text>
            </View>
          </View>

          <ShelfDropDown />
        </View>
      ) : null}

      <ShareThoughts
        visible={shareModal}
        handleModalVisible={() => setShareModal(false)}
        data={activeData}
        from="shelf"
      />

      <AddBookDetails
        visible={detailModal?.open}
        type={detailModal?.type}
        data={bookData}
        handleModalVisible={(e, success) => {
          setDetailModal({ open: false });
          if (success) {
            addBooksInShelves(selectedSelf);
          }
        }}
      />
    </View>
  );
};

export default BooksTitle;
