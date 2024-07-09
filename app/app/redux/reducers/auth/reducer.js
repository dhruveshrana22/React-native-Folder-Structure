import types from "./actions";

const initialState = {
  userData: {},
  user_id: null,
  accessToken: "",
  walkthrough: true,
  darkmode: false,
  uuid: "",
  introData: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_DATA:
      console.log(`${types.SET_DATA} => `);
      return {
        ...state,
        userData: action.userData,
      };
    case types.SET_WALKTHROUGH:
      return {
        ...state,
        walkthrough: action.walkthrough,
      };
    case types.SET_DARKMODE:
      return {
        ...state,
        darkmode: action.darkmode,
      };
    case types.SET_ACCESSSTOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case types.SET_USERID:
      return {
        ...state,
        user_id: action.user_id,
      };
    case types.SET_UUID:
      return {
        ...state,
        uuid: action.uuid,
      };
    case types.SET_INTRO_DATA:
      return {
        ...state,
        introData: action.introData,
      };
    case types.LOGOUT:
      return {
        ...state,
        userData: {},
        user_id: null,
        accessToken: "",
        darkmode: false,
        uuid: "",
      };
    default:
      return state;
  }
}
