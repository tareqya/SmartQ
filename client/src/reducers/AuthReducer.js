import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_SUCCESS,
} from "../actions";

const default_state = {
  user: null,
};

export default function (state = default_state, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
      };
    case LOGOUT:
      return { ...default_state };
    case UPDATE_TOKEN_SUCCESS:
      return { ...state, user: action.payload };
    case UPDATE_TOKEN_FAILED:
      return { ...state };
    default:
      return state;
  }
}
