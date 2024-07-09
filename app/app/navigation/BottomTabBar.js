/* eslint-disable react-native/no-inline-styles */
// Import React
import React from "react";
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FastImage from "react-native-fast-image";

// Import Screens
import { BaseColors } from "../config/theme";
import { images } from "../config/images";
import Home from "../screens/Home";
import Pushnotification from "../components/Pushnotification";
import Discover from "@screens/Discover";
import MyBooks from "@screens/MyBooks";
import Profile from "@screens/Profile";
import { SvgXml } from "react-native-svg";
import { Typography } from "@config/typography";
import CreatePost from "@components/Modal/CreatePost";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const IOS = Platform.OS === "ios";

// Return Tab bar icon for Active and Inactive tab
const tabBarIcon = (route, focused) => {
  let iconName;
  iconName = focused
    ? route?.name === "Home"
      ? images?.homeActive
      : route?.name === "Discover"
        ? images?.discoverActive
        : route?.name === "MyBooks"
          ? images?.myBookActive
          : images?.profileActive
    : route?.name === "Home"
      ? images?.home
      : route?.name === "Discover"
        ? images?.discover
        : route?.name === "MyBooks"
          ? images?.myBook
          : images?.profile;
  return route.name === "CreatePost" ? (
    <View
      style={{
        backgroundColor: BaseColors.primary,
        position: "absolute",
        top: -30,
        borderRadius: 50,
        height: 55,
        width: 55,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FastImage
        source={images.createPost}
        style={{
          width: 22,
          height: 22,
        }}
      />
    </View>
  ) : (
    <FastImage
      source={iconName}
      style={{
        width: route?.name === "Profile" ? 22 : 26,
        height: 26,
        marginBottom: !focused && 10,
      }}
    />
  );
};

// Final function
const BottomTabBar = () => {
  const xml = `<svg width="425" height="108" viewBox="0 0 425 108" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M161.68 32.6406C168.82 32.6406 174.56 27.0606 177.73 20.6706C183.62 8.80062 195.86 0.640625 210 0.640625C224.14 0.640625 236.39 8.80062 242.27 20.6706C245.44 27.0606 251.18 32.6406 258.32 32.6406H419C422.31 32.6406 425 35.3306 425 38.6406V81.6406C425 96.0006 413.36 107.641 399 107.641H21C6.64 107.641 -5 96.0006 -5 81.6406V38.6406C-5 35.3306 -2.31 32.6406 1 32.6406H161.68Z" fill="white"/>
  </svg>`;

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={{ position: "relative" }}>
        {/* SVG Background */}
        <View style={{ position: "absolute", bottom: -15, left: 2 }}>
          <SvgXml xml={xml} width={Dimensions.get("screen").width} />
        </View>

        {/* Tab Items */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            height: 50,
            backgroundColor: "transparent",
            paddingBottom: 5,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TouchableOpacity
                activeOpacity={1}
                key={route.key}
                onPress={() => onPress()}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {tabBarIcon(route, isFocused)}
                {/* Customize this part with the tab's icon and label */}
                {isFocused && route?.name !== "CreatePost" ? (
                  <Text style={Typography.bottomTabText}>
                    {options.title || route.name}
                  </Text>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => {
          return {
            tabBarActiveTintColor: BaseColors.primary,
            tabBarInactiveTintColor: BaseColors.secondary,
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({ focused }) => tabBarIcon(route, focused),
          };
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            title: "Home",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{
            tabBarLabel: "Discover",
            title: "Discover",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            tabBarLabel: "CreatePost",
            title: "Create Post",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="MyBooks"
          component={MyBooks}
          options={{
            tabBarLabel: "MyBooks",
            title: "My Books",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            title: "Profile",
            headerShown: false,
          }}
        />
      </Tab.Navigator>

      <Pushnotification />

      {/* this component is used to display create post model */}
    </>
  );
};

export default BottomTabBar;
