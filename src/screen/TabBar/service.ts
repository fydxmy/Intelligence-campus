import { fetchHttp } from '../../utils';
import { proxyPrefix } from '../../config';

/** 判断登录信息是否失效 */
export function verifyToken() {
  return fetchHttp(`${proxyPrefix}user/auth`, {
    reqMethod: 'POST',
  });
}
