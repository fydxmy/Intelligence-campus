import { fetchHttp } from '../../utils';
import { proxyPrefix } from '../../config';
export function userLogin(data: { phoneNumber: string; passWord: string }): Promise<{ token: string }> {
  return fetchHttp(`${proxyPrefix}user/login`, {
    reqMethod: 'POST',
    data,
  });
}
