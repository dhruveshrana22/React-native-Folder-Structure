import React, { useEffect, useState } from "react";
import ModalComponent from "../index";
import { ScrollView, Text } from "react-native";
import TextInput from "@components/TextInput";
import Button from "@components/Button";
import Toast from "react-native-toast-message";
import { getApiData } from "@app/utils/apiHelper";
import BaseSetting from "@config/setting";
import { isEmpty, isNull, parseInt } from "lodash-es";
import { Typography } from "@config/typography";
import { BaseColors } from "@config/theme";
import DropDownList from "@components/CDropDown";

const errorObject = {
  typeErr: false,
  typeErrMsg: "",
  perErr: false,
  perErrMsg: "",
  pageErr: false,
  pageErrMsg: "",
  chapErr: false,
  chapErrMsg: "",
};
export default function ProgressModal(props) {
  const { handleModalVisible = () => {}, visible = false, data = {} } = props;
  const [percentage, setPercentage] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);
  const [errObj, setErrObj] = useState(errorObject);
  const [chapterArr, setChapterArr] = useState([]);
  const [chapter, setChapter] = useState({});
  const [btnLoad, setBtnLoad] = useState(false);
  const [progressType, setProgressType] = useState({});
  const [progressTypeArr, setProgressTypeArr] = useState([]);

  useEffect(() => {
    setErrObj(errorObject);
    clearData();
  }, [visible]);

  useEffect(() => {
    generateArray();
    if (
      !isNull(data?.bookData?.chapter_count) &&
      data?.bookData?.chapter_count > 0 &&
      !isNull(data?.bookData?.page_count) &&
      data?.bookData?.page_count > 0
    ) {
      setProgressTypeArr([
        {
          title: "By Chapter",
          value: "chapter",
        },
        {
          title: "Page Number",
          value: "page",
        },
        {
          title: "Percentage",
          value: "percentage",
        },
      ]);
    } else if (
      !isNull(data?.bookData?.chapter_count) &&
      data?.bookData?.chapter_count > 0
    ) {
      setProgressTypeArr([
        {
          title: "By Chapter",
          value: "chapter",
        },
        {
          title: "Percentage",
          value: "percentage",
        },
      ]);
    } else if (
      !isNull(data?.bookData?.page_count) &&
      data?.bookData?.page_count > 0
    ) {
      setProgressTypeArr([
        {
          title: "Page Number",
          value: "page",
        },
        {
          title: "Percentage",
          value: "percentage",
        },
      ]);
    } else {
      setProgressTypeArr([
        {
          title: "Percentage",
          value: "percentage",
        },
      ]);
    }
  }, [data]);

  // this function is used to generate chapter array
  const generateArray = () => {
    const num = parseInt(data?.bookData?.chapter_count);

    if (!isNaN(num) && num > 0) {
      const newArray = [];
      for (let i = 1; i <= num; i++) {
        const title = "chapter" + " " + i;
        newArray.push({ title: title, value: i });
      }
      setChapterArr(newArray);
    } else {
      setChapterArr([]);
    }
  };

  const validation = () => {
    const error = { ...errorObject };
    let valid = true;
    if (isEmpty(progressType)) {
      valid = false;
      error.typeErr = true;
      error.typeErrMsg = "Please select progress type";
    }
    if (progressType?.value === "percentage" && isEmpty(percentage)) {
      valid = false;
      error.perErr = true;
      error.perErrMsg = "Please enter percentage";
    }
    if (progressType?.value === "page" && isEmpty(pageNumber)) {
      valid = false;
      error.pageErr = true;
      error.pageErrMsg = "Please enter page";
    }
    if (progressType?.value === "chapter" && isEmpty(chapter)) {
      valid = false;
      error.chapErr = true;
      error.chapErrMsg = "Please select chapter";
    }
    setErrObj(error);
    if (valid) {
      if (progressType?.value === "percentage") {
        updateProgress(percentage);
      } else if (progressType?.value === "page") {
        updateProgress(pageNumber);
      } else if (progressType?.value === "chapter") {
        updateProgress(chapter?.value);
      }
    }
  };

  async function updateProgress(value) {
    const sendData = {
      book_id: data?.book_id,
      shelf_id: data?.shelf_id,
      type: progressType?.value,
      value: value,
    };
    try {
      setBtnLoad(true);
      const response = await getApiData(
        `${BaseSetting.endpoints.updateBookProgress}`,
        "POST",
        sendData
      );
      if (response?.status) {
        handleModalVisible(false, true);
      } else {
        Toast.show({
          type: "error",
          text1: response?.message,
          position: "top",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error?.toString(),
        position: "top",
      });
      console.log("error =======>>>", error);
    } finally {
      setBtnLoad(false);
    }
  }

  function clearData() {
    setPercentage(null);
    setPageNumber(null);
    setChapter({});
    setProgressType({});
  }

  return (
    <ModalComponent
      visible={visible}
      setModalVisible={() => {
        handleModalVisible(false);
      }}
      title={"Update Progress"}
      contain={
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          <Text
            style={[
              Typography.modalTitle,
              {
                color: BaseColors.primary,
              },
            ]}
          >
            {data?.bookData?.title}
          </Text>
          <DropDownList
            placeholder="Select*"
            data={progressTypeArr}
            value={progressType}
            onChange={(item) => {
              setProgressType(item);
            }}
            maxHeight={200}
            dropdownPosition={"top"}
            showError={errObj.typeErr}
            errorMsg={errObj.typeErrMsg}
          />
          {!isEmpty(progressType) &&
            (progressType?.value === "percentage" ? (
              <TextInput
                placeholderText="Enter percentage*"
                value={percentage}
                onChange={(e) => {
                  if (!isNaN(e) && e >= 0 && e <= 100) {
                    setPercentage(e);
                  } else if (e === "") {
                    setPercentage(null);
                  }
                }}
                maxLength={3}
                keyBoardType={"number-pad"}
                showError={errObj.perErr}
                errorText={errObj.perErrMsg}
              />
            ) : progressType?.value === "page" ? (
              <TextInput
                placeholderText="Enter page number*"
                value={pageNumber}
                onChange={(e) => {
                  setPageNumber(e);
                }}
                keyBoardType={"number-pad"}
                maxLength={4}
              />
            ) : (
              <DropDownList
                placeholder={"Select chapter"}
                data={chapterArr}
                value={chapter}
                onChange={(item) => {
                  setChapter(item);
                }}
                maxHeight={200}
                dropdownPosition={"top"}
              />
            ))}

          <Button
            disabled={btnLoad}
            loading={btnLoad}
            onBtnClick={() => {
              validation();
            }}
          >
            Update
          </Button>
        </ScrollView>
      }
    />
  );
}
