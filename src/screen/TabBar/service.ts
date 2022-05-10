import { fetchHttp } from '../../utils';
import { proxyPrefix } from '../../config';
import { UserInfoType } from './data';

/** 判断登录信息是否失效 */
export function verifyToken(): Promise<{
  userInfo: Partial<UserInfoType>;
}> {
  return fetchHttp(`${proxyPrefix}user/auth`, {
    reqMethod: 'POST',
  });
}
