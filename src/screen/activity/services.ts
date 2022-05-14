import { fetchHttp } from '../../utils';
import { proxyPrefix } from '../../config';
import { ActivityListItemType } from './data';

export function queryActivity(data: {
  pageNumber: number;
  pageSize: number;
  stStatus?: number;
}): Promise<{ list: ActivityListItemType[]; total: number }> {
  return fetchHttp(`${proxyPrefix}sutuo/queryActivity`, {
    reqMethod: 'GET',
    data,
  });
}

export function auditActivity(data: {
  auditId: number;
  auditName: string;
  stStatus: number;
  id: number;
}): Promise<any> {
  return fetchHttp(`${proxyPrefix}sutuo/auditActivity`, {
    reqMethod: 'POST',
    data,
  });
}
