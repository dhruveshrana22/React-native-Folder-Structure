import { I18n } from "i18n-js";
import RNRestart from "react-native-restart";
import actions from "../redux/reducers/language/actions";
import { getLocales } from "react-native-localize";
import { languageArr } from "../config/staticData";
// import { store } from '../redux/store/configureStore';

const translationGetters = {
  en: () => require("./en.json"),
};
const i18n = new I18n();

export const translate = (key, config) => {
  if (!config) {
    config = {};
  }
  config.defaultValue = key;
  return i18n.t(key, config);
};

const setI18nConfig = (language, store, bool, isRTLBool = false) => {
  let isRtl = language?.isRTL || isRTLBool || false;
  let appLanguage = language?.languageData;
  let languageName = language?.languageName;

  if (language?.languageData === null) {
    if (languageArr) {
      const findLang = languageArr.findIndex(
        (i) => i.lang_code === getLocales()[0].languageCode
      );
      if (findLang && findLang > -1) {
        appLanguage = getLocales()[0].languageCode || "en";
        languageName = getLocales()[0].languageCode || "en";
        isRtl = getLocales()[0]?.isRTL;
      } else {
        appLanguage = "en";
        languageName = "en";
        isRtl = false;
      }
    } else {
      appLanguage = "en";
      languageName = "en";
      isRtl = false;
    }
  }
  store.dispatch({
    type: actions.SET_LANGUAGE,
    languageData: appLanguage,
    languageName: languageName,
    isRTL: isRtl,
  });

  const ReactNative = require("react-native");

  try {
    ReactNative.I18nManager.allowRTL(isRtl);
    ReactNative.I18nManager.forceRTL(isRtl);
  } catch (e) {
    console.log("Error in RTL", e);
  }

  i18n.translations = {
    [appLanguage || "en"]: translationGetters[appLanguage || "en"](),
  };
  i18n.locale = appLanguage;
  if (bool) {
    RNRestart.Restart();
  }
};

export const initTranslate = (store, bool = false, isRTLBool = false) => {
  const { language } = store.getState();
  setI18nConfig(language, store, bool, isRTLBool);
};
