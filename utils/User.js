import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../config/constants";

export const isUserLoggedIn = () => {
  if (Cookies.get("login_token") > 0) {
    return true;
  } else {
    return false;
  }
};
export const UserData = async () => {
  if (Cookies.get("login_token") > 0) {
    // const data = await axios.post(API_URL + "get_user.php", {
    //   user_id: Cookies.get("login_token"),
    // });
    // return data?.data?.data;
    return JSON.parse(Cookies.get("user_data"));
  } else {
    return false;
  }
};
export const Logout = () => {
  if (Cookies.get("login_token") > 0) {
    Cookies.remove("login_token");
    Cookies.remove("user_data");
    return true;
  } else {
    return false;
  }
};
