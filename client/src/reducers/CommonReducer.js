import {
  CLEAN_MSG,
  SHOW_ERROR_MSG,
  SHOW_INFO_MSG,
  SHOW_SUCCESS_MSG,
  LOADING,
} from "../actions";
import { ERROR, INFO, SUCCESS } from "../utils/constans";

const default_state = {
  msg: "",
  msgType: "",
  loading: false,
  showMsg: false,
};

export default function (state = default_state, action) {
  switch (action.type) {
    case SHOW_ERROR_MSG:
      return {
        ...state,
        msg: action.payload,
        msgType: ERROR,
        showMsg: true,
      };
    case SHOW_INFO_MSG:
      return {
        ...state,
        msg: action.payload,
        msgType: INFO,
        showMsg: true,
      };
    case SHOW_SUCCESS_MSG:
      return {
        ...state,
        msg: action.payload,
        msgType: SUCCESS,
        showMsg: true,
      };
    case CLEAN_MSG:
      return { ...state, msgType: "", msg: "", showMsg: false };
    case LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
