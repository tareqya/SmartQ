import {
  FETCH_USER_APPOINTMENTS_FAIL,
  FETCH_USER_APPOINTMENTS_SUCCESS,
  SELECT_APPOINTMENT,
  REMOVE_APPOINTMENT_FAIL,
  REMOVE_APPOINTMENT_SUCCESS,
  REPLACE_APPOINTMENT_FAIL,
  REPLACE_APPOINTMENT_SUCCESS,
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
      return { ...state };
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
    case REPLACE_APPOINTMENT_FAIL:
      return { ...state };
    case REPLACE_APPOINTMENT_SUCCESS:
      const appointments = [
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
    default:
      return state;
  }
}
