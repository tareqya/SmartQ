import axios from "axios";
import {
  FETCH_USER_APPOINTMENTS_FAIL,
  FETCH_USER_APPOINTMENTS_SUCCESS,
  SELECT_APPOINTMENT,
  REMOVE_APPOINTMENT_FAIL,
  REMOVE_APPOINTMENT_SUCCESS,
} from "./TYPES";

import { BASE_URL } from "../utils/constans";
import { showErrorMsg, showSuccessMsg } from "./CommonActions";

const Get_User_Appointments = `${BASE_URL}/GetUserAppointments`;
const Remove_Appointment = `${BASE_URL}/RemoveAppointment`;

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

export const setSelectedAppointment = (appointment) => {
  return {
    type: SELECT_APPOINTMENT,
    payload: appointment,
  };
};

export const removeAppointment = async (
  dispatch,
  appointment,
  uid,
  onComplate
) => {
  try {
    await axios.post(Remove_Appointment, {
      key: appointment.key,
      uid,
    });
    dispatch(showSuccessMsg("הפעולה בוצעה בהצלחה התור נמחק!"));
    onComplate();
    return {
      type: REMOVE_APPOINTMENT_SUCCESS,
      payload: appointment.key,
    };
  } catch (err) {
    const msg = "מחיקת התור נכשלה!";
    dispatch(showErrorMsg(msg));
    console.log(err.response.msg);
    return {
      type: REMOVE_APPOINTMENT_FAIL,
    };
  }
};
