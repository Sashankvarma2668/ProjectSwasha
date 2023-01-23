import Cookies from "js-cookie";
export const API_URL = process.env.apiUrl;
export const ADMIN_URL = process.env.adminUrl;
export const PAGINATION_LIMIT = Cookies.get("rows_per_page") > 0 ? Cookies.get("rows_per_page") : 20;
