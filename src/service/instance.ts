import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

const instance = axios.create({
  baseURL: "https://schoolcheck.skool.ai/api",
  //   baseURL: "http://192.168.7.41:5070/api",

  headers: {
    Authorization: token,
  },
});

export default instance;
