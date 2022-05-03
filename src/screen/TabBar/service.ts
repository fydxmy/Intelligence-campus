import { fetchHttp } from '../../utils';
import { proxyPrefix } from '../../config';

/** 判断登录信息是否失效 */
export function verifyToken(): Promise<{
  userInfo: Partial<{
    age: number;
    avatar: string;
    gender: number;
    id: number;
    nickName: string;
    selfIntroduction: string;
    studentId: string;
  }>;
}> {
  return fetchHttp(`${proxyPrefix}user/auth`, {
    reqMethod: 'POST',
  });
}
