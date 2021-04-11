import axios from "axios";
import { connect } from "react-redux";

    const AxiosInstance =axios.create({
      baseURL: "http://localhost:3000/",
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${localStorage.getItem("tok")}`,
      },
    });
    AxiosInstance.interceptors.request.use(
      function (config) {
        const token =localStorage.getItem("tok");
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
 
export default AxiosInstance