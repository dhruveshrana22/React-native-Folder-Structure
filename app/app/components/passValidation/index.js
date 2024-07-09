import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { View, Text } from "react-native";
import { BaseColors } from "@config/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { FontFamily } from "@config/typography";

const PassValidation = (props) => {
  const { password = "", handleValid = () => null } = props;

  const regexCategories = /^(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^*?_\-+=]).{8,64}$/;

  const [passVal, setPassVal] = useState(false);

  useEffect(() => {
    let valid = regexCategories.test(password);
    setPassVal(valid);
    handleValid(valid);
  }, [password]);

  return (
    !isEmpty(password) && (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 5,
          marginTop: -10,
        }}
      >
        {passVal ? (
          <AntDesign
            name="checkcircle"
            style={{ marginRight: 5, fontSize: 20, color: BaseColors.green }}
          />
        ) : (
          <AntDesign
            name="closecircle"
            style={{ marginRight: 5, fontSize: 20, color: BaseColors.error }}
          />
        )}
        <Text
          style={{
            marginLeft: 5,
            fontFamily: FontFamily.outfitMedium,
            color: passVal ? BaseColors.green : BaseColors.error,
          }}
        >
          Password must contain at least 8 characters, including an uppercase
          letter, a numerical value, and a non-alphanumeric character:
          ~!#@$%^*?_-+=
        </Text>
      </View>
    )
  );
};

export default PassValidation;
