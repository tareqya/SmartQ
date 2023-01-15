import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../actions";

const default_state = {
  user: null,
  msg: "",
};

export default function (state = default_state, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, msg: "" };
    case LOGIN_FAIL:
      return { ...state, user: null, msg: action.payload };
    case LOGOUT:
      return { ...default_state };
    default:
      return state;
  }
}
