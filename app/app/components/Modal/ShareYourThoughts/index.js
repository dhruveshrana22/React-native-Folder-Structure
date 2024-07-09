import React, { useEffect, useState } from "react";
import ModalComponent from "../index";
import { ScrollView, Text, View } from "react-native";
import TextInput from "@components/TextInput";
import Button from "@components/Button";
import Toast from "react-native-toast-message";
import { getApiData } from "@app/utils/apiHelper";
import BaseSetting from "@config/setting";
import { isEmpty } from "lodash-es";
import { Typography } from "@config/typography";
import CUploadImage from "@components/CUpload";
import ImageLoader from "@components/ImageLoader";
import { images } from "@config/images";
import DropDownList from "@components/CDropDown";
import { BaseColors } from "@config/theme";

const errorObject = {
  bookErr: false,
  bookErrMsg: "",
  thoughtsErr: false,
  thoughtsErrMsg: "",
  imageErr: false,
  imageErrMsg: "",
};
export default function ShareThoughts(props) {
  const {
    handleModalVisible = () => {},
    visible = false,
    data = {},
    from = "",
  } = props;
  const [errObj, setErrObj] = useState(errorObject);
  const [btnLoad, setBtnLoad] = useState(false);
  const [thoughts, setThoughts] = useState("");
  const [image, setImage] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState({});

  useEffect(() => {
    setErrObj(errorObject);
    if (!isEmpty(data?.bookData?.title || data?.book_title || data?.title)) {
      setBookTitle(data?.bookData?.title || data?.book_title || data?.title);
    }
    if (from === "tag") {
      let list = data?.bookTags?.map((item, index) => ({
        title: item.tagData.title,
        tag_id: item?.tag_id,
        value: index + 1,
      }));
      setTagList(list);
      setTag(list?.[0]);
    }
  }, [data, visible]);

  const validation = () => {
    const error = { ...errorObject };
    let valid = true;
    if (
      from !== "shelf" &&
      from !== "tag" &&
      from !== "rating" &&
      isEmpty(image)
    ) {
      valid = false;
      error.imageErr = true;
      error.imageErrMsg = "Please upload image";
    }
    if (isEmpty(thoughts)) {
      valid = false;
      error.thoughtsErr = true;
      error.thoughtsErrMsg = `Please enter your ${from === "shelf" || from === "tag" || from === "rating" ? "description" : "thought"}`;
    }
    setErrObj(error);
    if (valid) {
      if (from === "shelf" || from === "tag" || from === "rating") {
        shareUpdateApi();
      } else {
        ShareThoughts();
      }
    }
  };

  // this function is used to create post
  async function ShareThoughts() {
    setBtnLoad(true);
    try {
      let newData = {
        post_url: image,
        description: thoughts,
        type: "thought",
      };
      if (!isEmpty(data)) {
        newData["book_id"] = data?.book_id;
      }
      const response = await getApiData(
        BaseSetting.endpoints.createPostApi,
        "POST",
        newData,
        {},
        true
      );
      if (response?.status) {
        handleModalVisible(false);
        Toast.show({
          type: "success",
          text1: response?.message,
          position: "bottom",
        });
        clearData();
      } else {
        Toast.show({
          type: "error",
          text1: response?.message,
          position: "top",
        });
      }
    } catch (error) {
      console.log("error =======>>>", error);
      Toast.show({
        type: "error",
        text1: error?.toString(),
        position: "top",
      });
    } finally {
      setBtnLoad(false);
    }
  }
  async function shareUpdateApi() {
    setBtnLoad(true);
    try {
      const response = await getApiData(
        BaseSetting.endpoints.shareUpdate,
        "POST",
        {
          type:
            from === "shelf"
              ? "book_added_shelf"
              : from === "tag"
                ? "tag_added_book"
                : "rated_book",
          book_id: data?.book_id,
          shelf_id: data?.shelf?.shelf_id || "",
          tag_id: tag?.tag_id || "",
          description: thoughts,
        }
      );
      if (response?.status) {
        handleModalVisible(false);
        Toast.show({
          type: "success",
          text1: response?.message,
          position: "bottom",
        });
        clearData();
      } else {
        Toast.show({
          type: "error",
          text1: response?.message,
          position: "top",
        });
      }
    } catch (error) {
      console.log("error =======>>>", error);
      Toast.show({
        type: "error",
        text1: error?.toString(),
        position: "top",
      });
    } finally {
      setBtnLoad(false);
    }
  }

  const clearData = () => {
    setBookTitle("");
    setThoughts("");
    setImage([]);
  };

  return (
    <ModalComponent
      visible={visible}
      setModalVisible={() => {
        handleModalVisible(false);
        clearData();
      }}
      title={
        from === "shelf"
          ? "Share Your Shelf Update"
          : from === "tag"
            ? "Share Your Tag Update"
            : from === "rating"
              ? "Share Your Rating"
              : "Share Your Thoughts"
      }
      contain={
        <ScrollView contentContainerStyle={{ gap: 15 }}>
          {from === "tag" ? (
            <DropDownList
              data={tagList}
              value={tag}
              onChange={(e) => setTag(e)}
            />
          ) : (
            <Text
              style={[
                Typography.modalTitle,
                {
                  color: BaseColors.primary,
                },
              ]}
              numberOfLines={2}
            >
              {bookTitle}
            </Text>
          )}

          <TextInput
            placeholderText={`Enter your ${from === "shelf" || from === "tag" || from === "rating" ? "description*" : "thought*"}`}
            multiline={true}
            numberOfLines={3}
            value={thoughts}
            onChange={(e) => {
              setErrObj({
                ...errObj,
                thoughtsErr: false,
                thoughtsErrMsg: "",
              });
              setThoughts(e);
            }}
            style={{ maxHeight: 100 }}
            showError={errObj.thoughtsErr}
            errorText={errObj.thoughtsErrMsg}
          />
          <View>
            <View style={{ flexDirection: "row", gap: 10, marginTop: -10 }}>
              {from === "shelf" || from === "tag" || from === "rating" ? (
                <ImageLoader
                  source={{
                    uri:
                      data?.thumbnail_image || data?.bookData?.thumbnail_image,
                  }}
                  defaultImage={images.book}
                  style={{
                    width: 115,
                    height: 115,
                    borderRadius: 8,
                    marginRight: 10,
                    marginVertical: 10,
                  }}
                />
              ) : (
                <CUploadImage
                  type="square"
                  value={image}
                  onSet={(val) => {
                    setImage(val);
                    setErrObj({
                      ...errObj,
                      imageErr: false,
                      imageErrMsg: "",
                    });
                  }}
                  handleRemove={(index) => {
                    const updatedValues = [...image];
                    updatedValues.splice(index, 1);
                    setImage(updatedValues);
                  }}
                  multiple={true}
                  maxLength={2}
                />
              )}
            </View>
            {errObj?.imageErr && (
              <Text style={[Typography.errorText, { marginTop: 5 }]}>
                {errObj?.imageErrMsg}
              </Text>
            )}
          </View>

          <Button
            disabled={btnLoad}
            loading={btnLoad}
            onBtnClick={() => {
              validation();
            }}
          >
            Submit
          </Button>
        </ScrollView>
      }
    />
  );
}
