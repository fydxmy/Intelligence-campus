import qs from 'qs';
import { BASE_URI } from '../config/index';
import { store } from '../store';

interface Config extends RequestInit {
  reqMethod: string;
  data?: object;
  token?: string;
  customHeaders?: object;
}
/**
 * 无论服务器返回什么异常，fetchAPI都不会返回异常。
 * Axios中只要服务器，返回的状态不是2xx就会产生异常。
 */

/**
 *
 * @param endpoint url地址
 * @param param1
 * @returns
 */
export const fetchHttp = (
  endpoint: string,
  { reqMethod, data, token, customHeaders = {}, ...customConfig }: Config
) => {
  const config = {
    method: reqMethod,
    headers: {
      Accept: '*/*',
      Authorization: token ?? store.getState().authToken.token,
      'Content-Type': 'application/json;charset=utf-8',
      ...customHeaders,
    },
    ...customConfig,
  };
  if (reqMethod.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    if (data instanceof FormData && data) {
      config.body = data;
    } else {
      config.body = JSON.stringify(data || {});
    }
  }
  return fetch(`${BASE_URI}${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
    }
    const data = await response.json();
    if (response.ok) {
      return data.data;
    } else {
      return Promise.reject(data);
    }
  });
};
