import { Platform } from "react-native";

const ERROR = "error";
const INFO = "info";
const SUCCESS = "success";
const DEBUG_MODE = true;

let BASE_URL = "https://us-central1-smartq-20ef8.cloudfunctions.net"; // product

if (DEBUG_MODE) {
  let BASE_IP = Platform.OS == "ios" ? "127.0.0.1" : "10.0.2.2";
  BASE_URL = `http://${BASE_IP}:5001/smartq-20ef8/us-central1`; // debug
}

export { ERROR, INFO, SUCCESS, BASE_URL };
