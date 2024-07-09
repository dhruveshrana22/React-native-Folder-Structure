/* eslint-disable react-hooks/exhaustive-deps */
import "react-native-gesture-handler";

// Import React and Component
import React, { useEffect, useMemo } from "react";
import { SafeAreaView, StatusBar, Text, TextInput, View } from "react-native";
import { persistor, store } from "@app/redux/store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import codePush from "react-native-code-push";
import NToast from "react-native-toast-message";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import SplashScreen from "./app/screens/SplashScreen/SplashScreen";
import { InAppNotificationProvider } from "./app/libs/react-native-in-app-notification";
import { navigationRef } from "./app/navigation/NavigationService";
import { initTranslate } from "./app/lang/Translate";
import { useState } from "react";
import UpdatePopup from "./app/components/UpdatePopUp";
import IntroScreen from "./app/screens/IntroScreen/intro";
import TermsAndCondition from "./app/screens/TermsAndCondition";
import NetworkLost from "./app/components/NetworkLost";
import NetInfo from "@react-native-community/netinfo";
import AboutUs from "./app/screens/About/AboutUs";
// import SideBar from "./app/navigation/SideBar";
import Login from "@screens/Login";
import { BaseColors } from "@config/theme";
import { FontFamily } from "@config/typography";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Registration from "@screens/Registration";
import ForgotPassword from "@screens/ForgotPassword";
import OTP from "@screens/OTP";
import ResetPassword from "@screens/ResetPassword";
import BottomTabBar from "@navigation/BottomTabBar";
import NotificationScreen from "@screens/Notification";
import More from "@screens/More";
import PrivacyPolicy from "@screens/PrivacyPolicy";
import FAQs from "@screens/FAQ";
import Configuration from "@screens/Configuration";
import FavoriteBookGenre from "@screens/FavoritebookGenre";
import Subgenre from "@screens/Subgenre";
import FavoriteAuthor from "@screens/FavoriteAuthor";
import Recommendations from "@screens/Recommendations";
import AccountToFollow from "@screens/AccountToFollow";
import FiveStarBooks from "@screens/FiveStarBooks";
import AuthorsToFollow from "@screens/AuthorsToFollow";
import SocialAccount from "@screens/SocialAccounts/Index";
import FavoriteBooks from "@screens/FavoriteBooks";
import Followers from "@screens/Followers";
import Following from "@screens/Following";

import ReadingStatistics from "@screens/ReadingStatistics";
import BookDetail from "@screens/BookDetail";
import MyPosts from "@screens/MyPosts";
import SearchMyBook from "@screens/SearchMyBook/Index";
import ContactUs from "@screens/ContactUs";
import EditProfile from "@screens/EditProfile";
import DiscoverSearchScreen from "@screens/Discover/DiscoverSearch";
import OtherProfile from "@screens/OtherProfile";
import BookRecommend from "@screens/BookRecommand";
import DiscoverDetails from "@screens/DiscoverDetails/Index";
import MyBooksDetails from "@screens/MyBooksDetails/Index";
import BookClub from "@screens/BookClub";
import Reviews from "@screens/Review";

const Stack = createStackNavigator();

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,

  updateDialog: false,
};

