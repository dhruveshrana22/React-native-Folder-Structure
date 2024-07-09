import types from './actions';
// import actions from './actions';

const initialState = {
  languageData: null,
  languageName: null,
  isRTL: false,
  selectLanguage: false,
  languageChange: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return {
        ...state,
        languageData: action.languageData,
        languageName: action.languageName,
        isRTL: action.isRTL,
      };
    case types.SELECT_LANGUAGE:
      return {
        ...state,
        selectLanguage: action.selectLanguage,
      };
    case types.LANGUAGE_CHANGE:
      return {
        ...state,
        languageChange: action.languageChange,
      };
    default:
      return state;
  }
}
