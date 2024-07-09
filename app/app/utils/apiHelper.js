import _, { isEmpty, isObject, isArray } from "lodash";
import BaseSetting from "../config/setting";
import { store } from "../redux/store/configureStore";
import axios from "axios";
import { logout } from "./commonFunction";

export async function getApiData(
  endpoint,
  method,
  data = data || undefined,
  headers,
  formData = false
) {
  const authState = store?.getState() || {};
  const token = authState?.auth?.accessToken || "";
  let authHeaders = {
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : "",
  };
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (!_.isEmpty(headers)) {
    authHeaders = headers;
  }
  if (formData) {
    authHeaders = {
      "Content-Type": "multipart/form-data",
      authorization: token ? `Bearer ${token}` : "",
    };
    const query = new FormData();
    if (data && Object.keys(data).length > 0) {
      Object.keys(data).map((k) => {
        if (isArray(data[k]) && !isEmpty(data[k]) && data[k].length > 0) {
          data[k].map((item) => {
            query.append(k, item);
          });
        } else {
          query.append(k, data[k]);
        }
      });
    }
    data = query;
  }
  const finalHeader = {
    timeZone: timezone,
    ...authHeaders,
  };

  try {
    let response = await axios({
      method: method,
      url: BaseSetting.api + endpoint,
      headers: finalHeader,
      data: !isEmpty(data) ? data : undefined,
    });
    if (
      response?.data?.code === 402 ||
      response?.data?.code === 404 ||
      response?.data?.code === 403
    ) {
      logout();
    }
    let responseStatus = response.status;
    const res = response?.data || {
      status: responseStatus === 200 ? true : responseStatus,
      response: response.data,
    };
    return res;
  } catch (error) {
    if (error.response) {
      let returnObj;
      if (error?.response?.status === 400) {
        returnObj = {
          status: error?.response?.status,
          data: error?.response?.data,
        };
      }
      if (error?.response?.status === 404) {
        returnObj = {
          status: error?.response?.status,
          data: error?.response?.data,
        };
      }
      return returnObj;
    }
    console.log("error");
    console.error(error);
    const returnObj = {
      data: {},
      message: "Network error",
    };
    return returnObj;
  }
}

export function getApiDataProgress(
  endpoint,
  method,
  data,
  onProgress,
  customUrl = ""
) {
  const authState = store?.getState() || {};
  const accessToken = authState?.auth?.accessToken || "";

  const headers = {
    "Content-Type": "multipart/form-data",
    authorization: accessToken ? `Bearer ${accessToken}` : "",
  };

  return new Promise((resolve, reject) => {
    const url = !isEmpty(customUrl) ? customUrl : BaseSetting.api + endpoint;
    const oReq = new XMLHttpRequest();
    const token = store ? store.getState().auth.token : "";
    oReq.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event?.loaded * 100) / event.total;
        if (onProgress) {
          onProgress(progress);
        }
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    });

    const query = new FormData();
    if (data && Object.keys(data).length > 0) {
      Object?.keys(data)?.map((k) => query?.append(k, data[k]));
    }
    const params = query;
    oReq.open(method, url, true);
    oReq.setRequestHeader("Content-Type", "multipart/form-data");
    if (isObject(headers)) {
      Object.keys(headers).map((hK) => {
        oReq?.setRequestHeader(hK, headers[hK]);
      });
    }

    if (token) {
      oReq.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    oReq.send(params);
    oReq.onreadystatechange = () => {
      if (oReq.readyState === XMLHttpRequest.DONE) {
        try {
          const resposeJson = JSON.parse(oReq.responseText);
          if (resposeJson && resposeJson.message === "Unauthenticated.") {
          } else {
            resolve(resposeJson);
          }
        } catch (exe) {
          console.log(exe);
          reject(exe);
        }
      }
    };
  });
}
