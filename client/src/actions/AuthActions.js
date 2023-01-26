import axios from "axios";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "./TYPES";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { encrpt } from "../utils/utilsFunctions";
import { BASE_URL } from "../utils/constans";
import { showErrorMsg } from "./CommonActions";

const Get_User = `${BASE_URL}/GetUser`;
const USER_KEY = "User";

export const login = async (dispatch, uid, password) => {
  try {
    const encryptedPassword = await encrpt(password);
    const response = await axios.post(Get_User, {
      uid: uid,
      password: encryptedPassword,
    });
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
    return {
      type: LOGIN_SUCCESS,
      payload: response.data.user,
    };
  } catch (err) {
    const msg = "ת״ז או סיסמה לא נכונים!";
    dispatch(showErrorMsg(msg));
    console.log(err.response.data);
    return {
      type: LOGIN_FAIL,
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
