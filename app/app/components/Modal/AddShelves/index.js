import React, { useEffect, useState } from "react";
import ModalComponent from "../index";
import { FlatList, ScrollView } from "react-native";
import TextInput from "@components/TextInput";
import Button from "@components/Button";
import Toast from "react-native-toast-message";
import { getApiData } from "@app/utils/apiHelper";
import BaseSetting from "@config/setting";
import { isEmpty } from "lodash-es";
import CLoader from "@components/CLoader";
import Chip from "@components/Chip";

const errorObject = {
  bookErr: false,
  bookErrMsg: "",
  descErr: false,
  descErrMsg: "",
  imageErr: false,
  imageErrMsg: "",
};
export default function AddShelves(props) {
  const {
    handleModalVisible = () => {},
    visible = false,
    data = [],
    type = "dropdown",
  } = props;
  const [shelves, setShelves] = useState("");
  const [errObj, setErrObj] = useState(errorObject);
  const [btnLoad, setBtnLoad] = useState(false);

  useEffect(() => {
    setErrObj(errorObject);
  }, [visible]);

  const renderItemShelvesDataChip = ({ item }) => {
    return (
      <Chip
        title={item?.title}
        variant="remove"
        // onPress={() => {
        //   deleteShelf(item?.slug);
        // }}
        removeIconPress={() => {
          deleteShelf(item?.slug);
        }}
        removeIcon={true}
      />
    );
  };

  const validation = () => {
    let error = { ...errorObject };
    let valid = true;
    if (isEmpty(shelves)) {
      valid = false;
      error.descErr = true;
      error.descErrMsg = "Please enter shelves name";
    }
    setErrObj(error);
    if (valid) {
      addShelves();
    }
  };

  async function addShelves() {
    setBtnLoad(true);
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.addShelf}`,
        "POST",
        {
          title: shelves,
        }
      );
      if (response?.status) {
        if (type === "dropdown") {
          handleModalVisible(false, true);
        } else {
          handleModalVisible(true, true);
        }
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
      setShelves("");
      setBtnLoad(false);
    }
  }

  async function deleteShelf(slug) {
    try {
      const response = await getApiData(
        `${BaseSetting.endpoints.deleteShelf}`,
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
        if (type === "dropdown") {
          handleModalVisible(false, true);
        } else {
          handleModalVisible(true, true);
        }
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

  return (
    <ModalComponent
      visible={visible}
      setModalVisible={() => {
        handleModalVisible(false);
      }}
      minHeight={250}
      title={"Add Shelves"}
      contain={
        type === "dropdown" ? (
          <ScrollView
            contentContainerStyle={{
              gap: 15,
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholderText="Shelves name"
              value={shelves}
              onChange={(e) => {
                setErrObj({
                  ...errObj,
                  descErr: false,
                  descErrMsg: "",
                });
                setShelves(e);
              }}
              showError={errObj.descErr}
              errorText={errObj.descErrMsg}
            />

            <Button
              disabled={btnLoad}
              loading={btnLoad}
              onBtnClick={() => validation()}
            >
              Add Shelves
            </Button>
          </ScrollView>
        ) : (
          <>
            <TextInput
              placeholderText="Shelves name"
              value={shelves}
              Add={true}
              disabledAdd={isEmpty(shelves) || btnLoad ? true : false}
              AddPress={() => {
                if (!isEmpty(shelves)) {
                  addShelves();
                }
              }}
              onSubmit={() => {
                if (!isEmpty(shelves)) {
                  addShelves();
                }
              }}
              onChange={(e) => {
                setShelves(e);
              }}
              style={{ maxHeight: 100 }}
            />
            <ScrollView
              contentContainerStyle={{
                height: 250,
              }}
            >
              <FlatList
                data={data}
                renderItem={renderItemShelvesDataChip}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 5,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: 10,
                  gap: 15,
                }}
                ListEmptyComponent={() => <CLoader type="Shelves" noData />}
              />
            </ScrollView>
          </>
        )
      }
    />
  );
}
