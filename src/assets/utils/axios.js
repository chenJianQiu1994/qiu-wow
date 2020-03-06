import axios from "axios";

// 环境的切换
// axios.defaults.baseURL = 'http://172.25.10.36:7002';
// axios.defaults.baseURL = 'http://172.25.10.36:7002';
// axios.defaults.baseURL = 'https://www.ceshi.com';
// axios.defaults.baseURL = 'https://www.production.com';

// 请求超时时间
const instance = axios.create({ timeout: 1000 * 5 });

// post请求头的设置
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  request => {
    return request;
  },
  error => Promise.error(error)
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  response => {
    return response.status === 200
      ? Promise.resolve(response.data)
      : Promise.reject(response.data);
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
