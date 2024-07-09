const actions = {
  SET_DATA: "auth/SET_DATA",
  LOGOUT: "auth/LOGOUT",
  SET_WALKTHROUGH: "auth/SET_WALKTHROUGH",
  SET_DARKMODE: "auth/SET_DARKMODE",
  SET_ACCESSSTOKEN: "auth/SET_ACCESSSTOKEN",
  SET_USERID: "auth/SET_USERID",
  SET_UUID: "auth/SET_UUID",
  SET_INTRO_DATA: "auth/SET_INTRO_DATA",
  SET_SHELVES_ARR: "auth/SET_SHELVES_ARR",

  setWalkthrough: (walkthrough) => (dispatch) =>
    dispatch({
      type: actions.SET_WALKTHROUGH,
      walkthrough,
    }),

  setDarkmode: (darkmode) => (dispatch) =>
    dispatch({
      type: actions.SET_DARKMODE,
      darkmode,
    }),
  setAccessToken: (accessToken) => (dispatch) =>
    dispatch({
      type: actions.SET_ACCESSSTOKEN,
      accessToken,
    }),

  setUserId: (user_id) => (dispatch) =>
    dispatch({
      type: actions.SET_USERID,
      user_id,
    }),

  setUUid: (uuid) => (dispatch) =>
    dispatch({
      type: actions.SET_UUID,
      uuid,
    }),
  setIntroData: (introData) => (dispatch) =>
    dispatch({ type: actions.SET_INTRO_DATA, introData }),

  setUserData: (data) => {
    let uData = {};
    if (data !== undefined && data !== null && Object.keys(data).length > 0) {
      uData = data;
    }

    return (dispatch) =>
      dispatch({
        type: actions.SET_DATA,
        userData: uData,
      });
  },
  logOut: () => (dispatch) =>
    dispatch({
      type: actions.LOGOUT,
    }),
};

export default actions;
