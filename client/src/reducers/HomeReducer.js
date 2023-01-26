import {
  FETCH_USER_APPOINTMENTS_FAIL,
  FETCH_USER_APPOINTMENTS_SUCCESS,
} from "../actions/TYPES";

const default_state = {
  appointments: [],
  loading: false,
};

export default function (state = default_state, action) {
  switch (action.type) {
    case FETCH_USER_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: action.payload,
      };
    case FETCH_USER_APPOINTMENTS_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}