// Bugsnag.start();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Auth = ({ navigation }) => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="IntroScreen">
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ cardStyleInterpolator: forFade, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [state, setState] = useState({
    isCheckUpdate: false,
    processing: false,
    loading: true,
    message:
      "A new version of the app is available. Update now to access new features and improvements.",
  });
  const [updateProgress, setUpdateProgress] = useState(0);
  const [isNetWorkConnected, setIsNetWorkConnected] = useState(true);
  const isNetWorkConnectedMemo = useMemo(
    () => isNetWorkConnected,
    [isNetWorkConnected]
  );

  const [updateLoader, setUpdateLoader] = useState(false);

  useEffect(() => {
    checkUpdate();
  }, []);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsNetWorkConnected(state.isConnected);
    });
  }, []);

  const checkUpdate = async () => {
    const update = await codePush.checkForUpdate();
    if (update) {
      setState({ ...state, isCheckUpdate: true, message: update?.description });
    }
  };

  const onUpdate = async () => {
    setUpdateLoader(true);
    await codePush.sync(
      { installMode: codePush.InstallMode.IMMEDIATE },
      (status) => {
        if (status === codePush.SyncStatus.DOWNLOADING_PACKAGE) {
          setUpdateLoader(true);
        } else if (status === codePush.SyncStatus.INSTALLING_UPDATE) {
          setUpdateLoader(true);
          setUpdateProgress(100);
        } else if (status === codePush.SyncStatus.UP_TO_DATE) {
          setState({
            ...state,
            isCheckUpdate: false,
          });
          setUpdateLoader(false);
        }
      },
      (progress) => {
        if (progress) {
          const progresses = Math.round(
            (progress.receivedBytes / progress.totalBytes) * 100
          );

          setUpdateProgress(progresses);
        }
      }
    );
  };

  const onBeforeLift = () => {
    initTranslate(store);
    setState({
      ...state,
      loading: false,
    });
  };

  // this function is is to create a custom toast container
  const ToastContainer = ({ text1, text2, type }) => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          minHeight: 60,
          width: "90%",
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: BaseColors.secondary,
          elevation: 20,
          borderRadius: 8,
          borderBottomWidth: 5,
          borderColor:
            type === "success"
              ? BaseColors.green
              : type === "error"
                ? BaseColors.error
                : type === "info"
                  ? BaseColors.primary
                  : BaseColors.primary,
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              borderRadius: 100,
              padding: 10,
              backgroundColor:
                type === "success"
                  ? "#d0f2d2"
                  : type === "error"
                    ? "#f5cad550"
                    : BaseColors.lightYellow,
              marginRight: 10,
            }}
          >
            <View
              style={{
                backgroundColor:
                  type === "success"
                    ? BaseColors.green
                    : type === "error"
                      ? BaseColors.error
                      : BaseColors.primary,
                borderRadius: 100,
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              {type === "success" ? (
                <MaterialIcons
                  name="done"
                  color={BaseColors.secondary}
                  size={20}
                />
              ) : (
                <FontAwesome
                  name={
                    type === "error"
                      ? "remove"
                      : type === "info"
                        ? "info"
                        : "book"
                  }
                  color={BaseColors.secondary}
                  size={18}
                />
              )}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {text1 ? (
              <Text
                style={{
                  fontFamily: FontFamily.outfitBold,
                  fontSize: 14,
                  color: BaseColors.toastTitle,
                  lineHeight: 22,
                }}
              >
                {text1}
              </Text>
            ) : null}
            {text2 ? (
              <Text
                style={{
                  color: BaseColors.toastSubText,
                  fontFamily: FontFamily.poppinsRegular,
                  lineHeight: 18,
                }}
              >
                {text2}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    );
  };
  // this code is used for create a different tost like: error
  const toastConfig = {
    success: ({ text1, text2 }) => {
      return <ToastContainer text1={text1} text2={text2} type="success" />;
    },
    error: ({ text1, text2 }) => {
      return <ToastContainer text1={text1} text2={text2} type="error" />;
    },
    info: ({ text1, text2 }) => {
      return <ToastContainer text1={text1} text2={text2} type="info" />;
    },
    comingSoon: () => {
      return <ToastContainer text1={"Coming soon...."} type="comingSoon" />;
    },
  };

  return (
    <InAppNotificationProvider>
      <Provider store={store}>
        <PersistGate
          // loading={displaySpinner()}
          persistor={persistor}
          onBeforeLift={onBeforeLift}
        >
          <StatusBar
            backgroundColor={BaseColors.secondary}
            barStyle="dark-content"
          />
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="SplashScreen">
              {/* SplashScreen which will come once for 5 Seconds */}
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                // Hiding header for Splash Screen
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              {/* Auth Navigator: Include Login and Signup */}
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              {/* login flow */}
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Registration"
                component={Registration}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="OTP"
                component={OTP}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={BottomTabBar}
                // Hiding header for Navigation Drawer
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Configuration"
                component={Configuration}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="More"
                component={More}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="TermsAndCondition"
                component={TermsAndCondition}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FAQ"
                component={FAQs}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              {/* onboarding screens */}
              <Stack.Screen
                name="FavoriteBookGenre"
                component={FavoriteBookGenre}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SubGenre"
                component={Subgenre}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FavoriteBooks"
                component={FavoriteBooks}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FiveStarBooks"
                component={FiveStarBooks}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="BookRecommend"
                component={BookRecommend}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FavoriteAuthor"
                component={FavoriteAuthor}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Recommendations"
                component={Recommendations}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AccountToFollow"
                component={AccountToFollow}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AuthorsToFollow"
                component={AuthorsToFollow}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SocialAccount"
                component={SocialAccount}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MyPosts"
                component={MyPosts}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Followers"
                component={Followers}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Following"
                component={Following}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ReadingStatistics"
                component={ReadingStatistics}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DiscoverDetails"
                component={DiscoverDetails}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MyBooksDetails"
                component={MyBooksDetails}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="BookDetails"
                component={BookDetail}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SearchMyBook"
                component={SearchMyBook}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DiscoverSearch"
                component={DiscoverSearchScreen}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="OtherProfile"
                component={OtherProfile}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Reviews"
                component={Reviews}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="BookClub"
                component={BookClub}
                options={{
                  cardStyleInterpolator: forFade,
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <UpdatePopup
            isVisible={state?.isCheckUpdate || false}
            onUpdate={() => onUpdate()}
            loader={updateLoader}
            updateProgress={updateProgress}
            message={state?.message}
          />
          <NetworkLost isVisible={!isNetWorkConnectedMemo} />
        </PersistGate>
        <NToast config={toastConfig} />
      </Provider>
    </InAppNotificationProvider>
  );
};

if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

let indexExport = App;
if (!__DEV__) {
  indexExport = codePush(codePushOptions)(App);
}
export default indexExport;
