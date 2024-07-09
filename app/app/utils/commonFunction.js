import { BaseColors } from "../config/theme";
import { translate } from "../lang/Translate";
import { LayoutAnimation, Linking, Platform, UIManager } from "react-native";
import Geocoder from "react-native-geocoding";
import Geolocation from "@react-native-community/geolocation";
import { openSettings } from "react-native-permissions";
import { store } from "../redux/store/configureStore";
import AuthActions from "../redux/reducers/auth/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../navigation/NavigationService";
import moment from "moment";

const { logOut } = AuthActions;

export const enableAnimateSpring = () => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
};

export const defaultStyle = `
<style>
a {
  color: ${BaseColors.primary}; 
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
html, body {font-family: Lato, "Helvetica Neue", Roboto, Sans-Serif; overflow-x: 'hidden'; font-size: 14px; word-break: 'break-all';color: ${BaseColors.black};background-color:${BaseColors.secondary}; white-space: 'no-wrap'}
img {display: inline; height: auto; max-width: 100%;}
</style>`;

export function formatAddress(addressArray) {
  let buildingStreet = "";
  let neighborhood = "";
  let route = "";
  let area = "";
  let state = "";
  let city = "";
  let country = "";

  // Loop through the address components to extract the relevant information
  for (const component of addressArray) {
    if (component?.types.includes("street_number")) {
      buildingStreet = component?.long_name;
    } else if (component?.types.includes("route")) {
      route = component?.long_name;
    } else if (component?.types.includes("neighborhood")) {
      neighborhood = component?.long_name;
    } else if (component?.types.includes("sublocality_level_1")) {
      area = component?.long_name;
    } else if (component?.types.includes("locality")) {
      city = component?.long_name;
    } else if (component?.types.includes("administrative_area_level_1")) {
      state = component?.long_name;
    } else if (component?.types.includes("country")) {
      country = component?.long_name;
    }
  }

  // Construct the formatted address
  const formattedAddress = `${buildingStreet ? buildingStreet : ""} ${
    route ? `${route}-` : ""
  }${area ? `${area}-` : ""}${neighborhood ? `${neighborhood}-` : ""}${
    city ? `${city}-` : ""
  }${state ? `${state}-` : ""} ${country}`;

  return { address: formattedAddress, city: city };
}

export const fetchAddress = async (cord) => {
  // Replace these values with your latitude and longitude
  const latitude = cord.lat;
  const longitude = cord.lng;
  const fullAddress = await Geocoder.from({ lat: latitude, lng: longitude })
    .then((json) => {
      const location = formatAddress(json.results[0].address_components);
      return { address: location?.address, city: location?.city };
    })
    .catch((error) => console.warn(error));
  return fullAddress;
};

export const locationPermission = (dispatch, setUserCurrentLocation) => {
  Geolocation.getCurrentPosition(
    async (info) => {
      console.log("🚀 ~ info:", info);
      const successAddress = await fetchAddress({
        lat: info?.coords?.latitude,
        lng: info?.coords?.longitude,
      });
      dispatch(
        setUserCurrentLocation({
          address: successAddress?.address.trim(),
          lat: info?.coords?.latitude,
          lng: info?.coords?.longitude,
          openSetting: false,
          name: "Current location",
        })
      );
    },
    (error) => {
      dispatch(
        setUserCurrentLocation({
          message:
            error?.message !== "No location provider available."
              ? error?.message
              : "Please allow device location.",
          openSetting: true,
        })
      );
      if (Platform.OS === "ios") {
        Linking.openURL("app-settings:");
      } else {
        openSettings();
      }
    }
  );
};

export const logout = async () => {
  await store.dispatch(logOut());
  await AsyncStorage.setItem("token", "");
  navigationRef?.current?.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};

// remaining day count function
export function remainingDays(date, license) {
  const current_time = moment();
  const unix = Date.parse(date) / 1000;
  const given_time = moment(unix * 1000); // Assuming 'timeAgo' is in seconds
  const seconds = current_time.diff(given_time, "seconds");
  const minutes = current_time.diff(given_time, "minutes");
  const hours = current_time.diff(given_time, "hours");
  const days = current_time.diff(given_time, "days");
  const weeks = current_time.diff(given_time, "weeks");
  const months = current_time.diff(given_time, "months");
  const years = current_time.diff(given_time, "years");

  if (license) {
    if (seconds >= 60 || minutes >= 60) {
      return "Expired";
    } else if (Math.abs(hours) <= 24) {
      return "Will end today";
    } else if (Math.abs(days) <= 7) {
      if (Math.abs(days) === 1) {
        return "Will end today";
      } else {
        return `${Math.abs(days)} days ago`;
      }
    } else if (Math.abs(weeks) <= 4.3) {
      if (Math.abs(weeks) === 1) {
        return "1 week left";
      } else {
        return `${Math.abs(weeks)} weeks left`;
      }
    } else if (Math.abs(months) <= 12) {
      if (Math.abs(months) === 1) {
        return "1 month left";
      } else {
        return `${Math.abs(months)} months left`;
      }
    } else {
      if (Math.abs(years) === 1) {
        return "1 year left";
      } else {
        return `${Math.abs(years)} years left`;
      }
    }
  } else {
    if (seconds <= 60) {
      return "Just now";
    } else if (minutes <= 60) {
      if (minutes === 1) {
        return "a min ago";
      } else {
        return `${minutes} min ago`;
      }
    } else if (hours <= 24) {
      if (hours === 1) {
        return "a hour ago";
      } else {
        return `${hours} hours ago`;
      }
    } else if (days <= 7) {
      if (days === 1) {
        return "today";
      } else {
        return `${days} days ago`;
      }
    } else if (weeks <= 4.3) {
      if (weeks === 1) {
        return "a week ago";
      } else {
        return `${weeks} weeks ago`;
      }
    } else if (months <= 12) {
      if (months === 1) {
        return "a month ago";
      } else {
        return `${months} months ago`;
      }
    } else {
      if (years === 1) {
        return "a year ago";
      } else {
        return `${years} years ago`;
      }
    }
  }
}
