import { fetchHttp } from '../../utils';

export function userLogin(data: { studentId: string; passWord: string }): Promise<{ token: string }> {
  return fetchHttp('user/login', {
    reqMethod: 'POST',
    data,
  });
}
