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
