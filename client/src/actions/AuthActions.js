import axios from "axios";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "./TYPES";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://127.0.0.1:5001/smartq-20ef8/us-central1";
const USER_KEY = "User";

export const login = async (uid) => {
  try {
    const response = await axios.get(`${BASE_URL}/GetUser`, { uid });
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data.user));

    return {
      type: LOGIN_SUCCESS,
      payload: response.data.user,
    };
  } catch (err) {
    console.log(err);
    return {
      type: LOGIN_FAIL,
      payload: "ת״ז לא נכונה!",
    };
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem(USER_KEY);
  return {
    type: LOGOUT,
  };
};

export const fetch_current_user = async () => {
  const value = await AsyncStorage.getItem(USER_KEY);

  if (value == null) {
    return {
      type: LOGOUT,
    };
  }

  return {
    type: LOGIN_SUCCESS,
    payload: JSON.parse(value),
  };
};
