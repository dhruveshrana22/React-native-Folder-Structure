import React, { useEffect, useState } from "react";
import ModalComponent from "../index";
import { ScrollView, Text } from "react-native";
import TextInput from "@components/TextInput";
import Button from "@components/Button";
import Toast from "react-native-toast-message";
import { getApiData } from "@app/utils/apiHelper";
import BaseSetting from "@config/setting";
import { isEmpty, isNull } from "lodash-es";
import { Typography } from "@config/typography";
import { BaseColors } from "@config/theme";

const errorObject = {
  chapErr: false,
  chapErrMsg: "",
  pageErr: false,
  pageErrMsg: "",
};
export default function AddBookDetails(props) {
  const {
    handleModalVisible = () => {},
    visible = false,
    data = {},
    type = "",
  } = props;
  const [errObj, setErrObj] = useState(errorObject);
  const [btnLoad, setBtnLoad] = useState(false);
  const [chapter, setChapter] = useState("");
  const [pages, setPages] = useState("");

  useEffect(() => {
    setErrObj(errorObject);
    setBtnLoad(false);
    clear();
  }, [visible]);

  const validation = () => {
    let error = { ...errorObject };
    let valid = true;
    if (
      (["chapter", "both"].includes(type) && isEmpty(chapter)) ||
      isNull(chapter)
    ) {
      valid = false;
      error.chapErr = true;
      error.chapErrMsg = "Please enter chapters";
    }
    if ((["page", "both"].includes(type) && isEmpty(pages)) || isNull(pages)) {
      valid = false;
      error.pageErr = true;
      error.pageErrMsg = "Please enter pages";
    }
    setErrObj(error);
    if (valid) {
      addBookDetails();
    }
  };

  async function addBookDetails() {
    setBtnLoad(true);

    let dataObj = {
      book_id: data?.book_id,
    };

    if (["chapter", "both"].includes(type)) {
      dataObj["chapter_count"] = Number(chapter);
    } else if (["page", "both"].includes(type)) {
      dataObj["page_count"] = Number(pages);
    }

    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.updateBookDetails}`,
        "POST",
        dataObj,
        {}
      );

      if (response?.status) {
        if (type === "dropdown") {
          handleModalVisible(false, true);
        } else {
          handleModalVisible(true, true);
        }
      } else {
        handleModalVisible();
        Toast.show({
          type: "error",
          position: "top",
          text1: response?.message,
        });
      }
    } catch (error) {
      console.error("error =======>>>", error);
    } finally {
      setShelves("");
      setBtnLoad(false);
    }
  }

  const clear = () => {
    setChapter("");
    setPages("");
  };

  return (
    <ModalComponent
      visible={visible}
      setModalVisible={() => {
        handleModalVisible(false);
      }}
      minHeight={250}
      title={"Provide Book Details "}
      contain={
        <ScrollView
          contentContainerStyle={{
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              Typography.modalTitle,
              {
                color: BaseColors.primary,
                marginBottom: 10,
              },
            ]}
          >
            {data?.bookData?.title || data?.title || data?.book_title}
          </Text>
          {["chapter", "both"].includes(type) && (
            <TextInput
              placeholderText="Add Total Chapters"
              value={chapter}
              keyBoardType={"number-pad"}
              onChange={(e) => {
                setErrObj({
                  ...errObj,
                  chapErr: false,
                  chapErrMsg: "",
                });
                setChapter(e);
              }}
              showError={errObj.chapErr}
              errorText={errObj.chapErrMsg}
              maxLength={2}
            />
          )}
          {["page", "both"].includes(type) && (
            <TextInput
              placeholderText="Add total Pages"
              value={pages}
              keyBoardType={"number-pad"}
              onChange={(e) => {
                setErrObj({
                  ...errObj,
                  pageErr: false,
                  pageErrMsg: "",
                });
                setPages(e);
              }}
              showError={errObj.pageErr}
              errorText={errObj.pageErrMsg}
              maxLength={4}
            />
          )}

          <Button
            disabled={btnLoad}
            loading={btnLoad}
            onBtnClick={() => validation()}
          >
            Submit
          </Button>
        </ScrollView>
      }
    />
  );
}
