import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../actions";

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
    default:
      return state;
  }
}
