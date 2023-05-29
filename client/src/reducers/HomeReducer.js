import {
  FETCH_USER_APPOINTMENTS_FAIL,
  FETCH_USER_APPOINTMENTS_SUCCESS,
  SELECT_APPOINTMENT,
  REMOVE_APPOINTMENT_FAIL,
  REMOVE_APPOINTMENT_SUCCESS,
  REPLACE_APPOINTMENT_FAIL,
  REPLACE_APPOINTMENT_SUCCESS,
  RESET_APPOINTMENT_FAIL,
  RESET_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_LOCAL_EVENT,
} from "../actions/TYPES";

const default_state = {
  appointments: [],
  selectedAppointment: null,
};

export default function (state = default_state, action) {
  switch (action.type) {
    case FETCH_USER_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointments: action.payload,
        selectedAppointment: null,
      };
    case FETCH_USER_APPOINTMENTS_FAIL:
      return { ...state, selectedAppointment: null, appointments: [] };
    case SELECT_APPOINTMENT:
      return { ...state, selectedAppointment: action.payload };
    case REMOVE_APPOINTMENT_FAIL:
      return { ...state, selectedAppointment: null };
    case REMOVE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        selectedAppointment: null,
        appointments: state.appointments.map((appointment) =>
          appointment.key == action.payload
            ? { ...appointment, available: true }
            : appointment
        ),
      };
    case RESET_APPOINTMENT_SUCCESS:
      return {
        ...state,
        selectedAppointment: null,
        appointments: state.appointments.map((appointment) =>
          appointment.key == action.payload
            ? { ...appointment, available: false }
            : appointment
        ),
      };
    case RESET_APPOINTMENT_FAIL:
      return { ...state, selectedAppointment: null };
    case REPLACE_APPOINTMENT_FAIL:
      return { ...state };
    case REPLACE_APPOINTMENT_SUCCESS:
      let appointments = [
        ...state.appointments.filter(
          (appointment) => appointment.key != state.selectedAppointment.key
        ),
        action.payload,
      ];
      return {
        ...state,
        selectedAppointment: null,
        appointments: appointments.sort((a, b) => b.time - a.time),
      };
    case UPDATE_APPOINTMENT_LOCAL_EVENT:
      let _appointments = [...state.appointments];
      _appointments = _appointments.map((appointment) =>
        appointment.key === action.payload.key ? action.payload : appointment
      );
      return { ...state, appointments: _appointments };
    default:
      return state;
  }
}
