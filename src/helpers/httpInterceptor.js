/* eslint-disable no-unused-vars */
import axios from "axios";
import router from "../router";
import store from "../store";

export default function execute() {
  axios.interceptors.request.use(
    function (config) {
      const token = store.state.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error) {
      if (error.response.status === 401) {
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );
}
