import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../config/constants";

export const isStudentLoggedIn = () => {
  if (!Cookies.get("student_data") || Cookies.get("student_data") === undefined || Cookies.get("student_data") === "") {
    Cookies.remove("student_login_token");
    Cookies.remove("student_data");
  }
  let student_login_token = Cookies.get("student_login_token");
  if (student_login_token) {
    if (student_login_token > 0) {
      return true;
    } else {
      return false;
    }
  }
};
export const StudentData = () => {
  if (!Cookies.get("student_data") || Cookies.get("student_data") === undefined || Cookies.get("student_data") === "") {
    Cookies.remove("student_login_token");
    Cookies.remove("student_data");
  }
  if (Cookies.get("student_login_token") > 0) {
    // axios
    //   .post(API_URL + "account/get_user.php", {
    //     user_id: Cookies.get("student_login_token")
    //   })
    //   .then(function (response) {
    //     if (!response?.data?.meta?.error) {
    //       return JSON.stringify(response.data?.data);
    //     }
    //   })
    //   .catch(function (error) {
    //     return false;
    //   });
    return JSON.parse(Cookies.get("student_data"));
  } else {
    return false;
  }
};
export const Logout = () => {
  Cookies.remove("student_login_token");
  Cookies.remove("student_data");
  return true;
};
