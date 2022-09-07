import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    if (config.data?.type == "excel") {
      config.responseType = "arraybuffer";
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    console.log("res", res);
    if (res.config.responseType !== "arraybuffer") {
      if (res.status == 200 && res.data.code != 200) {
        alert("出错了");
        return;
      }
    }
    return Promise.resolve(res.data);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
