import axios from "axios";
import {
  FETCH_USER_APPOINTMENTS_FAIL,
  FETCH_USER_APPOINTMENTS_SUCCESS,
  LOADING_MAIN,
} from "./TYPES";

import { BASE_URL } from "../utils/constans";
import { showErrorMsg } from "./CommonActions";

const Get_User_Appointments = `${BASE_URL}/GetUserAppointments`;

export const fetchMyAppointements = async (dispatch, uid) => {
  try {
    const response = await axios.post(Get_User_Appointments, { uid });
    return {
      type: FETCH_USER_APPOINTMENTS_SUCCESS,
      payload: response.data.appointments,
    };
  } catch (err) {
    const msg = "משהו השתבש נסה שוב מאוחר יותר";
    dispatch(showErrorMsg(msg));
    console.log(err.response.data);
    return {
      type: FETCH_USER_APPOINTMENTS_FAIL,
      payload: msg,
    };
  }
};

export const fetching = () => {
  return {
    type: LOADING_MAIN,
  };
};
