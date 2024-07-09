import React, { forwardRef, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import _ from "lodash";
import { BaseColors } from "@config/theme";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { Typography } from "@config/typography";
import styles from "./styles";
import Divider from "@components/Divider";
import Chip from "@components/Chip";
import ImageLoader from "@components/ImageLoader";

const DropDownList = forwardRef((props, ref) => {
  const {
    data = [],
    onChange = () => null,
    searchText = () => null,
    loader = false,
    labelProp = "",
    value = "",
    dropDownStyle = {},
    placeholder = "",
    placeholderStyle = {},
    isSearch = false,
    showError = false,
    multiSelection = false,
    errorMsg = "",
    valueProp = "",
    valueField = "",
    label = "",
    // renderItem = () => null,
    required = false,
    disabled = false,
    dropdownPosition = "auto",
    onEndReached = () => {},
    style = {},
    maxHeight = 300,
    variant = "contain",
    addItem = false,
    handleAddBtnClick = () => null,
    noData = "No Data Available",
    selectedTextStyle,
  } = props;
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (item) => {
    const index = data.findIndex((x) => x === item);
    if (loader && index === 0) {
      return <ActivityIndicator color={BaseColors.primary} size={22} />;
    } else {
      return (
        <>
          {addItem && index === 0 && (
            <View style={{ backgroundColor: BaseColors.dropdown }}>
              <Chip
                style={{
                  maxWidth: 120,
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
                title="+ Add Shelf"
                variant="success"
                onPress={handleAddBtnClick}
              />
            </View>
          )}
          <View
            style={[
              styles.dropdownContainer,
              { flexDirection: "row", alignItems: "center", gap: 15 },
            ]}
          >
            {item?.thumbnail_image && (
              <ImageLoader
                source={{ uri: item?.thumbnail_image }}
                style={{
                  width: 47,
                  height: 72,
                  borderRadius: 8,
                }}
                resizeMode={"cover"}
              />
            )}
            <Text
              style={[
                Typography.default,
                { paddingRight: item?.thumbnail_image && 47 },
              ]}
            >
              {item?.title}
            </Text>
          </View>
          {item !== value && index !== data?.length - 1 && (
            <Divider borderWidth={0.5} />
          )}
        </>
      );
    }
  };

  return (
    <View style={[styles.root, style]}>
      {multiSelection ? (
        <MultiSelect
          ref={ref}
          style={[
            styles.dropdown,
            disabled && {
              backgroundColor: BaseColors.grey20,
              opacity: 0.7,
            },
            dropDownStyle,
            isFocus && { borderColor: BaseColors.primary },
            showError && { borderColor: BaseColors.error },
          ]}
          placeholderStyle={[Typography.default, styles.placeholderStyle]}
          selectedTextStyle={[Typography.default, styles.selectedTextStyle]}
          inputSearchStyle={[Typography.default, styles.inputSearchStyle]}
          iconStyle={styles.iconStyle}
          iconColor={BaseColors.grey50}
          search={isSearch}
          activeColor={BaseColors.lightGray}
          itemTextStyle={[Typography.default, styles.listText]}
          containerStyle={styles.listContainer}
          data={data}
          labelField={label || "title"}
          valueField={valueProp || "value"}
          placeholder={placeholder || ""}
          searchPlaceholder="Search..."
          value={value}
          onChange={(item) => {
            onChange(item);
          }}
          selectedStyle={styles.selectedStyle}
          flatListProps={{
            onEndReachedThreshold: 0.5,
            onEndReached: onEndReached,
            ListEmptyComponent: () => (
              <View style={styles.noDataContainer}>
                <Text style={styles.default}>No data available</Text>
              </View>
            ),
          }}
        />
      ) : (
        <Dropdown
          ref={ref}
          style={[
            styles.dropdown,
            disabled && {
              backgroundColor: BaseColors.grey20,
              opacity: 0.7,
            },
            dropDownStyle,
            isFocus && { borderColor: BaseColors.primary },
            showError && { borderColor: BaseColors.error },
          ]}
          renderItem={renderItem}
          inverted={false}
          disable={disabled}
          placeholderStyle={[
            Typography.default,
            styles.placeholderStyle,
            placeholderStyle,
          ]}
          selectedTextStyle={[
            Typography.default,
            styles.selectedTextStyle,
            selectedTextStyle,
          ]}
          inputSearchStyle={[Typography.default, styles.inputSearchStyle]}
          iconStyle={styles.iconStyle}
          iconColor={BaseColors.text}
          activeColor={BaseColors.primary}
          itemTextStyle={[Typography.dropdownText, styles.listText]}
          containerStyle={styles.listContainer}
          data={data}
          flatListProps={{
            onEndReachedThreshold: 0.5,
            onEndReached: onEndReached,
            ListEmptyComponent: () => (
              <View style={styles.noDataContainer}>
                {addItem && (
                  <View style={{ backgroundColor: BaseColors.dropdown }}>
                    <Chip
                      style={{
                        width: 100,
                        marginVertical: 10,
                        marginHorizontal: 10,
                      }}
                      title="+ Add Shelf"
                      variant="success"
                      onPress={handleAddBtnClick}
                    />
                  </View>
                )}
                <Text style={styles.default}>{noData}</Text>
              </View>
            ),
          }}
          dropdownPosition={dropdownPosition}
          search={isSearch ? true : false}
          onChangeText={searchText}
          maxHeight={maxHeight}
          labelField={label || "title"}
          valueField={valueProp || "value"}
          placeholder={placeholder || "Select..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            onChange(item);
            setIsFocus(false);
          }}
          autoScroll={true}
        />
      )}
      {showError ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
    </View>
  );
});

export default DropDownList;
