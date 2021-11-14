import axios from "axios";

export default axios.create({
  baseURL: "https://412d-171-100-236-133.jp.ngrok.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
