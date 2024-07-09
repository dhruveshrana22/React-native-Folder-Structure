const actions = {
  SET_LANGUAGE: 'auth/SET_LANGUAGE',
  SELECT_LANGUAGE: 'auth/SELECT_LANGUAGE',
  LANGUAGE_CHANGE: 'auth/LANGUAGE_CHANGE',

  setLanguage: (languageData, languageName, isRTL) => (dispatch) =>
    dispatch({
      type: actions.SET_LANGUAGE,
      languageData,
      languageName,
      isRTL,
    }),
  setSelectLanguage: (selectLanguage) => (dispatch) =>
    dispatch({
      type: actions.SELECT_LANGUAGE,
      selectLanguage,
    }),

  setLanguageChange: (languageChange) => (dispatch) =>
    dispatch({
      type: actions.LANGUAGE_CHANGE,
      languageChange,
    }),
};

export default actions;
