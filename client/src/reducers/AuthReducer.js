import { LOGIN_FAIL, LOGIN_SUCCESS } from "../actions";

const default_state = {
  user: null,
  loading: false,
  msg: "",
};

export default function (state = default_state, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, msg: "" };
    case LOGIN_FAIL:
      return { ...state, user: null, loading: false, msg: action.payload };
    default:
      return state;
  }
}
