import {
  SHOW_ERROR_MSG,
  SHOW_INFO_MSG,
  SHOW_SUCCESS_MSG,
  CLEAN_MSG,
  LOADING,
} from "./TYPES";

export const showErrorMsg = (msg) => {
  return {
    type: SHOW_ERROR_MSG,
    payload: msg,
  };
};

export const showSuccessMsg = (msg) => {
  return {
    type: SHOW_SUCCESS_MSG,
    payload: msg,
  };
};

export const showInfoMsg = (msg) => {
  return {
    type: SHOW_INFO_MSG,
    payload: msg,
  };
};

export const cleanMsg = () => {
  return {
    type: CLEAN_MSG,
  };
};

export const setLoading = (value) => {
  return {
    type: LOADING,
    payload: value,
  };
};
