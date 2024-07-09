/* eslint-disable no-async-promise-executor */
import BaseSetting from "@config/setting";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  scopes: ["https://www.googleapis.com/auth/youtube.readonly"], //for fetch youtube channel
  webClientId: BaseSetting.googleClientId,
  forceConsentPrompt: true,
  offlineAccess: true,
});

export const signInWithGoogle = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      resolve({ userInfo, accessToken });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("Sign in");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("Play Services Not Available");
      } else {
        // some other error happened
        console.log("Some Other Error happened");
      }
      reject(error);
    }
  });
};

export const signOutGoogle = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      return;
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  });
};

export const googleSignOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    let response = await GoogleSignin.signOut();
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
