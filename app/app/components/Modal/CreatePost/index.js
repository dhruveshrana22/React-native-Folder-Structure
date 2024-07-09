import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import DropDownList from "@components/CDropDown";
import TextInput from "@components/TextInput";
import CUploadImage from "@components/CUpload";
import Button from "@components/Button";
import Toast from "react-native-toast-message";
import { getApiData } from "@app/utils/apiHelper";
import BaseSetting from "@config/setting";
import { isEmpty } from "lodash-es";
import { Typography } from "@config/typography";
import Header from "@components/Header";
import { BaseColors } from "@config/theme";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const errorObject = {
  bookErr: false,
  bookErrMsg: "",
  descErr: false,
  descErrMsg: "",
  imageErr: false,
  imageErrMsg: "",
};
export default function CreatePost() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [bookList, setBookList] = useState([]);
  const [book, setBook] = useState({});
  const [image, setImage] = useState([]);
  const [postText, setPostText] = useState("");
  const [errObj, setErrObj] = useState(errorObject);
  const [btnLoad, setBtnLoad] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchItems, setSearchItems] = useState("");

  useEffect(() => {
    if (isFocused && (isEmpty(bookList) ? true : !isEmpty(searchItems))) {
      getFavBookList();
    }
    !isEmpty(searchItems) && setBook({});
    setErrObj(errorObject);
    setPostText("");
    setImage([]);
  }, [isFocused, searchItems]);

  const getFavBookList = async (bool, page = 1) => {
    setLoader(true);
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.allBooks}?page=${page}&limit=25&search=${searchItems}`,
        "GET"
      );

      if (response?.status) {
        let arr = response?.data?.books.map((item, index) => ({
          ...item,
          value: (index + 1).toString(),
        }));
        setBookList(arr);
      } else {
        Toast.show({
          type: "error",
          text1: response?.message,
          position: "bottom",
        });
      }
    } catch (error) {
      console.log("🚀 ~ getFavBookList ~ error==========>>>>>>>>>>", error);
      Toast.show({
        type: "error",
        text1: error.toString(),
        position: "bottom",
      });
    } finally {
      setLoader(false);
    }
  };

  const validation = () => {
    let error = { ...errorObject };
    let valid = true;

    if (isEmpty(postText)) {
      valid = false;
      error.descErr = true;
      error.descErrMsg = "Please enter description";
    }
    if (isEmpty(image)) {
      valid = false;
      error.imageErr = true;
      error.imageErrMsg = "Please upload image";
    }
    setErrObj(error);
    if (valid) {
      createPostData();
    }
  };

  // this function is used to create post
  async function createPostData() {
    setBtnLoad(true);
    try {
      let data = {
        post_url: image,
        description: postText,
      };
      if (!isEmpty(book)) {
        data["book_id"] = book?.book_id;
      }
      const response = await getApiData(
        BaseSetting.endpoints.createPostApi,
        "POST",
        data,
        {},
        true
      );
      if (response?.status) {
        navigation.goBack();
        Toast.show({
          type: "success",
          text1: response?.message,
          position: "bottom",
        });
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
        position: "bottom",
      });
    } finally {
      setBtnLoad(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header isBack title={"Create Post"} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 25,
          paddingBottom: 40,
          backgroundColor: BaseColors.secondary,
          flex: 1,
          justifyContent: "space-between",
        }}
        bounces={false}
      >
        <View style={{ gap: 10 }}>
          <DropDownList
            placeholder="Select the book (Optional)"
            data={bookList}
            value={book}
            onChange={(item) => {
              setBook(item);
            }}
            searchText={(e) => setSearchItems(e)}
            maxHeight={450}
            isSearch={true}
            loader={loader}
          />

          <TextInput
            placeholderText="Enter text*"
            multiline={true}
            numberOfLines={5}
            value={postText}
            onChange={(e) => {
              setErrObj({
                ...errObj,
                descErr: false,
                descErrMsg: "",
              });
              setPostText(e);
            }}
            style={{ maxHeight: 100, marginBottom: errObj.descErr && -10 }}
            showError={errObj.descErr}
            errorText={errObj.descErrMsg}
          />

          <View>
            <View style={{ flexDirection: "row", gap: 10 }}>
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
            </View>
            {errObj?.imageErr && (
              <Text style={[Typography.errorText, { marginTop: 5 }]}>
                {errObj?.imageErrMsg}
              </Text>
            )}
          </View>
        </View>
        <View>
          <Button
            disabled={btnLoad}
            loading={btnLoad}
            onBtnClick={() => validation()}
          >
            Post
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
