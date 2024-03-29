import axios from "axios";
import {
  FETCH_USER_APPOINTMENTS_FAIL,
  FETCH_USER_APPOINTMENTS_SUCCESS,
  SELECT_APPOINTMENT,
  REMOVE_APPOINTMENT_FAIL,
  REMOVE_APPOINTMENT_SUCCESS,
  REPLACE_APPOINTMENT_FAIL,
  REPLACE_APPOINTMENT_SUCCESS,
  RESET_APPOINTMENT_SUCCESS,
  RESET_APPOINTMENT_FAIL,
  UPDATE_APPOINTMENT_LOCAL_EVENT,
} from "./TYPES";

import { BASE_URL } from "../utils/constans";
import { showErrorMsg, showSuccessMsg } from "./CommonActions";

const Get_User_Appointments = `${BASE_URL}/GetUserAppointments`;
const Change_Appointment_Status = `${BASE_URL}/ChangeAppointmentStatus`;
const Replace_Appointment = `${BASE_URL}/ReplaceAppointment`;
const Update_LocalEvent = `${BASE_URL}/UpdateAppointmentLocalEvent`;

export const updateAppointemnts = async (appointment, localEventKey) => {
  await axios.post(Update_LocalEvent, {
    key: appointment.key,
    localEvent: localEventKey,
  });
  appointment.localEvent = localEventKey;
  return {
    type: UPDATE_APPOINTMENT_LOCAL_EVENT,
    payload: appointment,
  };
};

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
    console.log(err.response?.data);
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
  kid,
  onComplate
) => {
  try {
    await axios.post(Change_Appointment_Status, {
      key: appointment.key,
      uid,
      kid,
      available: true,
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
    console.log(err.response?.msg);
    return {
      type: REMOVE_APPOINTMENT_FAIL,
    };
  }
};

export const resetAppointment = async (
  dispatch,
  appointment,
  uid,
  kid,
  onComplate
) => {
  try {
    await axios.post(Change_Appointment_Status, {
      key: appointment.key,
      uid,
      kid,
      available: false,
    });
    dispatch(showSuccessMsg("הפעולה בוצעה בהצלחה התור שוחזר!"));
    onComplate();
    return {
      type: RESET_APPOINTMENT_SUCCESS,
      payload: appointment.key,
    };
  } catch (err) {
    const msg = "שחזור התור נכשלה!";
    dispatch(showErrorMsg(msg));
    console.log(err.response?.msg);
    return {
      type: RESET_APPOINTMENT_FAIL,
    };
  }
};

export const replaceAppointment = async (
  dispatch,
  oldAppointment,
  newAppointment,
  uid,
  kid,
  onComplate,
  localEvent
) => {
  try {
    await axios.post(Replace_Appointment, {
      oldKey: oldAppointment.key,
      newKey: newAppointment.key,
      uid: uid,
      kid: kid,
      localEvent: localEvent,
    });

    dispatch(showSuccessMsg("הפעולה בוצעה בהצלחה התור הוחלף!"));
    onComplate();
    newAppointment.uid = uid;
    newAppointment.available = false;
    newAppointment.localEvent = localEvent;
    return {
      type: REPLACE_APPOINTMENT_SUCCESS,
      payload: newAppointment,
    };
  } catch (err) {
    const msg = "שינוי התור נכשלה!";
    dispatch(showErrorMsg(msg));
    console.log(err.response?.msg);
    return {
      type: REPLACE_APPOINTMENT_FAIL,
    };
  }
};
