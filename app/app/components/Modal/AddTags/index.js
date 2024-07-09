import React, { useEffect, useState } from "react";
import ModalComponent from "../index";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  View,
} from "react-native";
import TextInput from "@components/TextInput";
import Button from "@components/Button";
import Toast from "react-native-toast-message";
import { getApiData } from "@app/utils/apiHelper";
import BaseSetting from "@config/setting";
import { isEmpty, isNull } from "lodash-es";
import CLoader from "@components/CLoader";
import Chip from "@components/Chip";
import { BaseColors } from "@config/theme";

const errorObject = {
  tagErr: false,
  tagMsg: "",
};
export default function AddTags(props) {
  const {
    handleModalVisible = () => {},
    visible = false,
    data = [],
    removeIcon = false,
    type = "default",
    loadMoreData = () => {},
    paginationLoader = false,
    handleSelectedTag = () => {},
    handleSubmitBtn = () => {},
    submitBtnLoad = false,
  } = props;
  const [tags, setTags] = useState("");
  const [errObj, setErrObj] = useState(errorObject);
  const [btnLoad, setBtnLoad] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setErrObj(errorObject);
  }, [visible]);

  useEffect(() => {
    if (!isEmpty(data)) {
      const checkedTags = data?.filter((item) => item?.isChecked);
      const selectedTagsIds = checkedTags?.map((item) => item?.tag_id);
      setSelectedTags(selectedTagsIds);
    }
  }, [data]);

  const renderItemShelvesDataChip = ({ item }) => {
    return (
      <Pressable style={{ margin: 5 }}>
        <Chip
          title={item?.title}
          variant={item?.isChecked ? "success" : "default"}
          removeIconPress={() => {
            deleteTag(item?.slug);
          }}
          removeIcon={removeIcon ? false : true}
          onPress={() => handleSelectedTag(item)}
        />
      </Pressable>
    );
  };

  async function addTag() {
    setBtnLoad(true);
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.addTag}`,
        "POST",
        {
          title: tags,
        }
      );
      if (response?.status) {
        handleModalVisible(true, true);
        Toast.show({
          type: "success",
          position: "top",
          text1: response?.message,
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: response?.message,
        });
      }
    } catch (error) {
      console.error("error =======>>>", error);
    } finally {
      setTags("");
      setBtnLoad(false);
    }
  }

  async function deleteTag(slug) {
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.deleteTag}`,
        "POST",
        {
          slug: slug,
        }
      );
      if (response?.status) {
        Toast.show({
          type: "success",
          position: "top",
          text1: response?.message,
        });

        handleModalVisible(true, true);
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: response?.message,
        });
      }
    } catch (error) {
      console.error("error =======>>>", error);
    }
  }

  function validation() {
    let valid = true;
    let error = { ...errorObject };
    if (isEmpty(selectedTags)) {
      valid = false;
      Toast.show({
        type: "error",
        position: "top",
        text1: "Please select at least one tags.",
      });
    }
    setErrObj(error);
    if (valid) {
      handleSubmitBtn(selectedTags);
    }
  }

  return (
    <ModalComponent
      visible={visible}
      setModalVisible={() => {
        handleModalVisible(false);
      }}
      style={{
        maxHeight: Dimensions.get("screen").height / 3.3,
      }}
      minHeight={250}
      title={"Add Tags"}
      contain={
        <View
          style={{
            maxHeight: Dimensions.get("screen").height / 2,
          }}
        >
          <TextInput
            placeholderText="Tags name"
            value={tags}
            Add={true}
            disabledAdd={isEmpty(tags) || btnLoad ? true : false}
            AddPress={() => {
              if (!isEmpty(tags)) {
                addTag();
              }
            }}
            onSubmit={() => {
              if (!isEmpty(tags)) {
                addTag();
              }
            }}
            onChange={(e) => {
              setTags(e);
            }}
            style={{ maxHeight: 100 }}
            maxLength={20}
          />

          <FlatList
            data={data}
            horizontal={false}
            renderItem={renderItemShelvesDataChip}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              padding: 10,
              flexGrow: 1,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            onEndReached={loadMoreData}
            ListFooterComponent={() =>
              paginationLoader ? (
                <View style={{ alignItems: "center", padding: 10 }}>
                  <ActivityIndicator color={BaseColors.primary} size="small" />
                </View>
              ) : null
            }
            ListEmptyComponent={() => <CLoader noData type="Tags" />}
          />

          {type === "assign" && (
            <Button
              loading={submitBtnLoad}
              disabled={submitBtnLoad}
              onBtnClick={() => validation()}
            >
              Assign Tags
            </Button>
          )}
        </View>
      }
    />
  );
}
