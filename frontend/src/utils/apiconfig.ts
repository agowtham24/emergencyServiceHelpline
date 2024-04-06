import axios from "axios";
export const config = {
  api_url: "http://localhost:5000/",
  serviceImages: "http://localhost:5000/serviceImages/",
};
export const api = axios.create({
  baseURL: config.api_url,
});

api.interceptors.request.use((config) => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     config.headers["Authorization"] = `Bearer ${token}`;
  //   }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response.status === 401) {
    //   localStorage.removeItem("token");
    //   window.location.replace("/login");
    // }
    return Promise.reject(error);
  }
);
