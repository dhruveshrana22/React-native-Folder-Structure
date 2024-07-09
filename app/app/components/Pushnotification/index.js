/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import messaging from "@react-native-firebase/messaging";
import BaseSetting from "../../config/setting";
import AuthActions from "../../redux/reducers/auth/actions";
import { getApiData } from "../../utils/apiHelper";
import { isEmpty, isObject } from "lodash-es";
import { withInAppNotification } from "../../libs/react-native-in-app-notification";
import { images } from "../../config/images";

/**
 *
 *@module PushNotification
 *
 */
const PushNotification = (props) => {
  const { setUUid } = AuthActions;
  const dispatch = useDispatch();
  const { uuid, userData, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isObject(userData) && !isEmpty(userData)) {
      checkNotificationPermission();
    }
  }, [props, userData, accessToken]);

  // this function for check notification permission
  async function checkNotificationPermission() {
    const hasPermission = await messaging().hasPermission();
    try {
      const enabled =
        hasPermission === messaging.AuthorizationStatus.AUTHORIZED ||
        hasPermission === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          console.log("User has notification permissions enabled.");
        } else if (
          authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          console.log("User has provisional notification permissions.");
        } else {
          console.log("User has notification permissions disabled");
        }
      }
      if (!uuid && isObject(userData) && !isEmpty(userData)) {
        getFcmToken();
      }
    } catch (error) {
      console.log("checkApplicationPermission -> error", error);
    }
  }

  // this function for send token to server
  /** this function for send token to server
   * @function sendFcmToken
   * @param {object} data {}
   */
  async function sendFcmToken(token) {
    const data = {
      token,
    };
    try {
      const response = await getApiData(
        BaseSetting.endpoints.sendFcmToken,
        "POST",
        data,
        {
          "Content-Type": "application/json",
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        }
      );
      console.log("fcm token send ==>", response);
    } catch (err) {
      console.log("ERRR==", err);
    }
  }

  // this function for get firebase token
  async function getFcmToken() {
    const fcmToken = await messaging()
      .getToken()
      .catch((e) => {
        console.log("called====3Dddd", e);
      });
    if (fcmToken && accessToken) {
      console.log("fcmToken =======>>>", fcmToken);
      sendFcmToken(fcmToken);
      setFCMListeners();
      dispatch(setUUid(fcmToken));
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const data = remoteMessage?.data?.meta
        ? JSON.parse(remoteMessage?.data?.meta)
        : remoteMessage?.data
          ? remoteMessage?.data
          : {};
      handleNotification(remoteMessage?.notification, data);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const openNotification = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        // const data = remoteMessage?.data?.meta
        //   ? JSON.parse(remoteMessage?.data?.meta)
        //   : remoteMessage?.data
        //   ? remoteMessage?.data
        //   : {};
        console.log("🚀 ~ remoteMessage:", remoteMessage);
        // if (isObject(remoteMessage?.data) && !isEmpty(remoteMessage?.data)) {
        //   const data = JSON.parse(remoteMessage?.data?.meta);
        // dispatch(
        //   setDeliveryNotifyData({
        //     id: data?.id,
        //     delivery_status: data?.delivery_status,
        //   }),
        // );
        // }
      }
    );

    return openNotification;
  }, []);

  useEffect(() => {
    const initNotification = messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // const data = remoteMessage?.data?.meta
          //   ? JSON.parse(remoteMessage?.data?.meta)
          //   : remoteMessage?.data
          //   ? remoteMessage?.data
          //   : {};
        }
      });
    return initNotification;
  }, []);

  // this function set listeners for firebase
  async function setFCMListeners() {
    try {
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification caused app to open from quit state:",
              remoteMessage
            );
          }
        });
    } catch (error) {
      console.log("setFCMListeners -> error", error);
    }
  }

  // this function for handle notification
  async function handleNotification(notificationData, data) {
    props.showNotification({
      title: notificationData.title || "Title",
      message: notificationData.body || "Message",
      onPress: () => {},
      icon: images.SplashScreen, // Ensure `images.SplashScreen` is correctly imported and defined
    });
    // }
  }
  return <View />;
};

PushNotification.propTypes = {};

PushNotification.defaultProps = {};

export default withInAppNotification(PushNotification);
