import { fetchHttp } from '../../../../utils';
import { proxyPrefix } from '../../../../config';
import { StudyStatusType } from './data';

export function queryStudentStatus(): Promise<{ studentStatus: StudyStatusType }> {
  return fetchHttp(`${proxyPrefix}user/queryStudentStatus`, {
    reqMethod: 'GET',
  });
}
